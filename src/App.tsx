import { useEffect, useState } from "react";
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

function App() {
  // 型ガード
  function isFireStoreError(
    err: unknown
  ): err is { code: string; message: string } {
    return typeof err === "object" && err !== null && "code" in err;
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"));
        // console.log(querySnapshot);
        const transactionData = querySnapshot.docs.map((doc) => {
          // console.log(doc.data());
          return {
            ...doc.data(),
            id: doc.id,
          } as Transaction;
        });
        // console.log(transactionData);
        setTransactions(transactionData);
      } catch (err) {
        // error
        if (isFireStoreError(err)) {
          console.error("firebaseのエラーは:", err);
          console.error(err.message);
          console.error(err.code);
        } else {
          console.error("一般的なエラーは：", err);
        }
      }
    };
    fetchTransactions();
  }, []);

  // 一月分のデータ取得
  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth));
  });

  // 取引を保存する処理
  const handleSaveTransaction = async (transaction: Schema) => {
    console.log(transaction);
    try {
      // firestoreにデータを保存
      const docRef = await addDoc(collection(db, "Transactions"), transaction);
      console.log(docRef.id);

      // 空文字はバリデーションで弾かれるので型アサーションでok
      const newTransaction = {
        id: docRef.id,
        ...transaction,
      } as Transaction;
      // console.log(newTransaction);

      setTransactions((prevTransactions) => [
        ...prevTransactions,
        newTransaction,
      ]);
    } catch (err) {
      // error
      if (isFireStoreError(err)) {
        console.error("firebaseのエラーは:", err);
        console.error(err.message);
        console.error(err.code);
      } else {
        console.error("一般的なエラーは：", err);
      }
    }
  };

  // 削除処理
  const handleDeleteTransaction = async (transactionId: string) => {
    try {
      // fireStoreのデータ削除
      await deleteDoc(doc(db, "Transactions", transactionId));
      const filteredTransactions = transactions.filter(
        (transaction) => transaction.id !== transactionId
      );
      // console.log(filteredTransactions);
      setTransactions(filteredTransactions);
    } catch (err) {
      if (isFireStoreError(err)) {
        console.error("firebaseのエラーは:", err);
        console.error(err.message);
        console.error(err.code);
      } else {
        console.error("一般的なエラーは：", err);
      }
    }
  };

  // 更新処理
  const handleUpdateTransaction = async (
    transaction: Schema,
    transactionId: string
  ) => {
    try {
      // firedtore更新処理
      await updateDoc(doc(db, "Transactions", transactionId), transaction);
      // フロント更新
      const updatedTransactions = transactions.map((t) =>
        t.id === transactionId ? { ...t, ...transaction } : t
      ) as Transaction[];
      setTransactions(updatedTransactions);
    } catch (err) {
      if (isFireStoreError(err)) {
        console.error("firebaseのエラーは:", err);
        console.error(err.message);
        console.error(err.code);
      } else {
        console.error("一般的なエラーは：", err);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route
              index
              element={
                <Home
                  monthlyTransactions={monthlyTransactions}
                  setCurrentMonth={setCurrentMonth}
                  onSaveTransaction={handleSaveTransaction}
                  onDeleteTransaction={handleDeleteTransaction}
                  onUpdateTransaction={handleUpdateTransaction}
                />
              }
            />
            <Route path="/report" element={<Report />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
