import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Checkbox, Circle, Container, Divider, Flex, Heading, HStack, Image, Link, List, ListItem, Radio, RadioGroup, Select, Stack, StyleProps, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Step, Steps, useSteps } from "chakra-ui-steps"
import { ArrowRightIcon, CheckIcon, PhoneIcon } from "@chakra-ui/icons";
import { FaUpload } from "react-icons/fa";


const headingStyle = {
  sx:{'mark': {backgroundColor: 'inherit', color: '#00A3FF'}}
}



function InvestHeader() {
  return (
    <Container padding={8}>
      <VStack>
        <Breadcrumb>
          <BreadcrumbItem><BreadcrumbLink href='/'>Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbItem><BreadcrumbLink href='#'>Invest in WeFund</BreadcrumbLink></BreadcrumbItem>
        </Breadcrumb>
        <Heading {...headingStyle}><mark>Invest</mark> in WeFund</Heading>
      </VStack>
    </Container>
  )
}

function NavigationPage(props : {
  canNext: boolean;
  canBack: boolean;
  onNext: ()=>void;
  onBack: ()=>void;
  textNext?: string;
  textBack?: string;
} = {canBack: true, canNext: true, onNext: ()=>{}, onBack: ()=>{}}) {
  return <HStack>
    <Button borderRadius={'full'} color={'white'} border={'1.5px solid #00A3FF'} bgColor={'whiteAlpha.400'} onClick={()=>props.onNext()} disabled={!props.canNext}>{props.textNext || "Next"}</Button>
    <Button borderRadius={'full'} color={'white'} border={'1.5px solid #00A3FF'} bgColor={'whiteAlpha.400'} onClick={()=>props.onBack()} disabled={!props.canBack}>{props.textBack || "Back"}</Button>
  </HStack>
}

function IntroductionPage(props: {
  onClik: ()=>void
}) {
  return (
    <Container maxW={'container.sm'}>
      <VStack>
        <Image src="/media/Invest/kyc-icon.png" />
        <Heading>Let's get started</Heading>
        <Text align={'center'}>To start the KYC process you will need to pay a $0.45 UST fee.
You will only need to do this once and it will apply to all launches.
<br/>
Tapping below will initiate the transaction and open Terra Station.
Please accept the transaction to begin.</Text>
      <Button onClick={()=>props.onClik()}>Start</Button>
      </VStack>
    </Container>
  )
}

function AggreementPage(props: {
  onClik: ()=>void
}) {
  const onBack = () => {

  }

  const onNext = () => {
    props.onClik()
  }
  return (
    <Container maxW={'container.sm'}>
      <VStack>
        <Image src="/media/Invest/verified-icon.png" />
        <Heading>Let's get you verified</Heading>
        <Text align={'center'}>
Before you start, please prepare your identity document and make sure it is valid.
<br />
We also require you to agree to our processing of your personal data:
        </Text>
        <Checkbox>I agree all condition of the <Link>Consent of Personal Data Processing</Link></Checkbox>
        <NavigationPage onBack={onBack} onNext={onNext} canBack={true} canNext={true}  />
      </VStack>
    </Container>
  )
}

function IdentifyDocumentStep() {
  
  return (
    <Container>
      <VStack>
      <Heading>Identify Document</Heading>
      <Text>Select the country that issued your document</Text>
      <Select>
        <option>Indonesia</option>
      </Select>
      <Text>Select the country that issued your document</Text>
      <RadioGroup>
        <Radio mx={4} value={'passport'}>Passport</Radio>
        <Radio mx={4} value={'driving-license'}>Driving License</Radio>
        <Radio mx={4} value={'id-card'}>ID Card</Radio>
        <Radio mx={4} value={'resicende-permit'}>Residence Permit</Radio>
      </RadioGroup>
      </VStack>
    </Container>
  )
}


function IdentifyDocumentScanStep() {
  
  return (
    <Container>
      <VStack>
      <Heading>Identify Document</Heading>
      <Text>Take a photo of your ID card. The photo should be:</Text>
      <List>
        <ListItem>Bright and clear (Good Quality)</ListItem>
        <ListItem>Uncut (All corners of the document should be visible)</ListItem>
      </List>
      <Image src={'/media/Invest/id-criteria.png'}/>
      <Box p={'18px'} bgColor={'#FFFFFF22'} borderRadius={'12px'}>
        <VStack alignItems={'start'}>
          <HStack>
            <Text fontWeight={'bold'}>Note</Text>
          </HStack>
          <Text>Please make sure your information in the id should be visible</Text>
        </VStack>
      </Box>
      <Box p={'12px'} border={'1px solid #FFFFFFAA'} borderRadius={'12px'} minW={'300px'}>
        <HStack>
          <PhoneIcon></PhoneIcon>
          <Divider orientation="vertical"/>
          <Text flex={1}>Continue with Phone</Text>
          <ArrowRightIcon/>
        </HStack>
      </Box>
      <Box p={'12px'} border={'1px solid #FFFFFFAA'} bgColor={'white'} borderRadius={'12px'} minW={'300px'}>
        <HStack>
          <FaUpload color="#00A3FF"></FaUpload>
          <Divider orientation="vertical"/>
          <Text color={'black'} flex={1}>Upload here</Text>
        </HStack>
      </Box>
      
      </VStack>
    </Container>
  )
}

