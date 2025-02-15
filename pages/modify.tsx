import React, { useState, useRef, useEffect } from "react";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { REQUEST_ENDPOINT } from "../config/constants";

import { useKeplrWallet } from "../contexts/keplrWallet";
import {
  ButtonBackTransition,
  ButtonTransition,
} from "../components/ImageTransition";
import { useCommunityData, useProjectData, useStore } from "../contexts/store";
import Footer from "../components/Footer";
import {
  checkNetwork,
  isNull,
  getMonth,
  ParseParam_ProjectId,
  GetOneProject,
  getVal,
  getMultiplyInteger,
  getInteger,
  getSeconds,
} from "../utils/utility";
import { fetchData } from "../utils/fetch";
import {
  SUCCESS_OPTION,
  ERROR_OPTION,
  WEFUND_CONTRACT,
} from "../config/constants";
import PageLayout from "../components/PageLayout";

import Payment from "../components/CreateProject/Payment";
import InputAddress from "../components/CreateProject/InputAddress";
import CustomInputReadOnly from "../components/CreateProject/CustomInputReadOnly";
import CustomInput from "../components/CreateProject/CustomInput";
import CustomTextarea from "../components/CreateProject/CustomTextarea";
import CustomPercentInput from "../components/CreateProject/CustomPercentInput";
import CustomCoinInput from "../components/CreateProject/CustomCoinInput";
import CustomSimpleNumberInput from "../components/CreateProject/CustomSimpleNumberInput";
import CustomSelect from "../components/CreateProject/CustomSelect";
import CustomEmailInput from "../components/CreateProject/CustomEmailInput";
import CustomUpload from "../components/CreateProject/CustomUpload";
import Website from "../components/CreateProject/Website";

import Milestones from "../components/CreateProject/Milestones/Milestones";
import TeamMembers from "../components/CreateProject/TeamMember/TeamMembers";
import Stages from "../components/CreateProject/Stage/Stages";

