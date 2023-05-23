import { IContact } from "@encacap-group/common/dist/re";
import { useCallback, useEffect, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { EstateFormDataType } from "@interfaces/Admin/estateTypes";
import { adminContactService } from "@services/index";

import FormElementError from "@components/Form/FormElementError";

import FormGroupTitle from "../../../../../../Common/Components/Form/GroupTitle";
import AdminEstateModificationFormContactDetail from "./ContactDetail";
import AdminEstateModificationFormContactEmpty from "./ContactEmpty";
import AdminEstateModificationFormContactPicker from "./ContactPicker";

const AdminEstateModificationFormContact = () => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.estate.modification.form.contact",
  });

  const [isShowContactPickerModal, setIsShowContactPickerModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<IContact | null>(null);

  const {
    control,
    setValue,
    formState: { errors },
    clearErrors,
  } = useFormContext<EstateFormDataType>();

  const {
    field: { value },
  } = useController({
    name: "contactId",
    control,
  });

  const getContactData = useCallback(async () => {
    if (selectedContact ?? !value) {
      return;
    }

    try {
      const data = await adminContactService.getContactById(value);

      setSelectedContact(data);
    } catch (error) {
      setSelectedContact(null);
    }
  }, [value, selectedContact]);

  const handlePickContact = useCallback((contact: IContact) => {
    setSelectedContact(contact);
    setIsShowContactPickerModal(false);
    setValue("contactId", contact.id);
    clearErrors("contactId");
  }, []);

  const handleClosePicker = useCallback(() => {
    setIsShowContactPickerModal(false);
  }, []);

  const handleOpenPicker = useCallback(() => {
    setIsShowContactPickerModal(true);
  }, []);

  useEffect(() => {
    void getContactData();
  }, [getContactData]);

  return (
    <>
      <div className={"border-gray-100 pt-6"}>
        <FormGroupTitle title={t("title")} />
        <div
          className={twMerge(
            "mt-5 flex items-center justify-start space-x-4 rounded-lg border-2 border-gray-100 py-4 pl-4 pr-6 hover:border-gray-200",
            errors.contactId?.message && "border-red-500 hover:border-red-500",
          )}
        >
          {!selectedContact ? (
            <AdminEstateModificationFormContactEmpty onClick={handleOpenPicker} />
          ) : (
            <AdminEstateModificationFormContactDetail
              data={selectedContact}
              onClickChange={handleOpenPicker}
            />
          )}
        </div>
        {errors.contactId?.message && <FormElementError error={errors.contactId?.message} />}
      </div>
      <AdminEstateModificationFormContactPicker
        data={selectedContact}
        isOpen={isShowContactPickerModal}
        onClose={handleClosePicker}
        onPick={handlePickContact}
      />
    </>
  );
};

export default AdminEstateModificationFormContact;
