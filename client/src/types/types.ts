export type PaginationOptions = {
  limit: number;
  offset: number;
};

export type PaginationController = {
  page: number;
  perPage: number;
};

export type Mode = 'INCOME' | 'EXPENSE';

export type LedgerRequestUpdate = {
  id: number;
  requestBody: {
    title: string;
    amountInCents: number;
    mode: Mode;
    categoryId: string;
    id: string;
    createdAt: number;
  };
};

export type LedgerResponseGet = {
  mode: Mode;
  title: string;
  amountInCents: number;
  categoryId: string;
  createdAt: number;
  id: string;
  category: {
    name: string;
    id: string;
    color: string;
  };
};

export type LedgerResponseModify = {
  title: string;
  amountInCents: number;
  mode: Mode;
  categoryId: string | null;
  id: string;
  createdAt: number;
};

export type LedgerRequestCreate = {
  requestBody: {
    title: string;
    amountInCents: number;
    mode: Mode;
    categoryId: string | null;
  };
};

export type Row = {
  id: string;
  name: string;
  categoryName: string;
  categoryColor: string;
  createdAt: number;
  mode: Mode;
  amountInCents: number;
};

export type Column = {
  id: string;
  label: string;
  renderCell: (row: Row) => JSX.Element | string;
};
