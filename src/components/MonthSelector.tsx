import { Box, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { addMonths } from "date-fns";
import { ja } from "date-fns/locale";

interface MonthSelectorProps {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const MonthSelector = ({
  currentMonth,
  setCurrentMonth,
}: MonthSelectorProps) => {
  // 先月ボタン
  const handlePreviousMonth = () => {
    const previousMonth = addMonths(currentMonth, -1);
    // console.log(previousMonth);
    setCurrentMonth(previousMonth);
  };
  // 次月ボタン
  const handleNextMonth = () => {
    const nextMonth = addMonths(currentMonth, +1);
    // console.log(nextMonth);
    setCurrentMonth(nextMonth);
  };
  //
  const handleDateChange = (newDate: Date | null) => {
    if (newDate) {
      setCurrentMonth(newDate);
    }
  };
  return (
    /**
     * @link https://mui.com/x/react-date-pickers/adapters-locale/
     * @link https://mui.com/x/react-date-pickers/date-picker/
     */
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button
          onClick={handlePreviousMonth}
          color={"error"}
          variant="contained"
        >
          先月
        </Button>
        <DatePicker
          onChange={handleDateChange}
          value={currentMonth}
          label="年月を選択"
          sx={{ mx: 2, background: "white" }}
          views={["year", "month"]}
          format="yyyy/MM"
        />
        <Button onClick={handleNextMonth} color={"primary"} variant="contained">
          次月
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default MonthSelector;
