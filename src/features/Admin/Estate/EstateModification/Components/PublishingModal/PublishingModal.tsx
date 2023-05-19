import { ESTATE_STATUS_ENUM } from "@encacap-group/types/dist/re";
import { AxiosError } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { ESTATE_PUBLISHING_STEP_ENUM } from "@constants/enums";
import { EstateFormDataType } from "@interfaces/Admin/estateTypes";
import { adminEstateService } from "@services/index";

import { Modal } from "@components/Modal";
import { ModalProps } from "@components/Modal/Modal";

import AdminEstateModificationPublishingModalFooter from "./Footer";
import AdminEstateModificationPublishingModalStep from "./Step";

interface AdminEstateModificationPublishingModalProps extends Omit<ModalProps, "title"> {
  data: EstateFormDataType | null;
}

const AdminEstateModificationPublishingModal = ({
  data,
  isOpen,
  ...props
}: AdminEstateModificationPublishingModalProps) => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.estate.modification.modal.publishing",
  });

  const [step, setStep] = useState<ESTATE_PUBLISHING_STEP_ENUM>(ESTATE_PUBLISHING_STEP_ENUM.SAVING);
  const [saveStepError, setSaveStepError] = useState<string | null>(null);
  const [publishStepError, setPublishStepError] = useState<string | null>(null);
  const [savedEstateId, setSavedEstateId] = useState<number | null>(null);

  const isAllowCloseModal = useMemo(() => {
    if (step > ESTATE_PUBLISHING_STEP_ENUM.SAVE_ERROR) {
      return false;
    }

    if (step === ESTATE_PUBLISHING_STEP_ENUM.SAVING) {
      return false;
    }

    return true;
  }, [step]);

  const publishEstate = useCallback(async (id: number) => {
    setStep(ESTATE_PUBLISHING_STEP_ENUM.PUBLISHING);
    setPublishStepError(null);

    try {
      await adminEstateService.publishEstateById(id);

      setStep(ESTATE_PUBLISHING_STEP_ENUM.PUBLISHED);
    } catch (error) {
      setStep(ESTATE_PUBLISHING_STEP_ENUM.PUBLISH_ERROR);

      if (error instanceof AxiosError) {
        setPublishStepError(error.response?.data?.error?.message || error.message);
      }
    }
  }, []);

  const saveEstate = useCallback(async (body: EstateFormDataType) => {
    setStep(ESTATE_PUBLISHING_STEP_ENUM.SAVING);
    setSaveStepError(null);

    try {
      let estateId = body.id;
      const { status } = body;

      if (!estateId || status === ESTATE_STATUS_ENUM.DRAFT) {
        const { id: newId } = await adminEstateService.createEstate(body);
        estateId = newId;
      } else {
        await adminEstateService.updateEstateById(estateId, body);
      }

      setSavedEstateId(estateId as number);
      setStep(ESTATE_PUBLISHING_STEP_ENUM.PUBLISHING);

      return estateId;
    } catch (error) {
      setStep(ESTATE_PUBLISHING_STEP_ENUM.SAVE_ERROR);

      if (error instanceof AxiosError) {
        setSaveStepError(error.response?.data?.error?.message || error.message);
      }

      return null;
    }
  }, []);

  const processEstate = useCallback(
    async (body: EstateFormDataType) => {
      const estateId = await saveEstate(body);

      if (estateId) {
        await publishEstate(estateId);
      }
    },
    [saveEstate, publishEstate],
  );

  const handleTryAgain = useCallback(() => {
    if (!data) {
      return;
    }

    if (step === ESTATE_PUBLISHING_STEP_ENUM.SAVE_ERROR) {
      // #skipcq: JS-0098
      void processEstate(data);
    }

    if (step === ESTATE_PUBLISHING_STEP_ENUM.PUBLISH_ERROR && savedEstateId) {
      // #skipcq: JS-0098
      void publishEstate(savedEstateId);
    }
  }, [step, data, savedEstateId, processEstate, publishEstate]);

  useEffect(() => {
    if (!isOpen || !data) {
      return;
    }

    // #skipcq: JS-0098
    void processEstate(data);
  }, [isOpen, data, processEstate]);

  return (
    <Modal
      contentContainerClassName="w-[480px]"
      footer={
        <AdminEstateModificationPublishingModalFooter
          isAllowClose={isAllowCloseModal}
          isDisabled={step < ESTATE_PUBLISHING_STEP_ENUM.PUBLISHED}
          onClickClose={props.onClose}
        />
      }
      isOpen={isOpen}
      title={t("title", { title: data?.title })}
      {...props}
    >
      {step <= ESTATE_PUBLISHING_STEP_ENUM.PUBLISHING && <div className="mb-6">{t("message")}</div>}
      <div className="flex flex-col space-y-4">
        <AdminEstateModificationPublishingModalStep
          isCompleted={step > ESTATE_PUBLISHING_STEP_ENUM.SAVING}
          isPending={step < ESTATE_PUBLISHING_STEP_ENUM.SAVING}
          isWorking={step === ESTATE_PUBLISHING_STEP_ENUM.SAVING}
          error={saveStepError}
          text={t("save")}
          onTryAgain={handleTryAgain}
        />
        <AdminEstateModificationPublishingModalStep
          isCompleted={step > ESTATE_PUBLISHING_STEP_ENUM.PUBLISHING}
          isPending={step < ESTATE_PUBLISHING_STEP_ENUM.PUBLISHING}
          isWorking={step === ESTATE_PUBLISHING_STEP_ENUM.PUBLISHING}
          completedText={t("published")}
          error={publishStepError}
          text={t("publish")}
          onTryAgain={handleTryAgain}
        />
      </div>
    </Modal>
  );
};

export default AdminEstateModificationPublishingModal;
