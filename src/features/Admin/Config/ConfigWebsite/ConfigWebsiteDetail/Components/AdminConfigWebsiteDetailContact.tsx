import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, Input } from "@components/Form";
import useToast from "@hooks/useToast";
import { WebsiteConfigFormDataType } from "@interfaces/Admin/websiteConfigTypes";
import { adminWebsiteConfigService } from "@services/index";

import AdminConfigWebsiteContainer from "../../Components/AdminConfigWebsiteContainer";
import { configWebsiteContactFormSchema } from "../../Schemas/configWebsiteFormSchema";

const AdminConfigWebsiteDetailContact = () => {
  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isDisabled = useMemo(() => isSubmitting || isLoading, [isSubmitting, isLoading]);
  const defaultValues = useMemo<WebsiteConfigFormDataType>(
    () => ({
      phoneNumber: "",
      emailAddress: "",
      address: "",
      bankAccount: "",
      taxNumber: "",
    }),
    [],
  );
  const toast = useToast();

  const {
    control,
    handleSubmit: useFormSubmit,
    reset,
  } = useForm<WebsiteConfigFormDataType>({
    defaultValues,
    resolver: yupResolver(configWebsiteContactFormSchema(t)),
  });

  const handleSubmit = useFormSubmit(async (data) => {
    setIsSubmitting(true);

    try {
      await adminWebsiteConfigService.updateWebsiteContact(data);
      toast.success(t("updateConfigWebsiteSuccess"), t("mayTakeAWhileToEffectConfigWebsite"));
    } catch (error) {
      toast.error(t("updateConfigWebsiteError"));
    } finally {
      setIsSubmitting(false);
    }
  });

  const getContactData = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await adminWebsiteConfigService.getWebsiteContact();
      reset(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(t("fetchConfigWebsiteError"));
    }
  }, [defaultValues, toast, t]);

  useEffect(() => {
    void getContactData();
  }, [getContactData]);

  return (
    <AdminConfigWebsiteContainer title={t("contactInformation")}>
      <form className="grid grid-cols-2 gap-x-5 gap-y-6" onSubmit={handleSubmit}>
        <Input
          className="block"
          control={control}
          disabled={isDisabled}
          label={t("phone")}
          name="phoneNumber"
          placeholder={t("enterPhone")}
        />
        <Input
          className="block"
          control={control}
          disabled={isDisabled}
          label={t("email")}
          name="emailAddress"
          placeholder={t("enterEmail")}
        />
        <div className="col-span-2">
          <Input
            className="block"
            control={control}
            disabled={isDisabled}
            label={t("address")}
            name="address"
            placeholder={t("enterAddress")}
          />
        </div>
        <Input
          className="block"
          control={control}
          disabled={isDisabled}
          label={t("bankAccount")}
          name="bankAccount"
          placeholder={t("enterBankAccount")}
        />
        <Input
          className="block"
          control={control}
          disabled={isDisabled}
          label={t("tax")}
          name="taxNumber"
          placeholder={t("enterTax")}
        />
        <Button
          className="col-span-2 mt-2 w-full"
          disabled={isDisabled}
          isLoading={isSubmitting}
          type="submit"
        >
          {t("update")}
        </Button>
      </form>
    </AdminConfigWebsiteContainer>
  );
};

export default AdminConfigWebsiteDetailContact;
