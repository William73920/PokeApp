import React from "react";
import "./Pokecard.css";

const Pokecard = ({ pokemon }) => {
  return (
    <div className="pokecard">
      <div className="pokeNumber">#{pokemon.id}</div>
      <div className="pokeImage">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
          alt={pokemon.name}
          loading="lazy"
        />
      </div>
      <div className="pokeDetails">
        <h3 className="pokeName">{pokemon.name}</h3>
        <p>Type: {pokemon.types[0].type.name}</p>
        <p>Height: {pokemon.height / 10} m</p>
        <p>Weight: {pokemon.weight / 10} kg</p>
      </div>
    </div>
  );
};

export default Pokecard;
