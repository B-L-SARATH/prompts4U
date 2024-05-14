import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
const Promptcard = ({ post, handleDelete, handleEdit }) => {
  const router = useRouter();
  const path = usePathname();
  const { data: session } = useSession();
  const [copied, setcopied] = useState(false);
  const handlecopy = () => {
    navigator.clipboard.writeText(post.prompt);
    setcopied(true);
    toast.success("Prompt copied to clipboard");
    setTimeout(() => {
      setcopied(false);
    }, 2000);
  };

  return (
    <>
      {post && (
        <div className="m-3 p-3 shadow-lg flex-between w-80 flex-col rounded-xl">
          <div className="flex gap-3 ">
            <div className="w-16 flex-between">
              <Image
                src={post.user.image}
                alt="user"
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
                onClick={() => router.push(`/getprofile/${post.user._id}`)}
              />
            </div>
            <div className="flex flex-col">
              <p className="font-extrabold my-1">{post.user.name}</p>
              <p className="font-extralight my-1">{post.user.email}</p>
            </div>

            <div
              onClick={() => handlecopy()}
              className="flex-between cursor-pointer"
            >
              {copied ? (
                <Image
                  src="/assets/icons/tick.png"
                  alt="copied "
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  src="/assets/icons/copy.png"
                  alt="copy"
                  width={20}
                  height={20}
                />
              )}
            </div>
          </div>
          <div>
            <p className="my-2">{post.prompt}</p>
            <p
              className="my-2 blue_gradient cursor-pointer"
              onClick={() => router.push(`?search=${post.tag}`)}
            >
              # {post.tag}
            </p>
          </div>
          <div>
            {session?.user &&
              session.user.id == post.user._id &&
              (path == "/profile" ||
                path == `/getprofile/${post.user._id}`) && (
                <div className="flex gap-3">
                  <button
                    className="black_btn"
                    onClick={() => handleEdit(post)}
                  >
                    Edit
                  </button>
                  <button
                    className="outline_btn"
                    onClick={() => handleDelete(post)}
                  >
                    Delete
                  </button>
                </div>
              )}
          </div>
        </div>
      )}
    </>
  );
};

export default Promptcard;
