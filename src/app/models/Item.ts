export type ItemFile = {
  id?: number;
  name: string;
  description: string;
  imageLink: string;
  isFolder: boolean | number;
  isDeleted: boolean | number;
  parentId: number
};