export default function ModifyProject() {
  const { state, dispatch } = useStore();
  const keplrWallet = useKeplrWallet();
  const projectData = useProjectData();
  const communityData = useCommunityData();

  const router = useRouter();
  const [isUST, setIsUST] = useState(true);

  const [logo, setLogo] = useState("");
  const [whitepaper, setWhitepaper] = useState("");

  const [createDate, setCreateDate] = useState("");
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ecosystem, setEcosystem] = useState("Juno");
  const [fundraise, setFundraiseOption] = useState("Token");
  const [tokenName, setTokenName] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenBalance, setTokenBalance] = useState("");
  const [communityAlloc, setCommunityAlloc] = useState("");

  const [collectedAmount, setCollectedAmount] = useState("");

  const [teammemberDescription, setTeammemberDescription] = useState([""]);
  const [teammemberLinkedin, setTeammemberLinkedin] = useState([""]);
  const [teammemberRole, setTeammemberRole] = useState([""]);
  const [teammemberName, setTeammemberName] = useState([""]);

  const [stageTitle, setStageTitle] = useState(["Seed"]);
  const [stagePrice, setStagePrice] = useState([""]);
  const [stageAmount, setStageAmount] = useState([""]);
  const [stageVestingSoon, setStageVestingSoon] = useState([""]);
  const [stageVestingAfter, setStageVestingAfter] = useState([""]);
  const [stageVestingPeriod, setStageVestingPeriod] = useState([""]);

  const [country, setCountry] = useState("");
  const [cofounderName, setCofounderName] = useState("");
  const [signature, setSignature] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [serviceWefund, setServiceWefund] = useState("5");
  const [serviceCharity, setServiceCharity] = useState("0");
  const [website, setWebsite] = useState("");
  const [professionallink, setProfessionalLink] = useState("");

  const [milestoneTitle, setMilestoneTitle] = useState([""]);
  const [milestoneAmount, setMilestoneAmount] = useState([""]);
  const [milestoneDescription, setMilestoneDescription] = useState([""]);
  const [milestoneStartdate, setMilestoneStartdate] = useState([""]);
  const [milestoneEnddate, setMilestoneEnddate] = useState([""]);

  useEffect(() => {
    if (project_id > 0) fillItems();
  }, [projectData]);

  //----------parse Param----------------------
  const project_id = ParseParam_ProjectId();

  async function fillItems() {
    if (project_id == null || projectData.length == 0) return;

    const data = GetOneProject(projectData, project_id);

    setCompany(data.project_company);
    setTitle(data.project_title);
    setDescription(data.project_description);
    setCollectedAmount(data.project_collected);
    setEcosystem(data.project_ecosystem);
    setFundraiseOption(data.project_fundtype);
    setCreateDate(data.project_createddate);
    setLogo(data.project_logo);
    setWebsite(data.project_website);
    setEmail(data.project_email);

    setCountry(data.country);
    setCofounderName(data.cofounder_name);
    setServiceWefund(data.service_wefund);
    setServiceCharity(data.service_charity);
    setProfessionalLink(data.professional_link);

    const _milestoneTitle = [],
      _milestoneAmount = [],
      _milestoneDescription = [],
      _milestoneStartdate = [],
      _milestoneEnddate = [];

    for (let i = 0; i < data.milestone_states.length; i++) {
      _milestoneTitle.push(data.milestone_states[i].milestone_name);
      _milestoneDescription.push(
        data.milestone_states[i].milestone_description
      );
      _milestoneStartdate.push(data.milestone_states[i].milestone_startdate);
      _milestoneEnddate.push(data.milestone_states[i].milestone_enddate);
      _milestoneAmount.push(data.milestone_states[i].milestone_amount);
    }
    setMilestoneTitle(_milestoneTitle);
    setMilestoneAmount(_milestoneAmount);
    setMilestoneDescription(_milestoneDescription);
    setMilestoneStartdate(_milestoneStartdate);
    setMilestoneEnddate(_milestoneEnddate);

    const _teamDescription = [],
      _teamLinkedIn = [],
      _teamRole = [],
      _teamName = [];

    for (let i = 0; i < data.teammember_states.length; i++) {
      _teamDescription.push(data.teammember_states[i].teammember_description);
      _teamLinkedIn.push(data.teammember_states[i].teammember_linkedin);
      _teamRole.push(data.teammember_states[i].teammember_role);
      _teamName.push(data.teammember_states[i].teammember_name);
    }

    setTeammemberDescription(_teamDescription);
    setTeammemberLinkedin(_teamLinkedIn);
    setTeammemberRole(_teamRole);
    setTeammemberName(_teamName);

    const _stageTitle = [],
      _stagePrice = [],
      _stageAmount = [],
      _stageSoon = [],
      _stageAfter = [],
      _stagePeriod = [];

    for (let i = 0; i < data.vesting.length; i++) {
      _stageTitle.push(data.vesting[i].stage_title);
      _stagePrice.push(
        (parseFloat(data.vesting[i].stage_price) / 100).toString()
      );
      _stageAmount.push(data.vesting[i].stage_amount);
      _stageSoon.push(data.vesting[i].stage_soon);
      _stageAfter.push(getMonth(data.vesting[i].stage_after).toString());
      _stagePeriod.push(getMonth(data.vesting[i].stage_period).toString());
    }

    setStageTitle(_stageTitle);
    setStagePrice(_stagePrice);
    setStageAmount(_stageAmount);
    setStageVestingSoon(_stageSoon);
    setStageVestingAfter(_stageAfter);
    setStageVestingPeriod(_stagePeriod);
  }

  //---------------create project---------------------------------
  const checkInvalidation = () => {
    if (checkNetwork(state) == false) return false;

    if (title.length == 0) {
      toast("Please fill in project name!", ERROR_OPTION);
      return false;
    }

    return true;
  };

  const createDocxTemplate = async () => {
    const formData = new FormData();
    formData.append("tokenName", tokenName);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("ecosystem", ecosystem);
    formData.append("priceSeed", stagePrice[0]);
    formData.append("pricePresale", stagePrice[1]);
    formData.append("priceIDO", stagePrice[2]);
    formData.append("email", email);
    formData.append("file", signature);

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    let realSAFT = "",
      err = false;
    await fetch(REQUEST_ENDPOINT + "/docxtemplatemake", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        realSAFT = data.data;
        toast(data.data + "SAFT Success", SUCCESS_OPTION);
      })
      .catch((e) => {
        console.log("Error:" + e);
        toast("SAFT failed", ERROR_OPTION);
        err = true;
      });

    if (err) return "";
    return realSAFT;
  };

  const uploadWhitepaper = async () => {
    let realWhitepaper = "";
    if (!isNull(whitepaper)) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("file", whitepaper);

      const requestOptions = {
        method: "POST",
        body: formData,
      };

      await fetch(REQUEST_ENDPOINT + "/uploadWhitepaper", requestOptions)
        .then((res) => res.json())
        .then((data) => {
          realWhitepaper = data.data;
          toast("Whitepaper upload success", SUCCESS_OPTION);
        })
        .catch((e) => {
          console.log("Error:" + e);
          toast("Whitepaper upload failed", ERROR_OPTION);
        });
    }
    return realWhitepaper;
  };

  const uploadLogo = async () => {
    //---------upload logo-------------------------------------------------
    let realLogo = "";
    if (logo != "") {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("file", logo);

      const requestOptions = {
        method: "POST",
        body: formData,
      };

      await fetch(REQUEST_ENDPOINT + "/uploadLogo", requestOptions)
        .then((res) => res.json())
        .then((data) => {
          realLogo = data.data;
          toast(data.data + "Logo upload success", SUCCESS_OPTION);
        })
        .catch((e) => {
          console.log("Error:" + e);
          toast("Logo upload failed", ERROR_OPTION);
        });
    }
    return realLogo;
  };

  async function createProject() {
    if (!checkInvalidation()) return false;

    toast("Please wait", SUCCESS_OPTION);

    const realSAFT = await createDocxTemplate();
    if (realSAFT == "") return false;

    const realWhitepaer = await uploadWhitepaper();
    // const realLogo = await uploadLogo();
    //---------------execute contract----------------------------------
    const project_teammembers = [];
    for (let i = 0; i < teammemberDescription.length; i++) {
      const teammember = {
        teammember_description: getVal(teammemberDescription[i]),
        teammember_linkedin: getVal(teammemberLinkedin[i]),
        teammember_role: getVal(teammemberRole[i]),
        teammember_name: getVal(teammemberName[i]),
      };
      project_teammembers.push(teammember);
    }

    const vesting = [];
    let distribution_token_amount = 0;
    for (let i = 0; i < stageTitle.length; i++) {
      const stage = {
        stage_title: stageTitle[i],
        stage_price: getMultiplyInteger(stagePrice[i]).toString(),
        stage_amount: getInteger(stageAmount[i]).toString(),
        stage_soon: getInteger(stageVestingSoon[i]).toString(),
        stage_after: getSeconds(stageVestingAfter[i]).toString(),
        stage_period: getSeconds(stageVestingPeriod[i]).toString(),
      };
      vesting.push(stage);
      distribution_token_amount += getInteger(stageAmount[i]);
    }

    const project_milestones = [];
    for (let i = 0; i < milestoneTitle.length; i++) {
      const milestone = {
        milestone_step: `${i}`,
        milestone_name: milestoneTitle[i],
        milestone_description: getVal(milestoneDescription[i]),
        milestone_startdate: getVal(milestoneStartdate[i]),
        milestone_enddate: getVal(milestoneEnddate[i]),
        milestone_amount: getVal(milestoneAmount[i]),
        milestone_type: "",
        milestone_status: "0",
        milestone_votes: [],
      };
      project_milestones.push(milestone);
    }

    let _createDate = createDate;

    if (_createDate == "") {
      const dt = new Date();
      const [month, day, year] = [
        dt.getMonth(),
        dt.getDate(),
        dt.getFullYear(),
      ];
      _createDate = day + "/" + ((month + 1) % 12) + "/" + year;
    }

    const _projectID = project_id == null ? "0" : project_id.toString();

    const client = keplrWallet.getClient();
    const address = keplrWallet.account;

    const AddProjectMsg = {
      add_project: {
        creator_wallet: address,
        project_id: _projectID,
        project_company: company,
        project_title: title,
        project_description: description,
        project_collected: collectedAmount.toString(),
        project_ecosystem: ecosystem,
        project_fundtype: fundraise,
        project_createddate: _createDate,
        project_saft: realSAFT,
        project_logo: logo,
        project_whitepaper: realWhitepaer,
        project_website: website,
        project_email: email,
        project_milestones: project_milestones,
        project_teammembers: project_teammembers,
        vesting: vesting,
        token_addr: tokenAddress,

        country: country,
        cofounder_name: cofounderName,
        service_wefund: serviceWefund,
        service_charity: serviceCharity,
        professional_link: professionallink,
      },
    };

    if (state.walletType != "keplr") {
      toast("Connect with Keplr", ERROR_OPTION);
      return;
    }
    try {
      const res = await client.execute(
        address,
        WEFUND_CONTRACT,
        AddProjectMsg,
        "auto"
      );
      console.log(res);
      fetchData(state, dispatch, true);
      router.push("/explorer");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <PageLayout
      title="Create Your Project"
      subTitle1="Create a"
      subTitle2="New Project"
    >
      <Flex width="100%" justify="center" mb={"150px"} zIndex={"1"} mt="-30px">
        <Box
          w={{ base: "sm", sm: "md", md: "2xl", lg: "2xl", xl: "3xl" }}
          background="rgba(255, 255, 255, 0.05)"
          border="1.5px solid rgba(255, 255, 255, 0.15)"
          borderTopColor="transparent"
          fontFamily="Sk-Modernist-Regular"
          paddingLeft="50px"
          paddingRight="50px"
          zIndex="1"
        >
          <CustomInput
            typeText="Company Name"
            type={company}
            setType={setCompany}
            w="100%"
            mt="30px"
          />
          <CustomInput
            typeText="Project Title"
            type={title}
            setType={setTitle}
            w="100%"
            mt="30px"
          />
          <CustomTextarea
            typeText="Project Description"
            type={description}
            setType={setDescription}
            // mt="30px"
          />
          <TeamMembers
            description={teammemberDescription}
            setDescription={setTeammemberDescription}
            name={teammemberName}
            setName={setTeammemberName}
            role={teammemberRole}
            setRole={setTeammemberRole}
            linkedin={teammemberLinkedin}
            setLinkedin={setTeammemberLinkedin}
          />
          <Stack
            mt="30px"
            direction={{ base: "column", md: "column", lg: "row" }}
            spacing="30px"
          >
            <CustomCoinInput
              typeText="Amount Required"
              type={collectedAmount}
              setType={setCollectedAmount}
              w={{ base: "100%", md: "50%", lg: "50%" }}
            />
            <CustomSelect
              typeText="Blockchain"
              type={ecosystem}
              setType={setEcosystem}
              options={[
                "Juno",
                "Ethereum",
                "BSC",
                "Harmony",
                "Algorand",
                "Solana",
                "Avalanche",
              ]}
              w={{ base: "100%", md: "50%", lg: "50%" }}
            />
            <CustomSelect
              typeText="Fundraise Option"
              type={fundraise}
              setType={setFundraiseOption}
              options={["Token", "Equity", "Token and Equity", "NFT", "Others"]}
              w={{ base: "100%", md: "50%", lg: "50%" }}
            />
          </Stack>
          <Stack
            mt="30px"
            direction={{ base: "column", md: "column", lg: "row" }}
            spacing="30px"
          >
            <InputAddress
              typeText="Token Address"
              type={tokenAddress}
              setType={setTokenAddress}
              setTokenName={setTokenName}
              setTokenBalance={setTokenBalance}
              w={{ base: "100%", md: "50%", lg: "50%" }}
              mt="0px"
            />
            <CustomInputReadOnly
              typeText="TokenName"
              type={tokenName}
              w={{ base: "100%", md: "50%", lg: "50%" }}
              mt="0px"
            />
          </Stack>
          <Stack
            mt="30px"
            direction={{ base: "column", md: "column", lg: "row" }}
            spacing="30px"
          >
            <CustomPercentInput
              typeText="Community Allocation"
              type={communityAlloc}
              setType={setCommunityAlloc}
              w={{ base: "100%", md: "50%", lg: "50%" }}
            />
            <CustomInputReadOnly
              typeText="Balance"
              type={tokenBalance}
              w={{ base: "100%", md: "50%", lg: "50%" }}
              mt="0px"
            />
          </Stack>
          <Stages
            stageTitle={stageTitle}
            setStageTitle={setStageTitle}
            stagePrice={stagePrice}
            setStagePrice={setStagePrice}
            stageAmount={stageAmount}
            setStageAmount={setStageAmount}
            stageVestingSoon={stageVestingSoon}
            setStageVestingSoon={setStageVestingSoon}
            stageVestingAfter={stageVestingAfter}
            setStageVestingAfter={setStageVestingAfter}
            stageVestingPeriod={stageVestingPeriod}
            setStageVestingPeriod={setStageVestingPeriod}
          />
          <Stack
            mt="30px"
            direction={{ base: "column", md: "row", lg: "row" }}
            spacing="30px"
          >
            <CustomInput
              typeText="Country"
              type={country}
              setType={setCountry}
              w={{ base: "100%", md: "50%", lg: "50%" }}
              mt="0px"
            />
            <CustomInput
              typeText="Founder Name"
              type={cofounderName}
              setType={setCofounderName}
              w={{ base: "100%", md: "50%", lg: "50%" }}
              mt="0px"
            />
          </Stack>
          <Stack
            mt="30px"
            direction={{ base: "column", md: "row", lg: "row" }}
            spacing="30px"
          >
            <CustomInput
              typeText="Address"
              type={address}
              setType={setAddress}
              w={{ base: "100%", md: "50%", lg: "50%" }}
              mt="0px"
            />
            <CustomEmailInput
              typeText="Email"
              type={email}
              setType={setEmail}
              w={{ base: "100%", md: "50%", lg: "50%" }}
            />
          </Stack>
          <Stack
            mt="30px"
            direction={{ base: "column", md: "row", lg: "row" }}
            spacing="30px"
          >
            <CustomSimpleNumberInput
              typeText="% for WeFund Service"
              type={serviceWefund}
              setType={setServiceWefund}
              w={{ base: "100%", md: "50%", lg: "50%" }}
            />
            <CustomSimpleNumberInput
              typeText="% for Charity"
              type={serviceCharity}
              setType={setServiceCharity}
              w={{ base: "100%", md: "50%", lg: "50%" }}
            />
          </Stack>
          <Stack
            mt="30px"
            direction={{ base: "column", md: "row", lg: "row" }}
            spacing="30px"
          >
            <CustomUpload
              typeText="Signature"
              type={signature}
              setType={setSignature}
              w={{ base: "100%", md: "50%", lg: "50%" }}
            />
            <CustomUpload
              typeText="Whitepaper"
              type={whitepaper}
              setType={setWhitepaper}
              w={{ base: "100%", md: "50%", lg: "50%" }}
            />
          </Stack>
          <CustomInput
            typeText="Project Logo"
            type={logo}
            setType={setLogo}
            mt="30px"
          />
          <Website
            typeText="Project website"
            type={website}
            setType={setWebsite}
          />
          <Website
            typeText="LinkedIn or similar"
            type={professionallink}
            setType={setProfessionalLink}
          />
          <Milestones
            milestoneTitle={milestoneTitle}
            setMilestoneTitle={setMilestoneTitle}
            milestoneAmount={milestoneAmount}
            setMilestoneAmount={setMilestoneAmount}
            milestoneDescription={milestoneDescription}
            setMilestoneDescription={setMilestoneDescription}
            milestoneStartdate={milestoneStartdate}
            setMilestoneStartdate={setMilestoneStartdate}
            milestoneEnddate={milestoneEnddate}
            setMilestoneEnddate={setMilestoneEnddate}
          />
          <Flex w="100%" mt="30px" justify="center" mb="30px">
            <ButtonTransition
              unitid="submit"
              selected={false}
              width="400px"
              height="50px"
              rounded="33px"
              onClick={() => createProject()}
            >
              <Box color="white">Submit</Box>
            </ButtonTransition>
          </Flex>
        </Box>
      </Flex>
      <Footer />
    </PageLayout>
  );
}
