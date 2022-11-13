import { EventDTO, exclusive, User } from '../../../utils/types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const DisplayEventDetails = ({
  event,
  closeDialog,
}: {
  event: EventDTO | undefined;
  closeDialog: () => void;
}) => {
  if (!event) return <></>;

  const options =
    event.isExclusiveConfirmed === exclusive.no ? (
      <DialogContentText>
        מצטרפים: {extreacJoinungList(event)}
      </DialogContentText>
    ) : (
      <DialogContentText sx={{ color: 'red' }}>
        זוהי הזמנה סגורה
      </DialogContentText>
    );

  return (
    <Dialog open onClose={closeDialog}>
      <DialogTitle>הזמנה של {event?.owner.name}</DialogTitle>
      <DialogContent>
        <DialogContentText>{`מתאריך: ${exctracDataToString(
          event?.start,
        )}`}</DialogContentText>
        <DialogContentText>{`עד תאריך: ${exctracDataToString(
          event?.end,
        )}`}</DialogContentText>
        {options}
      </DialogContent>
    </Dialog>
  );
};

export default DisplayEventDetails;

function extreacJoinungList(event: EventDTO): string {
  if (!event.joining) return '';

  const joining = event.joining.map((user: User) => user.name);

  return joining.join(', ');
}

function exctracDataToString(date: Date): string {
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}
