import { IBaseListQuery } from "@encacap-group/common/dist/base";
import { ESTATE_STATUS_ENUM, IPost } from "@encacap-group/common/dist/re";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import LayoutContent from "@common/Layout/Components/LayoutContent";
import { LayoutContentTabItemType } from "@common/Layout/Components/LayoutContentTabItem";
import { PostTableBodyItemProps } from "@components/Post/Table/TableBodyItem";
import { ADMIN_PATH } from "@constants/urls";
import { adminPostService } from "@services/index";
import { setDocumentTitle } from "@utils/helpers";

import { ESTATE_LIST_TAB_ENUM } from "@admin/Estate/Constants/enums";

import PostListHeaderAction from "./Components/List/HeaderAction";
import AdminPostListTable, { AdminPostListTableProps } from "./Components/List/Table";

interface PostListProps extends Pick<AdminPostListTableProps, "defaultSelection" | "onChangeSelection"> {
  isResetScroll?: boolean;
  layoutClassName?: string;
  mode?: "normal" | "modal";
  tableMode?: PostTableBodyItemProps["mode"];
}

const AdminPostList = ({
  isResetScroll,
  layoutClassName,
  mode = "normal",
  tableMode,
  defaultSelection,
  onChangeSelection,
}: PostListProps) => {
  const { t } = useTranslation();

  const [postData, setPostData] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);

  const { tabId = ESTATE_LIST_TAB_ENUM.COMPLETED, categoryId } = useParams();

  const isNormalMode = useMemo(() => mode === "normal", [mode]);
  const tabItems = useMemo<LayoutContentTabItemType[] | undefined>(() => {
    if (!isNormalMode) {
      return undefined;
    }

    return [
      {
        id: ESTATE_LIST_TAB_ENUM.COMPLETED,
        label: t("completed"),
      },
      {
        id: ESTATE_LIST_TAB_ENUM.DRAFT,
        label: t("draft"),
      },
    ];
  }, [t, isNormalMode]);

  const navigate = useNavigate();

  const handleChangeTab = useCallback(
    (tabId: string) => {
      let navigatePath = ADMIN_PATH.POST_TAB_PATH(tabId);

      if (categoryId) {
        navigatePath = ADMIN_PATH.POST_CATEGORY_TAB_PATH(categoryId, tabId);
      }

      navigate(navigatePath);
    },
    [tabId, categoryId],
  );

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
    setDocumentTitle(t("postManagement"), isResetScroll !== false);
  }, [t, isResetScroll]);

  return (
    <LayoutContent
      action={<PostListHeaderAction />}
      className={layoutClassName}
      defaultSelectedTab={tabId}
      title={t("postManagement")}
      isBlank={!isNormalMode}
      isShowHeader={isNormalMode}
      tabs={tabItems}
      onChangeTab={handleChangeTab}
    >
      <AdminPostListTable
        data={postData}
        defaultSelection={defaultSelection}
        isLoading={isLoading}
        mode={tableMode}
        totalRows={totalRows}
        onChangeQueryParams={getData}
        onChangeSelection={onChangeSelection}
        onUnPublish={handleUnPublish}
        onPublish={handlePublish}
        onMoveToTop={handleMoveToTop}
      />
    </LayoutContent>
  );
};

export default AdminPostList;
