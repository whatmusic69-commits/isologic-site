import React from "react";
import SectionHeading from "./section-heading";
import Reveal from "./reveal";
import clsx from "../util/clsx";
import { ClipboardIcon, CubeIcon, LayersIcon, ReportIcon } from "./icons";

type Item = {
  title: string;
  description: string;
  icon?: string;
};

function Icon({ name }: { name?: string }) {
  const size = "w-[22px] h-[22px]";
  switch (name) {
    case "clipboard":
      return <ClipboardIcon className={size} />;
    case "cube":
      return <CubeIcon className={size} />;
    case "layers":
      return <LayersIcon className={size} />;
    case "chart":
      return <ReportIcon className={size} />;
    default:
      return <ClipboardIcon className={size} />;
  }
}

export default function FeatureGrid({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle?: string;
  items: Item[];
}) {
  return (
    <section className="section">
      <Reveal>
        <SectionHeading alignment="left" title={title} subtitle={subtitle} />
      </Reveal>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, i) => (
          <Reveal key={i}>
            <div className={clsx("card card-hover p-6 md:p-8 h-full")}
                 role="group" aria-labelledby={`feature-title-${i}`}>
              <div className="flex items-start gap-4">
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border text-[color:var(--text-on-dark)]"
                  style={{ borderColor: "var(--border-dark)", background: "var(--surface-dark)" }}
                  aria-hidden
                >
                  <Icon name={item.icon} />
                </div>
                <div className="min-w-0">
                  <h3 id={`feature-title-${i}`} className="text-sm font-semibold tracking-wide uppercase text-neutral-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-neutral-600 leading-6 text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
