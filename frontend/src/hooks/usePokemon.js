import { useEffect, useState } from "react";
import { fetchPokemon } from "../lib/zrpoke";

export default function usePokemon() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setHasError(false);
    setPokemon(null);
    if (query !== "") {
      setLoading(true);
      fetchPokemon(query.toLowerCase())
        .then((response) => {
          setPokemon(response.data);
        })
        .catch(() => {
          setHasError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [query]);

  return { pokemon, loading, hasError, setQuery };
}
