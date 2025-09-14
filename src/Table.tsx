import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store/store";

export function TableExchange() {
  const dispatch = useDispatch<AppDispatch>();
  const defaultExchange = useSelector((state: RootState) => state.defaultExchange);
  const exchangeCurrencies = useSelector((state: RootState) => state.exchange);

  const [exchangeRates, setExchangeRates] = useState<{ code: string; rate: number }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${defaultExchange.date}/v1/currencies/${defaultExchange.currency}.json`
    )
      .then((res) => res.json())
      .then((data) => {
        if (defaultExchange.currency !== undefined) {
          const response = data[defaultExchange.currency] as Record<
            string,
            number
          >;
          const rates = Object.entries(response)
            .map(([code, rate]) => ({ code, rate }))
            .filter((rateObj) => exchangeCurrencies.includes(rateObj.code));
          setExchangeRates(rates);
        } else {
          console.info("Currency is undefined");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.info(err);
        setLoading(false);
      });
  }, [defaultExchange.currency, defaultExchange.date, dispatch, exchangeCurrencies,]);

  return (
    <Table>
      <TableCaption>A list of exchange rates</TableCaption>
      <TableHeader>
        <TableRow className="border-t bg-accent">
          <TableHead className="w-1/2 px-5">Currency</TableHead>
          <TableHead className="w-1/2 px-5">Rates</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {loading ? (
          <TableRow>
            <TableCell colSpan={2} className="px-5 text-center py-4">
              Fetching data.
            </TableCell>
          </TableRow>
        ) : (
          exchangeRates.map(({ code, rate }) => (
            <TableRow key={code} className="border-t h-10">
              <TableCell className="px-5">{code.toUpperCase()}</TableCell>
              <TableCell className="px-5">1 {defaultExchange.currency?.toUpperCase() ?? "N/A"} ={" "}{rate.toFixed(4)} {code.toUpperCase()}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
export default TableExchange;
