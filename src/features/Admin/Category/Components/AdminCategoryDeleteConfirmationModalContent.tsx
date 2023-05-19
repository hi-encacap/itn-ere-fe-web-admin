import { useTranslation } from "react-i18next";

import StringDotList from "@components/List/StringDotList";

const AdminCategoryDeleteConfirmationModalContent = () => {
  const { t } = useTranslation(["admin"], {
    keyPrefix: "admin:page.category.modal.delete.message",
  });

  return (
    <div>
      <div className="font-semibold">{t("categoryWillBeDeleted")}:</div>
      <StringDotList
        className="mt-2"
        strings={[t("cannotCreateNewPost"), t("oldPostWillBeUnpublished"), t("oldDraftWillBeDeleted")]}
      />
      <div className="mt-2">{t("areYouSure")}</div>
    </div>
  );
};

export default AdminCategoryDeleteConfirmationModalContent;
