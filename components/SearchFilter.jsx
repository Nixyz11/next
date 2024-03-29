import { useEffect,useState } from "react";
import { useRouter } from "next/router";
import {MdCancel} from 'react-icons/md'
import Image from "next/image";
import { Flex,Box,Select,Text,Input,Spinner,Button,Icon, filter } from "@chakra-ui/react";
import { filterData, getFilterValues } from "../utils/filterData";
import noresult from '../assets/noresult.svg'
const SearchFilter =() => {
/* const [filters,setFilters] = useState(filterData); */
  const router = useRouter()
  const [filters] = useState(filterData);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationData, setLocationData] = useState();
 const [showLocations, setShowLocations] = useState(false);
  const [loading, setLoading] = useState(false);



const searchProperties =(filterValues)=>{
    const path = router.pathname
    const {query} = router
    const values = getFilterValues(filterValues)
   


    values.forEach((item)=>{
        query[item.name] = item.value
    })

    router.push({pathname: path, query})
}

    return (
        <Flex p="4" justifyContent="center" flexWrap="wrap" bg="gray.100">
            {filters.map((filter) =>(
                <Box key={filter.queryName}>
                    <Select placeholder={filter.placeholder}
                    w="fit-content"
                    p="2"
                    onChange={(e) => searchProperties({[filter.queryName]: e.target.value})}>
                        {filter?.items?.map((item) => (
                            <option value={item.value} key={item.value}>{item.name}</option>
                        ))}
                    </Select>


                </Box>
            ))}
     <Flex flexDir='column'>
        <Button onClick={() => setShowLocations(!showLocations)} border='1px' borderColor='gray.200' marginTop='2' >
          Search Location
        </Button>
        {showLocations && (
          <Flex flexDir='column' pos='relative' paddingTop='2'>
            <Input
              placeholder='Type Here'
              value={searchTerm}
              w='300px'
              focusBorderColor='gray.300'
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm !== '' && (
              <Icon
                as={MdCancel}
                pos='absolute'
                cursor='pointer'
                right='5'
                top='5'
                zIndex='100'
                onClick={() => setSearchTerm('')}
              />
            )}
            {loading && <Spinner margin='auto' marginTop='3' />}
            {showLocations && (
              <Box height='300px' overflow='auto'>
                {locationData?.map((location) => (
                  <Box
                    key={location.id}
                    onClick={() => {
                      searchProperties({ locationExternalIDs: location.externalID });
                      setShowLocations(false);
                      setSearchTerm(location.name);
                    }}
                  >
                    <Text cursor='pointer' bg='gray.200' p='2' borderBottom='1px' borderColor='gray.100' >
                      {location.name}
                    </Text>
                  </Box>
                ))}
                {!loading && !locationData?.length && (
                  <Flex justifyContent='center' alignItems='center' flexDir='column' marginTop='5' marginBottom='5' >
                    <Image src={noresult} />
                    <Text fontSize='xl' marginTop='3'>
                      Waiting to search!
                    </Text>
                  </Flex>
                )}
              </Box>
            )}
          </Flex>
        )}
      </Flex>


        </Flex>
    )
}

export default SearchFilter;








