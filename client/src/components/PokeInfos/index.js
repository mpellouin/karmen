import { useCallback, useEffect, useState } from "react";
import { getPokemonDataFromId } from "../../ApiFunctions/pokemonUtils";
import "./index.css";

const StatsTable = ({ pokemon }) => {
  return (
    <table className="statsTable" cellSpacing="0">
      <thead>
        <tr>
          <th>HP</th>
          <th>Attack</th>
          <th>Defense</th>
          <th>Sp. Attack</th>
          <th>Sp. Defense</th>
          <th>Speed</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{pokemon?.stats[0].base_stat}</td>
          <td>{pokemon?.stats[1].base_stat}</td>
          <td>{pokemon?.stats[2].base_stat}</td>
          <td>{pokemon?.stats[3].base_stat}</td>
          <td>{pokemon?.stats[4].base_stat}</td>
          <td>{pokemon?.stats[5].base_stat}</td>
        </tr>
      </tbody>
    </table>
  );
};

const PokeInfos = ({ isSelected, setSelected }) => {
  const [pokemon, setPokemon] = useState(null);

  const handleEscape = useCallback(
    (e) => {
      if (e.key === "Escape") {
        setSelected(null);
      }
    },
    [setSelected]
  );

  const handleArrows = useCallback(
    (e) => {
      if (e.key === "ArrowRight") {
        setSelected((isSelected % 151) + 1);
      } else if (e.key === "ArrowLeft") {
        setSelected(((isSelected + 149) % 151) + 1);
      }
    },
    [isSelected, setSelected]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleEscape);
    window.addEventListener("keydown", handleArrows);
    if (isSelected) {
      getPokemonDataFromId(isSelected).then((data) => {
        setPokemon(data);
      });
    } else {
      setPokemon(null);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("keydown", handleArrows);
    };
  }, [isSelected, handleEscape, handleArrows]);

  return (
    <div
      className={"pokeInfos " + (isSelected !== null ? "pokeInfosOpened" : "")}
    >
      <button className="closeButton" onClick={() => setSelected(null)}>
        X
      </button>
      {pokemon?.id && (
        <>
          <h1 className="pokeId">{"#" + pokemon?.id}</h1>
          <h1 className="pokeName">{pokemon?.name.toUpperCase()}</h1>
          <h3 className="pokeTypes">
            {pokemon?.types
              .map((type) => type.type.name.toUpperCase())
              .join(", ")}
          </h3>
          <img
            className="pokeSprite"
            src={pokemon?.sprites?.front_default}
            alt={pokemon?.name}
          />
          <StatsTable pokemon={pokemon} />
          <p>Use arrow keys to navigate through pokedex</p>
        </>
      )}
    </div>
  );
};

export default PokeInfos;
