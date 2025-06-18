import type { IDogSearchContext } from "../context/DogSearchContext"

export const initState = {
  sort: "asc",
  breed: "",
  ageMin: "",
  ageMax: "",
  prev: "",
  next: "",
  resultIds: [],
  total: 0,
  dogs: [],
  dispatch: () => {},
}


export type DogAction = 
  | { type: "SET_PAGE", payload: IDogSearchContext }
  | { type: "SET_DOGS", payload: IDogSearchContext }
  | { type: "SET_NEXT_PAGE", payload: IDogSearchContext }
  | { type: "SET_PREV_PAGE", payload: IDogSearchContext }
  | { type: "FILTER_BREED", payload: string }
  | { type: "SORT", payload: string }
  | { type: "FILTER_AGE", payload: { min: string, max: string } }
  // Add other action types as needed

export const dogReducer = (state: IDogSearchContext, action: DogAction) => {
  switch (action.type) {
    case "SET_PAGE": 
      return {
        ...state,
        prev: action.payload.prev === undefined ? "/dogs/search?size=15&sort=breed:asc": action.payload.prev,
        next: action.payload.next,
        resultIds: action.payload.resultIds,
        total: action.payload.total
      }
    case "SET_DOGS":
      return {
        ...state,
        dogs: Array.isArray(action.payload) ? action.payload : [],
      }
    case "SET_NEXT_PAGE":
      return {
        ...state,
        prev: action.payload.prev === undefined ? "/dogs/search?size=15&sort=breed:asc": action.payload.prev,
        next: action.payload.next,
        resultIds: action.payload.resultIds,
      }
    case "SET_PREV_PAGE":
      return {
        ...state,
        prev: action.payload.prev === undefined ? "/dogs/search?size=15&sort=breed:asc": action.payload.prev,
        next: action.payload.next,
        resultIds: action.payload.resultIds,
      }
    case "FILTER_BREED":
      return {
        ...state,
        breed: action.payload
      }
    case "SORT":
      return {
        ...state,
        sort: action.payload
      }
    case "FILTER_AGE": {
     return { 
      ...state,
      ageMin: action.payload.min,
      ageMax: action.payload.max
     }
    }
  }

}