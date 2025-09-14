import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";

import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store/store";
import { setDate } from "./store/slice/defaultExchangeSlice";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function CalendarPicker() {
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);
  const today = new Date();
  const ninetyDaysAgo = new Date();

  ninetyDaysAgo.setDate(today.getDate() - 90);

  const [date, setDateState] = useState<Date | undefined>(today);

  function formatDateLocal(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleSelect = (d: Date | undefined) => {
    if (!d) return;

    setDateState(d);
    setOpen(false);

    const formatted = formatDateLocal(d);
    dispatch(setDate(formatted));
  };

  return (
    <div className="flex flex-row gap-3 justify-center items-center">
      <div className="flex flex-row gap-3">
        <Label htmlFor="date" className="px-1">
          Select date
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date"
              className="w-48 justify-between font-normal"
            >
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleSelect}
              captionLayout="dropdown"
              disabled={[{ before: ninetyDaysAgo }, { after: today }]}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default CalendarPicker;
