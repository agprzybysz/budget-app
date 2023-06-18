import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { BudgetService } from 'api';
//import { Bar } from 'react-chartjs-2';

export const BudgetChart = () => {
  //const queryClient = useQueryClient();

  const getBudgetChartQuery = async () => {
    return await BudgetService.findAll();
  };

  const { data, isSuccess, isError } = useQuery({
    queryKey: ['budgetChartQuery'],
    queryFn: getBudgetChartQuery,
  });

  console.log('budżet');
  console.log(data);

  return <div>Budżet</div>;
  //<Bar />;
};
