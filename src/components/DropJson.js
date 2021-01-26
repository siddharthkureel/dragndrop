import React, { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';

import { JsonContext } from '../context/JsonContext';

const DropJson = () => {
    const { setJsonData } = useContext(JsonContext);
    const onDropAccepted = useCallback(acceptedFiles => {
        const fileReader = new FileReader();
        fileReader.readAsText(acceptedFiles[0]);
        fileReader.onload = () => {
            const { readResults, documentResults } = JSON.parse(fileReader.result).analyzeResult;
            setJsonData({
                analyzeResult: {
                    readResults,
                    documentResults
                }
            });
        };
    }, [setJsonData])

    const { getRootProps, getInputProps} = useDropzone({ onDropAccepted, accept: 'application/json' });
    return (
        <div style={styles.container} >
            <div style={styles.drop} {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop Corresponding JSON files here, or click to select file</p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        width: '50%'
    },
    drop: {
        marginTop: '20px',
        border: '3px dotted gold',
        width: '98%',
        height: '94%'
    }
}

export default DropJson;
