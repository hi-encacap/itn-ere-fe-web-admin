import { useTranslation } from "react-i18next";

import { Button } from "@components/Form";

interface AdminEstateModificationFormButtonNewProps {
  isSubmitting: boolean;
  onSaveDraft: () => Promise<void>;
  onSubmit: () => Promise<void>;
}

const AdminEstateModificationFormButtonNew = ({
  isSubmitting,
  onSaveDraft,
  onSubmit,
}: AdminEstateModificationFormButtonNewProps) => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.estate.modification",
  });

  return (
    <>
      <Button
        className="block"
        color="light"
        disabled={isSubmitting}
        isLoading={isSubmitting}
        type="button"
        onClick={onSaveDraft}
      >
        {t("form.action.saveDraft")}
      </Button>
      <Button
        className="block flex-1"
        disabled={isSubmitting}
        isLoading={isSubmitting}
        type="submit"
        onClick={onSubmit}
      >
        {t("form.action.publish")}
      </Button>
    </>
  );
};

export default AdminEstateModificationFormButtonNew;
