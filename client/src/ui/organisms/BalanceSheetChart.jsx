import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { SummaryService } from 'api';
import { Money, NoResult } from 'ui';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  SubTitle,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, SubTitle);

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

  //console.log(data);
  //console.log(balanceData);

  const options = {
    plugins: {
      subtitle: {
        display: true,
        text: 'Pozostała kwota',
        position: 'top',
        align: 'start',
        font: {
          size: 20,
        },
      },
      legend: {
        display: true,
        position: 'bottom',
        align: 'start',
        labels: {
          font: {
            size: 20,
          },
        },
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
      {isLoading && <NoResult />}
      {isError && <NoResult />}
      {isSuccess && data == null && <NoResult />}
      {isSuccess && data !== null && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h4>Saldo</h4>
            <h3>{<Money inCents={data.balance} />}</h3>
          </div>
          <Doughnut data={balanceData} options={options} />
        </div>
      )}
    </>
  );
};
