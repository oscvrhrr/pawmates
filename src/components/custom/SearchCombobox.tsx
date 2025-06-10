import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
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
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import { DogSearchContext } from "../context/DogSearchContext";


interface SearchComboboxProps {
  breeds: IBreed[];
}

interface IBreed {
  value: string;
  label: string;
}

export function SearchCombobox({ breeds }: SearchComboboxProps) {
  const {dispatch} = useContext(DogSearchContext)
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const allBreeds = [
    { value: "", label: "All Breeds" },
    ...breeds
  ]


  return (
    <Popover open={open} onOpenChange={setOpen} >
      <Label className="font-bold mb-4">
        Filter by breed:
      </Label>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {value
            ? allBreeds.find((breed) => breed.value === value)?.label
            : "All Breeds"}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search for breed..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {/* OPTIMIZE THE RENDER ITS CAUSING PERFOMANCE ISSUES  */}
              {allBreeds.map((breed) => (
                <CommandItem
                  key={breed.value}
                  value={breed.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    dispatch({ type: "FILTER_BREED", payload: currentValue})
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === breed.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {breed.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
