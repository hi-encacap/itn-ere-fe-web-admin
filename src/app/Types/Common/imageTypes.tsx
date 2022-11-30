export interface ImageDataType {
  id: string;
  status: string;
  size: number;
  extension: string;
  variants: Record<string, string>;
}
