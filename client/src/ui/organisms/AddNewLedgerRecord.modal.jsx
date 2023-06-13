import React, { useState, useEffect } from 'react';
import { Modal, CategoryCell } from 'ui';
import { CategoryService } from 'api';
import { FormControl, TextField, MenuItem } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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

  const validationSchema = yup.object().shape({
    amountInCents: yup
      .number('Kwota musi być numerem')
      .typeError('Kwota nie może być pusta')
      .required('Kwota nie moze być pusta')
      .positive('Kwota musi być większa niż 0')
      .lessThan(1000000, 'Kwota nie może być większa niż 1000000'),
    title: yup.string().trim().required('Nazwa nie może być pusta'),
    categoryId: yup.string().required('Wybierz kategorię'),
  });

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
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

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
          {...register('title')}
          onChange={(event) =>
            handleChange({ ...values, title: event.target.value })
          }
          error={errors.title ? true : false}
          helperText={errors.title?.message}
          value={values.title}
        />
      </FormControl>
      <FormControl fullWidth sx={{ mb: 4 }}>
        <TextField
          type="number"
          variant="outlined"
          placeholder="Kwota"
          name="amountInCents"
          {...register('amountInCents')}
          error={errors.amountInCents ? true : false}
          helperText={errors.amountInCents?.message}
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
          <TextField
            select
            variant="outlined"
            name="categoryId"
            {...register('categoryId')}
            error={errors.categoryId ? true : false}
            helperText={errors.categoryId?.message}
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
          </TextField>
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
