import { useSnackbar } from 'notistack';

export const useSnackbarHandler = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleShowSnackbar = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };

  return { handleShowSnackbar };
};
