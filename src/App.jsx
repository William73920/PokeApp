import { useEffect, useState } from "react";

import "./App.css";
import Pokesearch from "./components/Pokesearch/Pokesearch";
import Pokecard from "./components/Pokecard/Pokecard";
import axios from "axios";
import { MagnifyingGlass } from "react-loader-spinner";

function App() {
  const [pokemonList, setPokemonList] = useState([]); // Holds the complete list of Pokémon
  const [searchQuery, setSearchQuery] = useState(""); // Holds the search input value
  const [filteredPokemon, setFilteredPokemon] = useState([]); // Holds the filtered list of Pokémon based on the search query
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch Pokémon data from the API
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=500&offset=0"
        );
        console.log(response);
        const pokemonData = await Promise.all(
          response?.data?.results.map(async (pokemon) => {
            const details = await axios.get(pokemon.url);
            return details.data;
          })
        );

        setPokemonList(pokemonData); // Set the complete list of Pokémon
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        setLoading(false);
      }
    };

    fetchPokemon(); // Fetch the Pokémon when the component mounts
  }, []);

  useEffect(() => {
    // Filter the Pokémon list based on the search query
    if (!searchQuery) {
      setFilteredPokemon(pokemonList);
      return;
    }

    setFilteredPokemon(
      pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, pokemonList]);

  return (
    <div className="container">
      <div id="heading">
        <h1>Pokesearch App</h1>
      </div>
      <Pokesearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="pokecard-container">
        {loading ? (
          <MagnifyingGlass />
        ) : (
          filteredPokemon.map((pokemon) => (
            <Pokecard key={pokemon.id} pokemon={pokemon} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
