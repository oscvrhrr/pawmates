
import { useEffect, useState } from "react";


const Dashboard = () => {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const getDogs = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/dogs/search`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const parsedData = await response.json();
          setDogs(parsedData);
        } else {
          console.log("response failed");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDogs();
  }, []);

  console.log(dogs);

  return (
    <div className="min-h-screen bg-gray-50">
      
    </div>
  );
};

export default Dashboard;
