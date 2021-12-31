import React, { useEffect, useState } from "react";
import { fetchAbility } from "../lib/zrpoke";

function Ability({ ability, onHide }) {
  const [abilityData, setAbilityData] = useState(null);

  useEffect(() => {
    fetchAbility(ability.url).then((response) => {
      setAbilityData(response.data);
    });
  }, [ability]);

  const capitalizedAbility =
    ability.name.charAt(0).toUpperCase() + ability.name.slice(1);

  return (
    <div className={styles.container} onClick={onHide}>
      <h1 className={styles.title}>{capitalizedAbility}</h1>
      <p className={styles.description}>{abilityData && abilityData.effect}</p>
    </div>
  );
}

const styles = {
  container:
    "absolute w-full h-full bg-slate-100 rounded-2xl p-4 hover:cursor-pointer overflow-auto",
  title: "text-lg text-slate-400 font-bold",
  description: "text-sm text-slate-400",
};

export default Ability;
