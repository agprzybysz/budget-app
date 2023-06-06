import React from 'react';
import { AppModal } from '../molecules/Modal';

export const AddNewLedgerRecord = ({ type, isOpen, handleClose }) => {
  return (
    <>
      {type === 'INCOME' ? (
        <AppModal
          isOpen={isOpen}
          handleClose={handleClose}
          description="Dodaj wpływ"
        />
      ) : type === 'EXPENSE' ? (
        <AppModal
          isOpen={isOpen}
          handleClose={handleClose}
          description="Dodaj wydatek"
        />
      ) : null}
    </>
  );
};
