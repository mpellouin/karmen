export const getPokemonData = async () => {
  const response = await fetch('http://localhost:8080/pokemons', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'allow-origin': '*',
    },
  });
  const data = await response.json();
  return data;
};