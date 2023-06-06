import React, { useState } from 'react';

import {
  ActionHeader,
  Card,
  Button,
  NoContent,
  Error,
  Loader,
  Table,
  CategoryCell,
  Money,
  LocalizedDate,
} from 'ui';
import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LedgerService } from 'api';
import { AppModal } from '../molecules/Modal';
import { AddNewLedgerRecord } from './AddNewLedgerRecord.modal';

export const LedgerWidget = () => {
  const getLedgerData = async () => {
    return await LedgerService.findAll();
  };

  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ['ledgerData'],
    queryFn: () => getLedgerData(),
  });

  const columns = [
    {
      id: 'Name',
      label: 'Nazwa',
      renderCell(row) {
        return row.name;
      },
    },
    {
      id: 'CategoryName',
      label: 'Kategoria',
      renderCell(row) {
        return (
          <CategoryCell name={row.categoryName} color={row.categoryColor} />
        );
      },
    },
    {
      id: 'createdDate',
      label: 'Data',
      renderCell(row) {
        return <LocalizedDate date={row.createdAt} />;
      },
    },
    {
      id: 'amountInCents',
      label: 'Obecna kwota',
      renderCell(row) {
        return row.mode === 'EXPENSE' ? (
          <div style={{ color: 'red' }}>
            -<Money inCents={row.amountInCents} />
          </div>
        ) : row.mode === 'INCOME' ? (
          <div style={{ color: 'green' }}>
            +<Money inCents={row.amountInCents} />
          </div>
        ) : (
          <Money inCents={row.amountInCents} />
        );
      },
    },
  ];
  let rows = [];
  if (isSuccess && data.length > 0) {
    rows = data.map((item) => {
      const properties = {
        id: item.id,
        name: item.title,
        categoryName: item.category.name,
        categoryColor: item.category.color,
        createdAt: item.createdAt,
        mode: item.mode,
        amountInCents: item.amountInCents,
      };
      return properties;
    });
  }

  const getUniqueId = (arr) => arr.id;

  const queryClient = useQueryClient();
  const deleteRecordsMutation = useMutation({
    mutationFn: (ids) => {
      return LedgerService.remove(ids);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ledgerData'] });
    },
  });

  const deleteRecords = (selectedRecords) =>
    deleteRecordsMutation.mutate({ ids: selectedRecords });

  const [showModal, setShowModal] = useState(false);
  const [type, setTypeModal] = useState('');

  return (
    <>
      <Card
        title={
          <ActionHeader
            variant={'h1'}
            title="Portfel"
            renderActions={() => (
              <div>
                <Button
                  variant={'outlined'}
                  color={'primary'}
                  size={'large'}
                  startIcon={<AddIcon />}
                  className="button-iconleft"
                  onClick={() => {
                    setShowModal(true);
                    setTypeModal('INCOME');
                  }}
                >
                  Wpłać
                </Button>
                <Button
                  variant={'outlined'}
                  color={'primary'}
                  size={'large'}
                  startIcon={<RemoveIcon />}
                  className="button-iconleft"
                  onClick={() => {
                    setShowModal(true);
                    setTypeModal('EXPENSE');
                  }}
                >
                  Wypłać
                </Button>

                <AddNewLedgerRecord
                  isOpen={showModal}
                  handleClose={() => setShowModal(false)}
                  type={type}
                  children="dodaj"
                />
              </div>
            )}
          />
        }
      >
        <Grid container>
          <Grid item xs={12} container justifyContent="center">
            {isLoading && <Loader />}
            {isError && <Error />}
            {isSuccess && data.length === 0 && <NoContent />}
            {isSuccess && data.length > 0 && (
              <Table
                rows={rows}
                headCells={columns}
                getUniqueId={getUniqueId}
                deleteRecords={deleteRecords}
              />
            )}
          </Grid>
        </Grid>
      </Card>
    </>
  );
};
