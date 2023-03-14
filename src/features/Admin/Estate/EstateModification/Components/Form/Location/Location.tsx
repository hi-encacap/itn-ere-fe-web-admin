import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FiMapPin } from 'react-icons/fi';

import { EstateModificationFormDataType } from '@interfaces/Admin/estateTypes';

import { Button, Input } from '@components/Form';

import AdminLocationDistrictSelector from '@admin/Components/AdminLocationDistrictSelector';
import AdminLocationProvinceSelector from '@admin/Components/AdminLocationProvinceSelector';
import AdminLocationWardSelector from '@admin/Components/AdminLocationWardSelector';

import AdminEstateModificationFormTitle from '../Title';

const AdminEstateModificationFormLocation = () => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:page.estate.modification.form.location',
  });

  const { control, watch } = useFormContext<EstateModificationFormDataType>();

  const provinceCode = watch('provinceCode', '');
  const districtCode = watch('districtCode', '');

  return (
    <div className="border-gray-100 pt-6">
      <AdminEstateModificationFormTitle title={t('title')} />
      <div className="mt-5 grid grid-cols-3 gap-6 pt-0.5">
        <AdminLocationProvinceSelector control={control} />
        <AdminLocationDistrictSelector control={control} provinceCode={provinceCode} />
        <AdminLocationWardSelector control={control} districtCode={districtCode} />
        <Input
          className="block"
          control={control}
          isRequired
          label={t('form.address.label')}
          name="address"
          placeholder={t('form.address.placeholder')}
        />
        <Input
          className="block"
          control={control}
          label={t('form.addressNote.label')}
          name="addressNote"
          placeholder={t('form.addressNote.placeholder')}
        />
        <Button className="mx-0.5 mt-[22px] h-[43px]" color="primary-light" disabled>
          <FiMapPin size={20} className="mr-2 flex-shrink-0" />
          <span className="line-clamp-1">{t('form.pickOnMap')}</span>
        </Button>
      </div>
    </div>
  );
};

export default AdminEstateModificationFormLocation;
