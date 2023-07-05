import { useTranslation } from "react-i18next";
import { BsFolder2Open } from "react-icons/bs";

const TableContentBodyEmptyContent = () => {
  const { t } = useTranslation(["common"], {
    keyPrefix: "table.pagination",
  });

  return (
    <div className="flex flex-col items-center justify-center pb-20 pt-24 text-center text-gray-500">
      <BsFolder2Open size={40} className="text-gray-200" />
      <div className="mt-2 text-gray-300">{t("emptyData")}</div>
    </div>
  );
};

export default TableContentBodyEmptyContent;
