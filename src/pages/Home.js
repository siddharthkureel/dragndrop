import React, { useContext } from 'react';

import Canvas from '../components/Canvas';
import DropImage from '../components/DropImage';
import DropJson from '../components/DropJson';
import Sidebar from '../components/Sidebar';
import { ImageContext } from '../context/ImageContext';

const Home = () => {
    const { value } = useContext(ImageContext);
    return (
        <div style={styles.container} >
            <div style={styles.row} >
                <DropImage />
                {value ? <DropJson /> : null}
            </div>
            <div>
                {value ? <Canvas image={value} /> : null}
                <Sidebar/>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'block',
        width: '100%',
        height: '80vh'
    },
    row: {
        display: 'flex',
        marginBottom: '30px'
    }
}

export default Home;
