import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  validateDatesForReservation,
  formatDate,
} from '../../../utils/utilFunctions';
import { useQuery } from '@tanstack/react-query';
import { EventDTO } from '../../../utils/types';

const NewEventForm = ({
  openBookingForm,
  setOpenBookingForm,
}: {
  openBookingForm: boolean;
  setOpenBookingForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [startDate, setStartDate] = useState(formatDate(new Date()));
  const [endDate, setEndDate] = useState(formatDate(new Date()));
  const [isExclusive, setIsExclusive] = useState(false);
  const [datesAreValid, setDatesAreValid] = useState(true);

  const { data: events }: { data: EventDTO[] | undefined } = useQuery([
    'events',
  ]);

  const handelDateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    stateSetter: typeof setEndDate,
  ): void => {
    const newDate = new Date(e.target.value);
    stateSetter(formatDate(newDate));
  };

  useEffect(() => {
    if (events) {
      setTimeout(() => {
        setDatesAreValid(
          validateDatesForReservation(startDate, endDate, isExclusive, events),
        );
      }, 500);
    }
  }, [startDate, endDate, isExclusive, events]);

  useEffect(() => {
    console.log(`Dates are ${datesAreValid ? 'valid :)' : 'NOT valid'}`);
  }, [datesAreValid]);

  return (
    <Dialog
      open={openBookingForm}
      onClose={() => {
        setOpenBookingForm(false);
      }}
    >
      <Box width={'14rem'} height={'25rem'}>
        <FormGroup>
          <Stack spacing={4} sx={{ padding: '1rem' }}>
            <TextField
              type="date"
              label="תאריך כניסה"
              InputLabelProps={{
                shrink: true,
              }}
              value={startDate}
              onChange={(e) => {
                handelDateChange(e, setStartDate);
              }}
              required
            />
            <TextField
              type="date"
              label="תאריך יציאה"
              InputLabelProps={{
                shrink: true,
              }}
              value={endDate}
              onChange={(e) => {
                handelDateChange(e, setEndDate);
              }}
              required
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isExclusive}
                  onChange={(e) => setIsExclusive(e.target.checked)}
                />
              }
              label="הזמנה סגורה"
            />
          </Stack>
        </FormGroup>
      </Box>
    </Dialog>
  );
};

export default NewEventForm;
