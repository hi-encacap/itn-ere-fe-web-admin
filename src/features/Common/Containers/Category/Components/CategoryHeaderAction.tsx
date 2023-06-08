import { useTranslation } from "react-i18next";
import { MdAdd } from "react-icons/md";

import { Button } from "@components/Form";

interface CategoryHeaderActionProps {
  onClick?: () => void;
}

const CategoryHeaderAction = ({ onClick }: CategoryHeaderActionProps) => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.category.header",
  });

  return (
    <Button size="sm" className="pr-5" onClick={onClick}>
      <MdAdd className="mr-3" size={22} />
      {t("create")}
    </Button>
  );
};

export default CategoryHeaderAction;
