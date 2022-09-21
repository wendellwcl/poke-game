import { useContext } from 'react';

import { DataContext } from './contexts/DataContext';

import Loading from './components/UI/Loading';
import ErrorPage from './components/ErrorPage';
import Game from './pages/Game';

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
            <Game />
        </div>
    );
}

export default App;
