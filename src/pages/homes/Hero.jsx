import HeroCard from "@/src/components/hero/HeroCard";
import { heroData } from "@/src/data/heroData";

function Hero() {
  return (
    <section id="hero">
      <HeroCard data={heroData} />
    </section>
  );
}

export default Hero;
