import React, { Component } from "react";
import { Input } from "antd";
import User from "../interface/User.interface";

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

export class PokemonSearch extends Component<User, SearchState> {
  pokemonRef: React.RefObject<HTMLInputElement>;
  constructor(props: User) {
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
          <p>
            {" "}
            {pokemon.name} abilities are {pokemon.numberOfAbilities} and base
            experience points:
            {pokemon.baseExperience}
          </p>
        </div>
      );
    }

    return (
      <>
        <p>
          Pokémon Trainer {trainerName} has{" "}
          {numberOfPokemons && <span>has {numberOfPokemons} Pokémons</span>}
          Pokémons
        </p>
        {/* <Search
          placeholder="Search Pokémon..."
          enterButton="Search"
          style={{ width: 500 }}
          size="large"
          onSearch={this.onSearchClick}
          ref={this.pokemonRef}
        ></Search> */}
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
