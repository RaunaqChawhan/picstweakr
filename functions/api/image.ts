import { Ai } from "@cloudflare/ai";

export async function onRequestPost(context) {
  const req = context.request as Request;
  const body = await req.json();
  console.log(body);

  if (!body.imageDescription) {
    return new Response("No image prompt provided", { status: 400 });
  }

  const ai = new Ai(context.env.AI);

  const result = await ai.run("@cf/lykon/dreamshaper-8-lcm", {
    prompt: body.imageDescription,
  });

  return new Response(result, {
    headers: {
      "content-type": "image/png",
    },
  });
}
