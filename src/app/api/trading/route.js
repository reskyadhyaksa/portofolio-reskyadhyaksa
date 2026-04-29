export async function GET(req){
  const { searchParams } = new URL(req.url);

  const res = await fetch(`http://127.0.0.1:8000/analyze`, {});
  const data = await res.json()
  return Response.json(data);
}