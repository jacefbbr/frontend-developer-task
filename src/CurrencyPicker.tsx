import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setCurrency } from "./store/slice/defaultExchangeSlice";
import { setCurrencies } from "@/store/slice/currenciesSlice";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { RootState } from "./store/store";
import type { AppDispatch } from "./store/store";
import type { Tdata } from "./types";

function CurrencyPicker() {
  const dispatch = useDispatch<AppDispatch>();
  const currencies = useSelector((state: RootState) => state.currencies);

  useEffect(() => {
    fetch(
      "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json"
    )
      .then((res) => res.json())
      .then((data) => dispatch(setCurrencies(data)))
      .catch((err) => console.info(err));
  }, [dispatch]);

  return <SelectCurrency currencies={currencies} />;
}

function SelectCurrency({ currencies }: { currencies: Tdata }) {
  const dispatch = useDispatch<AppDispatch>();
  const onSelect = (value: string) => {
    dispatch(setCurrency(value));
  };

  return (
    <div className="flex flex-row gap-3 justify-center items-center">
      <Label htmlFor="date" className="px-1">
        Select currency
      </Label>
      <Select defaultValue="gbp" onValueChange={onSelect}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select default currency" />
        </SelectTrigger>
        <SelectContent className="max-h-60 overflow-y-auto">
          {Object.entries(currencies).map(([code]) => (
            <SelectItem key={code} value={code}>
              {code.toUpperCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default CurrencyPicker;
