import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { SummaryService } from 'api';
import { Money, NoResult, CategoryCell } from 'ui';
import { Typography, Box } from '@mui/material';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const BalanceSheetChart = () => {
  const getBalanceChartQuery = async () => {
    return await SummaryService.findAll();
  };

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ['balanceChartQuery'],
    queryFn: getBalanceChartQuery,
  });

  const balanceData =
    isSuccess && data !== null
      ? {
          labels: data.spending.map((item) => item.categoryName),
          datasets: [
            {
              label: 'BalanceSheet Dataset',
              data: data.spending.map((item) => item.amountInCents),
              backgroundColor: data.spending.map((item) => item.categoryColor),
            },
          ],
        }
      : {};

  const options = {
    responsive: true,
    layout: {
      padding: {
        left: 40,
        right: 40,
        top: 0,
        bottom: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.parsed / 100} PLN`;
          },
        },
      },
    },
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">Saldo</Typography>
        <Typography variant="h3">
          {<Money inCents={typeof data !== 'undefined' ? data.balance : 0} />}
        </Typography>
      </Box>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Pozostała kwota
      </Typography>
      {isLoading && <NoResult />}
      {isError && <NoResult />}
      {isSuccess && balanceData.labels.length === 0 && <NoResult />}
      {isSuccess && balanceData.labels.length > 0 && (
        <Box>
          <Doughnut data={balanceData} options={options} />
          <Box>
            {data.spending.map((option) => (
              <CategoryCell
                key={option.categoryId}
                name={option.categoryName}
                color={option.categoryColor}
              />
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};
