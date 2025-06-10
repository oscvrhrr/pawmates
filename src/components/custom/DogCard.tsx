import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { Heart } from "lucide-react";
import { Toggle } from "../ui/toggle";
import { useContext, useState, useEffect } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { toast } from "sonner";



interface DogCardProps {
  img: string,
  name: string
  age: number,
  breed: string,
  zipcode: string,
  uid: string,
}

const DogCard = ({ img, name, age, breed, zipcode, uid }: DogCardProps) => {
  const { dispatch, favorites } = useContext(FavoritesContext)
  const isInFavorites = favorites.some((dog) => dog.id === uid);
  const[isLiked, setIsLiked] = useState(isInFavorites)



  const handleLike = () => {
      const dogData = { id: uid, img, name, age, breed, zip_code: zipcode };

    if(!isLiked) {
      dispatch({ type: "ADD_DOG", payload: dogData })
      setIsLiked(true)
      toast(`${dogData.name} added to favorites!`)
    } else {
      dispatch({ type: "REMOVE_DOG", payload:  dogData })
      setIsLiked(false)
      toast(`${dogData.name} removed from favorites :(`)
    }
  }

  useEffect(() => {
    setIsLiked(favorites.some((dog) => dog.id === uid));
  }, [favorites, uid]);

  return (
    <Card className="w-full  min-w-[200px] max-w-xs py-0 pb-6">
      <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
        <img
          className="h-full w-full  object-cover dark:brightness-[0.2] dark:grayscale"
          src={img}
          alt=""
        />

      </div>
      <CardHeader className="text-gray-700">
        <div className="flex justify-between">
          <CardTitle className="text-black">{name}</CardTitle>
          <Badge variant="secondary" className="bg-orange-100" >{age} years old</Badge>
        </div>
       
        <CardAction></CardAction>
      </CardHeader>
      <div className="flex items-center justify-between mr-6">
        <CardContent className="text-gray-700">
          <p>Breed: {breed}</p>
          <p>Zip code: {zipcode}</p>
        </CardContent>
        <Toggle onClick={handleLike}>
          <Heart className={`${isLiked ? "fill-rose-500" : ""}`}/>
        </Toggle>
      </div>
      </Card>
  );
};

export default DogCard;
