import { IBaseListQuery } from "@encacap-group/common/dist/base";
import { ESTATE_STATUS_ENUM, IEstate } from "@encacap-group/common/dist/re";
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import LayoutContent from "@common/Layout/Components/LayoutContent";
import { LayoutContentTabItemType } from "@common/Layout/Components/LayoutContentTabItem";
import { adminEstateService } from "@services/index";
import { setDocumentTitle } from "@utils/helpers";

import AdminEstateListHeaderAction from "./Components/List/HeaderAction";
import AdminEstateListTable from "./Components/List/Table";
import { EstateListTabEnum } from "./Constants/enums";

const AdminEstateList = () => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.estate",
  });

  const [estateData, setEstateData] = useState<IEstate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalRows, setTotalRows] = useState(0);

  const selectedTabIdParam = useMemo(
    () => searchParams.get("tab_id") ?? EstateListTabEnum.COMPLETED,
    [searchParams],
  );

  const tabItems = useMemo<LayoutContentTabItemType[]>(
    () => [
      {
        id: EstateListTabEnum.COMPLETED,
        label: t("list.tab.completed"),
      },
      {
        id: EstateListTabEnum.DRAFT,
        label: t("list.tab.draft"),
      },
    ],
    [t],
  );

  const getData = useCallback(async (queryParams: IBaseListQuery) => {
    setIsLoading(true);

    try {
      let service = adminEstateService.getEstates;

      if (queryParams.tab === EstateListTabEnum.DRAFT) {
        service = adminEstateService.getEstateDrafts as unknown as typeof service;
      }

      if (queryParams.tab === EstateListTabEnum.COMPLETED && !queryParams.statuses) {
        // eslint-disable-next-line no-param-reassign
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
    [searchParams, setSearchParams],
  );

  /* eslint-disable react-hooks/exhaustive-deps */
  const handleUnPublish = useCallback(adminEstateService.unPublishEstateById, []);
  const handlePublish = useCallback(adminEstateService.publishEstateById, []);
  const handleMoveToTop = useCallback(adminEstateService.moveEstateToTopById, []);
  /* eslint-enable react-hooks/exhaustive-deps */

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
      action={<AdminEstateListHeaderAction />}
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
