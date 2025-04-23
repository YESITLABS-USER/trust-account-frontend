import React, { useMemo, useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import Sidebar from '../../../components/header/SideBar'
import CustomDateRangePicker from '../../../components/DateRangePicker'
import { useDateRangeFilter } from '../../../hooks/useDateRangeFilter'
import PaginationControls from '../../../components/user/PaginationControls'
import useSortableData from '../../../hooks/useSortableData'
import ReportDownloadDropdown from '../../../components/user/ReportDownloadDropdown'


const transactions = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    date: `22/10/${2021 + (i % 3)}`,
    payor: `Person ${i + 1}`,
    method: ["Wire Transfer", "Check", "Cash"][i % 3],
    checkNumber: i % 2 === 0 ? "N/A" : `${1000 + i}`,
    purpose: ["Payment", "Invoice", "Deposit"][i % 3],
    deposit: (i + 1) * 100,
    disbursement: (i + 1) * 50,
    balance: (i + 1) * 50,
    notes: `Note ${i + 1}`,
    reconciled: i % 2 === 0 ? "Yes" : "No",
}));


const parseDate = (dateStr) => {
    const parts = dateStr.split("/");
    return new Date(`${parts[1]}/${parts[0]}/${parts[2]}`);
};


const IndividualClientLedger = () => {
    const { isSidebarOpen } = useAuth()
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedClient, setSelectedClient] = useState("");
    const [isTableOpen, setIsTableOpen] = useState(false);
    const [searchClientOpen, setSearchClientOpen] = useState(false)


    const clients = [
        "Arlene Brekke", "Scott Brekke", "Caroline Barton", "Jimmy Jacobi",
        "Irene Stark", "Shannon Bayer"
    ];

    const handleSelectClient = (client) => {
        setSelectedClient(client);
    };
    const filteredClientData = clients.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleGetLedgerDaitles = () => {
        selectedClient ? setIsTableOpen(true) : alert("Select the client");
    }
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [data, setData] = useState(transactions);
    const [filteredData, setFilteredData] = useState(data);


    const { handleApply, handleCancel } = useDateRangeFilter({
        data,
        dateKey: 'date',
        onFilter: setFilteredData,
    });

    // 🔹 Apply Sort
    const { sortedData, sortConfig, handleSort } = useSortableData(filteredData);
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return sortedData.slice(start, start + rowsPerPage);
    }, [sortedData, currentPage, rowsPerPage]);

    const getSortArrow = (key) =>
        sortConfig.key === key ? (sortConfig.direction === "asc" ? " ↑" : " ↓") : "";

    const totalRecords = transactions.length;
    const perPageOptions = [...Array(Math.ceil(totalRecords / 10))].map((_, i) => (i + 1) * 10);


    return (
        <>

            <div className={`dashboard-body-wrp ${isSidebarOpen ? "show active" : ""}`}>
                {
                    isTableOpen ? (
                        <div className="dashboard-body dsbrd-tbl-body">
                            <div className="dsbrd-client-info-wrp" style={{
                                color: 'black'
                            }}>
                                <div className="dsbrd-client-info-left">
                                    <strong>Client Name : <span className="client-name">Caroline Barton</span></strong>
                                    <p>Case Open on :  <span className="date">26-12-2022</span></p>
                                </div>
                                <div className="dsbrd-client-info-right">
                                    <strong>Current Month and Year : <span className="currmnth-yr">January 2024</span> </strong>
                                    <strong>Matter Name  :  <span className="mtr-name">Property</span></strong>
                                    <p>Case Close on :  <span className="close-date">26-12-2026</span></p>
                                </div>
                            </div>
                            <form>
                                <div className="ds-bdy-head mb-3">
                                    <div className="ds-filter-wrp">
                                        <p>*REQUIRED BY STANDARD (1)(a) IN ACCORDANCE WITH SUBDIVISIONS (d)(3) and (e) OF RULE 1.15.</p>
                                        <div className="ds-filter-input-wrp">
                                            {/* <div className="input-grp datefield-wrp">
                                                <input type="text" id="txtDateRange" name="txtDateRange" className="inputField shortInputField dateRangeField" placeholder="Date range" data-from-field="txtDateFrom" data-to-field="txtDateTo" />
                                                <input type="hidden" id="txtDateFrom" value="" />
                                                <input type="hidden" id="txtDateTo" value="" /> */}
                                            {/* <!-- <label>Date range</label> --> */}
                                            {/* </div> */}
                                            <CustomDateRangePicker onApply={handleApply} onCancel={handleCancel} />
                                        </div>
                                        <div className="dsfilter-rt-btns">
                                            {/* <a href="./images/download-icon.svg" download="./images/download-icon.svg" className="cmn-btn"><img src="./images/download-icon.svg" alt="" />Download Report</a> */}
                                            <ReportDownloadDropdown name={'Download Report'} data={data} />
                                        </div>
                                    </div>
                                </div>
                                <div className="ds-bdy-content">
                                    <div className="ds-bdy-table-wrp">
                                        <table>
                                            <thead>
                                                <tr>
                                                    {[
                                                        { key: "id", label: "S.No" },
                                                        { key: "date", label: "Date" },
                                                        { key: "payor", label: "Payor or Payee" },
                                                        { key: "method", label: "Transaction Method" },
                                                        { key: "checkNumber", label: "Check Number" },
                                                        { key: "purpose", label: "Purpose" },
                                                        { key: "deposit", label: "Deposit Amount" },
                                                        { key: "disbursement", label: "Disbursement Amount" },
                                                        { key: "balance", label: "Running Balance" },
                                                        { key: "notes", label: "Notes" },
                                                        { key: "reconciled", label: "Reconciled?" },
                                                    ].map(({ key, label }) => (
                                                        <th
                                                            key={key}
                                                            onClick={label !== "Reconciled?" ? () => handleSort(key) : undefined}
                                                            style={label !== "Reconciled?" ? { cursor: "pointer" } : {}}
                                                        >
                                                            {label} {label !== "Reconciled?" && getSortArrow(key)}
                                                        </th>
                                                    ))}

                                                </tr>
                                            </thead>
                                            <tbody>

                                                {paginatedData?.length > 0 ? (
                                                    paginatedData?.map((transaction) => (
                                                        <tr key={transaction?.id}>
                                                            <td>{transaction?.id}</td>
                                                            <td>{transaction?.date}</td>
                                                            <td>{transaction?.payor}</td>
                                                            <td>{transaction?.method}</td>
                                                            <td>{transaction?.checkNumber}</td>
                                                            <td>{transaction?.purpose}</td>
                                                            <td>{transaction?.deposit}</td>
                                                            <td>{transaction?.disbursement}</td>
                                                            <td>{transaction?.balance}</td>
                                                            <td>{transaction?.notes}</td>
                                                            {/* <td>{transaction?.reconciled}</td> */}
                                                            <td>
                                                                <div class="status-icon-wrp">
                                                                    <div class="status-icon">
                                                                        <img
                                                                            src="images/check-green.png"
                                                                            alt="Checked"
                                                                        />
                                                                    </div>
                                                                    <div class="status-icon">
                                                                        <img
                                                                            src="images/times-icon-red.svg"
                                                                            alt="Not Checked"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>

                                                    ))) : (
                                                    <tr>
                                                        <td colSpan="12">No transactions found</td>

                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* Par Page Controls */}
                                    {/* <div className="select-item-count">
                                        <select
                                            value={rowsPerPage}
                                            onChange={(e) => {
                                                setRowsPerPage(Number(e.target.value));
                                                setCurrentPage(1); // Reset to first page when changing rows per page
                                            }}
                                        >
                                            {pageSizeOptions.map((size) => (
                                                <option key={size} value={size}>{size} Rows</option>
                                            ))}
                                        </select>
                                    </div> */}
                                    {/* Pagination Controls */}
                                    {/* <div className="dsbrd-pagination">
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
                                    </div> */}

                                    {/* Items Per Page Dropdown */}
                                    <div className="select-item-count">
                                        <select
                                            value={rowsPerPage}
                                            onChange={(e) => {
                                                setRowsPerPage(Number(e.target.value));
                                                setCurrentPage(1);
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
                                    <PaginationControls
                                        data={sortedData}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        rowsPerPage={rowsPerPage}
                                    />


                                </div>
                            </form>

                        </div>
                    ) : (
                        <div className="dashboard-body">
                            <div className="ds-bdy-head max">
                                <h1>Individual Client Ledger</h1>
                                <strong>Search and Access Detailed Accounting Records for Your Clients</strong>
                            </div>
                            <div class="dsbdy-content max">
                                <h2 class="dsbdy-content-title" >Select Client</h2>
                                <div class="search-ledger-wrp" >
                                    <div class="search-ledger-head" onClick={() => setSearchClientOpen((prev) => !prev)} style={{ cursor: "pointer" }}>
                                        <input type="text" readonly placeholder={`${selectedClient ? selectedClient : 'Select Client'}`} id="search-client" style={{ cursor: "pointer" }} />
                                    </div>

                                    <div className={`search-ledger-body ${searchClientOpen ? "slide-in" : "slide-out"}`}
                                    >
                                        <form>
                                            <div class="search-ledger input-grp search">
                                                <label for="clientSearch" class="visually-hidden">Search clients</label>
                                                <input type="text" id="clientSearch" name="search" placeholder="Search by Client name" autocomplete="off" onChange={(e) => setSearchQuery(e.target.value)} />
                                                <button type="submit" aria-label="Perform search">
                                                    <img src="images/search-icon.svg" alt="Search Icon" loading="lazy" />
                                                </button>
                                            </div>
                                            <div class="client-list" role="listbox">
                                                <ul>
                                                    {filteredClientData.length > 0 ? (
                                                        filteredClientData.map((client, index) => (
                                                            <li
                                                                key={index}
                                                                role="option"
                                                                tabIndex={index === 0 ? "0" : "-1"}
                                                                aria-selected="false"
                                                                onClick={() => {
                                                                    handleSelectClient(client);
                                                                    setSearchClientOpen(false);
                                                                }}
                                                            >
                                                                {client}
                                                            </li>
                                                        ))
                                                    ) : (
                                                        <li role="option" tabIndex="-1" aria-selected="false" className="no-result">
                                                            No clients found
                                                        </li>
                                                    )}

                                                </ul>
                                            </div>
                                        </form>
                                        <div class="loading-state" hidden>
                                            <p>Loading...</p>
                                        </div>
                                        <div class="error-state" hidden>
                                            <p>Error loading clients. Please try again.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="get-ledger">
                                <button type="button" aria-label="Perform search" onClick={handleGetLedgerDaitles} disabled={!selectedClient}>
                                    <img src="images/ledger-icon.svg" alt="Search Icon" loading="lazy" />Get Ledger
                                </button>
                            </div>
                        </div >
                    )
                }






                {/* Styles for Animation */}
                < style jsx > {`
                    .search-ledger-body {
                    
                    max-height: 0;
                    overflow: hidden;
                    transform: translateY(-10px);
                    transition: all 0.5s ease-in-out;
                    opacity: 0;
                    padding: 0;
                    color:#000;
                    }
                    .slide-in {
                    max-height: 500px;
                    transform: translateY(0);
                    opacity: 1;
                    padding: 10px;
                    color:#000
                    }
                    .slide-out {
                    max-height: 0;
                    transform: translateY(-10px);
                    opacity: 0;
                    padding: 0;
                    color:#000
                    }
                `}</style>
            </div >
        </>
    )
}

export default IndividualClientLedger