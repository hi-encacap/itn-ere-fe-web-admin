import { omit } from "lodash";
import { Key } from "react";

import { ADMIN_POST_API_PATH } from "@constants/apis";
import { PostDraftDataType, PostFormDataType } from "@interfaces/Admin/postTypes";

import axiosInstance from "@utils/Http/axiosInstance";

const createPost = async (data: PostFormDataType) => {
  const response = await axiosInstance.post(ADMIN_POST_API_PATH.POSTS_PATH, {
    ...omit(data, "id"),
    avatarId: data.avatar?.id,
  });

  return response.data.data;
};

const updatePostById = async (id: number, data: PostFormDataType) => {
  const response = await axiosInstance.put(ADMIN_POST_API_PATH.POST_PATH(id), {
    ...omit(data, "id"),
    avatarId: data.avatar?.id,
  });

  return response.data.data;
};

const createPostDraft = async (data: PostFormDataType): Promise<PostDraftDataType> => {
  const response = await axiosInstance.post(
    ADMIN_POST_API_PATH.POST_DRAFTS_PATH,
    Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== "" && v !== undefined)),
  );

  return response.data.data;
};

const publishPostById = async (id: Key): Promise<void> => {
  const response = await axiosInstance.post(ADMIN_POST_API_PATH.POST_PUBLISH_PATH(id));

  return response.data.data;
};

export { createPost, createPostDraft, publishPostById, updatePostById };
