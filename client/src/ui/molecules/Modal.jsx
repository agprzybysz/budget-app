import * as React from 'react';
import {
  Modal as MuiModal,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '@mui/material';
import { Button } from 'ui';

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '450px',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 2px 10px rgba(17, 25, 69, 0.1)',
  borderRadius: '18px',
  padding: '40px 32px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

export function Modal({
  description,
  children,
  disabled,
  isOpen,
  handleClose,
  onSubmit,
}) {
  return (
    <div>
      <MuiModal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={styleModal}>
          <CardHeader
            id="modal-modal-title"
            title={description}
            component="h4"
            sx={{ margin: '0 0 45px 0', fontWeight: 'bold' }}
          />
          <CardContent id="modal-modal-description">{children}</CardContent>
          <CardActions sx={{ padding: 0, justifyContent: 'flex-end' }}>
            <Button
              variant={'outlined'}
              color={'primary'}
              size={'large'}
              onClick={handleClose}
            >
              Anuluj
            </Button>
            <Button
              variant={'contained'}
              color={'primary'}
              size={'large'}
              disabled={disabled}
              onClick={onSubmit}
            >
              Zapisz
            </Button>
          </CardActions>
        </Card>
      </MuiModal>
    </div>
  );
}
