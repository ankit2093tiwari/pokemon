import { useState, useEffect } from "react";
import DummyCards from "@/components/Cards";
import { fetchPokemonTypes, fetchPokemonList } from "../lib/lib";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCard, setSelectedCard] = useState(""); // State to track the selected card
  const [pokemonTypes, setPokemonTypes] = useState([]);

  useEffect(() => {
    getAllPokemanTypes();
  }, []);
  // Function to handle dropdown change
  const handleSelectChange = (e) => {
    setSelectedCard(e.target.value); // Set selected card based on dropdown value
  };

  const getAllPokemanTypes = async () => {
    const result = await fetchPokemonTypes();
    setPokemonTypes(result);
  };

  return (
    <div className="h-screen p-8 flex flex-col justify-between">
      <div className="max-w-screen-lg mx-auto w-full">
        <div className="flex flex-col gap-4 w-full">
          <select
            className="w-full md:w-1/4 p-3 border rounded-md bg-white"
            value={selectedCard}
            onChange={handleSelectChange}
          >
            <option value="">Select</option>
            {pokemonTypes?.map((item, ind) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <div className="flex w-full md:w-1/2 border rounded-md overflow-hidden">
            <input
              type="text"
              placeholder=" Search..."
              className="w-full p-3 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-customgreen text-white px-6 py-3 hover:bg-customgreen">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto mt-8 w-full flex-grow">
        <DummyCards searchQuery={search} selectedCard={selectedCard} />
      </div>
    </div>
  );
}
