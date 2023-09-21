import React, { useEffect } from 'react';
import { Modal, CategoryCell } from 'ui';
import { CategoryService } from 'api';
import { TextField, MenuItem, Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const defaultValues = {
  amountInCents: '',
  categoryId: '',
};

export const AddNewBudgetRecord = ({
  isOpen,
  handleClose,
  addNewBudgetData,
}) => {
  const validationSchema = yup.object().shape({
    amountInCents: yup
      .number('Kwota musi być numerem')
      .typeError('Kwota nie może być pusta')
      .required('Kwota nie może być pusta')
      .positive('Kwota musi być większa niż 0')
      .max(1000000, 'Kwota nie może być większa niż 1000000'),
    categoryId: yup.string().required('Wybierz kategorię'),
  });
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  const addData = (dataSubmitted) => {
    addNewBudgetData({
      ...dataSubmitted,
      amountInCents: dataSubmitted.amountInCents * 100,
    });
  };

  const getBudgetCategory = async () => {
    return await CategoryService.findAll(true);
  };

  const { data } = useQuery({
    queryKey: ['budgetCategoryQuery'],
    queryFn: () => getBudgetCategory(),
  });

  useEffect(() => {
    if (isOpen || isSubmitSuccessful) {
      reset();
    }
  }, [isOpen, isSubmitSuccessful]);

  const getContent = (data) => (
    <Box component="form" noValidate autoComplete="off">
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
            onChange={({ target: { value } }) => {
              onChange(value);
            }}
            value={value}
            fullWidth
            sx={{ mb: 4 }}
          />
        )}
      />
      <Controller
        name={'categoryId'}
        control={control}
        render={({ field: { onChange, value }, formState }) => (
          <TextField
            select
            variant="outlined"
            label="Kategoria"
            error={!!errors.categoryId}
            helperText={errors.categoryId?.message}
            onChange={({ target: { value } }) => {
              onChange(value);
            }}
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
    </Box>
  );

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      description="Zdefiniuj budżet"
      children={getContent(data || [])}
      onSubmit={handleSubmit(addData)}
      disabled={!isValid}
    />
  );
};
