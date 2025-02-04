import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchPokemonList } from "@/pages/lib/lib";

export default function Cards({ searchQuery, selectedCard }) {

  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    fetchPokemonListData();
  }, []);

  const fetchPokemonListData = async () => {
    const result = await fetchPokemonList();
    setPokemonList(result)
  }

  const filteredData = pokemonList.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSelection = selectedCard ? item.types.includes(selectedCard) : true;
    return matchesSearch && matchesSelection; // Apply both filters
  });

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredData?.length > 0 ? (
          filteredData?.map((item) => (
            <div
              key={item?.id}
              className="bg-white rounded-lg shadow-md min-h-[400px] flex flex-col" // Apply flex to avoid white space
            >
            
              <div className="w-full p-6 flex justify-center flex-shrink-0">
                <Image
                  src={item?.image}
                  alt={`Pokémon ${item?.name}`}
                  width={110}
                  height={110}
                />
              </div>

              <div className="p-6 bg-gray-100 grid gap-6 rounded-lg flex-grow">
                <h2 className="mt-4 font-semibold">{item?.name}</h2>
                <p className="text-gray-500">Types : {item?.types?.join(', ')}</p>
                <Link href={`/pokemon/${item?.id}`} className="text-customgreen mt-2 inline-block"            >
                  Details →
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">
            No results found
          </p>
        )}
      </div>
    </>
  );
}
