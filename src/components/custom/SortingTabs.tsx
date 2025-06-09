import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "../ui/label";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { useContext } from "react";
import { DogSearchContext } from "../context/DogSearchContext";

const SortingTabs = () => {
  const { dispatch } = useContext(DogSearchContext);
  return (
    <Tabs defaultValue="asc" className="w-[300px] mt-2 mb-6">
      <TabsContent
        value="asc"
        className="flex items-center gap-2 text-sm text-gray-600 mb-8"
      >
        <ArrowUpDown className="h-4 w-4" />
        Sorted by breed A-Z
      </TabsContent>
      <TabsContent
        value="desc"
        className="flex items-center gap-2 text-sm text-gray-600 mb-8"
      >
        <ArrowUpDown className="h-4 w-4" />
        Sorted by breed Z-A
      </TabsContent>
      <Label className="font-bold">Sort by breed:</Label>
      <TabsList>
        <TabsTrigger
          onClick={() => dispatch({ type: "SORT", payload: "asc" })}
          value="asc"
        >
          <ArrowUp />
          A-Z
        </TabsTrigger>
        <TabsTrigger
          onClick={() => dispatch({ type: "SORT", payload: "desc" })}
          value="desc"
        >
          <ArrowDown />
          Z-A
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default SortingTabs;
