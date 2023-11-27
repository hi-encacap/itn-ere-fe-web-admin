import { memo } from "react";
import { useTranslation } from "react-i18next";

import LayoutContent from "@common/Layout/Components/LayoutContent";

const Product = () => {
  const { t } = useTranslation();

  return (
    <LayoutContent title={t("productManagement")}>
      <div>Hihi</div>
    </LayoutContent>
  );
};

export default memo(Product);
