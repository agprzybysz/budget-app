import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  OnModuleInit,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { CreateLedgerDto } from '../dto/create-ledger.dto';
import { UpdateLedgerDto } from '../dto/update-ledger.dto';
import { RemoveLedgerDto } from '../dto/remove-ledger.dto';

import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  InjectInMemoryDBService,
  InMemoryDBService,
} from '@nestjs-addons/in-memory-db';
import { initialLedgers } from '../db/Ledger';
import { CategoryEntity } from '../db/Category';
import { LedgerService } from '../services/ledger.service';

@ApiTags('Ledger')
@ApiBadRequestResponse()
@Controller('ledger')
export class LedgerController implements OnModuleInit {
  constructor(
    private ledgerService: LedgerService,
    @InjectInMemoryDBService('category')
    private readonly categoryService: InMemoryDBService<CategoryEntity>,
  ) {}

  onModuleInit(): any {
    this.ledgerService.initialize(initialLedgers);
  }

  @ApiOperation({
    summary: 'Dodaj wpis do księgi głównej',
  })
  @ApiCreatedResponse()
  @Post()
  create(@Body() createLedgerDto: CreateLedgerDto) {
    return this.ledgerService.create(createLedgerDto);
  }

  @ApiOperation({
    summary: 'Znajdź wszystkie wpisy do księgi głównej',
  })
  @ApiNoContentResponse()
  @ApiOkResponse()
  @ApiQuery({
    name: 'limit',
    description: 'The maximum number of records to return',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'offset',
    description: 'The offset number of records to skip',
    required: false,
    type: Number,
  })
  @Get()
  findAll(@Query('limit') limit?: number, @Query('offset') offset?: number) {
    if (limit !== undefined && offset === undefined) {
      throw new BadRequestException(
        'Offset is required when limit is provided',
      );
    }

    if (limit === undefined && offset !== undefined) {
      throw new BadRequestException(
        'Limit is required when offset is provided',
      );
    }

    let records = [];

    if (limit !== undefined && offset !== undefined) {
      records = this.ledgerService.findAllWithLimitAndOffset(limit, offset);
    } else {
      records = this.ledgerService.findAll();
    }

    const categories = this.categoryService.getAll();
    return records
      .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
      .map((record) => {
        return {
          ...record,
          category: categories.find((c) => c.id === record.categoryId) || {
            name: 'Nieskategoryzowane',
            id: record.id + 'no-cat',
            color: 'lightgrey',
          },
        };
      });
  }

  @ApiOperation({
    summary: 'Znajdź wpis w księdze głównej',
  })
  @ApiParam({
    name: 'id',
    description: 'Unikalny identyfikator wpisu do księgi głównej',
  })
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @Get(':id')
  findOne(@Param('id') id) {
    return this.ledgerService.findById(id);
  }

  @ApiOperation({
    summary: 'Edytuj wpis w księdze głównej',
  })
  @ApiParam({
    name: 'id',
    description: 'Unikalny identyfikator wpisu do księgi głównej',
  })
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @Patch(':id')
  update(@Param('id') id, @Body() updateLedgerDto: UpdateLedgerDto) {
    return this.ledgerService.update(updateLedgerDto);
  }

  @ApiOperation({
    summary: 'Usuń wpis z księgi głównej',
  })
  @ApiParam({
    name: 'id',
    description: 'Unikalny identyfikator wpisu do księgi głównej',
  })
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @Delete(':id')
  remove(@Param('id') id) {
    return this.ledgerService.deleteById(id);
  }

  @ApiOperation({
    summary: 'Usuń wiele wpisów z księgi głównej',
  })
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @Delete()
  removeMany(@Body() { ids }: RemoveLedgerDto) {
    return this.ledgerService.deleteByIds(ids);
  }
}
