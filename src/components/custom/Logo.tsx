import { PawPrint, Heart } from "lucide-react";



const Logo = () => {
  return (
    <div>
      <div className="flex">
        <PawPrint className="mr-2" />
        <h1 className="sm:text-2xl text-xl font-bold text-gray-900">
          PAWMATES
        </h1>
      </div>
      <div className="flex items-center">
        <p className="text-xs sm:text-sm text-gray-600">
          find you pawfect companion
        </p>
        <Heart className="h-4 w-4 ml-2 fill-red-500" style={{ color: "red" }} />
      </div>
    </div>
  );
};

export default Logo;
