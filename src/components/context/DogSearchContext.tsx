import { createContext, useReducer, useEffect } from "react";
import { initState, dogReducer } from "../reducers/DogReducer";
import type { DogAction } from "../reducers/DogReducer";
import type { IDog } from "@/types/dog";
import { capitalizeBreed } from "@/lib/utils";



export interface IDogSearchContext {
  sort: string,
  breed: string,
  ageMin: string,
  ageMax: string,
  prev: string,
  next: string,
  resultIds: string[],
  dogs: IDog[],
  dispatch: React.Dispatch<DogAction>,
}

// eslint-disable-next-line react-refresh/only-export-components
export const DogSearchContext = createContext<IDogSearchContext>(initState);

const DogSearchContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(dogReducer, initState)


  useEffect(() => {
    const apiCall = async () => {
      try {
        const currentBreed = capitalizeBreed(state.breed);
        const breedQuery = currentBreed ? `breeds=${currentBreed}` : "";
        const ageMinQuery = state.ageMin ? `ageMin=${state.ageMin}` : "";
         const ageMaxQuery = state.ageMax? `ageMax=${state.ageMax}` : "";
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/dogs/search?${breedQuery}&${ageMinQuery}&${ageMaxQuery}&size=12&sort=breed:${state.sort}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch dog ids");
        }
        const parsedData = await response.json();
        dispatch({ type: "SET_PAGE", payload: parsedData });
        const dogsResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/dogs`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(parsedData.resultIds),
          }
        );
        if (dogsResponse.ok) {
          const parsedData = await dogsResponse.json();
          dispatch({ type: "SET_DOGS", payload: parsedData });
        }
      } catch (error) {
        console.error("api request failed", error);
      }
    };

    apiCall();
  }, [state.breed, state.sort, state.ageMin, state.ageMax]);

  return (  
    <DogSearchContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DogSearchContext.Provider>
  );
};

export default DogSearchContextProvider;
