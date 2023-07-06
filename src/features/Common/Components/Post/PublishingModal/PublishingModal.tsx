import { ESTATE_STATUS_ENUM } from "@encacap-group/common/dist/re";
import { AxiosError } from "axios";
import { Key, ReactElement, cloneElement, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { Modal } from "@components/Modal";
import { ModalProps } from "@components/Modal/Modal";
import { EstatePublishingStepEnum } from "@constants/enums";
import { EstateFormDataType } from "@interfaces/Admin/estateTypes";
import { PostFormDataType } from "@interfaces/Admin/postTypes";
import { adminEstateService } from "@services/index";

import PostPublishingModalStep from "./Step";

interface PostPublishingModalProps extends Omit<ModalProps, "title"> {
  data: EstateFormDataType | PostFormDataType | null;
  footer: ReactElement;
  onCreate?: (data: unknown) => Promise<Record<"id", number>>;
  onUpdate?: (id: Key, data: unknown) => Promise<void>;
  onPublish?: (id: Key) => Promise<void>;
}

const PostPublishingModal = ({
  data,
  isOpen,
  footer,
  onCreate,
  onUpdate,
  onPublish,
  ...props
}: PostPublishingModalProps) => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.estate.modification.modal.publishing",
  });

  const [step, setStep] = useState<EstatePublishingStepEnum>(EstatePublishingStepEnum.SAVING);
  const [saveStepError, setSaveStepError] = useState<string | null>(null);
  const [publishStepError, setPublishStepError] = useState<string | null>(null);
  const [savedEstateId, setSavedEstateId] = useState<number | null>(null);

  const isAllowCloseModal = useMemo(
    () => step <= EstatePublishingStepEnum.SAVE_ERROR || step !== EstatePublishingStepEnum.SAVING,
    [step],
  );

  const publishEstate = useCallback(
    async (id: number) => {
      setStep(EstatePublishingStepEnum.PUBLISHING);
      setPublishStepError(null);

      try {
        if (onPublish) {
          await onPublish(id);
        } else {
          await adminEstateService.publishEstateById(id);
        }
        setStep(EstatePublishingStepEnum.PUBLISHED);
      } catch (error) {
        setStep(EstatePublishingStepEnum.PUBLISH_ERROR);

        if (error instanceof AxiosError) {
          setPublishStepError(error.response?.data?.error?.message || error.message);
        }
      }
    },
    [onPublish],
  );

  const saveEstate = useCallback(
    async (body: EstateFormDataType | PostFormDataType) => {
      setStep(EstatePublishingStepEnum.SAVING);
      setSaveStepError(null);

      try {
        let estateId = body.id;
        const { status } = body;

        if (!estateId || status === ESTATE_STATUS_ENUM.DRAFT) {
          if (onCreate) {
            const { id: newId } = await onCreate(body);
            estateId = newId;
          } else {
            const { id: newId } = await adminEstateService.createEstate(body as EstateFormDataType);
            estateId = newId;
          }
        } else if (onUpdate) {
          await onUpdate(estateId, body);
        } else {
          await adminEstateService.updateEstateById(estateId, body as EstateFormDataType);
        }

        setSavedEstateId(estateId as number);
        setStep(EstatePublishingStepEnum.PUBLISHING);

        return estateId;
      } catch (error) {
        setStep(EstatePublishingStepEnum.SAVE_ERROR);

        if (error instanceof AxiosError) {
          setSaveStepError(error.response?.data?.error?.message || error.message);
        }

        return null;
      }
    },
    [onCreate, onUpdate],
  );

  const processEstate = useCallback(
    async (body: EstateFormDataType | PostFormDataType) => {
      const estateId = await saveEstate(body);

      if (estateId) {
        await publishEstate(estateId);
      }
    },
    [saveEstate, publishEstate],
  );

  const handleTryAgain = useCallback(async () => {
    if (!data) {
      return;
    }

    if (step === EstatePublishingStepEnum.SAVE_ERROR) {
      await processEstate(data);
    }

    if (step === EstatePublishingStepEnum.PUBLISH_ERROR && savedEstateId) {
      await publishEstate(savedEstateId);
    }
  }, [step, data, savedEstateId, processEstate, publishEstate]);

  useEffect(() => {
    if (!isOpen || !data) {
      return;
    }

    processEstate(data);
  }, [isOpen, data, processEstate]);

  return (
    <Modal
      contentContainerClassName="w-[480px]"
      footer={cloneElement(footer, {
        ...footer.props,
        isAllowCloseModal,
        isDisabled: step < EstatePublishingStepEnum.PUBLISHED,
        onClickClose: props.onClose,
      })}
      isOpen={isOpen}
      title={t("title", { title: data?.title })}
      {...props}
    >
      {step <= EstatePublishingStepEnum.PUBLISHING && <div className="mb-6">{t("message")}</div>}
      <div className="flex flex-col space-y-4">
        <PostPublishingModalStep
          isCompleted={step > EstatePublishingStepEnum.SAVING}
          isPending={step < EstatePublishingStepEnum.SAVING}
          isWorking={step === EstatePublishingStepEnum.SAVING}
          error={saveStepError}
          text={t("save")}
          onTryAgain={handleTryAgain}
        />
        <PostPublishingModalStep
          isCompleted={step > EstatePublishingStepEnum.PUBLISHING}
          isPending={step < EstatePublishingStepEnum.PUBLISHING}
          isWorking={step === EstatePublishingStepEnum.PUBLISHING}
          completedText={t("published")}
          error={publishStepError}
          text={t("publish")}
          onTryAgain={handleTryAgain}
        />
      </div>
    </Modal>
  );
};

export default PostPublishingModal;
