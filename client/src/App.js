import { useEffect, useState } from "react";
import { getPokemonData } from "./ApiFunctions/pokemonUtils";
import "./App.css";
import Card from "./components/Card";
import Header from "./components/Header";
import PokeInfos from "./components/PokeInfos";
import SearchBar from "./components/SearchBar";

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
      <SearchBar setSelected={setSelectedPokemon}/>
      {selectedPokemon && (
        <PokeInfos
          isSelected={selectedPokemon}
          setSelected={setSelectedPokemon}
        />
      )}
      <div className="pokemonList">
        {!selectedPokemon &&
          pokemons.map((pokemon) => (
            <Card
              key={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              id={pokemon.id}
              isSelected={selectedPokemon === pokemon.id}
              setSelected={setSelectedPokemon}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
