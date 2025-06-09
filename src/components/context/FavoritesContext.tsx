import { createContext, useReducer } from "react";
import { favoritesReducer, initFavoriteState, type FavoritesAction } from "../reducers/FavoritesReducer";
import type { IDog } from "@/types/dog";


export interface IFavoritesContext {
  favorites: IDog[]
  dispatch: React.Dispatch<FavoritesAction>,
}


// eslint-disable-next-line react-refresh/only-export-components
export const FavoritesContext = createContext<IFavoritesContext>(initFavoriteState)





export const FavoritesContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initFavoriteState)


  return (
    <FavoritesContext.Provider value={{ ...state, dispatch }}>
      { children }
    </FavoritesContext.Provider>
  )
}
