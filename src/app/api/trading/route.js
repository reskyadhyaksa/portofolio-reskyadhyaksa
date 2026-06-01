export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const market = searchParams.get('market') || 'XAUUSDm';
  const timeframe = searchParams.get('timeframe') || 'TIMEFRAME_M5';
  const hours_back = searchParams.get('hours_back') || '24';

  try {
    const res = await fetch(
      `http://127.0.0.1:8000/analyze?market=${market}&timeframe=${timeframe}&hours_back=${hours_back}`,
      {
        method: 'GET',
        cache: 'no-store', 
      }
    );

    if (!res.ok) {
      return Response.json(
        { status: "error", message: `FastAPI error: ${res.statusText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return Response.json(data);

  } catch (error) {
    return Response.json(
      { status: "error", message: "Failed to connect to Analysis Server" },
      { status: 500 }
    );
  }
}