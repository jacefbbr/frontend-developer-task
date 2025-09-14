import { useState, useMemo } from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { useSelector } from "react-redux";
import type { RootState } from "./store/store";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "./components/ui/label";

const DEFAULTS = ["usd", "eur", "jpy", "chf", "cad", "aud", "zar"];

function ExchangePicker() {
  const currencies = useSelector((state: RootState) => state.currencies);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(DEFAULTS);

  const MIN = 3;
  const MAX = 7;

  const currencyList = useMemo(() => {
    const list = Object.entries(currencies).map(([code, name]) => ({
      value: code.toLowerCase(),
      label: `${code.toUpperCase()} - ${name}`,
    }));

    return list.sort((a, b) => {
      const aSelected = selected.includes(a.value);
      const bSelected = selected.includes(b.value);
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      return a.label.localeCompare(b.label);
    });
  }, [currencies, selected]);

  const toggle = (code: string) => {
    setSelected((prev) => {
      const isSelected = prev.includes(code);

      if (isSelected && prev.length <= MIN) {
        return prev;
      }

      return isSelected
        ? prev.filter((c) => c !== code)
        : prev.length < MAX
        ? [...prev, code]
        : prev;
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="exchanges" className="px-1">
        Select exchange currencies
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[350px] justify-between"
          >
            {selected.length > 0
              ? selected.map((s) => s.toUpperCase()).join(", ")
              : "Select Exchange currencies"}
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[320px] p-0">
          <Command>
            <CommandInput
              className="!border-none focus-visible:border-none"
              placeholder="Search currency"
            />
            <CommandList>
              <CommandEmpty>No currency found.</CommandEmpty>
              <CommandGroup>
                {currencyList.map((currency) => {
                  const isSelected = selected.includes(currency.value);
                  const disableAdd = selected.length >= MAX && !isSelected;
                  const disableRemove = isSelected && selected.length <= MIN;

                  return (
                    <CommandItem
                      key={currency.value}
                      value={currency.value}
                      onSelect={() => !disableRemove && toggle(currency.value)}
                      disabled={disableAdd}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {currency.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="text-sm text-muted-foreground px-2">
        {selected.length == MIN
          ? `You have to select at least ${MIN} currencies`
          : selected.length >= MAX
          ? `Maximum currencies selected`
          : `${selected.length} selected`}
      </div>
    </div>
  );
}

export default ExchangePicker;