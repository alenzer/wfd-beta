import React from "react";
import { Flex, Text, Image, Button, Link } from "@chakra-ui/react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 3000, min: 2000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 2000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function Highlights() {
  return (
    <Flex
      width="100%"
      position="relative"
      alignItems="center"
      flexDirection="column"
      my={{ base: "5em", md: "8em", lg: "10em" }}
    >
      <Text
        fontSize={{ base: "20px", md: "48px" }}
        fontWeight="700"
        color="#6ACEF5"
      >
        HIGHLIGHTS
      </Text>
      <Flex
        mt="28px"
        pb="2em"
        width="100%"
        position="relative"
        bgRepeat="no-repeat"
        flexDirection="column"
        backgroundSize="cover"
        justifyContent="flex-start"
      >
        <Carousel
          infinite
          autoPlay={false}
          swipeable={true}
          draggable={true}
          // showThumbs={false}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          responsive={responsive}
          transitionDuration={500}
          arrows={false}
          showDots={true}
        >
          {projects.map((item, index) => (
            <Flex
              zIndex={"4"}
              margin="0 auto"
              border="3px solid #69E4FF"
              borderRadius="20px"
              alignItems={"center"}
              position={"relative"}
              flexDirection={{ base: "column", md: "column", lg: "row" }}
              justifyContent={"left"}
              // width={{ base: '95%', md: '90%', lg: '65em' }}
              mx={{ base: "20px", md: "20px", lg: "120px" }}
              key={index}
            >
              <Flex
                display={{ sm: "flex", md: "flex", lg: "none" }}
                w="100%"
                p="6px"
              >
                <Image src={item.img} />
              </Flex>
              <Flex
                direction="column"
                px={{ base: "11px", md: "11px", lg: "60px" }}
                py={{ base: "19px", md: "19px", lg: "19px" }}
              >
                <Text
                  fontFamily="PilatExtended-Bold"
                  fontSize={{ sm: "18px", md: "15px", lg: "32px" }}
                  fontWeight="400"
                >
                  {item.title}
                </Text>
                <Text
                  fontFamily={"Sk-Modernist-Regular"}
                  fontSize={{ sm: "14px", md: "10px", lg: "20px" }}
                  textAlign="left"
                  mt="40px"
                >
                  {item.description}
                </Text>
                <Flex w="100%" justify={"center"}>
                  <Link href={item.link} target="_blank">
                    <Button
                      mt="48px"
                      mb={{ base: "20px", md: "5px" }}
                      w={{ sm: "139px", md: "139px", lg: "243px" }}
                      h={{ sm: "33px", md: "33px", lg: "43px" }}
                      bg={"linear-gradient(180deg, #6ACEF5 0%, #4C9BE8 100%)"}
                      rounded="33px"
                    >
                      <Text
                        fontFamily={"Gilroy"}
                        fontWeight="800"
                        fontSize="20px"
                      >
                        See More
                      </Text>
                    </Button>
                  </Link>
                </Flex>
              </Flex>
              <Flex
                display={{ base: "none", lg: "flex" }}
                rounded="20px"
                minW="407px"
                p="19px"
              >
                <Image src={item.img} />
              </Flex>
            </Flex>
          ))}
        </Carousel>
      </Flex>
    </Flex>
  );
}

const projects = [
  {
    title: "WeFund to Go Multichain",
    description:
      "WeFund will fulfill its mission to being multichain with Polygon Studios, entering Polygon ecosystem and subsequently Ethereum L1",
    img: "media/partners/WFD-Polygon.jpg",
    link: "/blog",
  },
  {
    title: "WeFund Multichain Migration to Juno",
    description:
      "Both utilizing CosmWasm, WeFund is making migration to Juno and subsequently becames Multichain with Loop Finance structural assistance. Collaborating together for better access for everyone",
    img: "media/partners/WFD-Juno.jpg",
    link: "/blog",
  },
  {
    title: "WeFund Teaming up with Tgrade",
    description:
      "WeFund is happy to announce a new partnership with Tgrade. Tgrade and WeFund have the same vision to take blockchain even further, bring effective impact to the real world, and have the impact reach the masses, not just a select privileged few.",
    img: "media/partners/Tgrade.png",
    link: "/blog",
  },
  {
    title: "WeFund Opening Access with Oneledger",
    description:
      "Wefund is expanding its reach to deploy on OneLedger. OneLedger is an innovative blockchain that uses all of the benefits of blockchain technology to enable transnational compliant business operations .",
    img: "media/partners/Oneledger.png",
    link: "/blog",
  },
  {
    title: "WeFund Collaborating with Tron",
    description:
      " WeFund will be operating in the TRON ecosystem providing crowdsourced launchpad and incubator alternatives for the community. WeFund’s platform will be able to support a wide range of ecosystems and projects as it evolves into a multichain system..",
    img: "media/partners/Tron.png",
    link: "/blog",
  },
];
