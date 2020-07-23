import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import axios from "axios";

const PokemonList = () => {
  const [url, setUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=52"
  );
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios.get(url).then((res) => {
      setPokemon(res.data["results"]);
    });
  }, [url]);

  return (
    <>
      {pokemon ? (
        <div className="row">
          {pokemon.map((pokemon: any) => (
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              url={pokemon.url}
            />
          ))}
        </div>
      ) : (
        <h1>Loading Pokemon</h1>
      )}
    </>
  );
};

export default PokemonList;
