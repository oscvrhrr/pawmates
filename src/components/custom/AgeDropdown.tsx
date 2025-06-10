import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "../ui/label"
import { useContext, useState } from "react"
import { DogSearchContext } from "../context/DogSearchContext"

export function AgeDropdown() {
  const { dispatch } = useContext(DogSearchContext);
  const [selectedAge, setSelectedAge] = useState("all");



  const handleAgeRange = (value: string) => {
      setSelectedAge(value);

    let ageRange = {
      min: "0",
      max: "20"
    };

    switch(value) {
      case "0-1":
        ageRange = { min: "0", max: "1" };
        break;
      case "2-3":
        ageRange = { min: "2", max: "3" };
        break;
      case "3-7":
        ageRange = { min: "3", max: "7" };
        break;
      case "7":
        ageRange = { min: "7", max: "20" };
        break;
      default:
        ageRange = { min: "0", max: "20" };
    }
    dispatch({ type: "FILTER_AGE", payload: ageRange})
  }




  return (
    <>
      <Label className="font-bold mt-8 mb-4">
        Filter by age
      </Label>
      <Select onValueChange={handleAgeRange} value={selectedAge}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All ages</SelectItem>
            <SelectItem value="0-1">Puppy 0-1 years</SelectItem>
            <SelectItem value="2-3">Young 2-3 years</SelectItem>
            <SelectItem value="3-7">Adult 3-7 years</SelectItem>
            <SelectItem value="7">Senior 7+ years</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}
