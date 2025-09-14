import CurrencyPicker from "./CurrencyPicker";
import CalendarPicker from "./CalendarPicker";

function App() {
  

  return (
    <div className="p-5 m-5 flex justify-center items-center">
      <div className="w-[700px] shadow-sm border-2 p-5 rounded-lg">
        <div className="text-2xl text-center">
          Exchange Currency (Frontend Developer Task)
        </div>
        <div className="mt-10 flex justify-between">
          <div className="flex flex-row justify-between items-center w-full">
            <CurrencyPicker />
            <CalendarPicker />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
