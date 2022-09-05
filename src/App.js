import { useContext } from 'react';

import { DataContext } from './contexts/DataContext';

import GameOptions from './components/GameOptions';

function App() {
    const { loading } = useContext(DataContext);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="App">
            <GameOptions />
        </div>
    );
}

export default App;
