import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '@components/Form';

import AdminEstateModificationFormContact from './Contact/Contact';
import AdminEstateModificationFormDetail from './Detail/Detail';
import AdminEstateModificationFormGeneral from './General/General';
import AdminEstateModificationFormLocation from './Location/Location';

const AdminEstateModificationForm = () => {
  const { control, handleSubmit: useFormSubmit, ...formProperties } = useForm();

  const handleSubmit = useFormSubmit((data) => {
    console.log(data);
  });

  return (
    <div className="col-span-4">
      <FormProvider control={control} handleSubmit={useFormSubmit} {...formProperties}>
        <AdminEstateModificationFormGeneral />
        <AdminEstateModificationFormLocation />
        <AdminEstateModificationFormDetail />
        <AdminEstateModificationFormContact />
      </FormProvider>
      <Button className="mt-10 block w-full" onClick={handleSubmit}>
        Xác nhận
      </Button>
    </div>
  );
};

export default AdminEstateModificationForm;
