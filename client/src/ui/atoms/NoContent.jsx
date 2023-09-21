import { Box, Typography } from '@mui/material';
import NoContentImage from '../../assets/no_content.png';

export const NoContent = () => {
  return (
    <Box
      sx={{
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        height: '251px',
        width: '275px',
      }}
    >
      <Box
        component="img"
        src={NoContentImage}
        alt="No content"
        sx={{
          height: '202px',
          width: '202px',
        }}
      />
      <Typography
        sx={{
          color: 'rgba(51, 51, 51, 0.5)',
          fontSize: '19.2px',
          lineHeigth: '28.8px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: '400',
        }}
      >
        Brak danych do wyświetlenia
      </Typography>
    </Box>
  );
};
