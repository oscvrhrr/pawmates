import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useContext, useState } from "react"
import { DogSearchContext, type IDogSearchContext } from "../context/DogSearchContext"
import useApi from "@/hooks/useApi";


export function PaginationDemo({ onPageChange }: { onPageChange: () => void }) {
  const { next, prev, dispatch } = useContext(DogSearchContext);
  const { data: nextPageData } = useApi<IDogSearchContext>("GET", next);
  const { data: prevPageData } = useApi<IDogSearchContext>("GET", prev);
  const [activePage, setActivePage] = useState<number>(1);

  const changeNextPage = async () => {
    if (nextPageData) {
      dispatch({ type: "SET_NEXT_PAGE", payload: nextPageData });

      const response = await fetch(`${import.meta.env.VITE_API_URL}/dogs`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nextPageData.resultIds),
      });
      if (response.ok) {
        const parsedData = await response.json();
        console.log(parsedData);
        dispatch({ type: "SET_DOGS", payload: parsedData });
        setActivePage((prevState: number) => prevState + 1);
        onPageChange();
      }
    }
  };

  const changePrevPage = async () => {
    if (prevPageData) {
      dispatch({ type: "SET_PREV_PAGE", payload: prevPageData });

      const response = await fetch(`${import.meta.env.VITE_API_URL}/dogs`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prevPageData.resultIds),
      });
      if (response.ok) {
        const parsedData = await response.json();
        console.log(parsedData);
        dispatch({ type: "SET_DOGS", payload: parsedData });
        setActivePage((prevState: number) =>
          prevState >= 2 ? prevState - 1 : prevState
        );
        onPageChange();
      }
    }
  };
    



  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious className="cursor-pointer" onClick={changePrevPage} />
        </PaginationItem>
       {[1, 2, 3].map((page) => (
        <PaginationItem key={page}>
          <PaginationLink
            isActive={page === activePage ? true : false}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem >
          <PaginationNext className="cursor-pointer" onClick={changeNextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
