import Container from "../../components/Container";
import Hero from "../../components/Landing/Hero";
import About from "../../components/Landing/About";
import Litepaper from "../../components/Landing/Litepaper";
import Problem from "../../components/Landing/Problem";
import Works from "../../components/Landing/HowItWorks";
import UpcomingProject from "../../components/Landing/ComingSoonCarousel";
import Ecosystem from "../../components/Landing/Ecosystem";
import Roadmap from "../../components/Landing/Roadmap";
import Team from "../../components/Landing/Team";
import Advisors from "../../components/Landing/Advisors";
import Footer from "../../components/Footer";
import Journey from "../../components/Landing/Journey";

const AboutPage = () => (
  <Container>
    <Hero />
    <About />
    <Litepaper />
    <Problem />
    <Works />
    <UpcomingProject />
    <Journey />
    <Ecosystem />
    <Roadmap />
    <Team />
    <Advisors />
    <Footer />
  </Container>
);

export default AboutPage;
