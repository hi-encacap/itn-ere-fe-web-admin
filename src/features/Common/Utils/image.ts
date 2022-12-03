import { FormImageInputDataType } from '@interfaces/Common/elementTypes';

import { randomStringPrefix } from './helpers';

const convertToImageDataFromFiles = (files: FileList): FormImageInputDataType[] => {
  return Array.from(files).map((file) => ({
    id: randomStringPrefix(),
    file,
    preview: URL.createObjectURL(file),
  }));
};

export { convertToImageDataFromFiles };
