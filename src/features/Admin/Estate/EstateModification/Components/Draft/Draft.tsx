import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { EstateDraftDataType } from "@interfaces/Admin/estateTypes";
import { adminEstateService } from "@services/index";

import { LoadingSkeleton } from "@components/Loading";

import AdminEstateDraftDeleteConfirmationModal from "@admin/Estate/Components/AdminEstateDraftDeleteConfirmationModal";

import AdminEstateModificationFormTitle from "../Form/Title";
import AdminEstateModificationDraftEmpty from "./Empty";
import AdminEstateModificationDraftItem from "./Item";

const AdminEstateModificationDraft = () => {
  const { t } = useTranslation("admin", {
    keyPrefix: "admin:page.estate",
  });

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

  useEffect(() => {
    void getData();
  }, [getData]);

  return (
    <>
      <div>
        <AdminEstateModificationFormTitle title={t("modification.title.draft")} />
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
      <AdminEstateDraftDeleteConfirmationModal
        isOpen={isShowDeleteModal}
        data={selectedDraft}
        onClose={handleCloseModal}
        onSuccess={getData}
      />
    </>
  );
};

export default AdminEstateModificationDraft;
