import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Heart, XIcon, X } from "lucide-react";
import { Sparkles, HeartCrack } from "lucide-react";
import { useState, useContext } from "react";
import type { IDog } from "@/types/dog";
import { FavoritesContext } from "../context/FavoritesContext";
import MatchCard from "./MatchCard";
import Logo from "./Logo";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const [match, setMatch] = useState<IDog>({
    id: "",
    img: "",
    name: "",
    age: 0,
    zip_code: "",
    breed: "",
  });
  const { favorites, dispatch } = useContext(FavoritesContext);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Only close if explicitly requested
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const removeDog = (dog: IDog) => {
    dispatch({ type: "REMOVE_DOG", payload: dog });
  };

  const generateMatch = async () => {
    const dogIds = favorites.map((dog) => {
      const arr = [];
      arr.push(dog.id);
      return arr;
    });
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/dogs/match`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dogIds),
        }
      );
      if (response.ok) {
        const parsedData = await response.json();
        setIsMatched(true);
        const dogData = favorites.filter(
          (dog) => dog.id === parsedData.match[0]
        );
        console.log(dogData);
        setMatch(dogData[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="flex justify-between px-4 sm:px-10 py-6 bg-white border-b items-center">
      <Logo />

      {/* favorite list */}
      <div className="flex">
        <Popover open={isOpen} onOpenChange={handleOpenChange}>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="border mr-4" size="sm">
              <Heart
                className={`h-4 w-4 ${
                  favorites.length > 0 ? "fill-red-400 text-red-400" : ""
                }`}
              />
              Favorites
              <Badge variant="secondary" className="bg-orange-100">{favorites.length}</Badge>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[20rem] mx-11.5 md:mr-40 h-[350px]">
            <div className="flex justify-between py-4 px-2.5">
              <Label>Your Favorites</Label>
              <PopoverClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </PopoverClose>
            </div>
            <ul>
              <ScrollArea className="h-[200px]">
                {favorites.length > 0 ? (
                  favorites.map((dog) => (
                    <div
                      key={dog.id}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50"
                    >
                      <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-100">
                        <img
                          src={dog.img || "/placeholder.svg"}
                          alt={dog.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {dog.name}
                        </p>
                        <p className="text-xs text-gray-500">{dog.breed}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-gray-500 hover:text-gray-900"
                        onClick={() => removeDog(dog)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    <HeartCrack className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">No favorites yet</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Click the heart icon on any dog to add it to your
                      favorites
                    </p>
                  </div>
                )}
              </ScrollArea>
            </ul>
            {favorites.length < 1 ? (
              <Button className="w-full bg-[#6B9080]" size="sm" disabled>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate your pawfect match
              </Button>
            ) : (
              <Button className="w-full bg-[#6B9080] hover:bg-[#4D6A5E]" size="sm" onClick={generateMatch}>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate your pawfect match
              </Button>
            )}
          </PopoverContent>
        </Popover>
        <MatchCard
          isMatched={isMatched}
          setIsMatched={setIsMatched}
          dog={match}
        />

        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Navbar;
