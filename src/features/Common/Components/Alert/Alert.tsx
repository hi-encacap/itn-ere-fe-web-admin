import { HTMLAttributes, MouseEvent, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import { AlertType } from '../../../../app/Types/Common/elementTypes';
import AlertIcon from './AlertIcon';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  type: AlertType;
  title: string;
  message?: string;
  children?: ReactNode;
  trackingCode?: string;
  onClose?: () => void;
}

const Alert = ({
  title,
  message,
  type = 'default',
  className,
  trackingCode,
  children,
  onClose,
  onClick,
}: AlertProps) => {
  const { t } = useTranslation('common', {
    keyPrefix: 'alert',
  });

  const generalColors = {
    default: 'bg-blue-50 text-blue-600',
    success: 'bg-green-50 text-green-700',
    error: 'bg-red-50 text-red-600',
    warning: 'bg-yellow-50 text-yellow-700',
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    onClose?.();
    onClick?.(e);
  };

  return (
    <div
      className={twMerge('w-full rounded-md px-5 pt-4 pb-3 font-semibold', generalColors[type], className)}
      role="button"
      tabIndex={0}
      onClick={handleClick}
    >
      <div className="flex">
        <div className="mt-1 mr-4 flex-shrink-0 text-lg">
          <AlertIcon type={type} />
        </div>
        <div className="text-base">
          <div className="my-1">{title}</div>
          {Boolean(message) && (
            <div className={twMerge('mt-1.5 font-normal', !children && 'mb-2')}>{message}</div>
          )}
          {trackingCode && (
            <div className="mb-1.5 mt-3 flex items-center space-x-2 text-sm font-normal">
              <span className="flex-shrink-0 font-semibold">{t('errorTrackingCode')}: </span>
              <span className="inline-block overflow-hidden break-all text-right line-clamp-1">
                {trackingCode}
              </span>
            </div>
          )}
          {children && <div className="mb-1.5 mt-3">{children}</div>}
        </div>
      </div>
    </div>
  );
};

export default Alert;
