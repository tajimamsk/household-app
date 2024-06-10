import { useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import { formatMonth } from "../utils/formatting";
import { Transaction } from "../types";

const useMonthlyTransactions = (): Transaction[] => {
  const { transactions, currentMonth } = useAppContext();
  // 一月分のデータ取得
  const monthlyTransactions = useMemo(
    () =>
      transactions.filter((transaction) =>
        transaction.date.startsWith(formatMonth(currentMonth))
      ),
    [transactions, currentMonth]
  );
  return monthlyTransactions;
};

export default useMonthlyTransactions;
