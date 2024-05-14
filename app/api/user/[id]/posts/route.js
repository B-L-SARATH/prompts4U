import { connectDB } from "@utils/db";
import Prompt from "@models/Prompt";
export const GET = async (req, { params }) => {
  const id = params.id;
  try {
    await connectDB();
    const posts = await Prompt.find({ user: id }).populate("user");
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(err, { status: 500 });
  }
};
