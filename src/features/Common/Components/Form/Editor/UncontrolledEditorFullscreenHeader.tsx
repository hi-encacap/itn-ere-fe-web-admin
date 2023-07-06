import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { BsArrowLeft } from "react-icons/bs";

import Button from "../Button/Button";

interface UncontrolledEditorFullscreenHeaderProps {
  title?: string | null;
  onClose: () => void;
}

const UncontrolledEditorFullscreenHeader = ({ title, onClose }: UncontrolledEditorFullscreenHeaderProps) => {
  const { t } = useTranslation();

  return createPortal(
    <div className="fixed inset-x-0 top-0 z-70 flex h-20 items-center justify-between border-b-2 border-gray-100 bg-white px-5">
      <div className="flex items-center justify-center space-x-5">
        <button
          type="button"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-gray-100 duration-100 hover:bg-gray-50"
          onClick={onClose}
        >
          <BsArrowLeft />
        </button>
        <span>{title}</span>
      </div>
      <Button onClick={onClose}>{t("confirm")}</Button>
    </div>,
    window.document.querySelector("#root") as HTMLElement,
  );
};

export default UncontrolledEditorFullscreenHeader;
