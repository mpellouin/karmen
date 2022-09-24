export const getPokemonData = async () => {
  try {
    const response = await fetch('http://localhost:8080/pokemons', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'allow-origin': '*',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
  return [{
    name: 'MissingNo',
    id: 0,
    image: 'http://upload.wikimedia.org/wikipedia/commons/6/62/MissingNo.png',
  }]
};

export const getPokemonDataFromId = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/pokemon/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'allow-origin': '*',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
  return {
    name: 'MissingNo',
    id: 0,
    image: 'http://upload.wikimedia.org/wikipedia/commons/6/62/MissingNo.png',
  }
};