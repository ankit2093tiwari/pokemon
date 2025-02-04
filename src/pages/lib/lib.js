const baseUrl = 'https://pokeapi.co/api/v2/';

export const fetchPokemonTypes = async () => {
    const response = await fetch(`${baseUrl}type`);
    const data = await response.json();
    const pokemantypes = data?.count ?  data?.results.map((type) => type.name)  : "";
    return pokemantypes;
}

export const fetchPokemonList = async () => {
    const response = await fetch(`${baseUrl}pokemon?limit=100`);
    const data = await response.json();
    return await Promise.all(
        data.results.map(async (result) => {
            const pokemon = await fetchPokemonDetails(result.url);
            return pokemon;
        })
    );
}

export const fetchPokemonDetails = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return{name: data.name,
        image:data.sprites.front_default,
        types: data.types.map((type) => type.type.name),
        id:data.id,
        url:url
    };
}

export const getPokemonDetails = async (id) => {   

    const response = await fetch(`${baseUrl}pokemon/${id}`);
    const data = await response.json();
   
    const pokemonDetails = {
        name: data.name,
        id:data.id,
        image:data.sprites.front_default,
        types:data.types.map((type) => type.type.name),
        height:data.height,
        weight:data.weight,
        experience:data.base_experience,
        stats:data.stats.map((item) => item.stat.name),
        abilities:data.abilities.map((item) => item.ability.name),
        moves:data.moves.map((item) => item.move.name),
        

    };
   
    return pokemonDetails;
}