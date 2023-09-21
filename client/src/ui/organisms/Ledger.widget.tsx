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
import { Grid, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LedgerService } from 'api';
import { useHistory } from 'react-router-dom';
import { useSnackbarHandler } from 'hooks/useSnackbarHandler';
import { NOTIFICATION_MESSAGES } from '../constants';
import { LedgerRequestCreate, Mode } from 'api/services/LedgerService';

type PaginationController = {
  page: number;
  perPage: number;
};

export type Row = {
  id: string;
  name: string;
  categoryName: string;
  categoryColor: string;
  createdAt: number;
  mode: Mode;
  amountInCents: number;
};

export type Column = {
  id: string;
  label: string;
  renderCell: (row: Row) => JSX.Element | string;
};

export const LedgerWidget = () => {
  //pagination controllers
  const [paginationController, setPaginationController] =
    useState<PaginationController>({
      page: 0,
      perPage: 10,
    });
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const { handleShowSnackbar } = useSnackbarHandler();

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ): void => {
    setPaginationController({
      ...paginationController,
      page: newPage,
    });
  };

  const handlePerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setPaginationController({
      ...paginationController,
      page: 0,
      perPage: +event.target.value,
    });
  };

  const getTotalRecords = async () => {
    const res = await LedgerService.findAllRecords();
    setTotalRecords(res.length);
  };

  const getLedgerData = async ({
    page,
    perPage,
  }: {
    page: number;
    perPage: number;
  }) => {
    return await LedgerService.findAll({
      offset: perPage * page,
      limit: perPage,
    });
  };

  let history = useHistory();

  useEffect(() => {
    if (history.location.search) {
      const urlParams = new URLSearchParams(history.location.search);
      setPaginationController({
        ...paginationController,
        page: Number(urlParams.get('page')),
        perPage: Number(urlParams.get('perPage')),
      });
    }
  }, []);

  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ['ledgerDataQuery', paginationController],
    queryFn: () => getLedgerData(paginationController),
    onSuccess() {
      getTotalRecords();
      const queryParams: PaginationController = {
        page: paginationController.page,
        perPage: paginationController.perPage,
      };
      const params = new URLSearchParams({
        perPage: queryParams.perPage.toString(),
        page: queryParams.page.toString(),
      }).toString();
      history.replace({
        pathname: '/ledger',
        search: `?${params}`,
      });
    },
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

  const columns: Column[] = [
    {
      id: 'Name',
      label: 'Nazwa',
      renderCell: (row) => {
        return row.name;
      },
    },
    {
      id: 'CategoryName',
      label: 'Kategoria',
      renderCell: (row) => {
        return (
          <CategoryCell name={row.categoryName} color={row.categoryColor} />
        );
      },
    },
    {
      id: 'createdDate',
      label: 'Data',
      renderCell: (row) => {
        return <LocalizedDate date={row.createdAt} />;
      },
    },
    {
      id: 'amountInCents',
      label: 'Obecna kwota',
      renderCell: (row) => {
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

  const rows: Row[] =
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

  const getUniqueId = (row: Row): string => row.id;

  const deleteRecordsMutation = useMutation({
    mutationFn: (ids: string[]) => {
      return LedgerService.remove({ ids });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['ledgerDataQuery', paginationController],
      });
      queryClient.invalidateQueries({ queryKey: ['budgetDataQuery'] });
      queryClient.invalidateQueries({ queryKey: ['balanceChartQuery'] });
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

  const deleteRecords = (ids: string[]) => {
    deleteRecordsMutation.mutate(ids);
  };

  const addRecordsMutation = useMutation({
    mutationFn: (requestBody: LedgerRequestCreate['requestBody']) => {
      return LedgerService.create({ requestBody });
    },
    onSuccess: (requestBody: LedgerRequestCreate['requestBody']) => {
      queryClient.invalidateQueries({
        queryKey: ['ledgerDataQuery', paginationController],
      });
      queryClient.invalidateQueries({ queryKey: ['budgetDataQuery'] });
      queryClient.invalidateQueries({ queryKey: ['balanceChartQuery'] });
      queryClient.invalidateQueries({ queryKey: ['budgetChartQuery'] });
      if (requestBody.mode === 'INCOME') {
        handleShowSnackbar(
          NOTIFICATION_MESSAGES.SUCCESS.ADDRECORD.INCOME,
          'success',
        );
      } else {
        handleShowSnackbar(
          NOTIFICATION_MESSAGES.SUCCESS.ADDRECORD.EXPENSE,
          'success',
        );
      }
    },
    onError: () => {
      handleShowSnackbar(NOTIFICATION_MESSAGES.ERROR, 'error');
    },
  });

  const [showModal, setShowModal] = useState<boolean>(false);
  const [type, setTypeModal] = useState<string>('');

  const handleCloseModal = () => setShowModal(false);

  const setOpenModal = (typeModal: 'EXPENSE' | 'INCOME') => {
    setShowModal(true);
    setTypeModal(typeModal);
  };

  const addNewLedgerData = (formData: LedgerRequestCreate['requestBody']) => {
    addRecordsMutation.mutate(formData);
    setShowModal(false);
  };

  return (
    <>
      <Card
        subheader=""
        title={
          <ActionHeader
            variant={'h1'}
            title="Portfel"
            renderActions={(): JSX.Element => (
              <Box>
                <Button
                  variant={'outlined'}
                  color={'primary'}
                  size={'large'}
                  startIcon={<AddIcon />}
                  className="button-iconleft"
                  onClick={() => setOpenModal('INCOME')}
                  disabled={false}
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
                  disabled={false}
                >
                  Wypłać
                </Button>

                <AddNewLedgerRecord
                  isOpen={showModal}
                  handleClose={handleCloseModal}
                  type={type}
                  addNewLedgerData={addNewLedgerData}
                />
              </Box>
            )}
          />
        }
      >
        <Grid container>
          <Grid item xs={12} container justifyContent="center">
            {isLoading && <Loader />}
            {isError && <Error error="" />}
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
