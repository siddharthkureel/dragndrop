import React, { useLayoutEffect, useContext, useState } from 'react';
import Modal from 'react-modal';

import { SelectWordContext } from '../context/SelectWordContext';

const ReactModal = ({ data, toggle, setToggle }) => {

    const [name, setName] = useState('');
    const [disabled, setDisabled] = useState(false);
    const { selectWord, setSelectWord } = useContext(SelectWordContext);
    
    useLayoutEffect(()=>{
        const element = document.getElementById(data.id);
        if(element.style.stroke==='green'){
            setDisabled(true)
        }
    },[data])

    const handleDelete = (id) => {
        const element = document.getElementById(id);
        element.parentNode.removeChild(element);
        setToggle(false);
    }
    
    const handleSelect = (id) => {
        const element = document.getElementById(id);
        element.style.stroke='green';
        if(name){
            data.name=name;
            setName('')
        }
        setSelectWord([...selectWord].concat(data));
        setToggle(false);
    }

    return (
        <Modal
            isOpen={toggle}
            onRequestClose={()=>setToggle(false)}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div style={styles.container} >
                {
                    !disabled ? 
                    <div>
                        Name:&nbsp;
                        <input 
                            value={name} 
                            onChange={(e)=>setName(e.target.value)} 
                            placeholder="Enter Field name" 
                        />
                    </div>
                    : null
                }
                    <p>Text: {data.text}</p>
                    <p>Confidence: {data.confidence}</p>
                {
                    data.main ?
                    <ul>
                        {
                            data.words.map((word, i)=>(
                                <li key={i} >
                                    Text: {word.text} <br/>
                                    Confidence: {word.confidence}
                                </li>
                            ))
                        }
                    </ul>
                    : null
                }
            </div>
            <div style={styles.buttonContainer} >
                <button style={styles.gray} onClick={()=>setToggle(false)}>close</button>
                <button style={styles.red} onClick={()=>handleDelete(data.id)}>delete</button>
                <button style={styles.green} disabled={disabled} onClick={()=>handleSelect(data.id)}>select</button>
            </div>
        </Modal>
    );
}

const button = {
    border: "none", 
    color: "white", 
    padding: "10px 25px", 
    textAlign: "center", 
    textDecoration: "none", 
    display: "inline-block", 
    fontSize: "16px"
}

const styles = {
    container: {
        display: 'block',
        height: '80%',
        overflowY: 'scroll'
    },
    buttonContainer: {
        display: 'flex',
        position: 'relative',
        justifyContent: 'space-between',
        bottom: '-10px',
        
    },
    green: {
        backgroundColor: "#4CAF50",
        ...button
    },
    red: {
        backgroundColor: '#f44336',
        ...button
    },
    gray: {
        backgroundColor: "#e7e7e7", 
        ...button,
        color: "black",
    }
}

Modal.defaultStyles.content.height = '250px';
Modal.defaultStyles.content.width = '350px';
Modal.defaultStyles.content.margin = 'auto';

export default ReactModal;
