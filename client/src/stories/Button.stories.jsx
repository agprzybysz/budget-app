import React from 'react';

import { Button } from '../ui';
import { Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Zadanie 1/Button',
  component: Button,
  description: 'ahaha',
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    variant: {
      control: {
        type: 'radio',
      },
      options: ['contained', 'outlined'],
    },
    size: {
      control: {
        type: 'radio',
      },
      options: ['large', 'medium', 'small'],
    },
    color: {
      control: {
        type: 'radio',
      },
      options: ['primary', 'error', 'success', 'warning'],
    },
    disabled: {
      control: {
        default: false,
        type: 'boolean',
      },
    },
  },
};


// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = ({ label, ...args }) => <Button {...args}>{label}</Button>;
const All = () => (
  <>
    <Grid container>
      <Grid item xs={12} sx={{ mb: 2 }}>
        <Typography variant={'subheading'}>Contained</Typography>
      </Grid>
      <Button variant={'contained'} color={'primary'} sx={{height: '38px'}}>
        Button
      </Button>
      <Button variant={'contained'} color={'error'} startIcon={<AddIcon />} className='button-iconleft' sx={{height: '38px'}}>
        Button
      </Button>
      <Button variant={'contained'} color={'success'} endIcon={<ChevronRightIcon />} className='button-iconright' sx={{height: '38px'}}>
        Button
      </Button>
      <Button variant={'contained'} color={'warning'} startIcon={<AddIcon />} className='button-icononly' sx={{height: '38px'}}>
      </Button>
    </Grid>
    <Grid container sx={{ mt: 5 }}>
      <Grid item xs={12} sx={{ mb: 2 }}>
        <Typography variant={'subheading'}>Outlined</Typography>
      </Grid>
      <Button variant={'outlined'} color={'primary'} sx={{height: '38px'}}>
        Button
      </Button>
      <Button variant={'outlined'} color={'error'} startIcon={<AddIcon />} className='button-iconleft'  sx={{height: '38px'}}>
        Button
      </Button>
      <Button variant={'outlined'} color={'success'} endIcon={<ChevronRightIcon />} className='button-iconright' sx={{height: '38px'}}>
        Button
      </Button>
      <Button variant={'outlined'} color={'warning'} startIcon={<AddIcon />} className='button-icononly' sx={{height: '38px'}}>
      </Button>
    </Grid>
  </>
);

export const Playground = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Playground.args = {
  label: 'Button',
};

export const AllStories = All.bind({});
