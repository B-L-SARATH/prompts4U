import Link from "next/link";

const Pagination = ({ currentPage, totalPages }) => {
  return (
    <div className="w-80  flex justify-center m-5 rounded-lg">
      <div>
        <Link href={`?page=${currentPage - 1}`}>
          <button
            className={`${
              currentPage <= 1 && "disabled"
            } bg-black text-white p-2 border border-black rounded-l-md `}
            disabled={currentPage <= 1}
          >
            Prev
          </button>
        </Link>
      </div>

      <div>
        <Link href={`?page=${currentPage}`}>
          <button
            className={`${
              currentPage >= totalPages && "disabled"
            } p-2 border border-black font-bold b`}
            disabled={currentPage >= totalPages}
          >
            {currentPage}
          </button>
        </Link>
      </div>
      <div>
        <Link href={`?page=${currentPage + 1}`}>
          <button
            className={`${
              currentPage >= totalPages && "disabled"
            } p-2 border border-black`}
            disabled={currentPage >= totalPages}
          >
            {currentPage + 1}
          </button>
        </Link>
      </div>
      <div>
        <Link href={`?page=${currentPage + 1}`}>
          <button
            className={`${
              currentPage === totalPages && "disabled"
            } bg-black text-white p-2 border border-black rounded-r-md`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Pagination;
