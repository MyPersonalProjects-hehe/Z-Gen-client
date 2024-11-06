interface PaginationProps {
  pages: any[];
  setCurrentPage: (page: number) => void;
}

function Pagination({ pages, setCurrentPage }: PaginationProps) {
  const handlePaginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(400, 400);
  };

  return (
    <>
      {pages.map((_, index) => (
        <span
          onClick={() => handlePaginate(index + 1)}
          key={index}
        >
          {index + 1}
        </span>
      ))}
    </>
  );
}
export default Pagination;
