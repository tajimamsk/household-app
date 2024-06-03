import { Balance, CalendarContent, Transaction } from "../types";
import { calculateDailyBalances } from "../utils/financeCalculations";
import { formatCurrency } from "../utils/formatting";
import "../calendar.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import { DatesSetArg, EventContentArg } from "@fullcalendar/core";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";

interface CalendarProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
}

const Calendar = ({
  monthlyTransactions,
  setCurrentMonth,
  setCurrentDay,
}: CalendarProps) => {
  const events = [
    {
      title: "Meeting",
      start: new Date(),
      income: 500,
      expense: 400,
      balance: 100,
    },
  ];

  // 月の取引データ
  const dailyBalances = calculateDailyBalances(monthlyTransactions);
  console.log(dailyBalances);

  // FullcCalendar用のイベントを生成
  const createCalendarEvents = (
    dailyBalances: Record<string, Balance>
  ): CalendarContent[] => {
    return Object.keys(dailyBalances).map((date) => {
      const { income, expense, balance } = dailyBalances[date];
      return {
        start: date,
        income: formatCurrency(income),
        expense: formatCurrency(expense),
        balance: formatCurrency(balance),
      };
    });
  };

  const calendarEvents = createCalendarEvents(dailyBalances);

  const handleDatesSet = (datesSetInfo: DatesSetArg) => {
    console.log(datesSetInfo);
    setCurrentMonth(datesSetInfo.view.currentStart);
  };

  const handleDateClick = (dateInfo: DateClickArg) => {
    // console.log(dateInfo);
    setCurrentDay(dateInfo.dateStr);
  };

  const renderEventContent = (eventInfo: EventContentArg) => {
    // console.log(eventInfo);
    return (
      <div>
        <div className="money" id="event-income">
          {eventInfo.event.extendedProps.income}
        </div>
        <div className="money" id="event-expense">
          {eventInfo.event.extendedProps.expense}
        </div>
        <div className="money" id="event-balance">
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    );
  };

  return (
    <FullCalendar
      locale={jaLocale}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={calendarEvents}
      eventContent={renderEventContent}
      datesSet={handleDatesSet}
      dateClick={handleDateClick}
    />
  );
};

export default Calendar;
