import React from "react";
import SectionHeading from "./section-heading";
import Reveal from "./reveal";
import clsx from "../util/clsx";
import { FlagIcon, EyeIcon, UserCogIcon, CloudIcon, SendIcon, RocketIcon, TreeIcon, ShieldIcon, FoodIcon, DocumentIcon, CheckIcon } from "./icons";

type StandardsItem = {
  title: string;
  icon?: string;
};

type StandardsSectionProps = {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  items: StandardsItem[];
};

function IconBox({ name }: { name?: string }) {
  const size = "w-5 h-5";
  switch (name) {
    case "flag":
      return <FlagIcon className={size} />;
    case "eye":
      return <EyeIcon className={size} />;
    case "user-settings":
      return <UserCogIcon className={size} />;
    case "cloud":
      return <CloudIcon className={size} />;
    case "send":
      return <SendIcon className={size} />;
    case "rocket":
      return <RocketIcon className={size} />;
    case "tree":
      return <TreeIcon className={size} />;
    default:
      return <FlagIcon className={size} />;
  }
}

export default function StandardsSection({ title, subtitle, ctaText, ctaHref, items, groups }: StandardsSectionProps & { groups?: { title: string; bullets: string[] }[] }) {
  return (
    <section className="section">
      {/* Centered header */}
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <SectionHeading alignment="center" title={title} subtitle={subtitle} />
        </Reveal>
      </div>

      {/* Grid of cards (light style) */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
        {groups && groups.length > 0
          ? groups.map((g, i) => (
              <Reveal key={i}>
                <Card title={g.title} bullets={g.bullets} iconHint={g.title} />
              </Reveal>
            ))
          : items.map((it, i) => (
              <Reveal key={i}>
                <Card title={it.title} bullets={[]} iconHint={it.icon || it.title} />
              </Reveal>
            ))}
      </div>

      {ctaText && ctaHref && (
        <div className="mt-8 text-center">
          <a href={ctaHref} className="btn btn-primary">{ctaText}</a>
        </div>
      )}
    </section>
  );
}

function Card({ title, bullets, iconHint }: { title: string; bullets: string[]; iconHint?: string }) {
  const Icon = chooseGroupIcon(iconHint || title);
  return (
    <div className="card relative overflow-hidden card-hover p-5 md:p-6 h-full before:absolute before:top-0 before:left-0 before:w-full before:h-[2px] before:bg-accent before:rounded-t-2xl before:content-['']">
      <div className="flex items-start gap-3">
        <div className="text-neutral-900 mt-0.5" aria-hidden>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <div className="text-sm font-semibold tracking-wide uppercase text-neutral-900">{title}</div>
          {bullets && bullets.length > 0 && (
            <ul className="mt-3 space-y-2">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-neutral-900">
                  <span className="mt-0.5 text-accent" aria-hidden>
                    <CheckIcon className="w-4 h-4" />
                  </span>
                  <span className="text-sm leading-6">{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function chooseGroupIcon(hint: string) {
  const t = hint.toLowerCase();
  if (t.includes("haccp") || t.includes("food") || t.includes("pvd")) return FoodIcon;
  if (t.includes("iso") || t.includes("cert")) return ShieldIcon;
  if (t.includes("security") || t.includes("27001")) return ShieldIcon;
  return DocumentIcon;
}
