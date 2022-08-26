import { createContext } from 'react';
import useFetch from '../hooks/useFetch';

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const generations = useFetch('https://pokeapi.co/api/v2/generation');
  const poke = useFetch('https://pokeapi.co/api/v2/pokemon/ditto/');

  console.log(generations, poke);

  return <DataContext.Provider value={{}}>{children}</DataContext.Provider>;
};
