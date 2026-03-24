import React from "react";

export default function ServiceCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="card card-hover p-6 h-full will-change-transform">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-3 text-neutral-600 text-sm leading-6">
        {description}
      </p>
    </div>
  );
}
