import { useEffect, useState } from "react";

function App() {

  const [ nome, setNome ] = useState();
  const [ img, setImg ] = useState();

  useEffect(() => {

    function requestPokemon(){
      fetch('https://pokeapi.co/api/v2/pokemon/ditto/')
      .then(response => { return response.json() })
      .then(data => { 
        setNome(data.name); //Nome do Pokemon
        setImg(data.sprites.other['official-artwork'].front_default); //Imagem do Pokemon
      });
    };
    requestPokemon();

    function requestGeneration(){
      fetch('https://pokeapi.co/api/v2/generation/')
      .then(response => { return response.json() })
      .then(data => {console.log(data)})
    };
    requestGeneration();

  }, []);

  return (
    <div className="App">
      <h1>{nome}</h1>
      <img src={img} alt='alt' />
    </div>
  );
};

export default App;