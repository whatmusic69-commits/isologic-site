"use client";

import React from "react";
import clsx from "../util/clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export default function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "btn",
        variant === "primary" ? "btn-primary" : "btn-secondary",
        "transition-colors",
        className
      )}
    />
  );
}

