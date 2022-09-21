import { useContext } from 'react';

import { DataContext } from './contexts/DataContext';

import Loading from './components/UI/Loading';
import ErrorScreen from './components/UI/ErrorScreen';
import Game from './pages/Game';

function App() {
    const { loading, error } = useContext(DataContext);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorScreen />;
    }

    return (
        <div className="App">
            <Game />
        </div>
    );
}

export default App;
