import React from 'react';
import { Modal, CategoryCell } from 'ui';
import { CategoryService } from 'api';
import {
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

export const AddNewBudgetRecord = ({ isOpen, handleClose }) => {
  const defaultValues = {
    amount: '',
    selectedCategory: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(defaultValues);

  const addData = (dataSubmitted) => console.log(dataSubmitted);

  //pobieramy kategorie
  const getExpenseCategory = async () => {
    return await CategoryService.findAll(true);
  };

  const { data } = useQuery({
    queryKey: ['expenseCategory'],
    queryFn: () => getExpenseCategory(),
  });

  const getContent = (data) => (
    <form>
      <FormControl fullWidth>
        <TextField
          type="number"
          variant="outlined"
          placeholder="Kwota"
          name="amount"
          {...register('amount', {
            required: true,
            valueAsNumber: true,
            validate: {
              moreThenZero: (x) => parseFloat(x) > 0,
              lessThanMillion: (x) => parseFloat(x) < 1000000,
            },
          })}
          sx={{ mb: 4 }}
        />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="category-select-label">Wybierz kategorie</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          variant="outlined"
          name="selectedCategory"
          {...register('selectedCategory', { required: true })}
          sx={{ mb: 4 }}
        >
          {data.map((option) => (
            <MenuItem key={option.id} value={option.name}>
              <CategoryCell name={option.name} color={option.color} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      description="Zdefiniuj budżet"
      children={getContent(data || [])}
      onSubmit={handleSubmit(addData)}
    />
  );
};
