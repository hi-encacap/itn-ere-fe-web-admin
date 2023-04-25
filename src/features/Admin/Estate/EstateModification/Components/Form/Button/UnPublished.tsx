import { useTranslation } from 'react-i18next';

import { Button } from '@components/Form';

interface AdminEstateModificationFormButtonUnPublishedProps {
  isSubmitting: boolean;
  onSaveAndPublish: () => Promise<void>;
  onSubmit: () => Promise<void>;
}

const AdminEstateModificationFormButtonUnPublished = ({
  isSubmitting,
  onSaveAndPublish,
  onSubmit,
}: AdminEstateModificationFormButtonUnPublishedProps) => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:page.estate.modification',
  });

  return (
    <>
      <Button
        className="block"
        color="light"
        disabled={isSubmitting}
        isLoading={isSubmitting}
        type="button"
        onClick={onSaveAndPublish}
      >
        {t('form.action.publish')}
      </Button>
      <Button
        className="block flex-1"
        disabled={isSubmitting}
        isLoading={isSubmitting}
        type="submit"
        onClick={onSubmit}
      >
        {t('form.action.save')}
      </Button>
    </>
  );
};

export default AdminEstateModificationFormButtonUnPublished;
