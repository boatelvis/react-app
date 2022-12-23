import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

//Create component for pokemonrow
const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(', ')}</td>
    <td>
      <button 
      onClick={() => onSelect(pokemon)}>Select Pokemon</button>
    </td>
  </tr>
);

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
  onSelect: PropTypes.func.isRequired,
};

const PokemonInfo = ({ name, base }) => (
  <div>
    <h1>{name.english}</h1>
    <table>
      {
        Object.keys(base).map((key) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{base[key]}</td>
          </tr>
        ))
      }
    </table>
  </div> 
)

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  }),
}

function App() {
  const [search, searchSet] = React.useState("");
  const [pokemon, pokemonSet] = React.useState([]);
  const [selectPokemon, selectPokemonSet] = React.useState(null);
  
  React.useEffect(() => {
    fetch("http://localhost:3000/react-app/pokemon.json")
    .then((resp) => resp.json())
    .then((data) => pokemonSet(data));
  }, []);
  return (
    <div
      style={{
        margin: "auto",
        width: 800,
        paddingTop: "1rem"
      }}
    >
      <h1 className="title">Pokemon Search</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "70% 30%",
          gridColumnGap: "1rem",
        }}
      >
        <div>
          <input 
            value={search}
            onChange={(e) => searchSet(e.target.value)}
          />
          <table width="100%">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {pokemon
              .filter((pokemon) => pokemon.name.english.toLowerCase().includes(search.toLowerCase()))
              .slice(0, 20).map((pokemon) => (
                <PokemonRow pokemon={pokemon} key={pokemon.id} onSelect={(pokemon) => selectPokemonSet(pokemon)} />
              ))}
            </tbody>
          </table>
        </div>
        {selectPokemon && (
          <PokemonInfo {...selectPokemon} />
        )}
      </div>
    </div>
  );
}

export default App;
