import React from 'react';
import {
  ActionHeader,
  Card,
  Page,
  Button,
  NoContent,
  Loader,
  Error,
  Table,
} from 'ui';
import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BudgetService } from '../api';

export const BudgetPage = () => {
  const getBudgetData = async () => {
    return await BudgetService.findAll();
  };

  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ['budgetData'],
    queryFn: () => getBudgetData(),
  });

  return (
    <Page title="Budżet">
      <Card
        title={
          <ActionHeader
            variant={'h1'}
            title="Budżet"
            renderActions={() => (
              <Button
                variant={'contained'}
                color={'primary'}
                size={'large'}
                startIcon={<AddIcon />}
                className="button-iconleft"
              >
                Zdefiniuj budżet
              </Button>
            )}
          />
        }
      >
        <Grid container>
          <Grid item xs={12} container justifyContent="center">
            {isLoading && <Loader />}
            {isError && <Error />}
            {isSuccess && data.length < 0 && <NoContent />}
            {isSuccess && data.length > 0 && <div>Tabela</div>}
          </Grid>
        </Grid>
      </Card>
    </Page>
  );
};
