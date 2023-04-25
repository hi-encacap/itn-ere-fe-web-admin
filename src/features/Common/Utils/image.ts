import { DEFAULT_CLOUDFLARE_VARIANT_ENUM } from '@encacap-group/types/dist/re';
import { nanoid } from '@reduxjs/toolkit';

import { FormImageInputDataType } from '@interfaces/Common/elementTypes';
import { ImageDataType } from '@interfaces/Common/imageTypes';

import { getImageURL, randomStringPrefix } from './helpers';

const convertToImageDataFromFiles = (files: FileList): FormImageInputDataType[] => {
  return Array.from(files).map((file) => ({
    id: randomStringPrefix(),
    file,
    preview: URL.createObjectURL(file),
  }));
};

const generateImageFormData = (
  data: ImageDataType,
  variant = DEFAULT_CLOUDFLARE_VARIANT_ENUM.PUBLIC,
): FormImageInputDataType => {
  return {
    id: data.id ?? nanoid(),
    preview: getImageURL(data, variant),
    file: null,
  };
};

const generateImagesFormData = (
  data: ImageDataType[],
  variant = DEFAULT_CLOUDFLARE_VARIANT_ENUM.PUBLIC,
): FormImageInputDataType[] => {
  return data.map((image) => generateImageFormData(image, variant));
};

const mapImageDataToResponseData = <T>(data: T, key: string): T => {
  if (typeof data !== 'object' || data === null) {
    return data;
  }

  if (key in data) {
    const image = data[key as keyof T] as ImageDataType | ImageDataType[];

    if (Array.isArray(image)) {
      return {
        ...data,
        [key]: image.map((item) => generateImageFormData(item)),
      };
    }

    return {
      ...data,
      [key]: generateImageFormData(image),
    };
  }

  return data;
};

export {
  convertToImageDataFromFiles,
  generateImageFormData,
  generateImagesFormData,
  mapImageDataToResponseData,
};
