import { Ai } from "@cloudflare/ai";

export async function onRequestPost(context) {
  const req = context.request as Request;
  const body = await req.json();
  console.log(body);

  if (!body.imageDescription) {
    return new Response("No image description provided", { status: 400 });
  }

  const ai = new Ai(context.env.AI);

  const response = await ai.run("@cf/meta/llama-2-7b-chat-fp16", {
    messages: [
      {
        role: "system",
        content:
          "you are a creative writer that can spun up imaginative stories in a jiff.",
      },
      { role: "user", content: body.imageDescription },
    ],
  });

  return Response.json(response);
}
