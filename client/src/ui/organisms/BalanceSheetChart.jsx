import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { SummaryService } from 'api';
//import { Doughnut } from 'react-chartjs-2';

export const BalanceSheetChart = () => {
  const getBalanceChartQuery = async () => {
    return await SummaryService.findAll();
  };

  const { data, isSuccess, isError } = useQuery({
    queryKey: ['balanceChartQuery'],
    queryFn: getBalanceChartQuery,
  });

  console.log('bilans');
  console.log(data);

  return <div>Saldo</div>;
  //<Doughnut />;
};
