'use client';

import React, { useEffect, useState } from 'react';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationAction {
  label: string;
  onClick: () => void;
}

interface EliteNotificationProps {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  autoClose?: number;
  action?: NotificationAction;
  onClose: (id: string) => void;
}

const iconMap = {
  success: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 16.17L5.83 12l-1.42 1.41L10 19 19 10l-1.41-1.41L10 16.17z" />
    </svg>
  ),
  error: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  ),
  warning: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
    </svg>
  ),
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  ),
};

const typeStyles = {
  success: {
    icon: 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-glow',
    progress: 'bg-gradient-to-r from-green-500 to-emerald-500',
  },
  error: {
    icon: 'bg-gradient-to-br from-red-500 to-rose-600 shadow-red-glow',
    progress: 'bg-gradient-to-r from-red-500 to-rose-500',
  },
  warning: {
    icon: 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-glow',
    progress: 'bg-gradient-to-r from-amber-500 to-orange-500',
  },
  info: {
    icon: 'bg-gradient-to-br from-indigo-600 to-purple-600 shadow-indigo-glow',
    progress: 'bg-gradient-to-r from-indigo-600 to-purple-600',
  },
};

export const EliteNotification: React.FC<EliteNotificationProps> = ({
  id,
  type,
  title,
  message,
  autoClose = 5000,
  action,
  onClose,
}) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onClose(id), 300);
    }, autoClose);

    return () => clearTimeout(timer);
  }, [autoClose, id, onClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onClose(id), 300);
  };

  const handleAction = () => {
    if (action) {
      action.onClick();
      handleClose();
    }
  };

  return (
    <div
      className={`min-w-[360px] max-w-[420px] bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl ${
        isExiting ? 'animate-slideOutRight' : 'animate-slideInRight'
      }`}
      style={{
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      }}
      role="alert"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-2">
        {/* Icon */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white ${
            typeStyles[type].icon
          }`}
          style={{
            boxShadow: `0 0 20px ${
              type === 'success'
                ? 'rgba(16, 185, 129, 0.3)'
                : type === 'error'
                  ? 'rgba(239, 68, 68, 0.3)'
                  : type === 'warning'
                    ? 'rgba(245, 158, 11, 0.3)'
                    : 'rgba(99, 102, 241, 0.3)'
            }`,
          }}
        >
          <span className="w-5 h-5">{iconMap[type]}</span>
        </div>

        {/* Title & Close */}
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-white">{title}</h3>
        </div>
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-white hover:bg-white/10 rounded-md p-1 transition-all"
          aria-label="Fechar notificação"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
        </button>
      </div>

      {/* Message */}
      <div className="mb-3 pl-13">
        <p className="text-sm text-gray-300 leading-relaxed">{message}</p>
      </div>

      {/* Actions */}
      {action && (
        <div className="flex gap-2 pl-13 mb-2">
          <button
            onClick={handleAction}
            className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold rounded-lg hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
          >
            {action.label}
          </button>
        </div>
      )}

      {/* Progress Bar */}
      <div
        className={`absolute bottom-0 left-0 h-1 rounded-b-2xl ${typeStyles[type].progress}`}
        style={{
          animation: 'countdown 5s linear',
        }}
      />
    </div>
  );
};

export default EliteNotification;
