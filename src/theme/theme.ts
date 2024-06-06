import { PaletteColor, PaletteColorOptions, createTheme } from "@mui/material";
import {
  amber,
  blue,
  cyan,
  deepOrange,
  green,
  lightBlue,
  lightGreen,
  pink,
  purple,
  red,
} from "@mui/material/colors";
import { ExpenseCategory, IncomeCategory } from "../types";

// カスタムカラー
declare module "@mui/material/styles" {
  interface Palette {
    incomeColor: PaletteColor;
    expenseColor: PaletteColor;
    balanceColor: PaletteColor;
    incomeCategoryColor: Record<IncomeCategory, string>;
    expenseCategoryColor: Record<ExpenseCategory, string>;
  }

  interface PaletteOptions {
    incomeColor?: PaletteColorOptions;
    expenseColor?: PaletteColorOptions;
    balanceColor?: PaletteColorOptions;
    incomeCategoryColor?: Record<IncomeCategory, string>;
    expenseCategoryColor?: Record<ExpenseCategory, string>;
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: 'Noto Sans JP, Roboto, "Helvetica Neue", Arial, snas-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },

  palette: {
    // 収入用の色
    incomeColor: {
      main: blue[500],
      light: blue[100],
      dark: blue[700],
    },
    // 支出用の色
    expenseColor: {
      main: red[500],
      light: red[100],
      dark: red[700],
    },
    // 残高用の色
    balanceColor: {
      main: green[500],
      light: green[100],
      dark: green[700],
    },

    //
    incomeCategoryColor: {
      給与: lightBlue[600],
      副収入: cyan[200],
      小遣い: lightGreen["A700"],
    },
    expenseCategoryColor: {
      食費: deepOrange[600],
      日用品: lightGreen[200],
      住居費: amber["A700"],
      交際費: pink["A700"],
      娯楽費: cyan["A700"],
      交通費: purple["A700"],
    },
  },
});
