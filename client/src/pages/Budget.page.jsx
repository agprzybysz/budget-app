import React, { useState } from 'react';
import {
  ActionHeader,
  Card,
  Page,
  Button,
  NoContent,
  Loader,
  Error,
  Table,
  Money,
  LocalizedDate,
  CategoryCell,
  AddNewBudgetRecord,
} from 'ui';
import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BudgetService } from '../api';

export const BudgetPage = () => {
  const getBudgetData = async () => {
    return await BudgetService.findAll();
  };
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ['budgetData'],
    queryFn: () => getBudgetData(),
  });

  const columns = [
    {
      id: 'categoryName',
      label: 'Nazwa',
      renderCell(row) {
        return row.category;
      },
    },
    {
      id: 'plannedExpenditures',
      label: 'Planowane wydatki',
      renderCell(row) {
        return row.amountInCents;
      },
    },
    {
      id: 'currentSpending',
      label: 'Obecna kwota',
      renderCell(row) {
        return row.currentSpending;
      },
    },
    {
      id: 'budgetStatus',
      label: 'Status',
      renderCell(row) {
        return row.budgetStatus;
      },
    },
    {
      id: 'createdDate',
      label: 'Data utworzenia',
      renderCell(row) {
        return row.createdAt;
      },
    },
  ];
  let rows = [];
  if (isSuccess && data.length > 0) {
    rows = data.map((item) => {
      let properties = {
        id: item.id,
        category: <CategoryCell name={item.category.name} color="#37C4D7" />,
        amountInCents: <Money inCents={item.amountInCents} />,
        currentSpending: <Money inCents={item.currentSpending} />,
        budgetStatus:
          item.currentSpending === item.amountInCents
            ? 'Wykorzystany'
            : item.currentSpending > item.amountInCents
            ? 'Przekroczenie'
            : 'W normie',
        createdAt: <LocalizedDate date={item.createdAt} />,
      };
      return properties;
    });
  }

  const getUniqueId = (arr) => arr.id;

  const queryClient = useQueryClient();
  const deleteRecordsMutation = useMutation({
    mutationFn: (ids) => {
      return BudgetService.remove(ids);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgetData'] });
    },
  });

  const deleteRecords = (selectedRecords) =>
    deleteRecordsMutation.mutate({ ids: selectedRecords });

  useMutation((id) => {
    return BudgetService.remove(id);
  });

  const [showModal, setShowModal] = useState(false);

  return (
    <Page title="Budżet">
      <Card
        title={
          <ActionHeader
            variant={'h1'}
            title="Budżet"
            renderActions={() => (
              <>
                <Button
                  variant={'contained'}
                  color={'primary'}
                  size={'large'}
                  startIcon={<AddIcon />}
                  className="button-iconleft"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  Zdefiniuj budżet
                </Button>
              </>
            )}
          />
        }
      >
        <AddNewBudgetRecord
          isOpen={showModal}
          handleClose={() => setShowModal(false)}
        />
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
    </Page>
  );
};
