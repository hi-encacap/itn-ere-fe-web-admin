import { useTranslation } from "react-i18next";
import { MdAdd } from "react-icons/md";

import { Button } from "@components/Form";

interface AdminContactHeaderActionProps {
  onClick?: () => void;
}

const AdminContactHeaderAction = ({ onClick }: AdminContactHeaderActionProps) => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.contact.header",
  });

  return (
    <Button size="sm" className="pr-5" onClick={onClick}>
      <MdAdd className="mr-3" size={22} />
      {t("create")}
    </Button>
  );
};

export default AdminContactHeaderAction;
