import { useContext, useEffect, useState } from "react";
import { Transaction } from "./types";
import "./App.css";
import Home from "./pages/Home";
import Report from "./pages/Report";
import NoMatch from "./pages/NoMatch";
import AppLayout from "./components/layout/AppLayout";
import { theme } from "./theme/theme";
import { db } from "./firebase";
import { formatMonth } from "./utils/formatting";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Schema } from "./validations/schema";
import { AppContextProvider } from "./context/AppContext";
import { isFireStoreError } from "./utils/errorHandling";

function App() {
  // const [transactions, setTransactions] = useState<Transaction[]>([]);
  // const [currentMonth, setCurrentMonth] = useState(new Date());
  // const [isLoading, setIsLoading] = useState(true);

  // 一月分のデータ取得
  // const monthlyTransactions = transactions.filter((transaction) => {
  //   return transaction.date.startsWith(formatMonth(currentMonth));
  // });

  // 取引を保存する処理
  // const handleSaveTransaction = async (transaction: Schema) => {
  //   console.log(transaction);
  //   try {
  //     // firestoreにデータを保存
  //     const docRef = await addDoc(collection(db, "Transactions"), transaction);
  //     console.log(docRef.id);

  //     // 空文字はバリデーションで弾かれるので型アサーションでok
  //     const newTransaction = {
  //       id: docRef.id,
  //       ...transaction,
  //     } as Transaction;
  //     // console.log(newTransaction);

  //     setTransactions((prevTransactions) => [
  //       ...prevTransactions,
  //       newTransaction,
  //     ]);
  //   } catch (err) {
  //     // error
  //     if (isFireStoreError(err)) {
  //       console.error("firebaseのエラーは:", err);
  //       console.error(err.message);
  //       console.error(err.code);
  //     } else {
  //       console.error("一般的なエラーは：", err);
  //     }
  //   }
  // };

  // 削除処理
  // const handleDeleteTransaction = async (
  //   transactionIds: string | readonly string[]
  // ) => {
  //   try {
  //     const idsToDelete = Array.isArray(transactionIds)
  //       ? transactionIds
  //       : [transactionIds];

  //     for (const id of idsToDelete) {
  //       await deleteDoc(doc(db, "Transactions", id));
  //     }

  //     // fireStoreのデータ削除
  //     const filteredTransactions = transactions.filter(
  //       (transaction) => !idsToDelete.includes(transaction.id)
  //     );
  //     // console.log(filteredTransactions);
  //     setTransactions(filteredTransactions);
  //   } catch (err) {
  //     if (isFireStoreError(err)) {
  //       console.error("firebaseのエラーは:", err);
  //       console.error(err.message);
  //       console.error(err.code);
  //     } else {
  //       console.error("一般的なエラーは：", err);
  //     }
  //   }
  // };

  // 更新処理
  // const handleUpdateTransaction = async (
  //   transaction: Schema,
  //   transactionId: string
  // ) => {
  //   try {
  //     // firedtore更新処理
  //     await updateDoc(doc(db, "Transactions", transactionId), transaction);
  //     // フロント更新
  //     const updatedTransactions = transactions.map((t) =>
  //       t.id === transactionId ? { ...t, ...transaction } : t
  //     ) as Transaction[];
  //     setTransactions(updatedTransactions);
  //   } catch (err) {
  //     if (isFireStoreError(err)) {
  //       console.error("firebaseのエラーは:", err);
  //       console.error(err.message);
  //       console.error(err.code);
  //     } else {
  //       console.error("一般的なエラーは：", err);
  //     }
  //   }
  // };

  return (
    <AppContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route
                index
                element={
                  <Home
                  // monthlyTransactions={monthlyTransactions}
                  // setCurrentMonth={setCurrentMonth}
                  // onSaveTransaction={handleSaveTransaction}
                  // onDeleteTransaction={handleDeleteTransaction}
                  // onUpdateTransaction={handleUpdateTransaction}
                  />
                }
              />
              <Route
                path="/report"
                element={
                  <Report
                  // currentMonth={currentMonth}
                  // setCurrentMonth={setCurrentMonth}
                  // monthlyTransactions={monthlyTransactions}
                  // isLoading={isLoading}
                  // onDeleteTransaction={handleDeleteTransaction}
                  />
                }
              />
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AppContextProvider>
  );
}

export default App;
