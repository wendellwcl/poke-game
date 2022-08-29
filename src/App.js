import { useContext } from 'react';
import { DataContext } from './contexts/DataContext';

import CustomCheckbox from './components/CustomCheckbox';

function App() {
    const { generationsList } = useContext(DataContext);

    return (
        <div className="App">
            {generationsList.map((item, index) => (
                <CustomCheckbox
                    key={index}
                    name={item.name}
                />
            ))}
        </div>
    );
}

export default App;
