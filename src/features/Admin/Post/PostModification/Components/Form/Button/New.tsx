import { useTranslation } from "react-i18next";

import { Button } from "@components/Form";

interface AdminPostModificationFormButtonNewProps {
  isSubmitting: boolean;
  onSaveDraft: () => Promise<void>;
  onSubmit: () => Promise<void>;
}

const AdminPostModificationFormButtonNew = ({
  isSubmitting,
  onSaveDraft,
  onSubmit,
}: AdminPostModificationFormButtonNewProps) => {
  const { t } = useTranslation();

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
        {t("saveDraft")}
      </Button>
      <Button
        className="block flex-1"
        disabled={isSubmitting}
        isLoading={isSubmitting}
        type="submit"
        onClick={onSubmit}
      >
        {t("saveAndPublish")}
      </Button>
    </>
  );
};

export default AdminPostModificationFormButtonNew;
