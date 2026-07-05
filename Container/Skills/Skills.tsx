import Image from "next/image";
import { LuBriefcase } from "react-icons/lu";
import { urlFor } from "@/client";
import { images } from "@/constants";
import { getAllExperiences, getAllSkills } from "@/lib/actions/sanity.actions";
import { Section, SectionHeading } from "@/components/Section";
import Reveal from "@/components/Reveal";
import ExperienceList from "./_components/ExperienceItem";

type SkillChip = { name: string; icon: string };

const FALLBACK_SKILLS: SkillChip[] = [
  { name: "React", icon: images.react.src },
  { name: "TypeScript", icon: images.typescript.src },
  { name: "Node.js", icon: images.node.src },
  { name: "Next.js", icon: images.react.src },
  { name: "Python", icon: images.python.src },
  { name: "Flutter", icon: images.flutter.src },
  { name: "Vue", icon: images.vue.src },
  { name: "GraphQL", icon: images.graphql.src },
  { name: "Redux", icon: images.redux.src },
  { name: "Sass", icon: images.sass.src },
  { name: "Figma", icon: images.figma.src },
  { name: "Git", icon: images.git.src },
];

export default async function Skills() {
  const [experiences, skillsData] = await Promise.all([
    getAllExperiences(),
    getAllSkills(),
  ]);

  const skills: SkillChip[] = skillsData.length
    ? skillsData.map((s) => ({
        name: s.name,
        icon: s.icon ? urlFor(s.icon).url() : "",
      }))
    : FALLBACK_SKILLS;

  return (
    <Section id="skills">
      <SectionHeading
        index="03"
        eyebrow="Skills & Experience"
        title={
          <>
            The <span className="accent-text">toolbox</span> & the track record.
          </>
        }
        description="Technologies I reach for daily, and the roles that shaped how I build."
      />

      <div className="mt-14 flex flex-col gap-6">
        {/* Toolbox */}
        <div className="bento-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="chip">Stack</span>
              <h3 className="font-display text-xl font-semibold text-ink">
                My daily tools
              </h3>
            </div>
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-faint">
              {skills.length} tools
            </span>
          </div>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {skills.map((skill, i) => (
              <Reveal key={skill.name} y={10} delay={Math.min(i * 0.025, 0.4)}>
                <div className="group flex items-center gap-2.5 rounded-2xl border border-line bg-white/55 py-2.5 pl-2.5 pr-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:bg-white hover:shadow-soft">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-white shadow-soft">
                    {skill.icon ? (
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={22}
                        height={22}
                        className="object-contain"
                      />
                    ) : (
                      <span className="text-xs font-bold text-accent">
                        {skill.name.slice(0, 2)}
                      </span>
                    )}
                  </span>
                  <span className="text-[0.9rem] font-medium text-ink">
                    {skill.name}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="bento-card">
          <div className="mb-9 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/10 text-accent">
              <LuBriefcase size={20} />
            </span>
            <div>
              <span className="chip">Journey</span>
              <h3 className="mt-1.5 font-display text-xl font-semibold text-ink">
                Experience
              </h3>
            </div>
          </div>

          {experiences.length ? (
            <ExperienceList experiences={experiences} />
          ) : (
            <div className="grid place-items-center rounded-2xl border border-dashed border-line py-14 text-center">
              <p className="font-display text-ink">Timeline loading from CMS</p>
              <p className="mt-1 text-sm text-muted">
                Experience entries appear here once fetched.
              </p>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
