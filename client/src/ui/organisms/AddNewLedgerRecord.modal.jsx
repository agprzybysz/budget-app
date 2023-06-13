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

export const AddNewLedgerRecord = ({
  type,
  isOpen,
  handleClose,
  addNewLedgerData,
}) => {
  const defaultValues =
    type === 'INCOME'
      ? {
          mode: 'INCOME',
          amountInCents: '',
          title: '',
        }
      : {
          mode: 'EXPENSE',
          amountInCents: '',
          title: '',
          categoryId: '',
        };

  const [values, setValues] = useState(defaultValues);

  //console.log(values);

  const handleChange = (value) => {
    setValues(value);
  };

  const getExpenseCategory = async () => {
    return await CategoryService.findAll();
  };

  const { data } = useQuery({
    queryKey: ['expenseCategory'],
    queryFn: () => getExpenseCategory(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addData = (dataSubmitted) =>
    addNewLedgerData({ ...dataSubmitted, mode: type });

  useEffect(() => {
    if (isOpen) setValues(defaultValues);
  }, [isOpen]);

  const getContent = (data, type) => (
    <form noValidate autoComplete="off">
      <FormControl fullWidth sx={{ mb: 4 }}>
        <TextField
          type="text"
          variant="outlined"
          placeholder="Nazwa"
          name="title"
          {...register('title', { required: true })}
          onChange={(event) =>
            handleChange({ ...values, title: event.target.value })
          }
          value={values.title}
        />
        {errors?.title?.type === 'required' && (
          <span>Nazwa nie może być pusta</span>
        )}
      </FormControl>
      <FormControl fullWidth sx={{ mb: 4 }}>
        <TextField
          type="number"
          variant="outlined"
          placeholder="Kwota"
          name="amountInCents"
          {...register('amountInCents', {
            required: true,
            valueAsNumber: true,
            validate: {
              moreThenZero: (x) => parseFloat(x) > 0,
              lessThanMillion: (x) => parseFloat(x) < 1000000,
            },
          })}
          onChange={(event) =>
            handleChange({ ...values, amountInCents: event.target.value })
          }
          value={values.amountInCents}
        />
        {errors?.amountInCents?.type === 'required' && (
          <span>Kwota nie może być pusta</span>
        )}
      </FormControl>
      {type === 'EXPENSE' && (
        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel id="category-select-label">Wybierz kategorie</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            variant="outlined"
            name="categoryId"
            {...register('categoryId', { required: true })}
            onChange={(event) =>
              handleChange({ ...values, categoryId: event.target.value })
            }
            value={values.categoryId}
          >
            {data.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                <CategoryCell name={option.name} color={option.color} />
              </MenuItem>
            ))}
          </Select>
          {errors?.categoryId?.type === 'required' && (
            <span>Wybierz kategorię</span>
          )}
        </FormControl>
      )}
    </form>
  );
  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      description={
        type === 'INCOME'
          ? 'Dodaj wpływ'
          : type === 'EXPENSE'
          ? 'Dodaj wydatek'
          : null
      }
      children={getContent(data, type)}
      onSubmit={handleSubmit(addData)}
    />
  );
};
