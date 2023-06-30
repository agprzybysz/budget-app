import { Test } from '@nestjs/testing';
import { initialLedgers } from 'src/db/Ledger';
import { LedgerService } from './ledger.service';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

describe('LedgerService', () => {
  let service: LedgerService = null;

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleRef = await Test.createTestingModule({
      imports: [InMemoryDBModule.forFeature('ledger')],
      providers: [LedgerService],
    }).compile();

    service = moduleRef.get<LedgerService>(LedgerService);
    service.initialize(initialLedgers);
  });

  describe('findAllWithLimitAndOffset', () => {
    it('should return proper records when limit and offset are within the limit', () => {
      const result = service.findAllWithLimitAndOffset({ limit: 2, offset: 0 });

      expect(result).toEqual([
        {
          createdAt: new Date(2022, 0, 1, 7, 10).valueOf(),
          categoryId: '1',
          id: '1',
          title: 'Wynajem',
          mode: 'EXPENSE',
          amountInCents: 75000,
        },
        {
          id: '2',
          categoryId: '2',
          title: 'Przejazd pociągiem',
          mode: 'EXPENSE',
          amountInCents: 2000,
          createdAt: new Date(2022, 0, 1, 7, 12).valueOf(),
        },
      ]);
    });

    it('should return only part of data when limit is within the limit but offset is not', () => {
      const result = service.findAllWithLimitAndOffset({
        limit: 5,
        offset: 14,
      });

      expect(result).toEqual([
        {
          id: '15',
          categoryId: '8',
          createdAt: new Date(2022, 0, 1, 8, 20).valueOf(),
          title: 'Chemia do kuchni',
          mode: 'EXPENSE',
          amountInCents: 2800,
        },
        {
          id: '16',
          categoryId: '8',
          createdAt: new Date(2022, 0, 1, 8, 25).valueOf(),
          title: 'Waga łazienkowa',
          mode: 'EXPENSE',
          amountInCents: 8999,
        },
        {
          id: '17',
          categoryId: null,
          createdAt: new Date(2022, 0, 1, 8, 30).valueOf(),
          title: 'Wypłata',
          mode: 'INCOME',
          amountInCents: 1200000,
        },
      ]);
    });

    it('should return empty array when offset is greater than the number of records', () => {
      const result = service.findAllWithLimitAndOffset({
        limit: 5,
        offset: 100,
      });

      expect(result).toEqual([]);
    });
  });
});
