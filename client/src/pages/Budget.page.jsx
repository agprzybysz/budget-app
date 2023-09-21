import React, { useState, useEffect } from 'react';
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
import { useHistory } from 'react-router-dom';
import { useSnackbarHandler } from 'hooks/useSnackbarHandler';
import { NOTIFICATION_MESSAGES } from '../ui/constants';

const calculateBudgetStatus = (budget) => {
  if (budget.currentSpending === budget.amountInCents) {
    return 'Wykorzystany';
  } else if (budget.currentSpending > budget.amountInCents) {
    return 'Przekroczenie';
  } else {
    return 'W normie';
  }
};

export const BudgetPage = () => {
  //pagination
  const [paginationController, setPaginationController] = useState({
    page: 0,
    perPage: 10,
  });

  const { handleShowSnackbar } = useSnackbarHandler();

  const handlePageChange = (event, newPage) => {
    setPaginationController({
      ...paginationController,
      page: newPage,
    });
  };

  const handlePerPageChange = (event) => {
    setPaginationController({
      ...paginationController,
      page: 0,
      perPage: +event.target.value,
    });
  };

  let history = useHistory();

  useEffect(() => {
    if (history.location.search) {
      const urlParams = new URLSearchParams(history.location.search);
      setPaginationController({
        ...paginationController,
        page: +urlParams.get('page'),
        perPage: +urlParams.get('perPage'),
      });
    }
  }, []);

  useEffect(() => {
    const queryParams = {
      perPage: paginationController.perPage,
      page: paginationController.page,
    };
    const params = new URLSearchParams(queryParams).toString();
    history.replace({
      pathname: '/budget',
      search: `?${params}`,
    });
  }, [paginationController]);

  const getBudgetData = async () => {
    return await BudgetService.findAll();
  };
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ['budgetDataQuery'],
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
        category: (
          <CategoryCell name={item.category.name} color={item.category.color} />
        ),
        amountInCents: <Money inCents={item.amountInCents} />,
        currentSpending: <Money inCents={item.currentSpending} />,
        budgetStatus: calculateBudgetStatus(item),
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
      queryClient.invalidateQueries({ queryKey: ['budgetDataQuery'] });
      queryClient.invalidateQueries({ queryKey: ['budgetCategoryQuery'] });
      queryClient.invalidateQueries({ queryKey: ['budgetChartQuery'] });
      handleShowSnackbar(
        NOTIFICATION_MESSAGES.SUCCESS.DELETERECORDS,
        'success',
      );
    },
    onError: () => {
      handleShowSnackbar(NOTIFICATION_MESSAGES.ERROR, 'error');
    },
  });

  const deleteRecords = (selectedRecords) => {
    deleteRecordsMutation.mutate({ ids: selectedRecords });
  };

  const addRecordsMutation = useMutation({
    mutationFn: (requestBody) => {
      return BudgetService.create(requestBody);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgetDataQuery'] });
      queryClient.invalidateQueries({ queryKey: ['budgetCategoryQuery'] });
      queryClient.invalidateQueries({ queryKey: ['budgetChartQuery'] });
      handleShowSnackbar(
        NOTIFICATION_MESSAGES.SUCCESS.ADDRECORD.BUDGET,
        'success',
      );
    },
    onError: () => {
      handleShowSnackbar(NOTIFICATION_MESSAGES.ERROR, 'error');
    },
  });

  const addRecords = (data) => {
    addRecordsMutation.mutate({ requestBody: data });
  };

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);

  const addNewBudgetData = (data) => {
    addRecords(data);
    setShowModal(false);
  };

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
          handleClose={handleCloseModal}
          addNewBudgetData={addNewBudgetData}
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
                page={paginationController.page}
                perPage={paginationController.perPage}
                onPageChange={handlePageChange}
                onPerPageChange={handlePerPageChange}
                total={data.length}
                paginationType="frontend"
              />
            )}
          </Grid>
        </Grid>
      </Card>
    </Page>
  );
};
