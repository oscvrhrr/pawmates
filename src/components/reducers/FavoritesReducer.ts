import type { IDog } from "@/types/dog"
import type { IFavoritesContext } from "../context/FavoritesContext"


export const initFavoriteState = {
  favorites: [],
  dispatch: () => {},
}


export type FavoritesAction =
| { type: "ADD_DOG", payload: IDog }
| { type: "REMOVE_DOG", payload: IDog }



export const favoritesReducer = (state: IFavoritesContext, action: FavoritesAction) => {

  switch(action.type) {
    case "ADD_DOG":
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      }
    case "REMOVE_DOG": {
      const filteredDogs = state.favorites.filter((dog) => action.payload.id != dog.id)
      return {
        ...state,
        favorites: filteredDogs
      }
    }
  }
  
}