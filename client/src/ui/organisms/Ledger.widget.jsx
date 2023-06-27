import React, { useState, useEffect } from 'react';

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
  AddNewLedgerRecord,
} from 'ui';
import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LedgerService } from 'api';
import { useSnackbar } from 'notistack';

export const LedgerWidget = () => {
  const notificationMessages = {
    error: 'Wystąpił nieoczekiwany błąd',
    success: {
      deleteRecord: 'Element został usunięty',
      addRecord: {
        income: 'Wpływ został dodany',
        expanse: 'Wydatek został zapisany',
      },
    },
  };

  //pagination controllers
  const [paginationController, setPaginationController] = useState({
    page: 0,
    perPage: 10,
  });
  const [loading, setLoading] = React.useState();
  const [totalRecords, setTotalRecords] = React.useState(0);

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

  const getTotalRecords = async () => {
    let res = await LedgerService.getAll();
    setTotalRecords(res.length);
  };

  const getLedgerData = async ({ page, perPage }) => {
    getTotalRecords();

    return await LedgerService.findAll({
      offset: perPage * page,
      limit: perPage,
    });
  };

  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ['ledgerDataQuery', paginationController],
    queryFn: () => getLedgerData(paginationController),
  });

  const queryClient = useQueryClient();

  //reload table on controllers change
  useEffect(() => {
    setLoading(true);
    queryClient.invalidateQueries({
      queryKey: ['ledgerDataQuery', paginationController],
    });
    setLoading(false);
  }, [paginationController]);

  //move to previous page when deleted all records on last page
  if (
    data != null &&
    isSuccess &&
    data.length === 0 &&
    paginationController.page > 0
  ) {
    setPaginationController((prevState) => ({
      ...prevState,
      page: prevState.page - 1,
    }));
  }

  const { enqueueSnackbar } = useSnackbar();
  const handleShowSnackbar = (text, variant) => {
    enqueueSnackbar(text, { variant });
  };

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
          <div style={{ color: '#FF0000' }}>
            -<Money inCents={row.amountInCents} />
          </div>
        ) : row.mode === 'INCOME' ? (
          <div style={{ color: '#00b300' }}>
            +<Money inCents={row.amountInCents} />
          </div>
        ) : (
          <Money inCents={row.amountInCents} />
        );
      },
    },
  ];
  const rows =
    isSuccess && data.length > 0
      ? data.map((item) => {
          return {
            id: item.id,
            name: item.title,
            categoryName: item.category.name,
            categoryColor: item.category.color,
            createdAt: item.createdAt,
            mode: item.mode,
            amountInCents: item.amountInCents,
          };
        })
      : [];

  const getUniqueId = (arr) => arr.id;

  const deleteRecordsMutation = useMutation({
    mutationFn: (ids) => {
      return LedgerService.remove(ids);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['ledgerDataQuery', paginationController],
      });
      queryClient.invalidateQueries({ queryKey: ['budgetDataQuery'] });
      queryClient.invalidateQueries({ queryKey: ['balanceChartQuery'] });
      queryClient.invalidateQueries({ queryKey: ['budgetChartQuery'] });
      handleShowSnackbar(notificationMessages.success.deleteRecord, 'success');
    },
    onError: () => {
      handleShowSnackbar(notificationMessages.error, 'error');
    },
  });

  const deleteRecords = (selectedRecords) => {
    deleteRecordsMutation.mutate({ ids: selectedRecords });
  };

  const addRecordsMutation = useMutation({
    mutationFn: (requestBody) => {
      return LedgerService.create(requestBody);
    },
    onSuccess: (requestBody) => {
      queryClient.invalidateQueries({
        queryKey: ['ledgerDataQuery', paginationController],
      });
      queryClient.invalidateQueries({ queryKey: ['budgetDataQuery'] });
      queryClient.invalidateQueries({ queryKey: ['balanceChartQuery'] });
      queryClient.invalidateQueries({ queryKey: ['budgetChartQuery'] });
      if (requestBody.mode === 'INCOME') {
        handleShowSnackbar(
          notificationMessages.success.addRecord.income,
          'success',
        );
      } else {
        handleShowSnackbar(
          notificationMessages.success.addRecord.expanse,
          'success',
        );
      }
    },
    onError: () => {
      handleShowSnackbar(notificationMessages.error, 'error');
    },
  });

  const addRecords = (data) => {
    addRecordsMutation.mutate({ requestBody: data });
  };

  const [showModal, setShowModal] = useState(false);
  const [type, setTypeModal] = useState('');

  const handleCloseModal = () => setShowModal(false);

  const setOpenModal = (typeModal) => {
    setShowModal(true);
    setTypeModal(typeModal);
  };

  const addNewLedgerData = (data) => {
    addRecords(data);
    setShowModal(false);
  };

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
                  onClick={() => setOpenModal('INCOME')}
                >
                  Wpłać
                </Button>
                <Button
                  variant={'outlined'}
                  color={'primary'}
                  size={'large'}
                  startIcon={<RemoveIcon />}
                  className="button-iconleft"
                  onClick={() => setOpenModal('EXPENSE')}
                >
                  Wypłać
                </Button>

                <AddNewLedgerRecord
                  isOpen={showModal}
                  handleClose={handleCloseModal}
                  type={type}
                  addNewLedgerData={addNewLedgerData}
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
            {isSuccess && data.length > 0 && !loading && (
              <Table
                rows={rows}
                headCells={columns}
                getUniqueId={getUniqueId}
                deleteRecords={deleteRecords}
                page={paginationController.page}
                perPage={paginationController.perPage}
                onPageChange={handlePageChange}
                onPerPageChange={handlePerPageChange}
                total={totalRecords}
                paginationType="server"
              />
            )}
            {isSuccess && data.length > 0 && loading && <Loader />}
          </Grid>
        </Grid>
      </Card>
    </>
  );
};
