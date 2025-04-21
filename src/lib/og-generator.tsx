import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export async function GenerateImage(params: { title: string }) {
  const [interBold, interRegular] = await Promise.all([
    fetch(new URL("../fonts/Inter-Bold.woff", import.meta.url)).then((res) =>
      res.arrayBuffer()
    ),
    fetch(new URL("../fonts/Inter-Regular.woff", import.meta.url)).then((res) =>
      res.arrayBuffer()
    ),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
          backgroundColor: "#000",
          height: "100%",
          width: "100%",
          padding: "50px",
          color: "#fff",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Title */}
        <div style={{ fontSize: 80, fontWeight: 700, lineHeight: 1.2 }}>
          {params.title}
        </div>

        {/* Footer Section */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* Avatar */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            style={{
              borderRadius: "50%",
            }}
            width={86}
            height={86}
            src={"https://avatars.githubusercontent.com/u/62739017?v=4"}
            alt={`Khao's Avatar`}
          />

          {/* Name & URL */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 32, fontWeight: 700 }}>KhaoDoesDev</span>
            <span style={{ fontSize: 24, color: "#ccc", fontWeight: 400 }}>
              khaodoes.dev
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "InterBold",
          data: interBold,
          style: "normal",
          weight: 700,
        },
        {
          name: "Inter",
          data: interRegular,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
