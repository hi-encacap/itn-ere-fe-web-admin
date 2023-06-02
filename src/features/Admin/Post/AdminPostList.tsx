import { IBaseListQuery } from "@encacap-group/common/dist/base";
import { ESTATE_STATUS_ENUM, IPost } from "@encacap-group/common/dist/re";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { ADMIN_PATH } from "@constants/urls";
import { adminPostService } from "@services/index";

import LayoutContent from "@common/Layout/Components/LayoutContent";
import { LayoutContentTabItemType } from "@common/Layout/Components/LayoutContentTabItem";

import { setDocumentTitle } from "@utils/helpers";

import { ESTATE_LIST_TAB_ENUM } from "@admin/Estate/Constants/enums";

import PostListHeaderAction from "./Components/List/HeaderAction";
import AdminPostListTable from "./Components/List/Table";

const PostList = () => {
  const { t } = useTranslation();

  const [postData, setPostData] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);

  const { tabId = ESTATE_LIST_TAB_ENUM.COMPLETED } = useParams();

  const tabItems = useMemo<LayoutContentTabItemType[]>(
    () => [
      {
        id: ESTATE_LIST_TAB_ENUM.COMPLETED,
        label: t("completed"),
      },
      {
        id: ESTATE_LIST_TAB_ENUM.DRAFT,
        label: t("draft"),
      },
    ],
    [t],
  );

  const navigate = useNavigate();

  const handleChangeTab = useCallback((tabId: string) => {
    navigate(tabId === ESTATE_LIST_TAB_ENUM.DRAFT ? ADMIN_PATH.POST_DRAFT_PATH : ADMIN_PATH.POST_PATH);
  }, []);

  const getData = useCallback(async (queryParams: IBaseListQuery) => {
    setIsLoading(true);

    try {
      let service = adminPostService.getPosts;

      if (queryParams.tab === ESTATE_LIST_TAB_ENUM.DRAFT) {
        service = adminPostService.getPostDrafts;
      }

      if (queryParams.tab === ESTATE_LIST_TAB_ENUM.COMPLETED && !queryParams.statuses) {
        queryParams.statuses = [ESTATE_STATUS_ENUM.PUBLISHED, ESTATE_STATUS_ENUM.UNPUBLISHED];
      }

      const response = await service(queryParams);

      setPostData(response.data);
      setTotalRows(response.meta.totalRows);
    } catch (error) {
      setPostData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleUnPublish = useCallback(adminPostService.unPublishPostById, []);

  const handlePublish = useCallback(adminPostService.publishPostById, []);

  const handleMoveToTop = useCallback(adminPostService.movePostToTopById, []);

  useEffect(() => {
    setDocumentTitle(t("postManagement"));
  }, [t]);

  return (
    <LayoutContent
      title={t("postManagement")}
      defaultSelectedTab={tabId}
      action={<PostListHeaderAction />}
      tabs={tabItems}
      onChangeTab={handleChangeTab}
    >
      <AdminPostListTable
        data={postData}
        isLoading={isLoading}
        totalRows={totalRows}
        onChangeQueryParams={getData}
        onUnPublish={handleUnPublish}
        onPublish={handlePublish}
        onMoveToTop={handleMoveToTop}
      />
    </LayoutContent>
  );
};

export default PostList;
