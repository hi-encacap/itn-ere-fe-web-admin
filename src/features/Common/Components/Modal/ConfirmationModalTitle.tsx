import { useMemo } from "react";
import { Trans } from "react-i18next";

interface ConfirmationModalTitleProps {
  title: string;
}

const ConfirmationModalTitle = ({ title: titleProp }: ConfirmationModalTitleProps) => {
  const [key, title] = useMemo(() => titleProp.split("::"), [titleProp]);

  return (
    <h3 className="mt-2 text-lg font-semibold leading-6 text-gray-900">
      {key && title && (
        <Trans
          i18nKey={key}
          values={{ name: title }}
          components={{ span: <span className="text-red-500" /> }}
        />
      )}
      {!title && key}
    </h3>
  );
};

export default ConfirmationModalTitle;
