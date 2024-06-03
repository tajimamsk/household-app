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
import { collection, getDocs } from "firebase/firestore";
import { CssBaseline, ThemeProvider } from "@mui/material";

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

  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth));
  });
  console.log(transactions);
  console.log(monthlyTransactions);

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
