import React, { ReactElement, useState, useEffect } from "react";
import axios from "axios";
import { TYPE_COLORS } from "../layout/Colors";
import ProgressBar from "../layout/ProgressBar";
import ProfileStat from "../layout/ProfileStat";

interface PokeProps {
  name: string;
  pokemonIndex: string;
  imageUrl: string;
  height: number;
  weight: number;
  eggGroups: string;
  abilities: string;
  genderRatioMale: number;
  genderRatioFemale: number;
  description: string;
  catchRate: number;
  evs: string;
  hatchSteps: number;
  types: Array<string>;
  stat: {
    hp: string;
    atk: string;
    def: string;
    spd: string;
    specAtk: string;
    specDef: string;
  };
}

function Pokemon(props: any): ReactElement {
  const [pokemon, setPokemon] = useState<PokeProps>({
    name: "",
    pokemonIndex: "",
    imageUrl: "",
    height: null,
    weight: null,
    eggGroups: "",
    abilities: "",
    genderRatioFemale: null,
    genderRatioMale: null,
    description: "",
    catchRate: null,
    evs: "",
    hatchSteps: null,
    types: [],
    stat: {
      hp: "",
      atk: "",
      def: "",
      spd: "",
      specAtk: "",
      specDef: "",
    },
  });

  async function GetPokemon() {
    const { pokemonIndex } = props.match.params;

    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;
    const pokemonResponse = await axios.get(pokemonUrl);
    const name = pokemonResponse.data.name;
    const imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${pokemonIndex}.png`;

    pokemonResponse.data.stats.map((stat: any) => {
      switch (stat.stat.name) {
        case "hp":
          pokemon.stat.hp = stat["base_stat"];
          break;
        case "attack":
          pokemon.stat.atk = stat["base_stat"];
          break;
        case "defense":
          pokemon.stat.def = stat["base_stat"];
          break;
        case "speed":
          pokemon.stat.spd = stat["base_stat"];
          break;
        case "special-attack":
          pokemon.stat.specAtk = stat["base_stat"];
          break;
        case "special-def":
          pokemon.stat.specDef = stat["base_stat"];
          break;
      }
    });

    // Convert dm to ft.....The + .0001 * 100 / 100 to round to 2 decimal places
    const height =
      Math.round((pokemonResponse.data.height * 0.328084 + 0.0001) * 100) / 100;
    const weight =
      Math.round((pokemonResponse.data.weight * 0.220462 + 0.0001) * 100) / 100;

    const types = pokemonResponse.data.types.map(
      (types: any) => types.type.name
    );

    const abilities = pokemonResponse.data.abilities.map((ability: any) => {
      return ability.ability.name
        .toLowerCase()
        .split("-")
        .map((s: any) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ");
    });

    const evs = pokemonResponse.data.stats
      .filter((stat: any) => {
        if (stat.effort > 0) {
          return true;
        }
        return false;
      })
      .map((stat: any) => {
        return `${stat.effor} ${stat.stat.name}`
          .toLowerCase()
          .split("-")
          .map((s: any) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ");
      })
      .join(", ");

    await axios.get(pokemonSpeciesUrl).then((res: any) => {
      let description: string = "";
      res.data.flavor_text_entries.some((flavor: any) => {
        if (flavor.language.name === "en") {
          description = flavor.flavor_text;
          return;
        }
      });

      const femaleRate = res.data["gender_rate"];
      const genderRatioFemale = 12.5 * femaleRate;
      const genderRatioMale = 12.5 * (8 - femaleRate);

      const catchRate = Math.round((100 / 255) * res.data["capture_rate"]);
      const eggGroups = res.data["egg_groups"]
        .map((group: any) => {
          return group.name
            .toLowerCase()
            .split("-")
            .map((s: any) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ");
        })
        .join(", ");

      const hatchSteps = 255 * (res.data["hatch_counter"] + 1);

      setPokemon({
        ...pokemon,
        description: description,
        genderRatioFemale: genderRatioFemale,
        genderRatioMale: genderRatioMale,
        catchRate: catchRate,
        eggGroups: eggGroups,
        hatchSteps: hatchSteps,
      });
    });

    setPokemon({
      ...pokemon,
      imageUrl: imageUrl,
      pokemonIndex: pokemonIndex,
      name: name,
      types: types,
      ...pokemon.stat,
      height: height,
      weight: weight,
      abilities: abilities,
      evs: evs,
    });
  }

  useEffect(() => {
    GetPokemon();
  });

  return (
    <div>
      <div className="col">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-5">
                <h5>{pokemon.pokemonIndex}</h5>
              </div>
              <div className="col-7">
                <div className="float-right">
                  {pokemon.types.map((type: any) => (
                    <span
                      key={type}
                      className="badge badge-pill mr-1"
                      style={{
                        backgroundColor: `#${TYPE_COLORS[type]}`,
                        color: "white",
                      }}
                    >
                      {type
                        .toLowerCase()
                        .split(" ")
                        .map(
                          (s: any) => s.charAt(0).toUpperCase() + s.substring(1)
                        )
                        .join(" ")}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-3">
                <img
                  alt=""
                  src={pokemon.imageUrl}
                  className="card-img-top mx-auto mt-2"
                />
              </div>
              <div className="col-md-9">
                <h4 className="mx-auto">
                  {pokemon.name
                    .toLowerCase()
                    .split(" ")
                    .map((s: any) => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(" ")}
                </h4>
                <ProgressBar stat={pokemon.stat.hp} statName={"HP"} />
                <ProgressBar stat={pokemon.stat.atk} statName={"ATTACK"} />
                <ProgressBar stat={pokemon.stat.def} statName={"DEFENSE"} />
                <ProgressBar stat={pokemon.stat.spd} statName={"SPEED"} />
                <ProgressBar
                  stat={pokemon.stat.specAtk}
                  statName={"SPECIAL ATTACK"}
                />
              </div>
            </div>
            <div className="row mt-1">
              <div className="col">
                <p className="p-2">{pokemon.description}</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="card-body">
            <h5 className="card-title text-center">Profile</h5>
            <div className="row">
              <div className="col-md-6">
                <ProfileStat
                  bioName={"Height: "}
                  profileStat={pokemon.height}
                  metricUnit={"ft"}
                />
                <ProfileStat
                  bioName={"Weight: "}
                  profileStat={pokemon.weight}
                  metricUnit={"lbs"}
                />
                <ProfileStat
                  bioName={"Catch rate: "}
                  profileStat={pokemon.catchRate}
                  metricUnit={"%"}
                />
                <div className="col-md-6" style={{ marginLeft: 120 }}>
                  <h6 className="float-left">Gender Ratio: </h6>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: `${pokemon.genderRatioFemale}%`,
                      backgroundColor: "#c2185b",
                    }}
                    aria-valuenow={15}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <small>{pokemon.genderRatioFemale}</small>
                  </div>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: `${pokemon.genderRatioMale}%`,
                      backgroundColor: "#1976d2",
                    }}
                    aria-valuenow={30}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <small>{pokemon.genderRatioMale}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pokemon;
