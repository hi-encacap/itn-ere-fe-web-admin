import { useTranslation } from "react-i18next";
import { BsCheck } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

import LoadingSpinner from "@components/Loading/LoadingSpinner";

interface PostPublishingModalStepProps {
  completedText?: string;
  error?: string | null;
  isCompleted: boolean;
  isPending: boolean;
  isWorking: boolean;
  text: string;
  onTryAgain?: () => void;
}

const PostPublishingModalStep = ({
  completedText,
  error = null,
  isWorking,
  isPending,
  isCompleted,
  text,
  onTryAgain,
}: PostPublishingModalStepProps) => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.estate.modification.modal.publishing",
  });

  return (
    <div className="flex space-x-5">
      {!error ? (
        <>
          {isWorking && <LoadingSpinner className="h-5 w-5 border-teal-500" />}
          {isPending && <div className="h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-100" />}
          {isCompleted && (
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 pr-px text-white">
              <BsCheck />
            </div>
          )}
        </>
      ) : (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white">
          <IoClose />
        </div>
      )}
      <div className="-mt-px flex-1">
        <div
          className={twMerge(
            "font-semibold text-slate-700",
            error && "text-red-500",
            isCompleted && !error && "text-green-500",
          )}
        >
          {text}
        </div>
        {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
        {error && (
          <div
            className="mt-2 cursor-pointer text-blue-500 hover:underline hover:underline-offset-4"
            role="button"
            tabIndex={0}
            onClick={onTryAgain}
          >
            {t("tryAgain")}
          </div>
        )}
        {isCompleted && !error && completedText && (
          <div className="mt-2 text-sm text-slate-700">{completedText}</div>
        )}
      </div>
    </div>
  );
};

export default PostPublishingModalStep;
