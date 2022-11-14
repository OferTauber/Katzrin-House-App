import { useState } from 'react';
import { dateFnsLocalizer } from 'react-big-calendar';
import { Calendar as ReactCalander } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import DisplayEventDetails from './DisplayEventDetails';
// import ReactDatePicker from 'react-datepicker';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { EventDTO, exclusive, User } from '../../../utils/types';
import { useQuery } from '@tanstack/react-query';
import { colors } from '../../../utils/style';

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

export function extreacJoinungList(event: EventDTO): string {
  const joining = event.joining.reduce(
    (acc: string, cur: User) => acc + ' ' + cur.name,
    '',
  );

  return joining;
}

const MyCalendar = () => {
  const { data: logedUser }: { data: User | undefined } = useQuery(['user']);

  const [eventDetailsToDispay, setEventDetailsToDispay] = useState<
    undefined | EventDTO
  >(undefined);

  const propGetter = (
    event: EventDTO,
    start: Date,
    end: Date,
    isSelected: boolean,
  ): Object => {
    void start;
    void end;
    void isSelected;

    const style: { backgroundColor?: string } = {
      backgroundColor: colors.blue,
    };

    if (event.owner.email === logedUser?.email)
      style.backgroundColor = colors.green;
    else {
      switch (event.isExclusiveConfirmed) {
        case exclusive.confirmed:
          style.backgroundColor = colors.red;
          break;
        case exclusive.unConfirmed:
          style.backgroundColor = colors.pink;
          break;
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

const Ofer: User = {
  name: 'עופר',
  email: 'ofertauber@gmail.com',
  isAdmin: true,
};
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
    joining: [Shakked],
  },
  {
    title: 'מסיבה',
    allDay: true,
    start: new Date(2022, 10, 4),
    end: new Date(2022, 10, 6),
    owner: Maya,
    isExclusiveConfirmed: exclusive.no,
    joining: [Ofer, Shakked],
  },
  {
    title: 'עוד מסיבה',
    allDay: true,
    start: new Date(2022, 10, 7),
    end: new Date(2022, 10, 9),
    owner: Maya,
    isExclusiveConfirmed: exclusive.no,
    joining: [Shakked],
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
    title: 'אירוע פרטי 1',
    start: new Date(2022, 10, 22),
    end: new Date(2022, 10, 24),
    owner: Ofer,
    isExclusiveConfirmed: exclusive.unConfirmed,
    joining: [],
  },
  {
    title: 'אירוע פרטי 2',
    start: new Date(2022, 10, 28),
    end: new Date(2022, 10, 30),
    owner: Ofer,
    isExclusiveConfirmed: exclusive.confirmed,
    joining: [],
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
