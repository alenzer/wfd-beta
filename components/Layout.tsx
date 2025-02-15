import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useDisclosure } from "@chakra-ui/react";
import { getElrondConfig } from "../config/elrondConfig";
import { NETWORK } from "../config/constants";

import Navbar from "./Navbar";
import Container from "./Container";
import {
  getInteger,
  ParseParam,
  ParseParam_Address,
  ParseParam_ProjectId,
} from "../utils/utility";
import { encrypt3DES, decrypt3DES } from "../utils/crypto";
import { fetchData } from "../utils/fetch";
import { toast } from "react-toastify";
import { SUCCESS_OPTION } from "../config/constants";
import { useStore, ActionKind, useJunoConnection } from "../contexts/store";
import { useNearWallet } from "../contexts/nearWallet";
import { useKeplrWallet } from "../contexts/keplrWallet";
import { useElrondWeb } from "../contexts/elrond";
import WalletModal from "./WalletModal";

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const { state, dispatch } = useStore();

  const junoConnection = useJunoConnection();
  const address = junoConnection?.account;

  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    dispatch({ type: ActionKind.setWalletModal, payload: onOpen });
  }, []);

  useEffect(() => {
    async function confirmReferral() {
      if (address != null) {
        const referralLink =
          "https://wefund.app/?referral=" +
          encrypt3DES(address, "wefundkeyreferral");

        dispatch({ type: "setReferralLink", payload: referralLink });
      }

      let referral = ParseParam("referral");
      referral = "egR8AzzTqU33cFc2hG4rcjOmcR4kUezitvYerxtypIeAQwOtz9Ua9c1ngFyLy7De";
      if (referral != null) {
        referral = referral.split(" ").join("+");
        let base;
        try {
          base = decrypt3DES(referral, "wefundkeyreferral");
        } catch (e) {
          console.log(e);
        }

        const formData = new FormData();
        formData.append("base", base);
        formData.append("referred", address);

        const requestOptions = {
          method: "POST",
          body: formData,
        };

        fetch("/api/checkreferral", requestOptions)
          .then((res) => {console.log(res); res.json(); })
          .then((data) => {
            console.log(data);
            dispatch({
              type: "setReferralCount",
              payload: data.data,
            });
          })
          .catch((e) => {
            console.log("Error:" + e);
          });
      }
    }
    confirmReferral();
  }, [address]);

  //------Juno connection-----------------------------
  const keplrWallet = useKeplrWallet();

  useEffect(() => {
    keplrWallet.connect();
  }, []);

  useEffect(() => {
    if (keplrWallet.initialized)
      dispatch({ type: ActionKind.setJunoConnection, payload: keplrWallet });
  }, [keplrWallet, keplrWallet.initialized]);

  useEffect(() => {
    const fetch = async () => {
      fetchData(state, dispatch, true);
    };

    fetch();
  }, []);

  //-------Near connection--------------------------------------------------
  const near = useNearWallet();
  const elrond = useElrondWeb();

  useEffect(() => {
    const initialize = () => {
      window.localStorage.removeItem("action");
    };

    const checkFallback = async () => {
      const action = window.localStorage.getItem("action");
      // if (action != "investing") return;
      switch (action) {
        case "near_connection":
          near.connect();
          dispatch({ type: ActionKind.setWalletType, payload: "near" });
          dispatch({ type: ActionKind.setWallet, payload: near });
          break;
        case "near_investing":
          const project_id = ParseParam_ProjectId();
          initialize();
          near.connect();
          dispatch({ type: ActionKind.setWalletType, payload: "near" });
          dispatch({ type: ActionKind.setWallet, payload: near });

          toast("Invest Success", SUCCESS_OPTION);
          router.push("/invest/step4?project_id=" + project_id);
          break;
        case "elrond_connection":
          dispatch({ type: ActionKind.setWalletType, payload: "elrond" });
          dispatch({ type: ActionKind.setWallet, payload: elrond });

          const address = ParseParam_Address();
          if (!address) break;
          elrond.setAccount(address);
          break;
        case "elrond_investing":
          dispatch({ type: ActionKind.setWalletType, payload: "elrond" });
          dispatch({ type: ActionKind.setWallet, payload: elrond });
          const sender = ParseParam("sender[0]");
          if (!sender) break;
          elrond.setAccount(sender);
          const signed = ParseParam("walletProviderStatus");
          let data = ParseParam("data[0]");
          if (signed == "transactionsSigned" && data != null) {
            data = Buffer.from(data).toString("base64");
            console.log(data);
            const transaction = {
              toPlainObject: function () {
                return {
                  nonce: getInteger(ParseParam("nonce[0]")),
                  value: ParseParam("value[0]"),
                  receiver: ParseParam("receiver[0]"),
                  gasPrice: getInteger(ParseParam("gasPrice[0]")),
                  gasLimit: getInteger(ParseParam("gasLimit[0]")),
                  data: data,
                  chainID: ParseParam("chainID[0]"),
                  version: getInteger(ParseParam("version[0]")),
                  signature: ParseParam("signature[0]"),
                  sender: ParseParam("sender[0]"),
                };
              },
            };
            console.log(transaction.toPlainObject());
            const config = getElrondConfig(NETWORK);
            const res = await axios.post(
              `${config.apiAddress}/transactions`,
              transaction.toPlainObject(),
              { timeout: parseInt(config.apiTimeout) }
            );

            const elrond_address = window.localStorage.getItem("address");
            if (!elrond_address) break;
            elrond.setAccount(elrond_address);

            toast("Invest Success", SUCCESS_OPTION);
            router.push("/invest/step4?project_id=1");
          }
          break;
      }
      initialize();
    };
    setTimeout(() => {
      checkFallback();
    }, 500);
  }, []);

  return (
    <Container>
      <Navbar />
      {children}
      <WalletModal isOpen={isOpen} onClose={onClose} />
    </Container>
  );
};

export default Layout;
