import React, { useCallback, useContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { JsonContext } from '../context/JsonContext';
import { ImageContext } from '../context/ImageContext';

const DropImage = () => {
    
    const [images, setImages] = useState([]);
    const [image, setImage] = useState('');
    const { setValue } = useContext(ImageContext);
    const { setJsonData } = useContext(JsonContext);
    const onDropAccepted = useCallback(acceptedFiles => {
        const objectURL = window.URL.createObjectURL(acceptedFiles[0]);
        setValue(objectURL)
        setImage(objectURL)
        setImages(images => images.concat(objectURL))
    }, [setValue])
    const { getRootProps, getInputProps} = useDropzone({ onDropAccepted });

    const handleChange = (e) => {
        setImage(e.target.value)
        setValue(e.target.value)
        setJsonData(null)
    }

    return (
        <div style={styles.container} >
            {
                images.length!==0 ?
                    <select style={styles.select} onChange={handleChange} value={image}>
                        {
                            images.map((item, i)=>(
                                <React.Fragment key={i}>
                                    <option value={item}>Image{i+1}</option>
                                </React.Fragment>
                            ))
                        }
                    </select> : null
            }
            <div style={styles.drop} {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop Images here, or click to select file</p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        width: '50%',
        display: 'block'
    },
    drop: {
        marginTop: '20px',
        border: '3px dotted red',
        width: '98%',
        height: '94%'
    },
    select: {
        position: 'absolute'
    }
}

export default DropImage;
