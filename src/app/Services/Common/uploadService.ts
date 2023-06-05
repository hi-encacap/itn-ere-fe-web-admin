import { UPLOAD_API_PATH } from "@constants/apis";
import { FormImageInputDataType } from "@interfaces/Common/elementTypes";
import axiosInstance from "@utils/Http/axiosInstance";

const uploadImage = async (
  file: File,
  id?: FormImageInputDataType["id"],
): Promise<FormImageInputDataType> => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("id", id ?? "");

  const { data } = await axiosInstance.post(UPLOAD_API_PATH.UPLOAD_IMAGE_PATH, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.data;
};

export { uploadImage };
