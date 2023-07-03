import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";

import { Button, Input, Textarea } from "@components/Form";
import useSelector from "@hooks/useSelector";
import useToast from "@hooks/useToast";
import { WebsiteFormDataType } from "@interfaces/Admin/websiteTypes";
import { adminWebsiteService } from "@services/index";

import AdminConfigWebsiteContainer from "../../Components/AdminConfigWebsiteContainer";
import { configWebsiteGeneralFormSchema } from "../../Schemas/configWebsiteFormSchema";

const AdminConfigWebsiteDetailGeneral = () => {
  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();
  const { user } = useSelector((state) => state.common);
  const {
    control,
    handleSubmit: useFormSubmit,
    setValue,
  } = useForm<WebsiteFormDataType>({
    resolver: yupResolver(configWebsiteGeneralFormSchema(t)),
  });

  const handleSubmit = useFormSubmit(async (data) => {
    setIsSubmitting(true);

    try {
      await adminWebsiteService.updateMyWebsite(data);
      toast.success(t("updateConfigWebsiteSuccess"), t("mayTakeAWhileToEffectConfigWebsite"));
    } catch (error) {
      toast.error(t("updateConfigWebsiteError"));
    } finally {
      setIsSubmitting(false);
    }
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    setValue("name", user.website.name);
    setValue("description", user.website.description);
  }, [user, setValue]);

  return (
    <AdminConfigWebsiteContainer title={t("generalInfo")}>
      <form className="grid grid-cols-1 gap-y-6" onSubmit={handleSubmit}>
        <Input
          className="block"
          control={control}
          disabled={isSubmitting}
          label={t("websiteName")}
          name="name"
          placeholder={t("enterWebsiteName")}
        />
        <Textarea
          className="block"
          control={control}
          disabled={isSubmitting}
          label={t("description")}
          name="description"
          placeholder={t("enterDescription")}
          rows={3}
          description={
            <Trans
              t={t}
              i18nKey="descriptionWillBeUsedForSEO"
              components={{
                span: (
                  // #skip-cq: JS-0738
                  <a
                    className="underline underline-offset-4 hover:text-teal-500"
                    href="https://developers.google.com/search/docs/appearance/snippet?hl=vi"
                    target="_blank"
                    rel="noreferrer"
                  />
                ),
              }}
            />
          }
        />
        <Button className="mt-2 w-full" disabled={isSubmitting} isLoading={isSubmitting} type="submit">
          {t("update")}
        </Button>
      </form>
    </AdminConfigWebsiteContainer>
  );
};

export default AdminConfigWebsiteDetailGeneral;
