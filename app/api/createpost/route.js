import { connectDB } from "@utils/db";
import Prompt from "@models/Prompt";
export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectDB();

    const post = await Prompt.create({
      user: userId,
      prompt,
      tag,
    });

    return new Response(JSON.stringify(post), { status: 201 });
  } catch (err) {
    console.log(err);
    return new Response(err, { status: 500 });
  }
};
