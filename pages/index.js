import {
  Box, Link, Button, Center, Text, Flex
} from '@chakra-ui/react'

import { BiCloudUpload, } from 'react-icons/bi'
import { HiOutlineDocumentReport } from 'react-icons/hi'


function Home() {

  const backgroudnStyle = {
    padding: "10px",
    minHeight: "100vh",
    backgroundPosition: "0px -30vh",
    backgroundRepeat: "no-repeat",
    backgroundImage: "radial-gradient(50% 50% at 50% 50%, rgba(255, 0, 122, 0.1) 0%, rgba(255, 255, 255, 0) 100%)"
  }


  return (
    <Center style={backgroudnStyle}>
      <Flex style={{ outline: "2px", outlineStyle: "solid", outlineColor:"#D53F8C"}} borderRadius="4px" margin="-10vh 0 0 0"  flexDirection="column" justifyContent="center" alignItems="center" w="50vw" minW="280px" >
        
        <Box width="100%">

          <Text textAlign="center" fontSize="5xl" bg="pink.500" color="white" fontWeight="500" padding="20px" >
            Check Plagiarism
          </Text>

        </Box>

        <Center height="40vh" w="100%">

          <Link color='teal.500' href='/upload' margin="0 12px" _hover={{ textDecoration: "none" }}>
            <Button leftIcon={<BiCloudUpload />} colorScheme='pink' variant='solid'>
              Upload
            </Button>
          </Link>

          <Link color='teal.500' href='/report' margin="0 12px" _hover={{ textDecoration: "none" }}>
            <Button leftIcon={<HiOutlineDocumentReport />} colorScheme='pink' variant='solid'>
              Report
            </Button>
          </Link>

        </Center>

      </Flex>
    </Center>
  )
}


export default Home