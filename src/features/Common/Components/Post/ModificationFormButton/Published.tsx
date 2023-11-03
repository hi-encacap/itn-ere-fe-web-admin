import { memo } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@components/Form";

interface PostModificationFormButtonPublishedProps {
  isSubmitting: boolean;
  onSubmit: () => Promise<void>;
}

const PostModificationFormButtonPublished = ({
  isSubmitting,
  onSubmit,
}: PostModificationFormButtonPublishedProps) => {
  const { t } = useTranslation();

  return (
    <Button
      className="block flex-1"
      disabled={isSubmitting}
      isLoading={isSubmitting}
      type="submit"
      onClick={onSubmit}
    >
      {t("save")}
    </Button>
  );
};

export default memo(PostModificationFormButtonPublished);
