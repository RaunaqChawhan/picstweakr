import { Ai } from "@cloudflare/ai";

export async function onRequestPost(context) {
  const req = context.request as Request;
  const body = await req.arrayBuffer();
  console.log(body);

  if (!body) {
    return new Response("No image provided", { status: 400 });
  }

  const ai = new Ai(context.env.AI);

  const response = await ai.run("@cf/unum/uform-gen2-qwen-500m", {
    image: [...new Uint8Array(body)],
  });

  return Response.json(response);
}
