import { useTranslation } from "react-i18next";

import { Button } from "@components/Form";

interface PostModificationFormButtonNewProps {
  isSubmitting: boolean;
  onSaveDraft: () => Promise<void>;
  onSubmit: () => Promise<void>;
}

const PostModificationFormButtonNew = ({
  isSubmitting,
  onSaveDraft,
  onSubmit,
}: PostModificationFormButtonNewProps) => {
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

export default PostModificationFormButtonNew;
