import React, { ReactElement, useState, useEffect } from "react";
import axios from "axios";

interface PokeProps {
  name: string;
  pokemonIndex: string;
  imageUrl: string;
}

function Pokemon(props: any): ReactElement {
  const [pokemon, setPokemon] = useState<PokeProps>({
    name: "",
    pokemonIndex: "",
    imageUrl: "",
  });

  async function GetPokemon() {
    const { pokemonIndex } = props.match.params;

    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonResponse = await axios.get(pokemonUrl);
    const name = pokemonResponse.data.name;
    setPokemon({ ...pokemon, name: name });
  }

  useEffect(() => {
    GetPokemon();
  });

  return (
    <div>
      <h1>{pokemon.name}</h1>
    </div>
  );
}

export default Pokemon;
