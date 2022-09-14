import { useContext } from 'react';

import { DataContext } from './contexts/DataContext';

import Loading from './components/Loading';
import GameInterface from './components/GameInterface';
import PokeDisplay from './components/PokeDisplay';

function App() {
    const { loading } = useContext(DataContext);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="App">
            <PokeDisplay />
            <GameInterface />
        </div>
    );
}

export default App;
