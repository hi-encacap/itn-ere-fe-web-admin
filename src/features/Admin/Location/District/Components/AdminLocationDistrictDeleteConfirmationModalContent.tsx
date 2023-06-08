import { useTranslation } from "react-i18next";

import StringDotList from "@components/List/StringDotList";

const AdminLocationDistrictDeleteConfirmationModalContent = () => {
  const { t } = useTranslation(["admin"], {
    keyPrefix: "admin:page.location.district.modal.delete.message",
  });

  return (
    <div>
      <div className="font-semibold">{t("districtWillBeDeleted")}:</div>
      <StringDotList
        className="mt-2"
        strings={[t("cannotCreateNewPost"), t("oldPostWillBeUnpublished"), t("oldDraftWillBeDeleted")]}
      />
      <div className="mt-2">{t("areYouSure")}</div>
    </div>
  );
};

export default AdminLocationDistrictDeleteConfirmationModalContent;
