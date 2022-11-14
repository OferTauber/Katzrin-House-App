import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { useQuery } from '@tanstack/react-query';
import { EventDTO, exclusive, User } from '../../../utils/types';
import Button from '@mui/material/Button';
import {
  extreacJoinungList,
  userIsJoining,
} from '../../../utils/utilFunctions';

const DialogController = ({ event }: { event: EventDTO }) => {
  const { data: logedUser }: { data: User | undefined } = useQuery(['user']);

  if (!event || !logedUser) return <></>;

  return event.owner.email === logedUser.email ? (
    <UesersEvent event={event} />
  ) : (
    <NotUesersEvent event={event} logedUser={logedUser} />
  );
};

export default DialogController;

const UesersEvent = ({ event }: { event: EventDTO }) => {
  let content = <></>;

  switch (event.isExclusiveConfirmed) {
    case exclusive.no:
      content = (
        <DialogContentText>
          מצטרפים: {extreacJoinungList(event)}
        </DialogContentText>
      );
      break;
    default:
      content = (
        <DialogContentText>
          הזמנה סגורה{' '}
          {event.isExclusiveConfirmed === exclusive.unConfirmed &&
            ', ממתינה לאישור'}
        </DialogContentText>
      );
  }

  return (
    <>
      {content}
      <DialogActions>
        <Button>ביטול הזמנה</Button>
      </DialogActions>
    </>
  );
};

const NotUesersEvent = ({
  event,
  logedUser,
}: {
  event: EventDTO;
  logedUser: User;
}) => {
  if (event.isExclusiveConfirmed !== exclusive.no) {
    return (
      <DialogContentText>זוהי הזמנה סגורה, לא ניתן להצטרף</DialogContentText>
    );
  }
  const button = userIsJoining(event, logedUser) ? (
    <DialogActions>
      <Button>יציאה</Button>
    </DialogActions>
  ) : (
    <DialogActions>
      <Button>הצטרפות</Button>
    </DialogActions>
  );

  return (
    <>
      <DialogContentText>
        {'מצטרפים: ' + extreacJoinungList(event, logedUser)}
      </DialogContentText>
      {button}
    </>
  );
};
