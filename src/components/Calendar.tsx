import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import "../calendar.css";
import { EventContentArg } from "@fullcalendar/core";
import { calculateDailyBalances } from "../utils/financeCalculations";
import { Transaction } from "../types";

interface CalendarProps {
  monthlyTransactions: Transaction[];
}

const Calendar = ({ monthlyTransactions }: CalendarProps) => {
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

  const renderEventContent = (eventInfo: EventContentArg) => {
    console.log(eventInfo);
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
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      eventContent={renderEventContent}
    />
  );
};

export default Calendar;
