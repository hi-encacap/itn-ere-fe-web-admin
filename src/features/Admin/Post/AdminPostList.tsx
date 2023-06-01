import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import LayoutContent from "@common/Layout/Components/LayoutContent";

import { setDocumentTitle } from "@utils/helpers";

import PostListHeaderAction from "./Components/List/HeaderAction";

const PostList = () => {
  const { t } = useTranslation();

  useEffect(() => {
    setDocumentTitle(t("postManagement"));
  }, [t]);

  return (
    <LayoutContent title={t("postManagement")} action={<PostListHeaderAction />}>
      Post
    </LayoutContent>
  );
};

export default PostList;
