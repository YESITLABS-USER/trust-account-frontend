import React, { useEffect, useMemo, useState } from 'react'
import Sidebar from '../../../components/header/SideBar'
import { useAuth } from '../../../contexts/AuthContext';
import CustomDateRangePicker from '../../../components/DateRangePicker';
import { useDateRangeFilter } from '../../../hooks/useDateRangeFilter';

const parseDate = (dateStr) => {
    const parts = dateStr.split("/");
    return new Date(`${parts[1]}/${parts[0]}/${parts[2]}`);
};



const OutstandingDeposits = () => {

    const { isSidebarOpen } = useAuth()
    const [isOpenTabel, setIsOpenTab] = useState(true);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [selectedMonthYear, setSelectedMonthYear] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    // Expanded Sample Data with 50 Entries

    const tableData = [
        { id: 1, date: "01/02/2024", checkNumber: "123456", payer: "John Doe", client: "Client A", amount: 250.00 },
        { id: 2, date: "15/01/2024", checkNumber: "789012", payer: "Jane Smith", client: "Client B", amount: 500.50 },
        { id: 3, date: "22/02/2024", checkNumber: "345678", payer: "Mike Ross", client: "Client C", amount: 125.75 },
        { id: 4, date: "10/03/2024", checkNumber: "901234", payer: "Harvey Specter", client: "Client D", amount: 300.25 },
        { id: 5, date: "05/04/2024", checkNumber: "567890", payer: "Rachel Zane", client: "Client E", amount: 450.60 },
        { id: 6, date: "18/02/2024", checkNumber: "112233", payer: "Donna Paulsen", client: "Client F", amount: 275.30 },
        { id: 7, date: "12/03/2024", checkNumber: "445566", payer: "Louis Litt", client: "Client G", amount: 320.80 },
        { id: 8, date: "25/01/2024", checkNumber: "778899", payer: "Jessica Pearson", client: "Client H", amount: 680.15 },
        { id: 9, date: "07/02/2024", checkNumber: "223344", payer: "Harvey Dent", client: "Client I", amount: 540.40 },
        { id: 10, date: "28/03/2024", checkNumber: "998877", payer: "Bruce Wayne", client: "Client J", amount: 950.90 },
        { id: 11, date: "03/01/2024", checkNumber: "112244", payer: "Clark Kent", client: "Client K", amount: 210.25 },
        { id: 12, date: "19/04/2024", checkNumber: "556677", payer: "Peter Parker", client: "Client L", amount: 375.75 },
        { id: 13, date: "11/03/2024", checkNumber: "887766", payer: "Tony Stark", client: "Client M", amount: 620.60 },
        { id: 14, date: "06/02/2024", checkNumber: "332211", payer: "Steve Rogers", client: "Client N", amount: 495.45 },
        { id: 15, date: "20/01/2024", checkNumber: "667788", payer: "Natasha Romanoff", client: "Client O", amount: 810.30 },
        { id: 16, date: "14/04/2024", checkNumber: "445577", payer: "Thor Odinson", client: "Client P", amount: 705.25 },
        { id: 17, date: "09/02/2024", checkNumber: "998811", payer: "Bruce Banner", client: "Client Q", amount: 580.80 },
        { id: 18, date: "17/03/2024", checkNumber: "332299", payer: "Diana Prince", client: "Client R", amount: 690.90 },
        { id: 19, date: "26/01/2024", checkNumber: "665544", payer: "Wade Wilson", client: "Client S", amount: 435.10 },
        { id: 20, date: "31/03/2024", checkNumber: "556699", payer: "Stephen Strange", client: "Client T", amount: 520.50 },
        { id: 21, date: "05/02/2024", checkNumber: "774411", payer: "Nick Fury", client: "Client U", amount: 385.25 },
        { id: 22, date: "18/04/2024", checkNumber: "882233", payer: "Charles Xavier", client: "Client V", amount: 915.40 },
        { id: 23, date: "21/01/2024", checkNumber: "990055", payer: "Erik Lehnsherr", client: "Client W", amount: 780.30 },
        { id: 24, date: "08/02/2024", checkNumber: "443322", payer: "Logan Howlett", client: "Client X", amount: 625.15 },
        { id: 25, date: "12/03/2024", checkNumber: "220011", payer: "Jean Grey", client: "Client Y", amount: 450.45 },
        { id: 26, date: "14/04/2024", checkNumber: "661122", payer: "Scott Summers", client: "Client Z", amount: 355.65 },
        { id: 27, date: "22/01/2024", checkNumber: "998822", payer: "Ororo Munroe", client: "Client AA", amount: 515.90 },
        { id: 28, date: "17/02/2024", checkNumber: "553311", payer: "Hank McCoy", client: "Client BB", amount: 720.80 },
        { id: 29, date: "29/03/2024", checkNumber: "990033", payer: "Raven Darkholme", client: "Client CC", amount: 600.20 },
        { id: 30, date: "01/04/2024", checkNumber: "773322", payer: "Kurt Wagner", client: "Client DD", amount: 410.35 },
        { id: 31, date: "15/03/2024", checkNumber: "885577", payer: "Remy LeBeau", client: "Client EE", amount: 330.10 },
        { id: 32, date: "11/02/2024", checkNumber: "662233", payer: "Anna Marie", client: "Client FF", amount: 750.50 },
        { id: 33, date: "28/01/2024", checkNumber: "559988", payer: "Bobby Drake", client: "Client GG", amount: 420.25 },
        { id: 34, date: "19/03/2024", checkNumber: "331144", payer: "Emma Frost", client: "Client HH", amount: 825.60 },
        { id: 35, date: "06/04/2024", checkNumber: "447755", payer: "Warren Worthington", client: "Client II", amount: 390.75 },
        { id: 36, date: "23/02/2024", checkNumber: "112266", payer: "Lucas Bishop", client: "Client JJ", amount: 495.90 },
        { id: 37, date: "04/01/2024", checkNumber: "887744", payer: "Piotr Rasputin", client: "Client KK", amount: 550.40 },
        { id: 38, date: "30/03/2024", checkNumber: "335522", payer: "Kitty Pryde", client: "Client LL", amount: 275.30 },
        { id: 39, date: "07/02/2024", checkNumber: "993311", payer: "Nathan Summers", client: "Client MM", amount: 690.25 },
        { id: 40, date: "25/04/2024", checkNumber: "776688", payer: "Domino", client: "Client NN", amount: 850.60 },
        { id: 41, date: "21/03/2024", checkNumber: "445599", payer: "Deadpool", client: "Client OO", amount: 430.80 },
        { id: 42, date: "15/01/2024", checkNumber: "998877", payer: "Cable", client: "Client PP", amount: 380.50 },
        { id: 43, date: "10/02/2024", checkNumber: "664477", payer: "Mystique", client: "Client QQ", amount: 755.40 },
        { id: 44, date: "09/04/2024", checkNumber: "552288", payer: "Sabretooth", client: "Client RR", amount: 480.90 }
    ];

        const [data, setData] = useState(tableData);
        const [filteredData, setFilteredData] = useState(data);

    // Extract unique Month & Year from tableData for dropdown
    const monthYearOptions = useMemo(() => {
        const uniqueMonths = new Set(
            tableData.map((row) => {
                const [day, month, year] = row.date.split("/");
                return `${new Date(year, month - 1).toLocaleString("en-US", { month: "short" })}-${year}`;
            })
        );
        return Array.from(uniqueMonths).sort();
    }, [tableData]);

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1); // Reset to first page when searching
    };



    // Sorting function
    const { handleApply, handleCancel } = useDateRangeFilter({
        data,
        dateKey: "date",
        onFilter: setFilteredData,
        parseDate,
    });

    // 🔹 Apply Search, Case, Month filters
    useEffect(() => {
        let result = [...data];

        if (selectedMonthYear) {
            result = result.filter((item) => {
                const [day, month, year] = item.date.split("/");
                const itemMonthYear = `${new Date(year, month - 1).toLocaleString("en-US", {
                    month: "short",
                })}-${year}`;
                return itemMonthYear === selectedMonthYear;
            });
        }

        if (searchQuery) {
            result = result.filter(item =>
                item.client.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredData(result);
        setCurrentPage(1);
    }, [data, searchQuery, selectedMonthYear]);



    // 🔹 Sort logic
    const sortedData = useMemo(() => {
        const sorted = [...filteredData].sort((a, b) => {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            if (sortConfig.key === "date") {
                aValue = parseDate(aValue);
                bValue = parseDate(bValue);
            } else if (!isNaN(aValue) && !isNaN(bValue)) {
                aValue = parseFloat(aValue);
                bValue = parseFloat(bValue);
            } else {
                aValue = String(aValue).toLowerCase();
                bValue = String(bValue).toLowerCase();
            }

            if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });

        return sorted;
    }, [filteredData, sortConfig]);


    // 🔹 Helpers
    const handleSort = (key, type = "string") => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    // Pagination Logic
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

   

    const totalRecords = tableData.length;
    const perPageOptions = [...Array(Math.ceil(totalRecords / 10))].map((_, i) => (i + 1) * 10);


    return (
        <>
            <Sidebar />
            <div className={`dashboard-body-wrp ${isSidebarOpen ? "show active" : ""}`}>
                <div className="search-bar-wrp">
                    <div className="search-bar">
                        <form onSubmit={handleSearch}>
                            <div className="input-grp search">
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Search by User name"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="submit" aria-label="Perform search">
                                    <img src="images/search-icon.svg" alt="Search Icon" loading="lazy" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="dashboard-body dsbrd-tbl-body">
                    <form>
                        <div className="ds-bdy-head mb-3">
                            <div className="ds-filter-wrp">

                                <div className="ds-filter-input-wrp">
                                    {/* Date Range Input */}
                                    {/* <div className="input-grp datefield-wrp">
                                        <input type="text" id="txtDateRange" name="txtDateRange" className="inputField shortInputField dateRangeField" placeholder="Date range" />
                                    </div> */}
                                    <CustomDateRangePicker onApply={handleApply} onCancel={handleCancel} />
                                    {/* Dynamic Month & Year Dropdown */}
                                    <div className="input-grp">
                                        <select value={selectedMonthYear} onChange={(e) => { setSelectedMonthYear(e.target.value); setCurrentPage(1); }}>
                                            <option value="">All Months</option>
                                            {monthYearOptions.map((option) => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div class="bank-charges-inr-btn-wrp">
                                    <a href="./images/download-icon.svg" download class="cmn-btn">
                                        <img src="./images/download-icon.svg" alt="Download" /> Download Report
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Table Content */}
                        <div className="ds-bdy-content">
                            <div className="ds-bdy-table-wrp">
                                <div className="table-container">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="small-col" onClick={() => handleSort("id")}>S.No ⬍</th>
                                                <th className="date-col" onClick={() => handleSort("date")}>Date ⬍</th>
                                                <th className="check-number-col" onClick={() => handleSort("checkNumber")}>Check Number ⬍</th>
                                                <th className="payer-col" onClick={() => handleSort("payer")}>Payer ⬍</th>
                                                <th className="related-to-client-col" onClick={() => handleSort("client")}>Related to Client ⬍</th>
                                                <th className="amount-col" onClick={() => handleSort("amount")}>Amount ⬍</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {paginatedData.length > 0 ? (
                                                paginatedData.map((row, index) => (
                                                    <tr key={row.id}>
                                                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                        <td>{row.date}</td>
                                                        <td className="text-truncate">{row.checkNumber}</td>
                                                        <td className="text-truncate">{row.payer}</td>
                                                        <td className="text-truncate">{row.client}</td>
                                                        <td className="text-truncate">${row.amount.toFixed(2)}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" style={{ textAlign: "center" }}>No Records Found</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {/* Items Per Page Dropdown */}
                        <div className="select-item-count">
                            <select
                                value={itemsPerPage}
                                onChange={(e) => {
                                    setItemsPerPage(Number(e.target.value));
                                    // Reset to first page when changing items per page
                                }}
                            >
                                {perPageOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option} per page
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Pagination Controls */}
                        <div className="dsbrd-pagination">
                            <ul>
                                <li className="prev" onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>
                                    <img src="images/left-chevron.svg" alt="Icon" />
                                </li>
                                {[...Array(totalPages).keys()].map((num) => (
                                    <li key={num + 1} className={currentPage === num + 1 ? "active" : ""} style={{
                                        color: 'black'
                                    }} onClick={() => setCurrentPage(num + 1)}>
                                        {num + 1}
                                    </li>
                                ))}
                                <li className="next" onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}>
                                    <img src="images/left-chevron.svg" alt="Icon" />
                                </li>
                            </ul>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default OutstandingDeposits
