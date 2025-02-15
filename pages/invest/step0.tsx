import React, { useState, useRef } from "react";

import { Flex, Input, Button, Box } from "@chakra-ui/react";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";

import PageLayout from "../../components/PageLayout";
import {
  InputTransition,
  ButtonTransition,
} from "../../components/ImageTransition";

import { WEFUND_ID, ERROR_OPTION } from "../../config/constants";
import { useRouter } from "next/router";
import { useStore } from "../../contexts/store";
import Footer from "../../components/Footer";

export default function InvestStep0() {
  const [showInput, setShowInput] = useState(false);
  const passRef = useRef<HTMLInputElement>();
  const router = useRouter();

  function onPresale() {
    router.push({
      pathname: "/invest/step1",
      query: {
        project_id: 1,
      },
    });
  }
  function onSeed() {
    setShowInput(!showInput);
  }

  function onConfirm() {
    if (
      CryptoJS.enc.Base64.stringify(
        CryptoJS.enc.Utf8.parse(passRef.current.value)
      ) === "V2VGdW5kVkMyMDIy"
    ) {
      router.push("/invest/step1?project_id=" + WEFUND_ID);
    } else {
      toast("Sorry, wrong password", ERROR_OPTION);
    }
  }
  return (
    <PageLayout
      title="Contribute"
      subTitle1="Invest"
      subTitle2="Contribute"
      subTitle3="&nbsp;to WeFund"
    >
      <Flex
        width="100%"
        justify="center"
        py={"4em"}
        backgroundImage="url('/media/Home/2.png')"
      >
        <Box
          w={{ base: "300px", md: "600px", lg: "800px" }}
          bgGradient={
            "linear(180deg, #501992 0%, #300F71 18.84%, #09044B 75.22%)"
          }
          backdropBlur={"54px"}
          pt="30px"
          style={{ fontFamily: "Sk-Modernist" }}
          rounded={"3xl"}
        >
          <Flex
            direction="column"
            pt="100px"
            justify="center"
            align="center"
            pb="100px"
          >
            <ButtonTransition
              unitid="Seed"
              selected={false}
              width="200px"
              height="50px"
              rounded="33px"
              onClick={onSeed}
              mt="50px"
            >
              Private Sale
            </ButtonTransition>
            <Flex
              display={showInput ? "flex" : "none"}
              mt="30px"
              direction="column"
              justify="center"
              align="center"
            >
              <InputTransition
                unitid="inputpassword"
                selected={false}
                width="300px"
                height="45px"
                rounded="md"
              >
                <Input
                  background={"transparent"}
                  border="0px"
                  h="45px"
                  type={"password"}
                  placeholder="Enter password"
                  boxShadow={""}
                  rounded="md"
                  ref={passRef}
                />
              </InputTransition>
              <Button
                w="120px"
                h="35px"
                mt="15px"
                onClick={onConfirm}
                background={"blue"}
              >
                Ok
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Flex>
      <Footer />
    </PageLayout>
  );
}
