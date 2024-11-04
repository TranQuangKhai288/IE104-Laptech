// src/components/BorderCheckDiv.tsx

import React from "react";

interface BorderCheckDivProps {
  bgColor: string;
}

function BorderCheckDiv({ bgColor }: BorderCheckDivProps) {
  // Convert hex to RGB if necessary
  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  };

  // Calculate lightness
  const getLightness = ({ r, g, b }: { r: number; g: number; b: number }) => {
    return (r * 0.2126 + g * 0.7152 + b * 0.0722) / 255;
  };

  // Parse color and determine if it needs a border
  const rgbColor =
    typeof bgColor === "string" && bgColor.startsWith("#")
      ? hexToRgb(bgColor)
      : { r: 255, g: 255, b: 255 }; // default to white if not valid

  const lightness = getLightness(rgbColor);
  const needsGrayBorder = lightness > 0.9;

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className={`w-4 h-4 rounded ${needsGrayBorder ? "border-2 border-gray-400" : ""}`}
    ></div>
  );
}

export default BorderCheckDiv;
