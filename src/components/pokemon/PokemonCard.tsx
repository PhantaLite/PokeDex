import React, { useState, useEffect } from "react";
import styled from "styled-components";
import spinner from "../pokemon/25.gif";
import { Link } from "react-router-dom";

const Sprite = styled.img`
  width: 5rem;
  height: 5rem;
  display: none;
`;

const Card = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &: hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px rgba(0, 0, 0, 0.22);
  }
  -moz-user-select: none;
  -website-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

const PokemonCard = (props: any) => {
  const [state, setState] = useState({
    name: "",
    imageUrl: "",
    pokeIndex: "",
  });

  const [imgLoading, setImgLoading] = useState(true);
  const [tooManyRequests, setTooManyRequests] = useState(false);

  useEffect(() => {
    const { name } = props;
    const pokeIndex = props.url.split("/")[props.url.split("/").length - 2];
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokeIndex}.png?raw=true`;

    setState({ name, imageUrl, pokeIndex });
  }, [props]);

  return (
    <div className="col-md-3 col-sm-6 mb-5">
      <Link to={`pokemon/${state.pokeIndex}`}>
        <Card className="card">
          <h5 className="card-header">{state.pokeIndex}</h5>
          {imgLoading ? (
            <img
              src={spinner}
              style={{ width: "5rem", height: "5rem" }}
              className="card-img-top rounded mx-auto d-block mt-2"
              alt=""
            />
          ) : null}
          <Sprite
            className="card-img-top rounded mx-auto mt-2"
            src={state.imageUrl}
            onLoad={() => setImgLoading(false)}
            onError={() => setTooManyRequests(true)}
            style={
              tooManyRequests
                ? { display: "none" }
                : imgLoading
                ? null
                : { display: "block" }
            }
          ></Sprite>
          {tooManyRequests ? (
            <h6 className="mx-auto">
              <span className="badge badge-danger mt-2">Too Many Requests</span>
            </h6>
          ) : null}
          <div className="card-body mx-auto">
            <h6 className="card-title">
              {
                // For every word capitlize the first character and join if name is more than 1 word
                state.name
                  .toLowerCase()
                  .split(" ")
                  .map(
                    (letter: string) =>
                      letter.charAt(0).toUpperCase() + letter.substring(1)
                  )
                  .join(" ")
              }
            </h6>
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default PokemonCard;
