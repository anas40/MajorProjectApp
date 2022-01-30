import {
    Box, Center, Icon, Fade
} from '@chakra-ui/react'
import { MdOutlineClose } from 'react-icons/md'

import Image from 'next/image'
import documentImage from '../assets/images/doc.png'

function FileIconContainer({ files, setFileName, clearFileName, removeFile, hoveredFile, iconHover }) {
    return (<>
        <Center margin="50px 0 0 0">
            {files.map(file => {
                return (
                    <Box
                        onMouseEnter={() => { setFileName(file) }}
                        onMouseLeave={() => { clearFileName() }}
                        position="relative"
                        margin="0 12px"
                        _hover={{ transform: 'scale(0.9)' }}
                    >

                        <Image
                            cursor="pointer"
                            height="30px"
                            width="30px"
                            key={file.id}
                            src={documentImage}
                        />

                        <Fade in={iconHover && hoveredFile?.id == file.id}>
                            <Icon
                                color="red.600"
                                cursor="pointer"
                                fontSize='20'
                                position="absolute"
                                right="-3"
                                top="-3"
                                as={MdOutlineClose}
                                mr={0}
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