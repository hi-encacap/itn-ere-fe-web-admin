import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { HTMLAttributes, ReactNode, forwardRef, useRef } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { Button } from "@components/Form";

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  contentContainerClassName?: string;
  footer?: ReactNode;
  isOpen: boolean;
  isShowHeader?: boolean;
  isShowFooter?: boolean;
  isAllowSubmit?: boolean;
  isLoading?: boolean;
  title?: string;
  onClose: () => void;
  onConfirm?: () => void;
}

const Modal = (
  {
    children,
    className,
    contentContainerClassName,
    footer,
    isAllowSubmit = true,
    isLoading = false,
    isShowHeader = true,
    isShowFooter = true,
    isOpen,
    title,
    onClose,
    onConfirm,
  }: ModalProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const { t } = useTranslation("common");

  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  const modalVariants = {
    hidden: {
      transform: "scale(0.95)",
      opacity: 0,
      transition: {
        delay: 0.1,
      },
    },
    visible: {
      transform: "scale(1)",
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      transform: "scale(0.95)",
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence initial={false} mode="wait">
      {isOpen && (
        <Dialog
          ref={ref}
          open={isOpen}
          as="div"
          className={twMerge(
            className,
            "scroll-hidden fixed inset-0 z-50 flex justify-center overflow-y-auto py-6",
          )}
          initialFocus={cancelButtonRef}
          onClose={onClose}
        >
          <div className="my-auto flex max-h-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0,
                delay: 0,
                ease: "easeIn",
                times: [0, 0.71, 0.2, 1.01],
              }}
            >
              <Dialog.Overlay className="fixed inset-0 z-0 bg-black bg-opacity-75 transition-opacity" />
            </motion.div>

            <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit">
              <div className="relative z-20 w-full md:m-auto md:rounded-lg">
                <div className={twMerge("h-fit w-fit rounded-lg bg-white", isShowHeader && "pt-7")}>
                  <div className="px-10">
                    {isShowHeader && (
                      <div>
                        <div className="h-fit w-fit pb-2 text-lg font-semibold">{title}</div>
                        <div className="mt-2 h-1 w-16 rounded-md bg-gray-100" />
                      </div>
                    )}
                    <div className={twMerge("w-[400px] pt-8 pb-8", contentContainerClassName)}>
                      {children}
                    </div>
                  </div>
                  {isShowFooter && (
                    <div className="flex items-center justify-end space-x-6 rounded-b-lg bg-gray-50 px-10 py-6">
                      {footer && footer}
                      {!footer && (
                        <>
                          <Button
                            size="sm"
                            color="light"
                            disabled={isLoading}
                            ref={cancelButtonRef}
                            onClick={onClose}
                          >
                            {t("cancel")}
                          </Button>
                          <Button
                            className="px-12"
                            size="sm"
                            disabled={isLoading || !isAllowSubmit}
                            isLoading={isLoading}
                            onClick={onConfirm}
                          >
                            {t("confirm")}
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <div className="h-6 w-full" />
              </div>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default forwardRef(Modal);
