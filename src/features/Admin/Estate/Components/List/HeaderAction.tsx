import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { ADMIN_PATH } from "@constants/urls";

import { Button } from "@components/Form";

const AdminEstateListHeaderAction = () => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.estate.list.header",
  });

  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(ADMIN_PATH.ESTATE_CREATE_PATH);
  }, [navigate]);

  return (
    <Button size="sm" className="pr-5" onClick={handleClick}>
      <MdAdd className="mr-3" size={22} />
      {t("create")}
    </Button>
  );
};

export default AdminEstateListHeaderAction;
