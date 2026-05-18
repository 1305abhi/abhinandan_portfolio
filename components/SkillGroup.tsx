import type { SkillGroup as SkillGroupType } from "@/data/portfolio";

type SkillGroupProps = {
  group: SkillGroupType;
};

export function SkillGroup({ group }: SkillGroupProps) {
  return (
    <div className="skill-group">
      <h3 className="eyebrow">{group.title}</h3>
      <ul>
        {group.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
