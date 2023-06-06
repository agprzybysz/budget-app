import * as React from 'react';
//import Box from '@mui/material/Box';
//import Button from '@mui/material/Button';
//import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { Button } from 'ui';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 2px 10px rgba(17, 25, 69, 0.1)',
  //border: '2px solid #000',
  borderRadius: '8px',
  p: 4,
};

export function AppModal({
  description,
  children,
  disabled,
  isOpen,
  handleClose,
}) {
  // onClick={() => console.log('onSubmit')}
  const onClose = handleClose;
  const onSubmit = () => console.log('submit');
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={{ style }}>
          <CardHeader
            id="modal-modal-title"
            title={description}
            component="h4"
          />
          <CardContent id="modal-modal-description">{children}</CardContent>
          <CardActions>
            <Button
              variant={'outlined'}
              color={'primary'}
              size={'large'}
              onClick={onClose}
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
      </Modal>
    </div>
  );
}
