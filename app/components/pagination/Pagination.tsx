import React from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded  mb-12">
      <p className="text-sm text-gray-600">
        {currentPage} - {totalPages}
      </p>
      <div className="flex items-center space-x-4 ">
        <p className="text-sm text-gray-600 whitespace-nowrap hidden md:block">
          The page you&apos;re on
        </p>
        <select
          name="page"
          value={currentPage}
          onChange={(e) => onPageChange(Number(e.target.value))}
          className="hidden w-full p-2 text-sm text-gray-700 border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 md:block"
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <p className="text-sm text-gray-600">|</p>
        <div className="flex space-x-2">
          <button
            onClick={handlePrevious}
            className="p-2 text-gray-600 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            disabled={currentPage === 1}
          >
            <BsArrowLeft />
          </button>
          <button
            onClick={handleNext}
            className="p-2 text-gray-600 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            disabled={currentPage === totalPages}
          >
            <BsArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
