import React from 'react';
import { AppModal } from '../molecules/Modal';

export const AddNewBudgetRecord = ({ isOpen, handleClose }) => {
  return (
    <AppModal
      isOpen={isOpen}
      handleClose={handleClose}
      description="Zdefiniuj budżet"
    />
  );
};
