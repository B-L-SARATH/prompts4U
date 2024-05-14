import Link from "next/link";

const Form = ({ post, setPost, handlesubmit, submitting, type }) => {
  return (
    <section>
      <h1 className="blue_gradient m-3 font-extrabold text-center text-5xl">
        {type} Post
      </h1>
      <p className="m-3 text-center">
        {type} a AI tool prompt .so that you can use it for the better result
        with no time
      </p>
      <form
        action=""
        onSubmit={handlesubmit}
        className="p-3 m-2   flex-between flex-col"
      >
        <label htmlFor="" className="font-extrabold m-2">
          Your AI Prompt
        </label>
        <textarea
          value={post.prompt}
          onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          rows="10"
          cols="50"
          className="p-4 shadow-lg m-2"
          placeholder="Write your AI Prompt here..."
          required
        ></textarea>
        <label htmlFor="" className="font-extrabold m-2">
          Tag{" "}
          <span className="font-extralight">
            (#webdevelopment #ContentWriting)
          </span>
        </label>
        <input
          type="text"
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
          placeholder="#tag"
          className="outline-none m-2 border border-gray-300  w-1/3 h-10 rounded-lg shadow p-3"
          required
        />
        <div className="flex justify-around items-center">
          <button type="submit" disabled={submitting} className="black_btn m-3">
            {submitting ? `${type}ing..` : `${type}`}
          </button>
          <Link href="/" className="outline_btn m-3">
            {" "}
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Form;
