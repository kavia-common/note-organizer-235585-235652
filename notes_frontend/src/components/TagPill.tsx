import React from "react";

export function TagPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  const cls = active
    ? "border-[rgba(59,130,246,0.6)] bg-[rgba(59,130,246,0.12)] text-[rgba(17,24,39,0.95)]"
    : "border-[rgba(17,24,39,0.14)] bg-white/70 text-[rgba(17,24,39,0.85)]";
  const Tag = onClick ? "button" : "span";

  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm ${cls} ${
        onClick ? "hover:shadow-sm cursor-pointer" : ""
      }`}
    >
      <span className="text-[rgba(6,182,212,0.9)]">#</span>
      <span>{label}</span>
    </Tag>
  );
}
