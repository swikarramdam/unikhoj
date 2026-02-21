import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LeadForm from "./components/LeadForm";
import Problem from "./components/Problem";
import Solution from "./components/Solution";
import HowItWorks from "./components/HowItWorks";
import MarketSignal from "./components/MarketSignal";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LeadForm />
        <Problem />
        <Solution />
        <HowItWorks />
        <MarketSignal />
      </main>
      <Footer />
    </>
  );
}
