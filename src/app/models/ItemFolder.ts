import { ItemFile } from './ItemFile';

export interface ItemFolder {
  id?: string;
  name: string;
  isDeletable: boolean;
  includedFiles: ItemFile[];
  includedFolders: ItemFolder[];
}
