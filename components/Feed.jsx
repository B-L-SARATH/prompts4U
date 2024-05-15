"use client";
import { useState, useEffect } from "react";
import Promptcard from "./Promptcard";
import Pagination from "./Pagination";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
const Feed = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const handleSearch = (value) => {
    setSearch(value);
    router.push("/?search=" + value);
  };

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    const search = searchParams.get("search") || "";
    setCurrentPage(page);
    setSearch(search);
  }, [searchParams]);

  useEffect(() => {
    const fetchposts = async () => {
      const res = await fetch(
        `/api/posts?page=${currentPage}&&search=${search}`
      );
      const data = await res.json();
      setPosts(data.posts);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    };
    session?.user && fetchposts();
    // console.log(
    //   "fetching is done .currentpage is ",
    //   currentPage,
    //   "totalpages",
    //   totalPages
    // );
  }, [session?.user, currentPage, search]);

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <>
        {session?.user ? (
          <input
            type="text"
            placeholder="Search for a tag or username"
            className="m-5 border border-gray-50 rounded-lg w-72 shadow-lg p-3 outline-none"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        ) : (
          <h1 className="m-3 font-bold text-orange-400 text-2xl">
            sign in to see the feed
          </h1>
        )}

        <div className="m-3 p-3 flex gap-5 flex-wrap">
          {posts.length == 0 ? (
            <p>No posts found</p>
          ) : (
            posts.map((post) => (
              <Promptcard key={post._id} post={post} setsearch={setSearch} />
            ))
          )}
        </div>
        {session?.user && (
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        )}
      </>
    </Suspense>
  );
};

export default Feed;
