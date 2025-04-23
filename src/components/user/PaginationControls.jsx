// {/* Pagination Controls */ }
// <div className="dsbrd-pagination">
//     <ul>
//         <li className="prev" onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>
//             <img src="images/left-chevron.svg" alt="Icon" />
//         </li>
//         {[...Array(totalPages).keys()].map((num) => (
//             <li key={num + 1} className={currentPage === num + 1 ? "active" : ""} style={{
//                 color: 'black'
//             }} onClick={() => setCurrentPage(num + 1)}>
//                 {num + 1}
//             </li>
//         ))}
//         <li className="next" onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}>
//             <img src="images/left-chevron.svg" alt="Icon" />
//         </li>
//     </ul>
// </div>

import React from 'react';

// PaginationControls component
const PaginationControls = ({ data, currentPage, setCurrentPage, rowsPerPage }) => {
    const totalPages = Math.ceil(data?.length / rowsPerPage); // Calculate total pages

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber); // Update the current page
        }
    };

    return (
        <div className="dsbrd-pagination">
            {/* Pagination navigation */}
            <ul >
                {/* Previous Button */}
                <li
                    onClick={() => handlePageChange(currentPage - 1)}
                    className='prev'
                >
                    <img src="images/left-chevron.svg" alt="Icon" />
                </li>

                {/* Page Numbers */}
                {[...Array(totalPages)?.keys()].map((num) => (
                    <li
                        key={num + 1}
                        onClick={() => handlePageChange(num + 1)}
                        className={currentPage === num + 1 ? "active" : ""}
                        style={{
                            color: 'black'
                        }}
                    >
                        {num + 1}
                    </li>
                ))}
                {/* Next Button */}
                <li
                    className="next"
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    <img src="images/left-chevron.svg" alt="Icon" />
                </li>
            </ul>
        </div>
        
    );
};

export default PaginationControls;
