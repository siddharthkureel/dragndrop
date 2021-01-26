import React, { useRef, useLayoutEffect, useState, useContext } from 'react';

import { JsonContext } from '../context/JsonContext';
import SvgPath from './SvgPath';

const Canvas = ({ image }) => {
    const canvas = useRef(null);
    const [width, setWidth] = useState(700);
    const [height, setHeight] = useState(800);
    const { jsonData } = useContext(JsonContext);
    
    useLayoutEffect(() => {
        const context = canvas.current.getContext("2d");
        const imageObj1 = new Image();
        imageObj1.src = image
        imageObj1.onload = function() {
            setWidth(this.width)
            setHeight(this.height)
            context.drawImage(imageObj1, 0,0, this.width, this.height)
        }
    },[image]);
    
    return (
        <>
            {
                !jsonData ? null:<SvgPath width={width} height={height}/>
            }
            <canvas ref={canvas} width={width} height={height}  />
        </>
    );
}
export default Canvas;