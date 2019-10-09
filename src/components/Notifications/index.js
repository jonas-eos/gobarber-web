import React, { useState, useEffect, useMemo } from 'react';
import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import enUS from 'date-fns/locale/en-US';

import api from '~services/api';

import {
  Container,
  Badge,
  NotificationList,
  Scroll,
  Notification,
} from './styles';

export default function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  /**
   * Checks if the notification in the current state has not been read, this
   * event is used in the component that displays the new notification icon in
   * the page header if there is any notification to the user.
   */
  const hasUnread = useMemo(
    () =>
      Boolean(notifications.find(notification => notification.read === false)),
    [notifications]
  );

  /**
   * Get user notifications through the API.
   * The information is formatted to display the time format correctly on the page.
   * This event is triggered when the page component is loaded.
   */
  useEffect(() => {
    async function loadNotifications() {
      const response = await api.get('notifications');

      /** Formatting the information */
      const data = response.data.map(notification => ({
        ...notification,
        timeDistance: formatDistance(
          parseISO(notification.createdAt),
          new Date(),
          { addSuffix: true, locale: enUS }
        ),
      }));

      setNotifications(data);
    }

    loadNotifications();
  }, []);

  /**
   * Used in the badge to display notification content for the user.
   * @function
   */
  function handleToggleVisible() {
    setVisible(!visible);
  }

  /**
   * Used on the mark as read button.
   * Changes the notification state when triggered.
   * @async @function
   * @param {Number} id
   */
  async function handleMarkAsRead(id) {
    await api.put(`notifications/${id}`);

    setNotifications(
      notifications.map(notification =>
        notification._id === id ? { ...notification, read: true } : notification
      )
    );
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
        <MdNotifications color="#7159c1" size={20} />
      </Badge>
      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map(notification => (
            <Notification key={notification._id} unread={!notification.read}>
              <p>{notification.content}</p>
              <time>{notification.timeDistance}</time>
              {!notification.read && (
                <button
                  type="button"
                  onClick={() => handleMarkAsRead(notification._id)}
                >
                  Mark as read.
                </button>
              )}
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
}
