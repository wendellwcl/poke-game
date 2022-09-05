import { useContext } from 'react';

import { DataContext } from './contexts/DataContext';

import GameInterface from './components/GameInterface';
import PokeDisplay from './components/PokeDisplay';

function App() {
    const { loading } = useContext(DataContext);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="App">
            <PokeDisplay />
            <GameInterface />
        </div>
    );
}

export default App;
