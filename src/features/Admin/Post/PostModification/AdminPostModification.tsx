import { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";

import LayoutContent from "@common/Layout/Components/LayoutContent";

import { setDocumentTitle } from "@utils/helpers";

import AdminPostModificationForm from "./Components/Form/Form";
import PostModificationHeaderAction from "./Components/HeaderAction";

const AdminPostModification = () => {
  const { t } = useTranslation();

  useLayoutEffect(() => {
    setDocumentTitle(t("addPost"));
  }, [t]);

  return (
    <LayoutContent title={t("addPost")} action={<PostModificationHeaderAction />}>
      <div className="grid grid-cols-6 gap-6">
        <AdminPostModificationForm className="col-span-4" />
        <div className="col-span-2 -my-6 border-l-2 border-gray-100 py-6 pl-6" />
      </div>
    </LayoutContent>
  );
};

export default AdminPostModification;
