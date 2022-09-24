export const getPokemonData = async () => {
  const response = await fetch('http://localhost:8080/pokemons', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'allow-origin': '*',
    },
  });
  const data = await response.json();
  //TODO: send image from back using what's under so that we can return directly data
  const pokemonData = data.map((pokemon) => ({
    name: pokemon.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
    id: pokemon.id,
  }));
  return pokemonData;
};