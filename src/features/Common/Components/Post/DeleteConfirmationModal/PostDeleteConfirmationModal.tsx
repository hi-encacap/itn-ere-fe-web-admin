import { ESTATE_STATUS_ENUM, IEstate, IPost } from "@encacap-group/common/dist/re";
import { Key } from "react";

import { EstateDraftDataType } from "@interfaces/Admin/estateTypes";
import { PostDraftDataType } from "@interfaces/Admin/postTypes";

import { ModalProps } from "@components/Modal/Modal";

import PostDeleteConfirmationModalCompleted from "./PostDeleteConfirmationModalCompleted";
import PostDeleteConfirmationModalDraft from "./PostDeleteConfirmationModalDraft";

interface PostDeleteConfirmationModalProps extends Omit<ModalProps, "title" | "message" | "onConfirm"> {
  data: IEstate | EstateDraftDataType | IPost | PostDraftDataType | null;
  onDelete: (id: Key) => Promise<void>;
  onDeleteDraft: (id: Key) => Promise<void>;
  onSuccess: () => void;
}

const PostDeleteConfirmationModal = ({
  data,
  onDeleteDraft,
  onDelete,
  ...props
}: PostDeleteConfirmationModalProps) => {
  if (data?.status === ESTATE_STATUS_ENUM.DRAFT) {
    return <PostDeleteConfirmationModalDraft data={data} onConfirm={onDeleteDraft} {...props} />;
  }

  return (
    <PostDeleteConfirmationModalCompleted data={data as IEstate | IPost} onConfirm={onDelete} {...props} />
  );
};

export default PostDeleteConfirmationModal;
