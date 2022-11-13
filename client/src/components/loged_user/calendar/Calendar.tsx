import { useState } from 'react';
import { dateFnsLocalizer } from 'react-big-calendar';
import { Calendar } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import DisplayEventDetails from './DisplayEventDetails';
// import ReactDatePicker from 'react-datepicker';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { EventDTO, exclusive, User } from '../../../utils/types';
import { extractEventHandlers } from '@mui/base';

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

const propGetter = (
  event: EventDTO,
  start: Date,
  end: Date,
  isSelected: boolean,
): Object => {
  void start;
  void end;
  void isSelected;

  const style: { backgroundColor?: string } = {};

  switch (event.isExclusiveConfirmed) {
    case exclusive.confirmed:
      style.backgroundColor = 'red';
      break;
    case exclusive.unConfirmed:
      style.backgroundColor = 'pink';
      break;
  }
  return { style };
};

export function extreacJoinungList(event: EventDTO): string {
  const joining = event.joining.reduce(
    (acc: string, cur: User) => acc + ' ' + cur.name,
    '',
  );

  return joining;
}

const MyCalendar = () => {
  const [eventDetailsToDispay, setEventDetailsToDispay] = useState<
    undefined | EventDTO
  >(undefined);

  const closeDialog = (): void => {
    setEventDetailsToDispay(undefined);
  };

  const handelSelectEvent = (event: EventDTO): void => {
    setEventDetailsToDispay(event);
  };

  return (
    <>
      <div className="calendar-container">
        <Calendar
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

const Ofer: User = { name: 'עופר', email: 'ofertauber@gmail.com' };
const Maya: User = { name: 'מאיה', email: 'maya.yoshke@gmail.com' };
const Shakked: User = { name: 'שקד', email: 'shakked@gmail.com' };

const events: Array<EventDTO> = [
  {
    title: 'הזמנה',
    allDay: true,
    start: new Date(2022, 10, 1),
    end: new Date(2022, 10, 3),
    owner: Ofer,
    isExclusiveConfirmed: exclusive.no,
    joining: [Ofer, Shakked],
  },
  {
    title: 'אירוע',
    start: new Date(2022, 10, 10),
    end: new Date(2022, 10, 11),
    owner: Maya,
    isExclusiveConfirmed: exclusive.unConfirmed,
    joining: [Ofer, Shakked],
  },

  {
    title: 'חגיגה',
    start: new Date(2022, 10, 15),
    end: new Date(2022, 10, 20),
    owner: Shakked,
    isExclusiveConfirmed: exclusive.confirmed,
    joining: [],
  },
];
