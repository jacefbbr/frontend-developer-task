import CurrencyPicker from "./CurrencyPicker";
import CalendarPicker from "./CalendarPicker";
import ExchangePicker from "./ExchangePicker";

function App() {
  

  return (
    <div className="p-5 m-5 flex justify-center items-center">
      <div className="w-[700px] shadow-sm border-2 py-5 rounded-lg">
        <div className="text-2xl text-center">
          Exchange Currency (Frontend Developer Task)
        </div>
        <div className="mt-10 flex flex-col">
          <div className="flex flex-row justify-between w-full px-5">
            <CurrencyPicker />
            <CalendarPicker />
          </div>
          <div className=" mt-4 border-t p-5">
            <ExchangePicker />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
