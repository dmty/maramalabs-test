import { fetchData } from "@/app/api/data";

export async function GET() {
  const data = await fetchData();
  return Response.json(data);
}
