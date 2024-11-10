import './pagination.scss';

interface PaginationProps {
  pages: any[];
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

function Pagination({ pages, setCurrentPage, currentPage }: PaginationProps) {
  const handlePaginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(400, 400);
  };

  return (
    <>
      {pages.map((_, index) => (
        <span
          className={currentPage === index + 1 ? `active-page` : ``}
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
