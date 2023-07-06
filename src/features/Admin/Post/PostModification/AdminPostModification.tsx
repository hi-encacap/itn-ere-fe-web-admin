import { useLayoutEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import LayoutContent from "@common/Layout/Components/LayoutContent";
import { adminPostService } from "@services/index";
import { setDocumentTitle } from "@utils/helpers";

import AdminEstateModificationDraft from "@admin/Estate/EstateModification/Components/Draft/Draft";

import AdminPostModificationForm from "./Components/Form/Form";
import PostModificationHeaderAction from "./Components/HeaderAction";

const AdminPostModification = () => {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();

  const postIdParam = useMemo(() => searchParams.get("post_id"), [searchParams]);
  const title = useMemo(() => (postIdParam ? t("editPost") : t("addPost")), [postIdParam, t]);

  useLayoutEffect(() => {
    setDocumentTitle(title);
  }, [title]);

  return (
    <LayoutContent title={title} action={<PostModificationHeaderAction />}>
      <div className="grid grid-cols-6 gap-6">
        <AdminPostModificationForm className="col-span-4" />
        <div className="col-span-2 -my-6 border-l-2 border-gray-100 py-6 pl-6">
          <AdminEstateModificationDraft
            onGetMany={adminPostService.getPostDrafts}
            onConfirmDelete={adminPostService.deletePostDraftById}
          />
        </div>
      </div>
    </LayoutContent>
  );
};

export default AdminPostModification;
