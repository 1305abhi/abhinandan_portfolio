import type { ContactLink } from "@/data/portfolio";

type ContactRowProps = {
  link: ContactLink;
};

export function ContactRow({ link }: ContactRowProps) {
  return (
    <div className="contact-row">
      <span>{link.label}</span>
      <a href={link.href}>{link.value} &rarr;</a>
    </div>
  );
}
