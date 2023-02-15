import { FormProvider, useForm } from 'react-hook-form';

import AdminEstateModificationFormGeneral from './General/General';
import AdminEstateModificationFormLocation from './Location/Location';

const AdminEstateModificationForm = () => {
  const { control, ...formProperties } = useForm();

  return (
    <div className="col-span-4">
      <FormProvider control={control} {...formProperties}>
        <AdminEstateModificationFormGeneral />
        <AdminEstateModificationFormLocation />
      </FormProvider>
    </div>
  );
};

export default AdminEstateModificationForm;
