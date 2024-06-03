import React, { useState } from "react";
import { Transaction } from "../types";
import MonthlySummary from "../components/MonthlySummary";
import Calendar from "../components/Calendar";
import TransactionForm from "../components/TransactionForm";
import TransactionMenu from "../components/TransactionMenu";
import { Box } from "@mui/material";
import { format } from "date-fns";

interface HomeProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const Home = ({ monthlyTransactions, setCurrentMonth }: HomeProps) => {
  const today = format(new Date(), "yyyy-MM-dd");
  const [currentDay, setCurrentDay] = useState(today);
  console.log(today);

  const dailyTransactions = monthlyTransactions.filter((transaction) => {
    return transaction.date === currentDay;
  });

  console.log(dailyTransactions);

  return (
    <Box sx={{ display: "flex" }}>
      {/* 左 */}
      <Box sx={{ flexGrow: 1 }}>
        <MonthlySummary monthlyTransactions={monthlyTransactions} />
        <Calendar
          monthlyTransactions={monthlyTransactions}
          setCurrentMonth={setCurrentMonth}
          setCurrentDay={setCurrentDay}
        />
      </Box>

      {/* 右 */}
      <Box>
        <TransactionMenu />
        <TransactionForm />
      </Box>
    </Box>
  );
};

export default Home;
