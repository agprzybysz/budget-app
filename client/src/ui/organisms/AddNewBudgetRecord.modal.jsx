import React, { useState, useEffect } from 'react';
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

const defaultValues = {
  amount: '',
  selectedCategory: '',
};

export const AddNewBudgetRecord = ({ isOpen, handleClose, addNewBudgetData }) => {
  const [values, setValues] = useState(defaultValues);

  const handleChange = (value) => {
    setValues(value);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addData = (dataSubmitted) => {
    addNewBudgetData(dataSubmitted);
  
  };

  const getBudgetCategory = async () => {
    return await CategoryService.findAll(true);
  };

  const { data } = useQuery({
    queryKey: ['budgetCategory'],
    queryFn: () => getBudgetCategory(),
  });

  useEffect(() => {
    if (isOpen) setValues(defaultValues);
  }, [isOpen]);

  const getContent = (data) => (
    <form>
      <FormControl fullWidth sx={{ mb: 4 }}>
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
          onChange={(event) =>
            handleChange({ ...values, amount: event.target.value })
          }
          value={values.amount}
        />
        {errors?.amount?.type === 'required' && (
          <span>Kwota nie może być pusta</span>
        )}
      </FormControl>
      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel id="category-select-label">Wybierz kategorie</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          variant="outlined"
          name="selectedCategory"
          {...register('selectedCategory', { required: true })}
          onChange={(event) =>
            handleChange({ ...values, selectedCategory: event.target.value })
          }
          value={values.selectedCategory}
        >
          {data.map((option) => (
            <MenuItem key={option.id} value={option.name}>
              <CategoryCell name={option.name} color={option.color} />
            </MenuItem>
          ))}
        </Select>
        {errors?.selectedCategory?.type === 'required' && (
          <span>Wybierz kategorię</span>
        )}
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
