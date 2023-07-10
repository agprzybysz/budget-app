import { request } from '../core/request';

export class LedgerService {
  /**
   * @returns any
   * @throws ApiError
   */

  static create({ requestBody }) {
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
  static findAll({ offset, limit }) {
    return request({
      method: 'GET',
      path: `/ledger?limit=${limit}&offset=${offset}`,
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static findOne({ id }) {
    return request({
      method: 'GET',
      path: `/ledger/${id}`,
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  static update({ id, requestBody }) {
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
  static remove({ ids }) {
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
  static findAllRecords() {
    return request({
      method: 'GET',
      path: `/ledger`,
    });
  }
}
