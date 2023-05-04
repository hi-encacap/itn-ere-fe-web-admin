import { IEstate } from '@encacap-group/types/dist/re';
import { Trans, useTranslation } from 'react-i18next';

import Alert from '@components/Alert/Alert';

interface AdminEstateCompletedDeleteConfirmationMessageProps {
  data: IEstate;
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
            i18nKey={`list.deletion.warning.message.${data.status as string}`}
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
