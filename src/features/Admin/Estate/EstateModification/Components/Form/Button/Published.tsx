import { useTranslation } from "react-i18next";

import { Button } from "@components/Form";

interface AdminEstateModificationFormButtonPublishedProps {
  isSubmitting: boolean;
  onSubmit: () => Promise<void>;
}

const AdminEstateModificationFormButtonPublished = ({
  isSubmitting,
  onSubmit,
}: AdminEstateModificationFormButtonPublishedProps) => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.estate.modification",
  });

  return (
    <Button
      className="block flex-1"
      disabled={isSubmitting}
      isLoading={isSubmitting}
      type="submit"
      onClick={onSubmit}
    >
      {t("form.action.save")}
    </Button>
  );
};

export default AdminEstateModificationFormButtonPublished;
