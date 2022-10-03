import { useContext, useEffect } from 'react';

import { DataContext } from './contexts/DataContext';

import Loading from './components/UI/Loading';
import ErrorScreen from './components/UI/ErrorScreen';
import Game from './pages/Game';

import useStart from './hooks/useStart';

function App() {
    const { loading, error, generationsList } = useContext(DataContext);
    const { start } = useStart();

    useEffect(() => {
        if (generationsList.length > 0) {
            start();
        }

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [generationsList]);

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
