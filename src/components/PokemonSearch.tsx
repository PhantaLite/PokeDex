import React, { Component } from "react";
import Trainer from "../interfaces/Trainer.interface";

// const { Search } = Input;

interface SearchState {
  error: boolean;
  pokemon: Pokemon;
}
interface Pokemon {
  name: string;
  numberOfAbilities: number;
  baseExperience: number;
  imageUrl: string;
}

export class PokemonSearch extends Component<Trainer, SearchState> {
  pokemonRef: React.RefObject<HTMLInputElement>;
  constructor(props: Trainer) {
    super(props);
    this.state = {
      error: false,
      pokemon: null,
    };
    this.pokemonRef = React.createRef();
  }

  //Handler
  onSearchClick = (): void => {
    const inputValue = this.pokemonRef.current.value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`).then((res) => {
      if (res.status !== 200) {
        this.setState({ error: true });
        return;
      }
      res.json().then((data) => {
        this.setState({
          error: false,
          pokemon: {
            name: data.name,
            numberOfAbilities: data.abilities.length,
            baseExperience: data.base_experience,
            imageUrl: data.sprites.front_default,
          },
        });
      });
    });
  };

  render() {
    const { name: trainerName, numberOfPokemons } = this.props;
    const { error, pokemon } = this.state;

    let result;

    if (error) {
      result = <p>Pokemon not found, please try again</p>;
    } else if (this.state.pokemon) {
      result = (
        <div>
          <img src={pokemon.imageUrl} alt="pokemon" className="pokemon-image" />
          <h3>Name: {pokemon.name}</h3>
          <span>&nbsp;</span>
          <h3> Number of Abilites: {pokemon.numberOfAbilities}</h3>
          <span>&nbsp;</span>
          <h3>Base Experience: {pokemon.baseExperience}</h3>
          <p>
            Power: {pokemon.name} \n
            {pokemon.numberOfAbilities} \n Base experience points:
            {pokemon.baseExperience}
          </p>
        </div>
      );
    }

    return (
      <>
        <h2>
          Pokémon Trainer {trainerName} has{" "}
          {numberOfPokemons && <span>has {numberOfPokemons} Pokémons</span>}
        </h2>
        <input type="text" ref={this.pokemonRef} />
        <button onClick={this.onSearchClick} className="my-button">
          Search
        </button>
        {result}
      </>
    );
  }
}

export default PokemonSearch;
