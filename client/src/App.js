import { useEffect, useState } from 'react';
import { getPokemonData } from './ApiFunctions/pokemonUtils';
import './App.css';
import Card from './components/card';
import Header from './components/Header';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    getPokemonData().then((data) => {
      const sortedData = data.sort((a, b) => a.id - b.id);
      setPokemons(sortedData);
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="pokemonList">
        {pokemons.map((pokemon) => (
          <Card key={pokemon.id} name={pokemon.name} image={pokemon.image} id={pokemon.id} isSelected={selectedPokemon === pokemon.id} setSelected={setSelectedPokemon}/>
        ))}
      </div>
    </div>
  );
}

export default App;
