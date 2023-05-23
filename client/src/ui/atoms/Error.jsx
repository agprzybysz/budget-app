import { Box, Typography } from '@mui/material';
import ErrorImage from '../../assets/unknown_error.png'

export const Error = ({ error }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',     
      }}
    >
      <Box s
        sx={{
          margin:'0 auto',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Box 
          component="img"
          src={ErrorImage} 
          alt='no_content' 
          sx={{ height: '202px', width: '202px' }}
        />
        <Typography 
          sx={{
            color: 'rgba(51, 51, 51, 0.5)',
            fontSize: '19.2px',
            lineHeigth: '28.8px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '400'
          }}
        >
          Wystąpił nieoczekiwany błąd
        </Typography>
      </Box>
      {
        error?.message?.includes('Network Error') ? (
          <Typography>Uruchom Server!</Typography>
        ) : null //  TODO in TASK 1
      }
    </Box>
  );
};
