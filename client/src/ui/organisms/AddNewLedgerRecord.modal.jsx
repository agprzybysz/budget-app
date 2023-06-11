import React from 'react';
import { Modal } from 'ui';

export const AddNewLedgerRecord = ({
  type,
  isOpen,
  handleClose,
  handleSubmit,
}) => {
  return (
    <>
      {type === 'INCOME' ? (
        <Modal
          isOpen={isOpen}
          handleClose={handleClose}
          description="Dodaj wpływ"
          handleSubmit={handleSubmit}
        />
      ) : type === 'EXPENSE' ? (
        <Modal
          isOpen={isOpen}
          handleClose={handleClose}
          description="Dodaj wydatek"
          handleSubmit={handleSubmit}
        />
      ) : null}
    </>
  );
};
