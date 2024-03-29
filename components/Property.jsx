import Link from "next/link";
import Image from "next/image";
import { Box, Text, Flex, Avatar } from "@chakra-ui/react";
import millify from "millify";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import defaultImage from "../assets/house.jpg";

const Property = ({
  property: {
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    externalID,
  },
}) => (
  <Link href={`/property/${externalID}`} passHref>
    <Flex
      flexWrap="wrap"
      p="5"
      justifyContent="flex-start"
      cursor="pointer"
      w="420px"
      paddingTop="0"
    >
      <Box>
        <Image
          src={coverPhoto ? coverPhoto.url : defaultImage}
          alt="house"
          width={400}
          height={260}
        />
      </Box>
      <Box>
        <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <Box paddingRight="3" color="green.400">
              {isVerified && <GoVerified />}
            </Box>
            <Text fontWeight="bold" fontSize="lg">
              AED {millify(price)}
              {rentFrequency && `/${rentFrequency}`}{" "}
            </Text>
          </Flex>
          <Box>
            <Avatar size="sm" src={agency?.logo?.url} />
          </Box>
        </Flex>
        <Flex
          alignItems="center"
          p="1"
          w="250px"
          color="blue.400"
          justifyContent="space-between"
        >
          {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft{" "}
          <BsGridFill />
        </Flex>
        <Text fontSize="lg">
          {" "}
          {title.length > 30 ? `${title.substring(0, 30)}...` : title}{" "}
        </Text>
      </Box>
    </Flex>
  </Link>
);

export default Property;
