import type { Experience } from "@/data/portfolio";

type ExperienceItemProps = {
  item: Experience;
};

export function ExperienceItem({ item }: ExperienceItemProps) {
  return (
    <article className="experience-item">
      <p className="experience-date">{item.period}</p>
      <div className="experience-content">
        <h3>{item.role}</h3>
        <p className="company">{item.company}</p>
        <ul>
          {item.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
