import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { EstateDraftDataType } from '@interfaces/Admin/estateTypes';
import { adminEstateService } from '@services/index';

import { LoadingSkeleton } from '@components/Loading';
import { ConfirmationModal } from '@components/Modal';

import useToast from '@hooks/useToast';

import AdminEstateModificationFormTitle from '../Form/Title';
import AdminEstateModificationDraftEmpty from './Empty';
import AdminEstateModificationDraftItem from './Item';

const AdminEstateModificationDraft = () => {
  const { t } = useTranslation('admin', {
    keyPrefix: 'admin:page.estate',
  });
  const toast = useToast();

  const [drafts, setDrafts] = useState<EstateDraftDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedDraftId, setSelectedDraftId] = useState<number | null>(null);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);

  const selectedDraft = useMemo<EstateDraftDataType | null>(() => {
    if (!selectedDraftId) {
      return null;
    }

    return drafts.find((draft) => draft.id === selectedDraftId) ?? null;
  }, [drafts, selectedDraftId]);

  const getData = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await adminEstateService.getEstateDrafts();

      setDrafts(response.data);
    } catch (error) {
      setDrafts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleClickDelete = useCallback((id: number) => {
    setSelectedDraftId(id);
    setIsShowDeleteModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsShowDeleteModal(false);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!selectedDraftId) {
      return;
    }

    try {
      await adminEstateService.deleteEstateDraftById(selectedDraftId);

      toast.success(t('list.notification.deletedDraft'));

      void getData();
    } catch (error) {
      toast.error(t('list.notification.deleteDraftFailed'));
    } finally {
      handleCloseModal();
    }
  }, [getData, selectedDraftId, toast, t]);

  useEffect(() => {
    void getData();
  }, [getData]);

  return (
    <>
      <div>
        <AdminEstateModificationFormTitle title={t('modification.title.draft')} />
        <div className="mt-5">
          {!isLoading && !drafts.length && <AdminEstateModificationDraftEmpty />}
          {!isLoading && Boolean(drafts.length) && (
            <div className="flex flex-col space-y-5">
              {drafts.map((draft) => (
                <AdminEstateModificationDraftItem
                  key={draft.id}
                  draft={draft}
                  onClickDelete={handleClickDelete}
                />
              ))}
            </div>
          )}
          {isLoading && <LoadingSkeleton className="h-32" />}
        </div>
      </div>
      <ConfirmationModal
        title={t('list.deletion.title', { title: selectedDraft?.title })}
        message={t('list.deletion.message')}
        isOpen={isShowDeleteModal}
        onConfirm={handleConfirmDelete}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default AdminEstateModificationDraft;
