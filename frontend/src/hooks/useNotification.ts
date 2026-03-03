'use client';

import { NotificationAPI } from '@/components/notifications/NotificationManager';

interface NotificationAction {
  label: string;
  onClick: () => void;
}

interface UseNotificationOptions {
  autoClose?: number;
  action?: NotificationAction;
}

export const useNotification = () => {
  return {
    success: (title: string, message: string, options?: UseNotificationOptions) => {
      return NotificationAPI.success(title, message, options);
    },
    error: (title: string, message: string, options?: UseNotificationOptions) => {
      return NotificationAPI.error(title, message, options);
    },
    warning: (title: string, message: string, options?: UseNotificationOptions) => {
      return NotificationAPI.warning(title, message, options);
    },
    info: (title: string, message: string, options?: UseNotificationOptions) => {
      return NotificationAPI.info(title, message, options);
    },
  };
};

export default useNotification;
