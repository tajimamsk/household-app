import React, { useMemo, useState } from "react";
import { Transaction } from "../types";
import MonthlySummary from "../components/MonthlySummary";
import Calendar from "../components/Calendar";
import TransactionForm from "../components/TransactionForm";
import TransactionMenu from "../components/TransactionMenu";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { format } from "date-fns";
import { Schema } from "../validations/schema";
import { DateClickArg } from "@fullcalendar/interaction";
import { useAppContext } from "../context/AppContext";
import useMonthlyTransactions from "../hooks/useMonthlyTransactions";

// interface HomeProps {
//   monthlyTransactions: Transaction[];
//   setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
//   onSaveTransaction: (transaction: Schema) => Promise<void>;
//   onDeleteTransaction: (
//     transactionId: string | readonly string[]
//   ) => Promise<void>;
//   onUpdateTransaction: (
//     transaction: Schema,
//     transactionId: string
//   ) => Promise<void>;
// }

const Home = () =>
  //   {
  //   monthlyTransactions,
  //   setCurrentMonth,
  //   onSaveTransaction,
  //   onDeleteTransaction,
  //   onUpdateTransaction,
  // }: HomeProps
  {
    const { isMobile } = useAppContext();
    const monthlyTransactions = useMonthlyTransactions();
    const today = format(new Date(), "yyyy-MM-dd");
    const [currentDay, setCurrentDay] = useState(today);
    // console.log(today);
    const [isEntryDrawerOpen, setIsEntryDrawerOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] =
      useState<Transaction | null>(null);
    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // const theme = useTheme();
    // const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
    // console.log(isMobile);

    // １日分のデータ取得
    const dailyTransactions = useMemo(() => {
      return monthlyTransactions.filter((transaction) => {
        return transaction.date === currentDay;
      });
    }, [monthlyTransactions, currentDay]);

    // console.log(dailyTransactions);

    const closeForm = () => {
      setSelectedTransaction(null);

      // mobile or PC
      if (isMobile) {
        setIsDialogOpen(!isDialogOpen);
      } else {
        setIsEntryDrawerOpen(!isEntryDrawerOpen);
      }
    };

    // フォームの開閉
    const handleAddTransactionForm = () => {
      if (isMobile) {
        setIsDialogOpen(true);
      } else {
        if (selectedTransaction) {
          setSelectedTransaction(null);
        } else {
          setIsEntryDrawerOpen(!isEntryDrawerOpen);
        }
      }
    };

    // 取引が選択された時の処理
    const handleSelectTransaction = (transaction: Transaction) => {
      setSelectedTransaction(transaction);
      if (isMobile) {
        setIsDialogOpen(true);
      } else {
        setIsEntryDrawerOpen(true);
      }
    };

    /** モバイル用Drawerを閉じる処理 */
    const handleCloseMobileDrawer = () => {
      setIsMobileDrawerOpen(false);
    };

    /** 日付を選択した時の処理 */
    const handleDateClick = (dateInfo: DateClickArg) => {
      setCurrentDay(dateInfo.dateStr);
      setIsMobileDrawerOpen(true);
    };

    return (
      <Box sx={{ display: "flex" }}>
        {/* 左 */}
        <Box sx={{ flexGrow: 1 }}>
          <MonthlySummary
          // monthlyTransactions={monthlyTransactions}
          />
          <Calendar
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            today={today}
            onDateClick={handleDateClick}
            // monthlyTransactions={monthlyTransactions}
            // setCurrentMonth={setCurrentMonth}
          />
        </Box>

        {/* 右 */}
        <Box>
          <TransactionMenu
            dailyTransactions={dailyTransactions}
            currentDay={currentDay}
            onAddTransactionForm={handleAddTransactionForm}
            onSelectTransaction={handleSelectTransaction}
            open={isMobileDrawerOpen}
            onClose={handleCloseMobileDrawer}
            // isMobile={isMobile}
          />
          <TransactionForm
            onCloseForm={closeForm}
            isEntryDrawerOpen={isEntryDrawerOpen}
            currentDay={currentDay}
            selectedTransaction={selectedTransaction}
            setSelectedTransaction={setSelectedTransaction}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            // onSaveTransaction={onSaveTransaction}
            // onDeleteTransaction={onDeleteTransaction}
            // onUpdateTransaction={onUpdateTransaction}
            // isMobile={isMobile}
          />
        </Box>
      </Box>
    );
  };

export default Home;
