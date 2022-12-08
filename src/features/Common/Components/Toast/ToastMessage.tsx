import { cloneElement, useMemo } from 'react';
import { BsEmojiSmile, BsEmojiSmileUpsideDown } from 'react-icons/bs';
import { toast, TypeOptions } from 'react-toastify';
import { twMerge } from 'tailwind-merge';

interface ToastMessageProps {
  message: string;
  description?: string;
  type: TypeOptions;
}

const ToastMessage = ({ message, description, type }: ToastMessageProps) => {
  const colorClassName = useMemo(() => {
    if (type === toast.TYPE.SUCCESS) {
      return 'text-green-500';
    }
    if (type === toast.TYPE.ERROR) {
      return 'text-red-500';
    }
    return 'text-blue-500';
  }, [type]);

  const typeIcon = useMemo(() => {
    if (type === toast.TYPE.SUCCESS) {
      return <BsEmojiSmile size={20} />;
    }
    if (type === toast.TYPE.ERROR) {
      return <BsEmojiSmileUpsideDown size={20} />;
    }
    return <BsEmojiSmile size={20} />;
  }, [type]);

  return (
    <div className={twMerge('flex', colorClassName)}>
      {cloneElement(typeIcon, { className: 'mt-0.5 mr-3.5 -ml-1 flex-shrink-0 font-bold' })}
      <div>
        <span className={twMerge('mr-1.5 font-semibold text-slate-700', !description && 'font-normal')}>
          {message}
        </span>
        <span className="text-slate-700">{description}</span>
      </div>
    </div>
  );
};

export default ToastMessage;
