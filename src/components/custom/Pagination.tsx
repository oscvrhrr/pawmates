import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useContext, useState, useEffect } from "react"
import { DogSearchContext, type IDogSearchContext } from "../context/DogSearchContext"
import useApi from "@/hooks/useApi";



export function PaginationDemo({ onPageChange }: { onPageChange: () => void }) {
  const { next, prev, dispatch, total, currentPage } = useContext(DogSearchContext);
  const { data: nextPageData } = useApi<IDogSearchContext>("GET", next);
  const { data: prevPageData } = useApi<IDogSearchContext>("GET", prev);
  const [totalPages, setTotalPages] = useState<number>(0);

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
        dispatch({ type: "SET_DOGS", payload: parsedData });
        onPageChange();
      }
    }
  };
    

  useEffect(() => {
    const itemsPerPage = 12; 
    setTotalPages(Math.ceil(Number(total) / itemsPerPage));
  }, [total]);

  const getPageNumbers = () => {
  const pages = [];
  // If there are 4 or fewer pages, show all
  if (totalPages <= 4) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }

  // If near the end, just show the last three pages
  if (currentPage >= totalPages - 2) {
    for (let i = totalPages - 2; i <= totalPages; i++) {
      if (i > 0) pages.push(i);
    }
    return pages;
  }

  // Otherwise, show current and next two, then ellipsis and last
  for (let i = currentPage; i < currentPage + 3; i++) {
    pages.push(i);
  }
  pages.push("...");
  pages.push(totalPages);
  return pages;
};
 



  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious className="cursor-pointer" onClick={ currentPage === 1 ? () => {} : changePrevPage }  />
        </PaginationItem>
       {getPageNumbers().map((page) => (
        <PaginationItem key={page}>
          <PaginationLink
            isActive={page === currentPage ? true : false}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      ))}
        <PaginationItem >
          <PaginationNext className="cursor-pointer" onClick={ currentPage === totalPages ? () => {} : changeNextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
