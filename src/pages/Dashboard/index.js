import React, { useState, useMemo, useEffect } from 'react';
import {
  format,
  addDays,
  subDays,
  setHours,
  setMinutes,
  setSeconds,
  isEqual,
  parseISO,
  isBefore,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { enUS } from 'date-fns/locale/';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import api from '~/services/api';

import { Container, Time } from './styles';

/** Schedule time range */
const timeRange = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

export default function Dashboard() {
  const [schedules, setSchedules] = useState([]);
  const [date, setDate] = useState(new Date());

  /** The date format should be shown equal to the marked locale pattern. */
  const dateFormatted = useMemo(
    () => format(date, `do MMMM`, { locale: enUS }),
    [date]
  );

  /** Monitor date State */
  useEffect(() => {
    /**
     * Should be retrieved from the server, all past day schedules using "date"
     * as parameter.
     * You must identify the device timezone to show the correct time according
     * to the region of the device used.
     * Validation time must have the minutes and seconds zeroed for the search
     * to be valid.
     * After converting the validation time according to the time zone, you must
     * reset the timezone field from the time that was compared so that there is
     * no conflict in searching the times in the database.
     * In return, you must enter the time, if the time is a past time, and
     * return the schedule information with user data, times, and so on.
     * @async
     * @function
     */
    async function loadSchedules() {
      /** Request schedule from date state */
      const response = await api.get('schedule', {
        params: { date },
      });

      /** Get device timezone */
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      /** Get all data between timeRange in Schedules date */
      const data = timeRange.map(hour => {
        /** Format the hour to be 0 minutes and 0 seconds */
        const checkHour = setSeconds(setMinutes(setHours(date, hour), 0), 0);

        /** Convert the actual date with timezone */
        const compareDate = utcToZonedTime(checkHour, timezone);

        /** Convert compareDate to be universal time value */
        compareDate.setMilliseconds(0);

        /** Return all appointments that is equal to compareDate */
        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),
          appointment: response.data.appointments.find(a =>
            isEqual(parseISO(a.date), compareDate)
          ),
        };
      });

      setSchedules(data);
    }

    loadSchedules();
  }, [date]);

  /**
   * Call prev day on button Click
   * @function
   */
  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  /**
   * Call next day on button Click
   * @function
   */
  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  /** Render schedules */
  function renderSchedule() {
    return schedules.map(schedule => (
      <Time
        key={schedule.time}
        past={schedule.past}
        available={!schedule.appointment}
      >
        <strong>{schedule.time}</strong>
        <span>
          {schedule.appointment ? schedule.appointment.user.name : 'Open'}
        </span>
      </Time>
    ));
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={handlePrevDay}>
          <MdChevronLeft size={36} color="#fff" />
        </button>
        <strong>{dateFormatted}</strong>
        <button type="button" onClick={handleNextDay}>
          <MdChevronRight size={36} color="#fff" />
        </button>
      </header>
      <section>
        <ul>{renderSchedule()}</ul>
      </section>
    </Container>
  );
}
