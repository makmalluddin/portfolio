import { useParams, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { combineData } from "@/src/data/slug/project/combineData";
import ProjectDetailSlug from "../slug/ProjectDetailSlug";

function ProjectDetailWrapper() {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const project = combineData.find((item) => item.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  return <ProjectDetailSlug project={project} />;
}

export default ProjectDetailWrapper;
