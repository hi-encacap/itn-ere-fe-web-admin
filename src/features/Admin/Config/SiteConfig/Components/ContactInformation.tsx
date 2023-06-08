import {
  CONFIG_GROUP_ENUM,
  CONFIG_TYPE_ENUM,
  IConfig,
  SITE_CONFIG_CODE_ENUM,
} from "@encacap-group/common/dist/re";
import { yupResolver } from "@hookform/resolvers/yup";
import { Key, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, Input } from "@components/Form";

import { contactInfoFormSchema } from "../Schemas/contactInfoFormSchema";
import SiteConfigBlockContainer from "./BlockContainer";

interface SiteConfigContactInformationProps {
  data?: IConfig;
  onChange: (code: Key, data: Omit<Partial<IConfig>, "code">) => Promise<void> | undefined;
}

const SiteConfigContactInformation = ({ data, onChange }: SiteConfigContactInformationProps) => {
  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const requiredFields = useMemo(() => ["phone", "email", "address", "bank", "tax"], []);

  const {
    control,
    reset,
    handleSubmit: useFormSubmit,
    formState: { isDirty },
  } = useForm({
    resolver: yupResolver(contactInfoFormSchema(t, requiredFields)),
  });

  const handleSubmit = useFormSubmit(async (data) => {
    setIsSubmitting(true);

    await onChange(SITE_CONFIG_CODE_ENUM.CONTACT_INFORMATION, {
      value: JSON.stringify(data),
      group: CONFIG_GROUP_ENUM.SITE,
      type: CONFIG_TYPE_ENUM.CONTACT,
    });

    setIsSubmitting(false);
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    reset(data.value as unknown as Record<string, string>);
  }, [data]);

  return (
    <SiteConfigBlockContainer title={t("contactInformation")} subtitle={t("contactInformationDescription")}>
      <form onSubmit={handleSubmit} className="grid gap-y-5">
        <div className="grid grid-cols-2 gap-x-6">
          <Input name="phone" isRequired label={t("phone")} className="block" control={control} />
          <Input name="email" isRequired label={t("email")} className="block" control={control} />
        </div>
        <Input name="address" isRequired label={t("address")} className="block" control={control} />
        <Input name="bank" isRequired label={t("bank")} className="block" control={control} />
        <Input name="tax" isRequired label={t("tax")} className="block" control={control} />
        <Button type="submit" className="ring-0" disabled={!isDirty || isSubmitting} isLoading={isSubmitting}>
          {t("update")}
        </Button>
      </form>
    </SiteConfigBlockContainer>
  );
};

export default SiteConfigContactInformation;
