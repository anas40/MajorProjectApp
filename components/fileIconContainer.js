import {
    Box, Center, Icon, Fade
} from '@chakra-ui/react'
import { MdCancel } from 'react-icons/md'
import { AiFillCheckCircle } from 'react-icons/ai'


import Image from 'next/image'
import documentImage from '../assets/images/doc.png'

function FileIconContainer({ files, setFileName, clearFileName, removeFile, hoveredFile, iconHover }) {
    return (<>
        <Center margin="50px 0 0 0">
            {files.map(file => {
                return (
                    <Box
                        key={file.id}
                        onMouseOver={() => { setFileName(file) }}
                        onMouseLeave={() => { clearFileName() }}
                        position="relative"
                        margin="0 12px"
                        _hover={{ transform: 'scale(0.9)' }}
                    >

                        <Fade in={file.isUploaded}>
                            <Icon
                                color="green.500"
                                fontSize='20'
                                position="absolute"
                                left="-3"
                                top="-3"
                                as={AiFillCheckCircle}
                            />
                        </Fade>

                        <Image
                            cursor="pointer"
                            height="30px"
                            width="30px"
                            key={file.id}
                            src={documentImage}
                        />

                        <Fade in={iconHover && hoveredFile?.id == file.id}>
                            <Icon
                                color="red.500"
                                cursor="pointer"
                                fontSize='20'
                                position="absolute"
                                right="-3"
                                top="-3"
                                as={MdCancel}
                                onClick={() => removeFile(file.id)}
                            />
                        </Fade>

                    </Box>
                )
            })}
        </Center>

        <Center margin="12px 0" height="16px">
            {iconHover && hoveredFile?.file.name}
        </Center>

    </>
    )
}

export default FileIconContainer