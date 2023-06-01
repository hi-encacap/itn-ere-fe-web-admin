import { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";

import LayoutContent from "@common/Layout/Components/LayoutContent";

import { setDocumentTitle } from "@utils/helpers";

import AdminEstateModificationDraft from "./Components/Draft/Draft";
import AdminEstateModificationForm from "./Components/Form/Form";
import AdminEstateModificationHeaderAction from "./Components/HeaderAction";

interface AdminEstateModificationProps {
  id?: number;
}

const AdminEstateModification = ({ id }: AdminEstateModificationProps) => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.estate.modification",
  });

  useLayoutEffect(() => {
    setDocumentTitle(t("title.create"));
  }, [t]);

  return (
    <LayoutContent title={t("title.create")} action={<AdminEstateModificationHeaderAction />}>
      <div className="grid grid-cols-6 gap-6">
        <AdminEstateModificationForm id={id} />
        <div className="col-span-2 -my-6 border-l-2 border-gray-100 py-6 pl-6">
          <AdminEstateModificationDraft />
        </div>
      </div>
    </LayoutContent>
  );
};

export default AdminEstateModification;
