import React from 'react';
import { Modal } from 'ui';

export const AddNewBudgetRecord = ({ isOpen, handleClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      description="Zdefiniuj budżet"
    />
  );
};
