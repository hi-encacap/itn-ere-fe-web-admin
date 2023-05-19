import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { ADMIN_PATH } from "@constants/urls";

import { Button } from "@components/Form";

interface AdminEstateModificationPublishingModalFooterProps {
  isDisabled: boolean;
  isAllowClose?: boolean;
  onClickClose: () => void;
}

const AdminEstateModificationPublishingModalFooter = ({
  isDisabled,
  isAllowClose,
  onClickClose,
}: AdminEstateModificationPublishingModalFooterProps) => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.estate.modification.modal.publishing",
  });

  const navigate = useNavigate();

  const handleClickGoToManageEstate = useCallback(() => {
    navigate(ADMIN_PATH.ESTATE_PATH);
  }, [navigate]);

  const handleClickViewEstate = useCallback(() => {
    navigate(ADMIN_PATH.ESTATE_PATH);
  }, [navigate]);

  return (
    <div className="flex flex-1 items-center justify-between space-x-6">
      {isAllowClose && (
        <Button size="sm" color="light" onClick={onClickClose}>
          {t("action.close")}
        </Button>
      )}
      <div className="flex flex-1 items-center justify-end space-x-6">
        <Button size="sm" color="light" disabled={isDisabled} onClick={handleClickViewEstate}>
          {t("action.goToManageEstate")}
        </Button>
        <Button className="px-12" size="sm" disabled={isDisabled} onClick={handleClickGoToManageEstate}>
          {t("action.viewEstate")}
        </Button>
      </div>
    </div>
  );
};

export default AdminEstateModificationPublishingModalFooter;
