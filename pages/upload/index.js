import {
    Box
} from '@chakra-ui/react'

import { useState } from 'react';

import Dropzone from '../../components/dropzone'
import FileIconContainer from '../../components/fileIconContainer';
import FileListContainer from '../../components/fileListContainer';

function Upload() {

    const [files, setFiles] = useState([])

    const [iconHover, setIconHover] = useState(false)
    const [listHover, setListHover] = useState(false)

    const [file, setFile] = useState(null)

    const backgroudnStyle = {
        padding: "10px",
        minHeight: "100vh",
        backgroundPosition: "0px -30vh",
        backgroundRepeat: "no-repeat",
        backgroundImage: "radial-gradient(50% 50% at 50% 50%, rgba(255, 0, 122, 0.1) 0%, rgba(255, 255, 255, 0) 100%)"
    }

    function onFileAccepted(acceptedFiles) {
        const preparedFiles = acceptedFiles.map((file, idx) => { return { file: file, id: files.length + file.name + Math.random().toFixed(2) } })
        setFiles([...files, ...preparedFiles])
    }

    function removeFile(id) {
        const filteredFiles = files.filter(file => file.id !== id)
        setFiles(filteredFiles)
    }

    function removeAllFiles() {
        setFiles([])
    }

    function setFileName(_file = null, _isListHover = false) {
        setFile(_file)
        if (_isListHover) {
            setListHover(true)
        } else {
            setIconHover(true)
        }
    }

    function clearFileName(_isListHover = false) {
        setFile(null)
        if (_isListHover) {
            setListHover(false)
        } else {
            setIconHover(false)
        }
    }


    return (
        <Box style={backgroudnStyle}>
            <Box margin="30vh auto 10vh auto" w="40vw" minW="280px" >
                <Dropzone onFileAccepted={onFileAccepted} />
                <FileIconContainer files={files} setFileName={setFileName} clearFileName={clearFileName} removeFile={removeFile} hoveredFile={file} iconHover={iconHover} ></FileIconContainer>
                <FileListContainer removeAllFiles={removeAllFiles} files={files} setFileName={setFileName} clearFileName={clearFileName} removeFile={removeFile} hoveredFile={file} listHover={listHover}></FileListContainer>
            </Box>
        </Box>
    )
}




export default Upload