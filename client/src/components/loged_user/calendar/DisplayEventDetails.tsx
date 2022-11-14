import { EventDTO, LogedUser, User } from '../../../utils/types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import { useQuery } from '@tanstack/react-query';
import DialogController from './DialogController';
import { DialogContent } from '@mui/material';
import { exctracDataToString } from '../../../utils/utilFunctions';

const DisplayEventDetails = ({
  event,
  closeDialog,
}: {
  event: EventDTO | undefined;
  closeDialog: () => void;
}) => {
  const { data: logedUser }: { data: LogedUser | undefined } = useQuery([
    'user',
  ]);

  if (!event || !logedUser) return <></>;

  return (
    <Dialog open onClose={closeDialog}>
      <DialogTitle>{extractTitle(logedUser, event.owner)}</DialogTitle>
      <DialogContent>
        <DatesFromTo event={event} />
        <DialogController event={event} />
      </DialogContent>
    </Dialog>
  );
};

function DatesFromTo({ event }: { event: EventDTO }) {
  return (
    <>
      <DialogContentText>{`מתאריך: ${exctracDataToString(
        event?.start,
      )}`}</DialogContentText>
      <DialogContentText>{`עד תאריך: ${exctracDataToString(
        event?.end,
      )}`}</DialogContentText>
    </>
  );
}

export default DisplayEventDetails;

function extractTitle(logedUser: LogedUser, owner: User): String {
  if (logedUser.id === owner.id) return 'הזמנה שלך';
  return 'הזמנה של ' + owner.name;
}
