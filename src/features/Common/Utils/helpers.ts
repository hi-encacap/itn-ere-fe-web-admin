import { DEFAULT_CLOUDFLARE_VARIANT_ENUM } from '@encacap-group/types/dist/re';
import dayjs from 'dayjs';
import { first } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { TABLE_FILTER_GLOBAL_FILTER_ID } from '@constants/defaultValues';
import { TableColumnFilterState } from '@interfaces/Common/elementTypes';
import { ImageDataType } from '@interfaces/Common/imageTypes';

const setDocumentTitle = (title: string, scrollToTop = true): void => {
  window.document.title = `${title} - ${process.env.REACT_APP_FRONTEND_WEBSITE_NAME ?? 'Encacap'}`;

  if (scrollToTop) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
};

const slugify = (text: string): string => {
  let result = text.toLowerCase();

  result = result.replace(/(?<id>à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/gu, 'a');
  result = result.replace(/(?<id>è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/gu, 'e');
  result = result.replace(/(?<id>ì|í|ị|ỉ|ĩ)/gu, 'i');
  result = result.replace(/(?<id>ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/gu, 'o');
  result = result.replace(/(?<id>ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/gu, 'u');
  result = result.replace(/(?<id>ỳ|ý|ỵ|ỷ|ỹ)/gu, 'y');
  result = result.replace(/(?<id>đ)/gu, 'd');

  result = result.replace(/(?<id>[^0-9a-z-\s])/g, '');

  result = result.replace(/(?<id>\s+)/g, '-');

  result = result.replace(/^-+/g, '');

  result = result.replace(/-+$/g, '');

  return result;
};

const getImageURL = (image: ImageDataType, variant = DEFAULT_CLOUDFLARE_VARIANT_ENUM.PUBLIC): string => {
  if (!image) {
    return '';
  }

  return image[variant] ?? image[DEFAULT_CLOUDFLARE_VARIANT_ENUM.PUBLIC];
};

const generateColumnFilterObject = (filters: TableColumnFilterState[]) => {
  return filters.reduce<Record<string, string | string[]>>((filterObject, { filterBy, values }) => {
    if (filterBy === TABLE_FILTER_GLOBAL_FILTER_ID) {
      filterObject[filterBy] = first(values) as string;
    } else {
      filterObject[filterBy] = values;
    }

    return filterObject;
  }, {});
};

const randomStringPrefix = (separator?: string) => {
  const dayPrefix: string = dayjs().format('YYYYMMDD');
  const uuidPrefix: string = uuidv4().replace(/-/g, '').toUpperCase();

  return `${dayPrefix}${separator ?? ''}${uuidPrefix}`;
};

export { generateColumnFilterObject, getImageURL, randomStringPrefix, setDocumentTitle, slugify };
