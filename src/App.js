import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';

//Create component for pokemonrow
const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(', ')}</td>
    <td>
      <Button variant="outlined" 
      onClick={() => onSelect(pokemon)}>Select Pokemon</Button>
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
    <Title primary>{name.english}</Title>
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

const Title = styled.h1`
  text-align: ${props => (props.primary ? 'justify' : 'start')};
  color: ${props => (props.primary ? 'hotpink' : 'turquoise')};
`

const ColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
  grid-column-gap: 1rem;
`

const Container = styled.div`
  margin: auto;
  width: 900px;
  padding-top: 1rem;
`

const Input = styled.input`
  width: 100%;
  font-size: x-large;
`

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
    <Container>
      <Title>Pokemon Search</Title>
      <ColumnLayout>
        <div>
          <Input 
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
      </ColumnLayout>
    </Container>
  );
}

export default App;
