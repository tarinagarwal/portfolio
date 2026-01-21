import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Read the image file
    const imagePath = path.join(process.cwd(), "public", "image.png");
    const imageBuffer = fs.readFileSync(imagePath);

    // Create SVG with circular mask
    const svg = `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="circle">
            <circle cx="256" cy="256" r="256"/>
          </clipPath>
        </defs>
        <image 
          href="data:image/png;base64,${imageBuffer.toString("base64")}" 
          width="512" 
          height="512" 
          clip-path="url(#circle)"
        />
      </svg>
    `;

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error generating favicon:", error);
    return new NextResponse("Error generating favicon", { status: 500 });
  }
}
