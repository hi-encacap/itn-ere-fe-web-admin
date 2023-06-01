import { useTranslation } from "react-i18next";

import { Button } from "@components/Form";

interface AdminPostModificationFormButtonPublishedProps {
  isSubmitting: boolean;
  onSubmit: () => Promise<void>;
}

const AdminPostModificationFormButtonPublished = ({
  isSubmitting,
  onSubmit,
}: AdminPostModificationFormButtonPublishedProps) => {
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

export default AdminPostModificationFormButtonPublished;
