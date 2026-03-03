'use client';

import React, { useState, useCallback, useEffect } from 'react';
import EliteNotification from './EliteNotification';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationAction {
  label: string;
  onClick: () => void;
}

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  autoClose?: number;
  action?: NotificationAction;
}

export const NotificationManager: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const addNotification = useCallback(
    (
      type: NotificationType,
      title: string,
      message: string,
      options?: {
        autoClose?: number;
        action?: NotificationAction;
      }
    ) => {
      const id = `notif-${Date.now()}-${Math.random()}`;
      const notification: Notification = {
        id,
        type,
        title,
        message,
        autoClose: options?.autoClose || 5000,
        action: options?.action,
      };

      setNotifications((prev) => [...prev, notification]);
      return id;
    },
    []
  );

  useEffect(() => {
    NotificationAPI.setAddNotification(addNotification);
  }, [addNotification]);

  return (
    <>
      <div className="fixed top-6 right-6 z-50 space-y-3 pointer-events-none">
        {notifications.map((notif) => (
          <div key={notif.id} className="pointer-events-auto">
            <EliteNotification
              id={notif.id}
              type={notif.type}
              title={notif.title}
              message={notif.message}
              autoClose={notif.autoClose}
              action={notif.action}
              onClose={removeNotification}
            />
          </div>
        ))}
      </div>
    </>
  );
};

// API global para usar notificações de qualquer lugar
class NotificationAPI {
  static addNotification: (
    type: NotificationType,
    title: string,
    message: string,
    options?: {
      autoClose?: number;
      action?: NotificationAction;
    }
  ) => string = () => '';

  static success(title: string, message: string, options?: any) {
    return this.addNotification('success', title, message, options);
  }

  static error(title: string, message: string, options?: any) {
    return this.addNotification('error', title, message, options);
  }

  static warning(title: string, message: string, options?: any) {
    return this.addNotification('warning', title, message, options);
  }

  static info(title: string, message: string, options?: any) {
    return this.addNotification('info', title, message, options);
  }

  static setAddNotification(fn: any) {
    this.addNotification = fn;
    return this;
  }
}

export default NotificationManager;
export { NotificationAPI };
