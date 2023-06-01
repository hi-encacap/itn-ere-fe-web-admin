import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { ADMIN_PATH } from "@constants/urls";

import { Button } from "@components/Form";

interface AdminPostModificationPublishingModalFooterProps {
  isDisabled?: boolean;
  isAllowClose?: boolean;
  onClickClose?: () => void;
}

const AdminPostModificationPublishingModalFooter = ({
  isDisabled = true,
  isAllowClose,
  onClickClose,
}: AdminPostModificationPublishingModalFooterProps) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleClickGoToManageEstate = useCallback(() => {
    navigate(ADMIN_PATH.POST_PATH);
  }, [navigate]);

  const handleClickViewEstate = useCallback(() => {
    navigate(ADMIN_PATH.POST_PATH);
  }, [navigate]);

  return (
    <div className="flex flex-1 items-center justify-between space-x-6">
      {isAllowClose && (
        <Button size="sm" color="light" onClick={onClickClose}>
          {t("close")}
        </Button>
      )}
      <div className="flex flex-1 items-center justify-end space-x-6">
        <Button size="sm" color="light" disabled={isDisabled} onClick={handleClickViewEstate}>
          {t("postManagement")}
        </Button>
        <Button className="px-12" size="sm" disabled={isDisabled} onClick={handleClickGoToManageEstate}>
          {t("viewPost")}
        </Button>
      </div>
    </div>
  );
};

export default AdminPostModificationPublishingModalFooter;
