export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return Response.json({ error: "Missing lat or lon parameters" }, { status: 400 });
    }

    const roundedLat = Number(lat).toFixed(2);
    const roundedLon = Number(lon).toFixed(2);

    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${roundedLat}&lon=${roundedLon}&format=json`,
      {
        headers: {
          "User-Agent": "portofolio-reskyadhyaksa",
        },
        next: { revalidate: 86400 },
      },
    );

    if (!res.ok) {
      return Response.json({ error: "Failed to fetch location" }, { status: res.status });
    }

    const data = await res.json();
    return Response.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return Response.json({ error: message }, { status: 500 });
  }
}
