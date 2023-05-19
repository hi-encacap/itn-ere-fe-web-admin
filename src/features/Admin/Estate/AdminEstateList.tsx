import { IBaseListQuery } from "@encacap-group/types/dist/base";
import { ESTATE_STATUS_ENUM, IEstate } from "@encacap-group/types/dist/re";
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { adminEstateService } from "@services/index";

import LayoutContent from "@common/Layout/Components/LayoutContent";
import { LayoutContentTabItemType } from "@common/Layout/Components/LayoutContentTabItem";

import { setDocumentTitle } from "@utils/helpers";

import AdminEstateListHeaderAction from "./Components/List/HeaderAction";
import AdminEstateListTable from "./Components/List/Table";
import { ESTATE_LIST_TAB_ENUM } from "./Constants/enums";

const AdminEstateList = () => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.estate",
  });

  const [estateData, setEstateData] = useState<IEstate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalRows, setTotalRows] = useState(0);

  const selectedTabIdParam = useMemo(
    () => searchParams.get("tab_id") ?? ESTATE_LIST_TAB_ENUM.COMPLETED,
    [searchParams],
  );

  const tabItems = useMemo<LayoutContentTabItemType[]>(
    () => [
      {
        id: ESTATE_LIST_TAB_ENUM.COMPLETED,
        label: t("list.tab.completed"),
      },
      {
        id: ESTATE_LIST_TAB_ENUM.DRAFT,
        label: t("list.tab.draft"),
      },
    ],
    [t],
  );

  const getData = useCallback(async (queryParams: IBaseListQuery) => {
    setIsLoading(true);

    try {
      let service = adminEstateService.getEstates;

      if (queryParams.tab === ESTATE_LIST_TAB_ENUM.DRAFT) {
        service = adminEstateService.getEstateDrafts as unknown as typeof service;
      }

      if (queryParams.tab === ESTATE_LIST_TAB_ENUM.COMPLETED && !queryParams.statuses) {
        queryParams.statuses = [ESTATE_STATUS_ENUM.PUBLISHED, ESTATE_STATUS_ENUM.UNPUBLISHED];
      }

      const response = await service(queryParams);

      setEstateData(response.data);
      setTotalRows(response.meta.totalRows);
    } catch (error) {
      setEstateData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleChangeTab = useCallback(
    (tabId: string) => {
      searchParams.set("tab_id", tabId);

      setSearchParams(searchParams);
    },
    [searchParams],
  );

  const handleUnPublish = useCallback(adminEstateService.unPublishEstateById, []);

  const handlePublish = useCallback(adminEstateService.publishEstateById, []);

  const handleMoveToTop = useCallback(adminEstateService.moveEstateToTopById, []);

  useLayoutEffect(() => {
    setDocumentTitle(t("list.title"));
  }, [t]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [estateData]);

  return (
    <LayoutContent
      title={t("list.title")}
      actions={<AdminEstateListHeaderAction />}
      tabs={tabItems}
      defaultSelectedTab={selectedTabIdParam}
      onChangeTab={handleChangeTab}
    >
      <AdminEstateListTable
        data={estateData}
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

export default AdminEstateList;
