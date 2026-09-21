import Hero from "./components/Hero";
import WhyUs from "./components/WhyUs";
import HomeServices from "./components/HomeServices";
import Certifications from "./components/Certifications";
import ContactSection from "./components/ContactSection";
import VesselsScrap from "./components/VesselsScrap ";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyUs />
      <HomeServices />
      <VesselsScrap />
      <ContactSection />
      <Certifications />
    </>
  );
}
