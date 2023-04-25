import { DEFAULT_CLOUDFLARE_VARIANT_ENUM } from '@encacap-group/types/dist/re';

export interface ImageDataType extends Record<DEFAULT_CLOUDFLARE_VARIANT_ENUM, string> {
  id: string;
}
