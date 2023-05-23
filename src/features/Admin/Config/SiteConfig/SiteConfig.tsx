import { CONFIG_CODE_ENUM, IConfig } from "@encacap-group/common/dist/re";
import { debounce } from "lodash";
import { Key, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { adminConfigService } from "@services/index";

import LayoutContent from "@common/Layout/Components/LayoutContent";

import useToast from "@hooks/useToast";

import SiteConfigHomeSlider from "./Components/HomeSlider";

const SiteConfig = () => {
  const { t } = useTranslation();
  const toast = useToast();

  const [data, setData] = useState<IConfig[]>([]);
  // TODO: Add loading skeleton.
  const [, setIsLoading] = useState(true);

  const homeSliderConfig = useMemo(
    () => data.find((item) => item.code === CONFIG_CODE_ENUM.HOMEPAGE_SLIDER_IMAGES),
    [data],
  );

  const getData = useCallback(async () => {
    setIsLoading(true);

    try {
      const resData = await adminConfigService.getConfigs();
      setData(resData);
    } catch (error) {
      toast.error(t("getSiteConfigError"));
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleChangeConfig = useCallback(async (code: Key, value: string) => {
    try {
      await adminConfigService.updateConfigByCode(code, value);
      toast.success(t("updateSiteConfigSuccess"));
    } catch (error) {
      toast.error(t("updateSiteConfigError"));
    }
  }, []);

  const handleChangeConfigDebounced = useCallback(debounce(handleChangeConfig, 500), []);

  useEffect(() => {
    void getData();
  }, [getData]);

  return (
    <LayoutContent isBlank title={t("siteConfigManagement")}>
      <div className="grid grid-cols-2 border-t-2 border-gray-100 pt-5">
        {homeSliderConfig && (
          <SiteConfigHomeSlider data={homeSliderConfig} onChange={handleChangeConfigDebounced} />
        )}
      </div>
    </LayoutContent>
  );
};

export default SiteConfig;
