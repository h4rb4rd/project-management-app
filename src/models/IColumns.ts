export interface IColumn {
  columnId: string;
  title: string;
  order: number;
  id?: string;
}

export interface IColumns {
  columns: IColumn[];
}
