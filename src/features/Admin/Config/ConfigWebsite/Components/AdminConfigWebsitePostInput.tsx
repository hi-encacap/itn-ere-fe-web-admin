import { memo, useCallback, useState } from "react";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import FormElementError from "@components/Form/FormElementError";
import FormElementLabel from "@components/Form/FormElementLabel";
import { HookFormControl } from "@interfaces/Common/commonTypes";

import AdminConfigWebsitePostInputModal from "./AdminConfigWebsitePostInputModal";
import AdminConfigWebsitePostInputPlaceholder from "./AdminConfigWebsitePostInputPlaceholder";

interface AdminConfigWebsitePostInputProps {
  control: HookFormControl;
  className?: string;
  isDisabled?: boolean;
  name: string;
}

const AdminConfigWebsitePostInput = ({
  control,
  className,
  isDisabled,
  name,
}: AdminConfigWebsitePostInputProps) => {
  const { t } = useTranslation();

  const [isShowPickModal, setIsShowPickModal] = useState<boolean>(false);

  const {
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleClickChoosePost = useCallback(() => {
    setIsShowPickModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsShowPickModal(false);
  }, []);

  return (
    <>
      <div className={twMerge(className, "relative")}>
        <FormElementLabel label={t("post")} isRequired error={error?.message} />
        <div
          className={twMerge(
            "rounded-lg border-2 border-gray-100 duration-100 hover:border-gray-200",
            error && "border-red-500 hover:border-red-500",
            isDisabled && "hover:border-gray-100",
          )}
        >
          <AdminConfigWebsitePostInputPlaceholder
            control={control}
            isDisabled={isDisabled}
            name={name}
            title={t("clickToChoosePost")}
            onClick={handleClickChoosePost}
          />
        </div>
        {error && <FormElementError error={error.message} />}
      </div>
      <AdminConfigWebsitePostInputModal
        control={control}
        isOpen={isShowPickModal}
        name={name}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default memo(AdminConfigWebsitePostInput);
