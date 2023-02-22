import { FormProvider, useForm } from 'react-hook-form';

import AdminEstateModificationFormContact from './Contact/Contact';
import AdminEstateModificationFormDetail from './Detail/Detail';
import AdminEstateModificationFormGeneral from './General/General';
import AdminEstateModificationFormLocation from './Location/Location';

const AdminEstateModificationForm = () => {
  const { control, ...formProperties } = useForm();

  return (
    <div className="col-span-4">
      <FormProvider control={control} {...formProperties}>
        <AdminEstateModificationFormGeneral />
        <AdminEstateModificationFormLocation />
        <AdminEstateModificationFormDetail />
        <AdminEstateModificationFormContact />
      </FormProvider>
    </div>
  );
};

export default AdminEstateModificationForm;
