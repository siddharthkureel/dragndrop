import React, { useState } from 'react';

import Navbar from './components/Navbar';
import Home from "./pages/Home";
import { ImageContext } from './context/ImageContext';
import { JsonContext } from './context/JsonContext';
import { SelectWordContext } from './context/SelectWordContext';


const App = () => {
    const [value, setValue] = useState(null);
    const [jsonData, setJsonData] = useState(null);
    const [selectWord, setSelectWord] = useState([]);
    return (
        <div style={styles.container} >
            <SelectWordContext.Provider value={{ selectWord, setSelectWord }}>
                <JsonContext.Provider  value={{ jsonData, setJsonData }}>
                    <ImageContext.Provider value={{ value, setValue }} >
                        <Navbar />
                        <Home/>
                    </ImageContext.Provider>
                </JsonContext.Provider>
            </SelectWordContext.Provider>
        </div>
    );
}

const styles = {
    container: {
        margin: '0 5%'
    }
}

export default App;
