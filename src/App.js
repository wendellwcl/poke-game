import { useEffect } from "react";

function App() {

  useEffect(() => {

    function requestPokemon(){
      fetch('https://pokeapi.co/api/v2/pokemon/ditto/')
      .then(response => { return response.json()})
      .then(data => { console.log(data)})
    };
    requestPokemon();

    function requestGeneration(){
      fetch('https://pokeapi.co/api/v2/generation/')
      .then(response => { return response.json()})
      .then(data => { console.log(data)})
    };
    requestGeneration();

  }, [])

  return (
    <div className="App">
      Hello World
    </div>
  );
};

export default App;