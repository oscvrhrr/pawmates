import { useEffect, useState } from "react";







const useApi = <T,>(method: "POST" | "GET", endpoint: string, body?: string) => {
  const [data, setData] = useState<T | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiCall = async() => {
      try {
        setIsLoading(true)
        const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
          method, 
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body
      });
      if(response.ok) {
        const parsedData = await response.json();
        setData(parsedData)
      }
      } catch (error) {
        console.error("api request failed", error)
      } finally {
        setIsLoading(false)
      }

    }

    apiCall()

  }, [body, method, endpoint])



  return { data, isLoading }
}

export default useApi;