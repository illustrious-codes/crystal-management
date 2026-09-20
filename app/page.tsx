import Hero from "./components/Hero";
import WhyUs from "./components/WhyUs";
import HomeServices from "./components/HomeServices";
import Certifications from "./components/Certifications";
import VesselsScrap from "./components/VesselsScrap ";
import ContactForm from "./components/ContactForm";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyUs />
      <HomeServices />
      <VesselsScrap />
      <ContactForm />
      <Certifications />
    </>
  );
}
