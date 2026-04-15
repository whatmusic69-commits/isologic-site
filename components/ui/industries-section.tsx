import React from "react";
import SectionHeading from "./section-heading";
import Reveal from "./reveal";
import clsx from "../util/clsx";
import {
  BriefcaseIcon,
  CpuIcon,
  HeartPulseIcon,
  GraduationCapIcon,
  ScaleIcon,
  MessagesSquareIcon,
  LandmarkIcon,
  BuildingCircleIcon,
  FoodIcon,
  ToolsIcon,
  RocketIcon,
} from "./icons";

type IndustryItem = { title: string; icon?: string };

export default function IndustriesSection({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle?: string;
  items: IndustryItem[];
}) {
  return (
    <section className="section">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <SectionHeading alignment="center" title={title} subtitle={subtitle} />
        </Reveal>
      </div>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((it, i) => (
          <Reveal key={i}>
            <div className={clsx("card card-hover p-5 md:p-6 text-center h-full flex flex-col items-center justify-center min-h-[180px] sm:min-h-[200px]")}>
  <div
    className="mx-auto h-14 w-14 rounded-full flex items-center justify-center text-[color:var(--text-on-dark)]"
    style={{ background: "var(--surface-dark)", border: "1px solid var(--border-dark)" }}
    aria-hidden
  >
    <Icon name={it.icon} />
  </div>

  <div className="mt-4 max-w-[140px] sm:max-w-[160px] text-sm sm:text-base font-semibold text-neutral-900 leading-tight break-words hyphens-auto">
    {it.title}
  </div>
</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Icon({ name }: { name?: string }) {
  const size = "w-[22px] h-[22px]";
  switch (name) {
    case "briefcase":
      return <BriefcaseIcon className={size} />;
    case "cpu":
      return <CpuIcon className={size} />;
    case "heart-pulse":
      return <HeartPulseIcon className={size} />;
    case "graduation-cap":
      return <GraduationCapIcon className={size} />;
    case "scale":
      return <ScaleIcon className={size} />;
    case "messages-square":
      return <MessagesSquareIcon className={size} />;
    case "landmark":
      return <LandmarkIcon className={size} />;
    case "building":
      return <BuildingCircleIcon className={size} />;
    case "utensils":
      return <FoodIcon className={size} />;
    case "wrench":
      return <ToolsIcon className={size} />;
    case "rocket":
      return <RocketIcon className={size} />;
    default:
      return <BriefcaseIcon className={size} />;
  }
}
