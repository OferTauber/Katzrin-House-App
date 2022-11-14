import { useState } from 'react';
import { dateFnsLocalizer } from 'react-big-calendar';
import { Calendar as ReactCalander } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import DisplayEventDetails from './DisplayEventDetails';
// import ReactDatePicker from 'react-datepicker';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { EventDTO, exclusive, User, LogedUser } from '../../../utils/types';
import { useQuery } from '@tanstack/react-query';
import { colors } from '../../../utils/style';
import { userIsJoining } from '../../../utils/utilFunctions';
import { fetchCalendsrEvents } from '../../../utils/axios';
import Spinner from '../../util_componenets/Spinner';
import Error from '../../util_componenets/Error';

const locales = {
  he: require('date-fns/locale/he'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MyCalendar = () => {
  const { data: logedUser }: { data: User | undefined } = useQuery(['user']);
  const {
    data: events,
    isError,
    isLoading,
  } = useQuery(['events'], () => fetchCalendsrEvents());

  const [eventDetailsToDispay, setEventDetailsToDispay] = useState<
    undefined | EventDTO
  >(undefined);

  if (!logedUser) return <></>;
  if (isError) return <Error />;
  if (isLoading || !events) return <Spinner />;

  const propGetter = (
    event: EventDTO,
    start: Date,
    end: Date,
    isSelected: boolean,
  ): Object => {
    void start;
    void end;
    void isSelected;

    const style: { backgroundColor?: string; color?: string } = {
      backgroundColor: colors.blue,
    };

    //* case: user's event
    if (event.owner.id === logedUser?.id) style.backgroundColor = colors.green;
    //* not user's event
    else {
      switch (event.isExclusiveConfirmed) {
        case exclusive.confirmed:
          style.backgroundColor = colors.red;
          break;
        case exclusive.unConfirmed:
          style.backgroundColor = colors.pink;
          break;
        default:
          if (userIsJoining(event, logedUser)) {
            style.backgroundColor = colors.yellow;
            style.color = 'black';
          }
      }
    }
    return { style };
  };

  const closeDialog = (): void => {
    setEventDetailsToDispay(undefined);
  };

  const handelSelectEvent = (event: EventDTO): void => {
    setEventDetailsToDispay(event);
  };

  return (
    <>
      <div className="calendar-container">
        <ReactCalander
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={propGetter}
          onSelectEvent={handelSelectEvent}
        />
      </div>

      <DisplayEventDetails
        event={eventDetailsToDispay}
        closeDialog={closeDialog}
      />
    </>
  );
};

export default MyCalendar;
