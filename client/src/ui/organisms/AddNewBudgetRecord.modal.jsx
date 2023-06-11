import React from 'react';
import { Modal } from 'ui';

export const AddNewBudgetRecord = ({ isOpen, handleClose, handleSubmit }) => {
  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      description="Zdefiniuj budżet"
    />
  );
};
