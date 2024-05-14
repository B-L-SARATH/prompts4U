import { connectDB } from "@utils/db";
import Prompt from "@models/Prompt";
import User from "@models/User";
export const GET = async (req) => {
  const searchparams = req.nextUrl.searchParams;

  console.log("searchparams", searchparams);
  try {
    const users = await User.find({
      name: { $regex: searchparams.get("search"), $options: "i" },
    });

    const userids = users.map((user) => user._id);

    const page = Number(searchparams.get("page"));

    const pagesize = 2;
    const keyword = searchparams.get("search")
      ? {
          $or: [
            { prompt: { $regex: searchparams.get("search"), $options: "i" } },
            { tag: { $regex: searchparams.get("search"), $options: "i" } },
            { user: { $in: userids } },
          ],
        }
      : {};
    const documentCount = await Prompt.countDocuments();
    await connectDB();
    const posts = await Prompt.find({ ...keyword })
      .limit(pagesize)
      .skip(pagesize * (page - 1))
      .populate("user");

    return new Response(
      JSON.stringify({
        posts,
        currentPage: page,
        totalPages: Math.ceil(documentCount / pagesize),
      }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new Response(err, { status: 500 });
  }
};
