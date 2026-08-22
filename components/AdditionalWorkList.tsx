"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import type { AdditionalWork } from "@/data/portfolio";

type AdditionalWorkListProps = {
  items: AdditionalWork[];
  /** Case number the first row continues from - e.g. 3 featured cards -> 3. */
  startIndex: number;
};

/**
 * Compact companion to <CaseStudyCard>. Same content shape, less real estate:
 * one row per item with a number, title, one-line summary, and tools. Reuses
 * the Stagger primitives so the reveal matches the rest of the page.
 */
export function AdditionalWorkList({ items, startIndex }: AdditionalWorkListProps) {
  if (items.length === 0) return null;

  return (
    <div className="also-tested">
      <Reveal as="p" className="eyebrow" amount={0.6}>
        Also tested
      </Reveal>
      <Stagger className="also-list" as="ul" amount={0.15}>
        {items.map((item, index) => (
          <StaggerItem className="also-item" as="li" key={item.title}>
            <div className="also-item-head">
              <span className="also-category">{item.category}</span>
              <span className="also-number">
                Case {String(startIndex + index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <div className="also-tools">
              {item.tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
