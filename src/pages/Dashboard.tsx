import { SearchCombobox } from "@/components/custom/SearchCombobox";
import { formatBreeds } from "@/lib/utils";
import { useContext, useRef } from "react";
import { DogSearchContext } from "@/components/context/DogSearchContext";
import Navbar from "@/components/custom/Navbar";
import DogCard from "@/components/custom/DogCard";
import useApi from "@/hooks/useApi";
import { PaginationDemo } from "@/components/custom/Pagination";
import SkeletonCard from "@/components/custom/SkeletonCard";
import SortingTabs from "@/components/custom/SortingTabs";
import { Toaster } from "@/components/ui/sonner";


const DashboardPage = () => {
  const topRef = useRef<HTMLDivElement>(null);
  const { data: breeds } = useApi<string[]>("GET","/dogs/breeds")
  const { dogs } = useContext(DogSearchContext)

  const formattedBreeds = formatBreeds(breeds ?? [])



 const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={topRef} className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="sm:flex sm:py-6">
        <section className="flex items-center sm:items-baseline flex-col  px-10 py-10 sm:py-0 ">
          <SortingTabs />
          <SearchCombobox breeds={formattedBreeds} />
        </section>
        <section className="place-items-center grid grid-cols-1 gap-8 sm:grid-rows-3 sm:grid-cols-3 px-10">
          {dogs.length > 0
            ? dogs.map((dog) => (
                <DogCard
                  key={dog.id}
                  img={dog.img}
                  name={dog.name}
                  age={dog.age}
                  breed={dog.breed}
                  zipcode={dog.zip_code}
                  uid={dog.id}
                />
              ))
            : Array.from({ length: 24 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
          <div className="sm:ml-65">
            <PaginationDemo onPageChange={scrollToTop} />
          </div>
        </section>
      </div>
      <Toaster />
    </div>
  );
};

export default DashboardPage;
