import React from 'react';
import { Typography } from '@mui/material';

export const NoResult = () => {
  return (
    <Typography
      sx={{
        mt: 3,
        fontWeight: '400',
        fontSize: 25,
        color: 'grey',
        textAlign: 'center',
      }}
    >
      Brak wyników
    </Typography>
  );
};
