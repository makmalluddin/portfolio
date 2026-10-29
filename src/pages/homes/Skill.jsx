import MainFrame from "@/src/components/MainFrame";
import SkillCard from "@/src/components/skill/SkillCard";
import { skillData } from "@/src/data/skillData.jsx";

function Skill() {
  return (
    <section id="skills">
      <MainFrame
        title={
          <p className="font-mono tracking-wide text-sm">
            03 / <span className="text-text-secondary font-medium">KEAHLIAN</span>
          </p>
        }
      >
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 -mr-px -mb-px">
            {skillData.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      </MainFrame>
    </section>
  );
}

export default Skill;
