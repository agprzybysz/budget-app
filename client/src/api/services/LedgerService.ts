import { request } from '../core/request';

export type Mode = 'INCOME' | 'EXPENSE';

type PaginationOptions = {
  limit: number, 
  offset: number,
};

type LedgerRequestUpdate= {
  id: number, 
  requestBody: {
    title: string,
    amountInCents: number,
    mode: Mode,
    categoryId: string,
    id: string,
    createdAt: number,
  }  
}

type LedgerResponseGet= {
  mode: Mode,
  title: string,
  amountInCents: number,
  categoryId: string,
  createdAt: number,
  id: string,
  category: {
    name: string,
    id: string,
    color: string
  }
};

type LedgerResponseModify = {
    title: string,
    amountInCents: number,
    mode: Mode,
    categoryId: string | null,
    id: string,
    createdAt: number
};

export type LedgerRequestCreate = {
  requestBody: {
    title: string,
    amountInCents: number,
    mode: Mode,
    categoryId: string | null,
  }
};

export class LedgerService {
  /**
   * @returns any
   * @throws ApiError
   */

  static create({ requestBody }: LedgerRequestCreate): Promise<LedgerResponseModify>  {
    return request({
      method: 'POST',
      path: `/ledger`,
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  

  /**
   * @returns any
   * @throws ApiError
   */
  static findAll({ offset, limit }: PaginationOptions): Promise<LedgerResponseGet[]> {
    return request({
      method: 'GET',
      path: `/ledger?limit=${limit}&offset=${offset}`,
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static findOne({ id }: {id: string}): Promise<LedgerResponseGet> {
    return request({
      method: 'GET',
      path: `/ledger/${id}`,
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static update({ id, requestBody }: LedgerRequestUpdate): Promise<LedgerResponseModify> {
    return request({
      method: 'PATCH',
      path: `/ledger/${id}`,
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static remove({ ids }: {ids: string[]}): Promise<void> {
    return ids.length === 1
      ? request({
          method: 'DELETE',
          path: `/ledger/${ids[0]}`,
        })
      : request({
          method: 'DELETE',
          path: `/ledger`,
          body: { ids },
        });
  }
  /**
   * @returns any
   * @throws ApiError
   */
  static findAllRecords(): Promise<LedgerResponseGet[]>  {
    return request({
      method: 'GET',
      path: `/ledger`,
    });
  }
}
