interface PaginationProps {
  pages: any[];
  setCurrentPage: (page: number) => void;
}

function Pagination({ pages, setCurrentPage }: PaginationProps) {
  const handlePaginate = (pageNumber: number) => setCurrentPage(pageNumber);
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