function SelfieStep() {

}

const steps = [
  {
    label: 'Step 01',

  },
  {
    label: 'Step 02',
  },
  {
    label: 'Step 03'
  }
]

function StepperPage() {
  const [activeStep, setActiveStep] = useState(0)
  const onBack = () => {
    
  }
  const onNext = () => {
    setActiveStep(activeStep+1)
  }
  const ContentStep = () => {
    switch (activeStep){
      case 0:
        return <IdentifyDocumentStep />
      case 1:
        return <IdentifyDocumentScanStep />
    }
    return (<></>)
  }
  return (
    <Container maxW={'container.md'}>
      <Stack align={'center'}>
      <Stack flexDir={'row'} spacing={0} width={'100%'}>
        {steps.map((step, i) => <Stack key={i} flexDir={'column'} flex={1}>
          <HStack>
            {i!== 0 ? <Divider flex={1} orientation="horizontal"></Divider>:<Box flex={1}></Box>}
            <Circle size={'24px'} border={'3px solid #3BE489'} backgroundColor={i <= activeStep? '#3BE489': undefined}>
              {i <= activeStep && <CheckIcon></CheckIcon>}
            </Circle>
            {i+1<steps.length ? <Divider flex={1} orientation="horizontal"></Divider>:<Box flex={1}></Box>}
            
          </HStack>
          <VStack>
            <Text color={'#3BE489'}>{step.label}</Text>
          </VStack>
        </Stack>)}
      </Stack>
      <Box>
        <ContentStep/>
        
      </Box>
      <NavigationPage onBack={onBack} onNext={onNext} canBack={true} canNext={true}  />
      </Stack>
    </Container>
  )
}

function DynamicPage() {
  const [step, setStep] = useState(0)
  switch (step){
    case 0: return <IntroductionPage onClik={()=>{setStep(step+1)}} />
    case 1: return <AggreementPage onClik={()=>{setStep(step+1)}}/>
    case 2: return <StepperPage/>
  }
  return (
    <Box><Text>Not found</Text></Box>
  )
}


interface FundingItemProps {
  title: string
  description: string
  image: string
  odd: boolean
}

function FundingItem(props: FundingItemProps) {

  return (
    <Box backgroundColor={props.odd ? '#FFFFFF1A' : '#FFFFFF08'} width={'full'} p={4}>
      <HStack flexDir={props.odd ? 'row-reverse' : 'row'}>
        <Image src={props.image} width={'150px'} height={'150px'}></Image>
        <Box>
          <Heading>{props.title}</Heading>
          <Text>{props.description}</Text>
        </Box>
      </HStack>
    </Box>
  )
}

function FundingApproach() {
  return (
    <Box border={'1.5px solid rgba(255, 255, 255, 0.15)'} borderRadius={'20px'} padding={10}>
      <VStack>
        <Heading {...headingStyle}>Our Funding <mark>Approach</mark></Heading>
        <Box borderRadius={'10px'}>
          <VStack spacing={0}>
            <FundingItem title="SAFT" description="Get to know each other and Sign Agreement" image="/media/Invest/saft.png" odd={false} />
            <FundingItem title="Fund" description="Prefund Wefund and Receive WFD in favorable pricing" image="/media/Invest/fund.png" odd={true} />
            <FundingItem title="Lock" description="Wait for the Project Launch and Lock Period" image="/media/Invest/lock.png" odd={false} />
            <FundingItem title="Release" description="Launching the application to the market" image="/media/Invest/release.png" odd={true} />
          </VStack>
        </Box>
      </VStack>
    </Box>
  )
}

interface QuestionAnswer {
  question: string
  answer: string
}
interface FAQInvestProps {
  items: QuestionAnswer[]
}
function FAQInvest(props: FAQInvestProps) {
  return (
    <Container maxW={'container.md'} >
      <VStack marginY={12}>
        <Heading>FAQ</Heading>
        <Accordion allowMultiple width={'full'}>
          {props.items.map((item, i) => <AccordionItem key={i} borderRadius={8} border={'1.5px solid rgba(255, 255, 255, 0.15)'} backgroundColor={'#FFFFFF1A'} marginBottom={6}>
            <Box>
              <AccordionButton >
                
                <Box flex={1}>{item.question}</Box>
                <AccordionIcon />
                
              </AccordionButton>
            </Box>
            <AccordionPanel>{item.answer}</AccordionPanel>
          </AccordionItem>)}
        </Accordion>
      </VStack>
    </Container>
  )
}

const faqs = [
  {
    question: "What is Wefund?",
    answer: "This is answer 1",
  },
  {
    question: "How does on back a Project?",
    answer: "This is answer 1",
  }
]

export default function InvestKYCPage() {
  return (
    <Container maxW={'container.lg'}>
      <InvestHeader />
      <Box border={'1.5px solid rgba(255, 255, 255, 0.15)'} borderRadius={'20px'} padding={10} width={'full'} flex={1}>
        <VStack>
          <DynamicPage></DynamicPage>
          <FundingApproach />
          <FAQInvest items={faqs} />
        </VStack>
      </Box>
    </Container>
  )
}