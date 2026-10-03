export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return Response.json({ error: "Missing lat or lon parameters" }, { status: 400 });
    }

    if (!process.env.OPENWEATHER_KEY) {
      return Response.json({ error: "API key not configured" }, { status: 500 });
    }

    const roundedLat = Number(lat).toFixed(2);
    const roundedLon = Number(lon).toFixed(2);

    const res = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${roundedLat}&lon=${roundedLon}&units=metric&appid=${process.env.OPENWEATHER_KEY}`,
      {
        next: { revalidate: 900 },
      }
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return Response.json(
        { error: errorData.message || "Failed to fetch weather data" },
        { status: res.status }
      );
    }

    const data = await res.json();

    return Response.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    return Response.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
