import { useTranslation } from 'react-i18next';

interface AdminEstateModificationFormContactEmptyProps {
  onClick: () => void;
}

const AdminEstateModificationFormContactEmpty = ({
  onClick,
}: AdminEstateModificationFormContactEmptyProps) => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:page.estate.modification.form.contact',
  });

  return (
    <div
      className="flex w-full cursor-pointer items-center justify-center py-3 text-[#BDB8C5] hover:text-slate-400"
      onClick={onClick}
    >
      <span>{t('pick')}</span>
    </div>
  );
};

export default AdminEstateModificationFormContactEmpty;
