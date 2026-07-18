import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = `${siteConfig.name} — Özenle Kavrulmuş Kahve`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#2b1b12",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: -2,
            color: "#f5ead9",
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 36,
            color: "#c9a97a",
          }}
        >
          Özenle Kavrulmuş Kahve
        </div>
      </div>
    ),
    { ...size },
  );
}
