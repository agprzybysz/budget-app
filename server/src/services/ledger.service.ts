import {
  InjectInMemoryDBService,
  InMemoryDBService,
} from '@nestjs-addons/in-memory-db';
import { LedgerEntity } from '../db/Ledger';
import { Injectable } from '@nestjs/common';
import { UpdateLedgerDto } from '../dto/update-ledger.dto';
import { CreateLedgerDto } from '../dto/create-ledger.dto';

@Injectable()
export class LedgerService {
  constructor(
    @InjectInMemoryDBService('ledger')
    private ledgerService: InMemoryDBService<LedgerEntity>,
  ) {}

  initialize(entities: LedgerEntity[]): void {
    this.ledgerService.records = entities;
  }

  create = (payload: CreateLedgerDto): LedgerEntity => {
    return this.ledgerService.create({
      mode: payload.mode,
      title: payload.title,
      amountInCents: payload.amountInCents,
      categoryId: payload.categoryId || null,
      createdAt: Date.now(),
    });
  };

  findAll = () => {
    return this.ledgerService.getAll();
  };

  findAllWithLimitAndOffset = (limit: number, offset: number) => {
    return this.ledgerService.getAll().slice(offset, offset + limit);
  };

  findById = (id: string): LedgerEntity => {
    return this.ledgerService.get(id);
  };

  update = (payload: UpdateLedgerDto): void => {
    this.ledgerService.update(payload);
  };

  deleteById = (id: string): void => {
    this.ledgerService.delete(id);
  };

  deleteByIds = (ids: string[]): void => {
    this.ledgerService.deleteMany(ids);
  };
}
