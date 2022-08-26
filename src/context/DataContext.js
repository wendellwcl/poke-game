import { createContext, useEffect } from 'react';

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/generation')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });

    fetch('https://pokeapi.co/api/v2/pokemon/ditto/')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }, []);

  return <DataContext.Provider value={{}}>{children}</DataContext.Provider>;
};
