import { useContext } from 'react';

import { DataContext } from './contexts/DataContext';

import Loading from './components/Loading';
import ErrorPage from './components/ErrorPage';
import GameInterface from './components/GameInterface';
import PokeDisplay from './components/PokeDisplay';

function App() {
    const { loading, error } = useContext(DataContext);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorPage />;
    }

    return (
        <div className="App">
            <PokeDisplay />
            <GameInterface />
        </div>
    );
}

export default App;
