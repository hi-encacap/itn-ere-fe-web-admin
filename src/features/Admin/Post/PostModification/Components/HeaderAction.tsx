import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import { ADMIN_PATH } from "@constants/urls";

import { Button } from "@components/Form";

const PostModificationHeaderAction = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(ADMIN_PATH.POST_PATH);
  }, [navigate]);

  return (
    <Button size="sm" className="pr-5" onClick={handleClick}>
      <BiChevronLeft className="mr-3" size={22} />
      {t("postManagement")}
    </Button>
  );
};

export default PostModificationHeaderAction;
