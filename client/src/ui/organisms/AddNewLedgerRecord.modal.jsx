import React, { useEffect } from 'react';
import { Modal, CategoryCell } from 'ui';
import { CategoryService } from 'api';
import { TextField, MenuItem, Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const AddNewLedgerRecord = ({
  type,
  isOpen,
  handleClose,
  addNewLedgerData,
}) => {
  const defaultValues = {
    amountInCents: '',
    title: '',
    categoryId: '',
  };

  const validationSchema =
    type === 'INCOME'
      ? yup.object().shape({
          amountInCents: yup
            .number('Kwota musi być numerem')
            .typeError('Kwota nie może być pusta')
            .required('Kwota nie może być pusta')
            .positive('Kwota musi być większa niż 0')
            .max(1000000, 'Kwota nie może być większa niż 1000000'),
          title: yup.string().trim().required('Nazwa nie może być pusta'),
        })
      : yup.object().shape({
          amountInCents: yup
            .number('Kwota musi być numerem')
            .typeError('Kwota nie może być pusta')
            .required('Kwota nie może być pusta')
            .positive('Kwota musi być większa niż 0')
            .max(1000000, 'Kwota nie może być większa niż 1000000'),
          title: yup.string().trim().required('Nazwa nie może być pusta'),
          categoryId: yup.string().required('Wybierz kategorię'),
        });

  const getExpenseCategoryQuery = async () => {
    return await CategoryService.findAll();
  };

  const { data } = useQuery({
    queryKey: ['expenseCategoryQuery'],
    queryFn: () => getExpenseCategoryQuery(),
  });

  const {
    handleSubmit,
    control,
    reset,

    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const addData = (dataSubmitted) => {
    addNewLedgerData({
      title: dataSubmitted.title,
      amountInCents: dataSubmitted.amountInCents * 100,
      mode: type,
      categoryId: dataSubmitted.categoryId,
    });
  };

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen]);

  const getContent = (data, type) => (
    <Box component="orm" noValidate autoComplete="off">
      <Controller
        name={'title'}
        control={control}
        render={({ field: { onChange, value }, formState }) => (
          <TextField
            type="text"
            variant="outlined"
            placeholder="Nazwa"
            label="Nazwa"
            error={!!errors.title}
            helperText={errors.title?.message}
            onChange={onChange}
            value={value}
            fullWidth
            sx={{ mb: 4 }}
          />
        )}
      />
      <Controller
        name={'amountInCents'}
        control={control}
        render={({ field: { onChange, value }, formState }) => (
          <TextField
            type="number"
            variant="outlined"
            placeholder="Kwota"
            label="Kwota"
            error={!!errors.amountInCents}
            helperText={errors.amountInCents?.message}
            onChange={onChange}
            value={value}
            fullWidth
            sx={{ mb: 4 }}
          />
        )}
      />
      {type === 'EXPENSE' && (
        <Controller
          name={'categoryId'}
          control={control}
          render={({
            field: { onChange, value },
            fieldState: { error },
            formState,
          }) => (
            <TextField
              select
              variant="outlined"
              label="Kategoria"
              placeholder="Kwota"
              error={!!errors.categoryId}
              helperText={errors.categoryId?.message}
              onChange={onChange}
              value={value}
              fullWidth
              sx={{ mb: 4 }}
            >
              {data.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  <CategoryCell name={option.name} color={option.color} />
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      )}
    </Box>
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
      disabled={!isValid}
    />
  );
};
