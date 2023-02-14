import { FormProvider, useForm } from 'react-hook-form';

import AdminEstateModificationFormGeneral from './General/General';

const AdminEstateModificationForm = () => {
  const { control, ...formProperties } = useForm();

  return (
    <div className="col-span-4">
      <FormProvider control={control} {...formProperties}>
        <AdminEstateModificationFormGeneral />
      </FormProvider>
    </div>
  );
};

export default AdminEstateModificationForm;
