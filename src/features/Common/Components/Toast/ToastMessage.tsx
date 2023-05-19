import { cloneElement, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BsEmojiSmile, BsEmojiSmileUpsideDown } from "react-icons/bs";
import { TypeOptions, toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

interface ToastMessageProps {
  message: string;
  description?: string;
  type: TypeOptions;
}

const ToastMessage = ({ message, description, type }: ToastMessageProps) => {
  const { t } = useTranslation("common");

  const colorClassName = useMemo(() => {
    if (type === toast.TYPE.SUCCESS) {
      return "text-green-500";
    }
    if (type === toast.TYPE.ERROR) {
      return "text-red-500";
    }
    return "text-blue-500";
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

  const formattedMessage = useMemo(() => {
    if (!description) {
      if (type === toast.TYPE.SUCCESS) {
        return t("success");
      }

      return t("error");
    }

    return message;
  }, [message, description, type, t]);

  const formattedDescription = useMemo(() => {
    if (!description) {
      return message;
    }

    return description;
  }, [message, description]);

  return (
    <div className={twMerge("flex", colorClassName)}>
      {cloneElement(typeIcon, { className: "mt-0.5 mr-3.5 -ml-1 flex-shrink-0 font-bold" })}
      <div>
        <span
          className={twMerge("mr-1.5 font-semibold text-slate-700", !formattedDescription && "font-normal")}
        >
          {formattedMessage}
        </span>
        <span className="text-slate-700">{formattedDescription}</span>
      </div>
    </div>
  );
};

export default ToastMessage;
