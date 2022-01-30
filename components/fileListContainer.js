import {
    Box, Center, Flex, Icon, Fade, List, ListIcon, Tooltip, ButtonGroup, Button
} from '@chakra-ui/react'

import { MdOutlineClose, MdCheckCircle } from 'react-icons/md'
import { GoPrimitiveDot } from 'react-icons/go'



function FileListContainer({ removeAllFiles, files, setFileName, clearFileName, removeFile, hoveredFile, listHover }) {
    return (
        <List spacing={3} margin="50px 0 0 0" >
            <Fade in={files.length}>
                <Flex justifyContent="space-between" alignItems="center" margin="0 0 18px 0">
                    <Box fontWeight="bold">Total files selected : {files.length}</Box>
                    <ButtonGroup variant='outline' spacing='6' onClick={removeAllFiles}>
                        <Button colorScheme='pink' variant='solid'>Clear All
                            <Icon
                                color="white"
                                ml="4px"
                                cursor="pointer"
                                fontSize='20'
                                as={MdOutlineClose}
                            />
                        </Button>
                    </ButtonGroup>
                </Flex>
            </Fade>

            {files.map(file =>
                <Flex
                    key={file.id}
                    alignItems="center"
                    justifyContent="space-between"
                    _hover={{ bg: 'gray.100' }}
                    padding="8px"
                    borderRadius="4px"
                    transition="all ease 0.3s"
                    onMouseEnter={() => { setFileName(file, true) }}
                    onMouseLeave={() => { clearFileName(true) }}>
                    <Box>
                        <ListIcon
                            as={file.isUploaded ? MdCheckCircle : GoPrimitiveDot}
                            color={file.isUploaded ? 'green.500' : 'black'} />
                        {file.file.name}
                    </Box>
                    <Tooltip label='Remove file' fontSize='md' placement='top'>
                        <Fade in={listHover && hoveredFile?.id == file.id}>
                            <Center>

                                <Icon
                                    color="red.600"
                                    cursor="pointer"
                                    fontSize='20'
                                    as={MdOutlineClose}
                                    onClick={() => removeFile(file.id)} />
                            </Center>
                        </Fade>
                    </Tooltip>
                </Flex>
            )
            }
        </List >)
}


export default FileListContainer