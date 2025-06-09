import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatBreeds = (breeds: string[] ) => {
  const formatedBreeds = breeds.map((breed) => (
    {
      value: breed.toLowerCase(),
      label: breed
    }
  ))
  return formatedBreeds;
}

export const capitalizeBreed = (breed: string) => {
  if(breed === "") return
   const capitalizeBreed = breed.split(" ").map((word) => (
          word[0].toUpperCase() + word.slice(1, word.length)
        )).join(" ")
    return capitalizeBreed
}
