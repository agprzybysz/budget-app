import React, { useState, useEffect } from 'react';
import { Modal, CategoryCell } from 'ui';
import { CategoryService } from 'api';
import { TextField, MenuItem } from '@mui/material';
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
  const [isDisabled, setDisabled] = useState(true);

  const validationSchema = yup.object().shape({
    amountInCents: yup
      .number('Kwota musi być numerem')
      .typeError('Kwota nie może być pusta')
      .required('Kwota nie moze być pusta')
      .positive('Kwota musi być większa niż 0')
      .lessThan(1000000, 'Kwota nie może być większa niż 1000000'),
    categoryId: yup.string().required('Wybierz kategorię'),
  });
  const {
    handleSubmit,
    control,
    reset,

    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  console.log(isValid);

  console.log(defaultValues);

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
    if (isOpen) reset();
  }, [isOpen]);

  const getContent = (data) => (
    <form noValidate autoComplete="off">
      <Controller
        name={'amountInCents'}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <TextField
            type="number"
            variant="outlined"
            placeholder="Kwota"
            label="Kwota"
            error={errors.amountInCents ? true : false}
            helperText={errors.amountInCents?.message}
            onChange={onChange}
            value={value}
            fullWidth
            sx={{ mb: 4 }}
          />
        )}
      />
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
            error={errors.categoryId ? true : false}
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
    </form>
  );

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      description="Zdefiniuj budżet"
      children={getContent(data || [])}
      onSubmit={handleSubmit(addData)}
      disabled={setDisabled}
    />
  );
};
