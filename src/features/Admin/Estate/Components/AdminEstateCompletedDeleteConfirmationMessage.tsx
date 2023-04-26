import { Trans, useTranslation } from 'react-i18next';

import { EstateDataType } from '@interfaces/Admin/estateTypes';

import Alert from '@components/Alert/Alert';

interface AdminEstateCompletedDeleteConfirmationMessageProps {
  data: EstateDataType;
}

const AdminEstateCompletedDeleteConfirmationMessage = ({
  data,
}: AdminEstateCompletedDeleteConfirmationMessageProps) => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:page.estate',
  });

  return (
    <div className="pb-1">
      <div className="mb-6">{t('list.deletion.message')}</div>
      <Alert
        // message={t(`list.deletion.warning.message.${data.status}`)}
        message={
          <Trans
            t={t}
            i18nKey={`list.deletion.warning.message.${data.status}`}
            components={{
              strong: <span className="font-semibold" />,
            }}
          />
        }
        title={t('list.deletion.warning.title')}
        type="error"
      />
    </div>
  );
};

export default AdminEstateCompletedDeleteConfirmationMessage;
