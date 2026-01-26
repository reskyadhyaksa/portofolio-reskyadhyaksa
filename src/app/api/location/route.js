export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
    {
      headers: {
        "User-Agent": "portofolio-reskyadhyaksa",
      },
    },
  );
  const data = await res.json();
  return Response.json(data);
}
