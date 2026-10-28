import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = siteConfig.defaultOgImage.alt;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0b0b0b",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: 80,
          width: "100%",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, fontWeight: 700, letterSpacing: 6 }}>IQBAL HAMDANI</div>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 800, letterSpacing: -3, lineHeight: 1 }}>
          {siteConfig.role}
        </div>
        <div style={{ color: "#a3a3a3", display: "flex", fontSize: 28 }}>iqbalhamdani.com</div>
      </div>
    ),
    size,
  );
}
