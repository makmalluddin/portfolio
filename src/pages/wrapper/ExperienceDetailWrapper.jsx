import { useParams, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { expDetailData } from "@/src/data/slug/experience/combineData";
import ExperienceDetailSlug from "../slug/ExperienceDetailSlug.jsx";

function ExperienceDetailWrapper() {
  const { slug } = useParams();
  const { pathname } = useLocation();

  const experience = expDetailData.find((item) => item.slug === slug);
  console.log("Halo ini isinya: ", experience)
  console.log(expDetailData)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (!experience) {
    return <Navigate to="/404" replace />;
  }

  return <ExperienceDetailSlug experience={experience} />;
}

export default ExperienceDetailWrapper;
