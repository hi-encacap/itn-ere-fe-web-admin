import { FC } from "react";
import { useTranslation } from "react-i18next";

const UnknownError: FC = () => {
  const { t } = useTranslation(["common"], {
    keyPrefix: "common:page.error.unknown",
  });

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex items-center justify-center">
        <div>{t("code")}</div>
        <div className="mx-4 h-6 w-px bg-gray-200" />
        <div>{t("title")}</div>
      </div>
    </div>
  );
};

export default UnknownError;
