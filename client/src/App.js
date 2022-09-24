import { useEffect, useState } from 'react';
import { getPokemonData } from './ApiFunctions/pokemonUtils';
import './App.css';
import Card from './components/card';

const App = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getPokemonData().then((data) => {
      const sortedData = data.sort((a, b) => a.id - b.id);
      setPokemons(sortedData);
    });
  }, []);

  return (
    <div className="App">
      <div className="pokemonList">
        {pokemons.map((pokemon) => (
          <Card key={pokemon.id} name={pokemon.name} image={pokemon.image} id={pokemon.id} />
        ))}
      </div>
    </div>
  );
}

export default App;
