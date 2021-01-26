import React, { useContext } from 'react';
import ReactDOM from "react-dom";

import { SelectWordContext } from '../context/SelectWordContext';
import close from '../images/close.png';
import menu from '../images/menu.png';

const Sidebar = () => {
    const { selectWord, setSelectWord } = useContext(SelectWordContext);
    const handleClear = () => {
        selectWord.map((item)=>{
            const element = document.getElementById(item.id);
            return element.style.stroke='black';
        })
        setSelectWord([])
        closeNav()
    }
    return ReactDOM.createPortal(
        <div id="mySidenav" style={styles.sidenav}>
            {
                selectWord.length>0 ? 
                    <span id='count' style={styles.open} onClick={openNav}>
                        <img src={menu} alt="Menu" />
                    </span>
                : ''
            }
            <span className="closebtn" style={styles.close} onClick={closeNav}>
                <img style={styles.close} src={close} alt="close" />
            </span>
            <ol>
            {
                selectWord.map((item, i)=>(
                    <li key={i} style={styles.li} >
                        Text: {item.text} <br/>
                        Confidence: {item.confidence}<br/>
                        {item.name ? (`Name : ${item.name}`) : ''}
                        {item.main ?
                            <ul>
                                {
                                    item.words.map(word=>(
                                        <li>
                                            Text: {word.text} <br/>
                                            Confidence: {word.confidence}
                                        </li>
                                    ))
                                }
                            </ul>
                        : null}
                    </li>
                ))
            }
            </ol>
            <div style={styles.buttonContainer} >
                {
                    selectWord.length>0 ?
                    <button style={styles.button} onClick={()=>handleClear()}>Clear</button>
                    :
                    null
                }
            </div>
        </div>,
        document.querySelector('#sidenav')
    )
}
export default Sidebar

const styles = { 
    sidenav:{
        height: "100%", 
        width: "0", 
        position: "fixed", 
        zIndex: "1", 
        top: "0", 
        left: "0", 
        backgroundColor: "white", 
        overflowX: "hidden", 
        paddingTop: "60px", 
        transition: "0.5s",
        WebkitBoxShadow: "4px 0px 5px -2px rgba(0,0,0,0.75)", 
        MozBoxShadow: "4px 0px 5px -2px rgba(0,0,0,0.75)", 
        boxShadow: "4px 0px 5px -2px rgba(0,0,0,0.75)",
        "sidenav closebtn":{
            position: "absolute", 
            top: "0", 
            right: "25px", 
            fontSize: "36px", 
            marginLeft: "50px"
        }
    },
    open:{
        fontSize: "30px", 
        cursor: "pointer", 
        padding: '2px 10px',
        position:'fixed'
    },
    close:{
        cursor: "pointer",
        top: '0px',
        right: '0px',
        position: 'absolute',
        margin: '20px'
    },
    li:{
        margin: '10px 0'
    },
    buttonContainer: {
        display: "flex", 
        justifyContent: "center"
    },
    button: {
        border: "none", 
        color: "white", 
        padding: "10px 25px", 
        textAlign: "center", 
        textDecoration: "none", 
        display: "inline-block", 
        fontSize: "16px",
        backgroundColor: '#f44336'
    }
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("count").style.display = "initial";
}

function openNav() {
    document.getElementById("mySidenav").style.width = "350px";
    document.getElementById("count").style.display="none";
}