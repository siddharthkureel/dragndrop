import React, { useState, useContext } from 'react';

import ReactModal from '../components/Modal';
import { JsonContext } from '../context/JsonContext';

const SvgPath = ({ height, width }) => {
    const [toggle, setToggle] = useState(false);
    const [data, setData] = useState(null);
    const { jsonData } = useContext(JsonContext);
    const { readResults } = jsonData.analyzeResult;
    const readLines = readResults[0].lines;

    const handleModal = (data) => {
        setData(data)
        setToggle(true)
    }

    const handleReadLines = () => {
        return Object.keys(readLines).map((i) => (
            <>
                <polygon 
                    id={`i${i}`}
                    points={polygonPoints(readLines[i].boundingBox)}
                    key={`i${i}`}
                    style={styles.polygon}
                    onClick={()=>handleModal({
                        words: readLines[i].words,
                        text: readLines[i].text,
                        confidence: readLines[i].appearance.style.confidence,
                        main: true,
                        id: `i${i}`
                    })}
                />
                {
                    Object.keys(readLines[i].words).map((j) => (
                        <polygon 
                            id={`i${i}j${j}`}
                            points={polygonPoints(readLines[i].words[j].boundingBox)}
                            key={`i${i}j${j}`}
                            style={styles.polygon}
                            onClick={()=>handleModal({
                                text: readLines[i].words[j].text,
                                confidence: readLines[i].words[j].confidence,
                                main: false,
                                id: `i${i}j${j}`
                            })}
                        />
                    ))
                }
            </>
            )
        )
    }

    return (
        <>
            <svg style={styles.svg} height={height} width={width}>
                {handleReadLines()}
            </svg>
            { data ? 
            <ReactModal toggle={toggle} data={data} setToggle={setToggle}/> 
            : null }
        </>
    );
}

const styles = {
    svg: {
        position: 'absolute'
    },
    polygon: { 
        fill:'transparent',
        stroke:'black',
        strokeWidth:'2'
    }
}

const polygonPoints = (arr) => {
    return `${arr[0]},${arr[1]} ${arr[2]},${arr[3]} ${arr[4]},${arr[5]} ${arr[6]},${arr[7]}`
}

export default SvgPath;