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
  const [values, setValues] = useState(defaultValues);

  const handleChange = (value) => {
    setValues(value);
  };

  const validationSchema = yup.object().shape({
    amountInCents: yup
      .number()
      .typeError('Kwota nie może być pusta')
      .required('Kwota nie moze być pusta')
      .min(0, 'Kwota musi być większa niż 0')
      .max(1000000, 'Kwota nie może być większa niż '),
    //categoryId: yup.string().required('Wybierz kategorię'),
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
    <form noValidate autoComplete="off">
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
      </FormControl>
      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel id="category-select-label">Wybierz kategorie</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          variant="outlined"
          name="categoryId"
          {...register('categoryId')}
          //serror={errors.categoryId ? true : false}
          //helperText={errors.categoryId?.message}
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
