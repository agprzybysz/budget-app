import { request } from '../core/request';
import { LedgerRequestCreate, LedgerRequestUpdate, LedgerResponseGet, LedgerResponseModify, PaginationOptions } from 'types/types';

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
