import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription 
} from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";
import type { IDog } from "@/types/dog";






const MatchCard = ({ isMatched, setIsMatched, dog }: { dog: IDog, isMatched: boolean, setIsMatched: React.Dispatch<React.SetStateAction<boolean>>}) => {
 






  return (
    <>
      <Dialog open={isMatched} onOpenChange={setIsMatched}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              Your Perfect Match!
            </DialogTitle>
            <DialogDescription>
              Based on your favorites, we think you'll love this dog.
            </DialogDescription>
          </DialogHeader>
            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={dog.img}
                  alt={"dog"}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {dog.name}
                  </h3>
                  <Badge className="bg-orange-100 text-black">{dog.age} years old</Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Breed:</span>{" "}
                    <span className="text-gray-600">{dog.breed}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Zip code:</span>{" "}
                    <span className="text-gray-600">
                      {dog.zip_code}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mt-2">
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {}}
                >
                  Close
                </Button>
                <Button className="bg-[#6B9080] hover:bg-[#A4C3B2]">Contact Shelter</Button>
              </div>
            </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MatchCard;
