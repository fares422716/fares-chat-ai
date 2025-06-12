
export async function POST(req: Request) {
  const { prompt } = await req.json();
  const reply = `🔮 تم استلام الطلب: ${prompt}`;
  return new Response(JSON.stringify({ result: reply }));
}
