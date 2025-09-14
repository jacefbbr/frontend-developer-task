import {  useState } from "react";

import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function CalendarPicker() {

  const [open, setOpen] = useState(false);
  const today = new Date();
  const ninetyDaysAgo = new Date();

  ninetyDaysAgo.setDate(today.getDate() - 90);
  
  const [date, setDate] = useState<Date | undefined>(today);
  
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
              onSelect={(d) => {
                setDate(d);
                setOpen(false);
              }}
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