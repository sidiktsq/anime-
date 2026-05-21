import { NextRequest, NextResponse } from "next/server";
import {
  searchAnime,
  getTrendingAnime,
  getTopAnime,
  getAnimeByGenre,
  getSeasonalAnime,
} from "@/services/animeService";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const trending = searchParams.get("trending");
    const genres = searchParams.get("genres");
    const season = searchParams.get("season");
    const year = parseInt(searchParams.get("year") || "0", 10);
    const page = searchParams.get("page") || "1";

    if (trending) {
      const data = await getTrendingAnime();
      return NextResponse.json(data);
    }

    if (season && year) {
      const data = await getSeasonalAnime(season, year);
      return NextResponse.json(data);
    }

    if (genres) {
      const data = await getAnimeByGenre(parseInt(genres, 10), parseInt(page));
      return NextResponse.json(data);
    }

    if (query) {
      const data = await searchAnime(query, parseInt(page));
      return NextResponse.json(data);
    }

    const data = await getTopAnime(parseInt(page));
    return NextResponse.json(data);
  } catch (error) {
    console.error("Anime API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch anime data" },
      { status: 500 }
    );
  }
}
