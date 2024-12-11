// app/api/images/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

  if (!UNSPLASH_ACCESS_KEY) {
    return NextResponse.json(
      { error: "Missing Unsplash Access Key" },
      { status: 500 }
    );
  }

  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=restaurant&per_page=9&client_id=${UNSPLASH_ACCESS_KEY}`
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }

  const data = await response.json();
  return NextResponse.json(data.results);
}
