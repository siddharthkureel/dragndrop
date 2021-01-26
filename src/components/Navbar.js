import React from 'react';

const Navbar = () => {
    return (
        <div style={styles.container} >
            <p style={styles.heading}>IMAGE SCANNER</p>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        width: '100%',
        background: '#85D6FF', 
        padding: '30px 0',
        marginBottom: '20px',
    },
    heading: {
        fontFamily: "'Francois One', sans-serif",
        margin: "auto", 
        color: "white", 
        transform: "scale(1.5)"
    }
}

export default Navbar;
