import { useContext } from 'react';
import { DataContext } from './contexts/DataContext';

function App() {
    const { generationsList } = useContext(DataContext);

    return (
        <div className="App">
            {generationsList.map((item, index) => (
                <div key={index}>{item.name}</div>
            ))}
        </div>
    );
}

export default App;
