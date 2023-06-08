import { IBaseListQuery, IResponseWithMeta } from "@encacap-group/common/dist/base";
import { Key, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { LoadingSkeleton } from "@components/Loading";
import { PostDeleteConfirmationModalDraft } from "@components/Post";
import { EstateDraftDataType } from "@interfaces/Admin/estateTypes";
import { PostDraftDataType } from "@interfaces/Admin/postTypes";

import FormGroupTitle from "../../../../../Common/Components/Form/GroupTitle";
import AdminEstateModificationDraftEmpty from "./Empty";
import AdminEstateModificationDraftItem from "./Item";

interface AdminEstateModificationDraftProps {
  onGetMany: (
    queryParam?: IBaseListQuery,
  ) => Promise<IResponseWithMeta<Array<EstateDraftDataType | PostDraftDataType>>>;
  onConfirmDelete: (id: Key) => Promise<void>;
}

const AdminEstateModificationDraft = ({ onGetMany, onConfirmDelete }: AdminEstateModificationDraftProps) => {
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
      const response = await onGetMany();

      setDrafts(response.data);
    } catch (error) {
      setDrafts([]);
    } finally {
      setIsLoading(false);
    }
  }, [onGetMany]);

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
        <FormGroupTitle title={t("modification.title.draft")} />
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
      <PostDeleteConfirmationModalDraft
        isOpen={isShowDeleteModal}
        data={selectedDraft}
        onConfirm={onConfirmDelete}
        onClose={handleCloseModal}
        onSuccess={getData}
      />
    </>
  );
};

export default AdminEstateModificationDraft;
