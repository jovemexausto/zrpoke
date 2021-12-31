import React, { useState } from "react";
import Ability from "./Ability";

function Pokemon({ pokemon }) {
  const [shownAbility, setShownAbility] = useState(null);
  const pokemonName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <div className={styles.container}>
      <img className={styles.image} src={pokemon.image} alt={pokemon.name} />
      <div className={styles.info}>
        <h1 className={styles.name}>{pokemonName}</h1>
        <h2 className={styles.abilityTitle}>Habilidades:</h2>
        <ul>
          {pokemon.abilities.map((ability, index) => (
            <li
              className={styles.ability}
              key={index}
              onClick={() => setShownAbility(ability)}
            >
              {ability.name}
            </li>
          ))}
        </ul>
      </div>
      {shownAbility && (
        <Ability ability={shownAbility} onHide={() => setShownAbility(null)} />
      )}
    </div>
  );
}

const styles = {
  image: "w-40 h-40 mx-auto mr-[25px]",
  container:
    "bg-slate-100 p-4 pl-[50px] pr-[50px] rounded-2xl absolute top-72 flex items-center justify-center overflow-auto",
  name: "text-3xl text-slate-500 font-bold",
  info: "h-full w-full flex flex-col",
  abilityTitle: "text-lg text-slate-400 font-bold",
  ability: "text-sm text-slate-500 hover:underline hover:cursor-pointer",
};

export default Pokemon;
