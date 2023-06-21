import {
  ACBUILDING_SITE_CONFIG_CODE_ENUM,
  IConfig,
  SITE_CONFIG_CODE_ENUM,
} from "@encacap-group/common/dist/re";
import { Key, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import LayoutContent from "@common/Layout/Components/LayoutContent";
import useToast from "@hooks/useToast";
import { adminConfigService } from "@services/index";

import SiteConfigContactInformation from "./Components/ContactInformation";
import SiteConfigHomeIntroduceImage from "./Components/HomeIntroduce";
import SiteConfigHomeSlider from "./Components/HomeSlider";

const SiteConfig = () => {
  const { t } = useTranslation();
  const toast = useToast();

  const [data, setData] = useState<IConfig[]>([]);
  // TODO: Add loading skeleton.
  const [, setIsLoading] = useState(true);

  const homeSliderConfig = useMemo(
    () => data.find((item) => item.code === SITE_CONFIG_CODE_ENUM.HOMEPAGE_SLIDER_IMAGE),
    [data],
  );
  const homeIntroduceImages = useMemo(
    () => data.find((item) => item.code === ACBUILDING_SITE_CONFIG_CODE_ENUM.HOMEPAGE_INTRODUCE_IMAGE),
    [data],
  );
  const contactInfo = useMemo(
    () => data.find((item) => item.code === SITE_CONFIG_CODE_ENUM.CONTACT_INFORMATION),
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

  const handleChangeConfig = useCallback(async (code: Key, data: Omit<Partial<IConfig>, "code">) => {
    try {
      await adminConfigService.updateConfigByCode(code, data);
      toast.success(t("updateSiteConfigSuccess"));
    } catch (error) {
      toast.error(t("updateSiteConfigError"));
    }
  }, []);

  useEffect(() => {
    void getData();
  }, [getData]);

  return (
    <LayoutContent isBlank title={t("siteConfigManagement")} className="px-0" headerClassName="px-8">
      <div className="mx-4 -mt-4 flex flex-wrap overflow-hidden">
        <SiteConfigHomeSlider data={homeSliderConfig} onChange={handleChangeConfig} />
        <SiteConfigHomeIntroduceImage data={homeIntroduceImages} onChange={handleChangeConfig} />
        <SiteConfigContactInformation data={contactInfo} onChange={handleChangeConfig} />
      </div>
    </LayoutContent>
  );
};

export default SiteConfig;
