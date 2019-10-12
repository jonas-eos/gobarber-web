import React, { useState, useMemo } from 'react';
import { format, addDays, subDays } from 'date-fns';
import { enUS } from 'date-fns/locale/';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import api from '~/services/api';

import { Container, Time } from './styles';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());

  /** The date format should be shown equal to the marked locale pattern. */
  const dateFormatted = useMemo(
    () => format(date, `do MMMM`, { locale: enUS }),
    [date]
  );

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
        <ul>
          <Time past>
            <strong>08:00</strong>
            <span>Name</span>
          </Time>
          <Time available>
            <strong>09:00</strong>
            <span>Open</span>
          </Time>
          <Time>
            <strong>10:00</strong>
            <span>Name</span>
          </Time>
          <Time>
            <strong>11:00</strong>
            <span>Name</span>
          </Time>
        </ul>
      </section>
    </Container>
  );
}
