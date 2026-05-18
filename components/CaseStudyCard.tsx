import type { CaseStudy } from "@/data/portfolio";

type CaseStudyCardProps = {
  item: CaseStudy;
  index: number;
};

export function CaseStudyCard({ item, index }: CaseStudyCardProps) {
  return (
    <article className={`case-card ${item.featured ? "featured" : ""}`}>
      <div className="case-meta">
        <span>{item.category}</span>
        <span>Case {String(index).padStart(2, "0")}</span>
      </div>
      <h3>{item.title}</h3>
      <div className="case-columns">
        {item.sections.map((section) => (
          <div className="case-column" key={section.heading}>
            <h4>{section.heading}</h4>
            <p>{section.body}</p>
          </div>
        ))}
      </div>
      <div className="tools-row">
        <span className="tools-label">Tools</span>
        {item.tools.map((tool) => (
          <span key={tool}>{tool}</span>
        ))}
      </div>
    </article>
  );
}
