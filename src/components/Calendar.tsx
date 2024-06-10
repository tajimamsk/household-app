import { Balance, CalendarContent, Transaction } from "../types";
import { calculateDailyBalances } from "../utils/financeCalculations";
import { formatCurrency } from "../utils/formatting";
import "../calendar.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import { DatesSetArg, EventContentArg } from "@fullcalendar/core";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { Palette } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import { isSameMonth } from "date-fns";
import useMonthlyTransactions from "../hooks/useMonthlyTransactions";
import { useAppContext } from "../context/AppContext";

interface CalendarProps {
  // monthlyTransactions: Transaction[];
  // setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  currentDay: string;
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
  today: string;
  onDateClick: (dateInfo: DateClickArg) => void;
}

const Calendar = ({
  // monthlyTransactions,
  // setCurrentMonth,
  currentDay,
  setCurrentDay,
  today,
  onDateClick,
}: CalendarProps) => {
  const monthlyTransactions = useMonthlyTransactions();
  const { setCurrentMonth } = useAppContext();

  const theme = useTheme();

  // 月の取引データ
  const dailyBalances = calculateDailyBalances(monthlyTransactions);
  // console.log(dailyBalances);

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
    const currentMonth = datesSetInfo.view.currentStart;
    // console.log(datesSetInfo.view.currentStart);
    setCurrentMonth(currentMonth);
    const todayDate = new Date();
    if (isSameMonth(todayDate, currentMonth)) {
      setCurrentDay(today);
    }
  };

  const handleDateClick = (dateInfo: DateClickArg) => {
    // console.log(dateInfo);
    setCurrentDay(dateInfo.dateStr);
  };

  const backGroundEvent = {
    start: currentDay,
    display: "background",
    backGroundColor: theme.palette.incomeColor.light,
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

  console.log([...calendarEvents, backGroundEvent]);

  return (
    <FullCalendar
      locale={jaLocale}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={[...calendarEvents, backGroundEvent]}
      eventContent={renderEventContent}
      datesSet={handleDatesSet}
      dateClick={onDateClick}
    />
  );
};

export default Calendar;
