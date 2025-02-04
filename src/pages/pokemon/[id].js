import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { getPokemonDetails } from "@/lib/lib";
export default function PokemonDetail() {
  const router = useRouter();
  const { isReady } = useRouter();
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    if (isReady) {
      const id = router.query.id;
      pokemanDetails(id);
    }
  }, [isReady, router.query.id]);

  const pokemanDetails = async (id) => {
    const getData = await getPokemonDetails(parseInt(id));
    setPokemonDetails(getData);
  };

  if (!pokemonDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md mt-10">
      <nav className="mb-4">
        <ol className="flex items-center">
          <li>
            <a href="/" className="text-blue-500 hover:underline">
              Home&gt;
            </a>
          </li>
          <li className="text-gray-500">{pokemonDetails?.name}</li>
        </ol>
      </nav>

      <Link href="/" className="text-green-500 text-sm mb-4">
        &lt; Back
      </Link>

      <div className="bg-green-100">
        <div className="w-full flex justify-center p-4">
          <Image
            src={pokemonDetails.image}
            alt={pokemonDetails.name}
            width={110}
            height={110}
          />
        </div>
        <div className="bg-yellow-100 p-4">
          <p>
            <strong>Name:</strong> {pokemonDetails.name}
          </p>
          <p>
            <strong>Type:</strong> {pokemonDetails.types}
          </p>
          <p>
            <strong>Stats:</strong> {pokemonDetails.stats?.join(", ")}
          </p>
          <p>
            <strong>Abilities:</strong> {pokemonDetails.abilities?.join(", ")}
          </p>
          <p>
            <strong>Some Moves:</strong> {pokemonDetails.moves?.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}
