import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { BudgetService } from 'api';
import { NoResult } from 'ui';
import { Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export const BudgetChart = () => {
  const getBudgetChartQuery = async () => {
    return await BudgetService.findAll();
  };

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ['budgetChartQuery'],
    queryFn: getBudgetChartQuery,
  });

  const budgetData =
    isSuccess && data !== null
      ? {
          labels: data.map((item) => item.category.name + ' %'),
          datasets: [
            {
              axis: 'y',
              label: 'Budget Dataset',
              data: data.map((item) => item.currentSpendingPercent),
              backgroundColor: data.map((item) => item.category.color),
            },
          ],
        }
      : {};

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: () => null,
          label: (context) => {
            return `${context.parsed.x}%`;
          },
        },
      },
    },
  };

  return (
    <>
      <Typography variant="h4">Budżet</Typography>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Podsumowanie wydatków
      </Typography>
      {isLoading && <NoResult />}
      {isError && <NoResult />}
      {isSuccess && budgetData.labels.length === 0 && <NoResult />}
      {isSuccess &&
        budgetData.datasets[0].data.filter((item) => item !== 0).length ===
          0 && <NoResult />}
      {isSuccess &&
        budgetData.labels.length > 0 &&
        budgetData.datasets[0].data.filter((item) => item !== 0).length > 0 && (
          <Bar options={options} data={budgetData} />
        )}
    </>
  );
};
