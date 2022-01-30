import {
    Box, Button, Center, Flex,Text,Icon
} from '@chakra-ui/react'

import { AiOutlineFileDone} from 'react-icons/ai'
import { useState, useEffect } from 'react';
import localforage from 'localforage';
import Dropzone from '../../components/dropzone'
import FileIconContainer from '../../components/fileIconContainer';
import FileListContainer from '../../components/fileListContainer';

function Upload() {

    const [files, setFiles] = useState([])

    const [iconHover, setIconHover] = useState(false)
    const [listHover, setListHover] = useState(false)

    const [file, setFile] = useState(null)

    const [isUploading, setUploadingStatus] = useState(false)
    const [uploadComplete, setUploadComplete] = useState(false)

    const backgroudnStyle = {
        padding: "10px",
        minHeight: "100vh",
        backgroundPosition: "0px -30vh",
        backgroundRepeat: "no-repeat",
        backgroundImage: "radial-gradient(50% 50% at 50% 50%, rgba(255, 0, 122, 0.1) 0%, rgba(255, 255, 255, 0) 100%)"
    }

    function onFileAccepted(acceptedFiles) {
        const preparedFiles = acceptedFiles.map((file, idx) => { return { file: file, isUploaded: false, id: files.length + file.name + Math.random().toFixed(2) } })
        setFiles([...files, ...preparedFiles])
        setUploadComplete(false)
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

    function sleep(time) {
        return new Promise(resolve => setTimeout(resolve, time))
    }

    function startUpload() {
        const store = localforage.createInstance({
            name: "pdfStore",
            storeName: "temp"
        });
        store.getItem('files').then(async data => {
            if (!data?.length) return
            console.log("Data for upload is", data);

            //fetch unique identifier
            const uniqueId = localStorage.getItem('uploadID') || Math.random()
            localStorage.setItem('uploadID', uniqueId)

            //set uploading status
            setUploadingStatus(true)

            //start uploading
            for (const file of data) {
                console.log("Files ", file.file.name, " is Uploaded : ", file.isUploaded);
                if (file.isUploaded) continue
                await sleep(5000)
                file.isUploaded = true
                setFiles([...data])

            }

            //movefiles to that identifier in localforage
            const permaStore = localforage.createInstance({
                name: "pdfStore",
                storeName: uniqueId
            });
            permaStore.setItem('files', data)

            //on Finish redirect to report page
            setUploadComplete(true)
            setUploadingStatus(false)

            removeAllFiles([])
        })
    }


    useEffect(() => {

        const store = localforage.createInstance({
            name: "pdfStore",
            storeName: "temp"
        });

        store.getItem('files').then(data => {
            console.log("Stored files are : ", data);
            if (data?.length) {
                setFiles(data)
            }
        })

    }, [])

    useEffect(() => {
        const store = localforage.createInstance({
            name: "pdfStore",
            storeName: "temp"
        });

        store.setItem("files", files).then(() => {
            console.log("Saved the data");
        })

    }, [files])

    return (
        <Box style={backgroudnStyle}>
            <Box margin="30vh auto 10vh auto" w="40vw" minW="280px" >
                <Dropzone onFileAccepted={onFileAccepted} />
                <FileIconContainer files={files} setFileName={setFileName} clearFileName={clearFileName} removeFile={removeFile} hoveredFile={file} iconHover={iconHover} ></FileIconContainer>

                {uploadComplete &&
                    <Center flexDirection="column"> 
                        <Text fontSize="2xl">Upload successful!!!</Text><Text margin="12px 0" fontSize="xl"> Go to reports</Text>
                        <Box>
                            <Button onClick={startUpload} isLoading={isUploading ? true : false} variant="solid" colorScheme="pink" size="lg" margin="20px 0">
                                <Icon
                                    color="white"
                                    fontSize='20'
                                    as={AiOutlineFileDone}
                                /> Reports
                            </Button>
                        </Box>
                    </Center>
                }
                {files?.length > 0 &&
                    <Center>
                        <Button
                            onClick={startUpload}
                            isLoading={isUploading ? true : false}
                            variant="solid"
                            colorScheme="pink"
                            size="lg"
                            margin="20px 0"
                        >
                            {files[0].isUploaded ? "Continue upload" : "Upload"}
                        </Button>
                    </Center>
                }


                <FileListContainer removeAllFiles={removeAllFiles} files={files} setFileName={setFileName} clearFileName={clearFileName} removeFile={removeFile} hoveredFile={file} listHover={listHover}></FileListContainer>
            </Box>
        </Box>
    )
}




export default Upload