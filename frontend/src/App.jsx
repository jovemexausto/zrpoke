import Logo from "./components/Logo";
import SearchBar from "./components/SearchBar";
import usePokemon from "./hooks/usePokemon";
import Pokemon from "./components/Pokemon";
import Error from "./components/Error";
import Loading from "./components/Loading";

function App() {
  const { pokemon, loading, hasError, setQuery } = usePokemon();

  async function handleSubmit(value) {
    setQuery(value);
  }

  return (
    <>
      <div className="absolute top-16">
        <Logo />
        <SearchBar onSubmit={handleSubmit} />
      </div>
      {loading && <Loading />}
      {hasError && <Error />}
      {pokemon && <Pokemon pokemon={pokemon} />}
    </>
  );
}

export default App;
