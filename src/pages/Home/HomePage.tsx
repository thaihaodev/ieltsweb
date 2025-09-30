import React from "react";
import HeroSection from "./HeroSection";
import StatisticSection from "./StatisticSection";
import TargetAudienceSection from "./TargetAudienceSection";


const HomePage: React.FC = () => {
  return (
  <div>
    <HeroSection />
    <StatisticSection />
    <TargetAudienceSection />
  </div>
  );
};

export default HomePage;
