import React from 'react';
import { Modal } from 'ui';

export const AddNewLedgerRecord = ({ type, isOpen, handleClose }) => {
  return (
    <>
      {type === 'INCOME' ? (
        <Modal
          isOpen={isOpen}
          handleClose={handleClose}
          description="Dodaj wpływ"
        />
      ) : type === 'EXPENSE' ? (
        <Modal
          isOpen={isOpen}
          handleClose={handleClose}
          description="Dodaj wydatek"
        />
      ) : null}
    </>
  );
};
