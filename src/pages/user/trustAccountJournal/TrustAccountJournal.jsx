import React, { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext';
import Sidebar from '../../../components/header/SideBar';
import EntryDetailForm from '../../../components/popup/EntryDetailForm';
import CustomDateRangePicker from '../../../components/DateRangePicker';
import { useDateRangeFilter } from '../../../hooks/useDateRangeFilter';
import { Button } from 'react-bootstrap';
import { BsPencil } from 'react-icons/bs'


const parseDate = (dateStr) => {
    const parts = dateStr.split("/");
    return new Date(`${parts[1]}/${parts[0]}/${parts[2]}`);
};


const TrustAccountJournal = () => {
    const { isSidebarOpen } = useAuth()
    const [isTableOpen, setTableOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [formData, setFormData] = useState({
        bankName: "",
        accountNumber: "",
        accountName: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        // You can validate or log here
        console.log("Form Data:", formData);
        handleTableOpen(); // This shows the table
    };




    // Table Logics
    const handleTableOpen = () => {
        setTableOpen(true)
    }

    const dummyData = [
        { id: 1, date: "23/10/2021", payorPayee: "Steve Rogers", method: "Wire Transfer", checkNumber: "1023", purpose: "Document Retrieval", deposit: "4393", disbursement: "0", balance: "5393", client: "R&W Development", notes: "Auto-generated note" },
        { id: 2, date: "24/10/2021", payorPayee: "Michael Green", method: "Check", checkNumber: "2747", purpose: "Investigation", deposit: "1132", disbursement: "0", balance: "6525", client: "Capstone Legal Group", notes: "Auto-generated note" },
        { id: 3, date: "25/10/2021", payorPayee: "Samantha Lee", method: "ACH", checkNumber: "3849", purpose: "Investigation", deposit: "0", disbursement: "484", balance: "6041", client: "Amazonian Council", notes: "Auto-generated note" },
        { id: 4, date: "26/10/2021", payorPayee: "Nancy Drew", method: "ACH", checkNumber: "2210", purpose: "Document Retrieval", deposit: "4388", disbursement: "0", balance: "10429", client: "Law Firm Bank Charges", notes: "Auto-generated note" },
        { id: 5, date: "27/10/2021", payorPayee: "Steve Rogers", method: "ACH", checkNumber: "5390", purpose: "Initial Deposit", deposit: "2662", disbursement: "0", balance: "13091", client: "Dr. Linh Tran", notes: "Auto-generated note" },
        { id: 6, date: "28/10/2021", payorPayee: "Tony Stark", method: "Wire Transfer", checkNumber: "9110", purpose: "Case Filing", deposit: "3795", disbursement: "0", balance: "16886", client: "Innovate Law Group", notes: "Auto-generated note" },
        { id: 7, date: "29/10/2021", payorPayee: "Bruce Wayne", method: "Check", checkNumber: "8491", purpose: "Medical Records", deposit: "0", disbursement: "1340", balance: "15546", client: "Justice Law", notes: "Auto-generated note" },
        { id: 8, date: "30/10/2021", payorPayee: "Clark Kent", method: "Wire Transfer", checkNumber: "7753", purpose: "Initial Deposit", deposit: "2458", disbursement: "0", balance: "18004", client: "Wayne & Associates", notes: "Auto-generated note" },
        { id: 9, date: "31/10/2021", payorPayee: "Peter Parker", method: "ACH", checkNumber: "6259", purpose: "Investigation", deposit: "0", disbursement: "1521", balance: "16483", client: "Stark Legal", notes: "Auto-generated note" },
        { id: 10, date: "01/11/2021", payorPayee: "Diana Prince", method: "Check", checkNumber: "1933", purpose: "Document Retrieval", deposit: "4839", disbursement: "0", balance: "21322", client: "Aegis Law Group", notes: "Auto-generated note" },
        { id: 11, date: "02/11/2021", payorPayee: "Wanda Maximoff", method: "Wire Transfer", checkNumber: "8374", purpose: "Case Filing", deposit: "1984", disbursement: "0", balance: "23306", client: "S.H.I.E.L.D. Law", notes: "Auto-generated note" },
        { id: 12, date: "03/11/2021", payorPayee: "Natasha Romanoff", method: "ACH", checkNumber: "4520", purpose: "Court Fee", deposit: "0", disbursement: "743", balance: "22563", client: "Widow & Partners", notes: "Auto-generated note" },
        { id: 13, date: "04/11/2021", payorPayee: "Bruce Banner", method: "ACH", checkNumber: "2931", purpose: "Medical Records", deposit: "0", disbursement: "596", balance: "21967", client: "Gamma Legal", notes: "Auto-generated note" },
        { id: 14, date: "05/11/2021", payorPayee: "Nick Fury", method: "Wire Transfer", checkNumber: "3109", purpose: "Investigation", deposit: "3895", disbursement: "0", balance: "25862", client: "Avengers Legal", notes: "Auto-generated note" },
        { id: 15, date: "06/11/2021", payorPayee: "Stephen Strange", method: "Check", checkNumber: "4521", purpose: "Case Review", deposit: "0", disbursement: "1100", balance: "24762", client: "Sanctum Law", notes: "Auto-generated note" },
        { id: 16, date: "07/11/2021", payorPayee: "Matt Murdock", method: "ACH", checkNumber: "7135", purpose: "Court Fee", deposit: "0", disbursement: "876", balance: "23886", client: "Nelson & Murdock", notes: "Auto-generated note" },
        { id: 17, date: "08/11/2021", payorPayee: "Jessica Jones", method: "Wire Transfer", checkNumber: "9922", purpose: "Document Retrieval", deposit: "3476", disbursement: "0", balance: "27362", client: "Alias Legal", notes: "Auto-generated note" },
        { id: 18, date: "09/11/2021", payorPayee: "Luke Cage", method: "Check", checkNumber: "7629", purpose: "Case Filing", deposit: "0", disbursement: "1437", balance: "25925", client: "Harlem Legal Center", notes: "Auto-generated note" },
        { id: 19, date: "10/11/2021", payorPayee: "Danny Rand", method: "ACH", checkNumber: "8162", purpose: "Investigation", deposit: "2485", disbursement: "0", balance: "28410", client: "Iron Fist Legal", notes: "Auto-generated note" },
        { id: 20, date: "11/11/2021", payorPayee: "Pepper Potts", method: "Wire Transfer", checkNumber: "1302", purpose: "Consultation", deposit: "2290", disbursement: "0", balance: "30699", client: "Stark Industries Legal", notes: "Auto-generated note" },
        { id: 21, date: "12/11/2021", payorPayee: "Carol Danvers", method: "Check", checkNumber: "3201", purpose: "Case Filing", deposit: "0", disbursement: "1111", balance: "29588", client: "Captain Legal", notes: "Auto-generated note" },
        { id: 22, date: "13/11/2021", payorPayee: "Scott Lang", method: "ACH", checkNumber: "2093", purpose: "Document Retrieval", deposit: "3410", disbursement: "0", balance: "32998", client: "Quantum Legal", notes: "Auto-generated note" },
        { id: 23, date: "14/11/2021", payorPayee: "Hope Van Dyne", method: "Wire Transfer", checkNumber: "1190", purpose: "Initial Deposit", deposit: "2634", disbursement: "0", balance: "35632", client: "Pym Legal Solutions", notes: "Auto-generated note" },
        { id: 24, date: "15/11/2021", payorPayee: "Shuri", method: "Check", checkNumber: "4482", purpose: "Court Fee", deposit: "0", disbursement: "812", balance: "34820", client: "Wakanda Legal Group", notes: "Auto-generated note" },
        { id: 25, date: "16/11/2021", payorPayee: "T'Challa", method: "Wire Transfer", checkNumber: "3402", purpose: "Investigation", deposit: "3777", disbursement: "0", balance: "38597", client: "Panther Justice", notes: "Auto-generated note" },
        { id: 26, date: "17/11/2021", payorPayee: "Sam Wilson", method: "ACH", checkNumber: "9911", purpose: "Case Filing", deposit: "0", disbursement: "1235", balance: "37362", client: "Falcon Legal", notes: "Auto-generated note" },
        { id: 27, date: "18/11/2021", payorPayee: "Bucky Barnes", method: "Wire Transfer", checkNumber: "2238", purpose: "Document Retrieval", deposit: "3050", disbursement: "0", balance: "40412", client: "Winter Law", notes: "Auto-generated note" },
        { id: 28, date: "19/11/2021", payorPayee: "Monica Rambeau", method: "Check", checkNumber: "5567", purpose: "Medical Records", deposit: "0", disbursement: "987", balance: "39425", client: "Spectrum Legal", notes: "Auto-generated note" },
        { id: 29, date: "20/11/2021", payorPayee: "Kamala Khan", method: "ACH", checkNumber: "7820", purpose: "Initial Deposit", deposit: "2211", disbursement: "0", balance: "41636", client: "Marvel Law Office", notes: "Auto-generated note" },
        { id: 30, date: "21/11/2021", payorPayee: "Kate Bishop", method: "Wire Transfer", checkNumber: "1830", purpose: "Court Fee", deposit: "0", disbursement: "654", balance: "40982", client: "Hawkeye Legal", notes: "Auto-generated note" },
        { id: 31, date: "22/11/2021", payorPayee: "Yelena Belova", method: "ACH", checkNumber: "8321", purpose: "Case Filing", deposit: "3160", disbursement: "0", balance: "44142", client: "Widow International Law", notes: "Auto-generated note" },
        { id: 32, date: "23/11/2021", payorPayee: "Marc Spector", method: "Check", checkNumber: "8619", purpose: "Court Fee", deposit: "0", disbursement: "1543", balance: "42599", client: "Moon Knight Legal", notes: "Auto-generated note" },
        { id: 33, date: "24/11/2021", payorPayee: "Layla El-Faouly", method: "Wire Transfer", checkNumber: "7801", purpose: "Investigation", deposit: "3870", disbursement: "0", balance: "46469", client: "Scarab Legal", notes: "Auto-generated note" },
        { id: 34, date: "25/11/2021", payorPayee: "Jane Foster", method: "ACH", checkNumber: "3342", purpose: "Consultation", deposit: "1932", disbursement: "0", balance: "48401", client: "Astro Legal", notes: "Auto-generated note" },
        { id: 35, date: "26/11/2021", payorPayee: "Thor Odinson", method: "Check", checkNumber: "1199", purpose: "Court Fee", deposit: "0", disbursement: "1392", balance: "47009", client: "Asgard Legal", notes: "Auto-generated note" },
        { id: 36, date: "27/11/2021", payorPayee: "Loki Laufeyson", method: "Wire Transfer", checkNumber: "9932", purpose: "Document Retrieval", deposit: "3542", disbursement: "0", balance: "50551", client: "Mischief Law", notes: "Auto-generated note" },
        { id: 37, date: "28/11/2021", payorPayee: "Sylvie", method: "ACH", checkNumber: "4533", purpose: "Case Filing", deposit: "0", disbursement: "1608", balance: "48943", client: "Variant Legal Group", notes: "Auto-generated note" },
        { id: 38, date: "29/11/2021", payorPayee: "Mobius M. Mobius", method: "Check", checkNumber: "2058", purpose: "Court Fee", deposit: "0", disbursement: "914", balance: "48029", client: "TVA Law Office", notes: "Auto-generated note" },
        { id: 39, date: "30/11/2021", payorPayee: "Ravonna Renslayer", method: "Wire Transfer", checkNumber: "6293", purpose: "Investigation", deposit: "2830", disbursement: "0", balance: "50859", client: "Timelines Legal", notes: "Auto-generated note" },
        { id: 40, date: "01/12/2021", payorPayee: "He Who Remains", method: "ACH", checkNumber: "7744", purpose: "Consultation", deposit: "3120", disbursement: "0", balance: "53979", client: "Multiverse Law", notes: "Auto-generated note" },
        { id: 41, date: "02/12/2021", payorPayee: "John Doe", method: "Wire Transfer", checkNumber: "4422", purpose: "Case Filing", deposit: "4100", disbursement: "0", balance: "58079", client: "Doe & Partners", notes: "Auto-generated note" },
        { id: 42, date: "03/12/2021", payorPayee: "Jane Roe", method: "Check", checkNumber: "3355", purpose: "Consultation", deposit: "0", disbursement: "1222", balance: "56857", client: "Roe Legal Group", notes: "Auto-generated note" },
        { id: 43, date: "04/12/2021", payorPayee: "Richard Roe", method: "ACH", checkNumber: "7632", purpose: "Document Retrieval", deposit: "3799", disbursement: "0", balance: "60656", client: "Family Law Center", notes: "Auto-generated note" },
        { id: 44, date: "05/12/2021", payorPayee: "Mary Major", method: "Wire Transfer", checkNumber: "5599", purpose: "Court Fee", deposit: "0", disbursement: "1320", balance: "59336", client: "Major Law Office", notes: "Auto-generated note" },
        { id: 45, date: "06/12/2021", payorPayee: "Tom Thumb", method: "Check", checkNumber: "1122", purpose: "Initial Deposit", deposit: "3000", disbursement: "0", balance: "62336", client: "Thumb & Co", notes: "Auto-generated note" }
    ];


    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState(dummyData);
    const [filteredData, setFilteredData] = useState(data);



    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // reset to page 1 on search
    };


    const { handleApply, handleCancel } = useDateRangeFilter({
        data,
        dateKey: "date",
        onFilter: setFilteredData,
        parseDate,
    });

    // 🔹 Apply Search, Case, Month filters
    useEffect(() => {
        let result = [...data];

        if (searchTerm) {
            result = result.filter(item =>
                item.client.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredData(result);
        setCurrentPage(1);
    }, [data, searchTerm]);


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

    const getSortArrow = (key) =>
        sortConfig.key === key ? (sortConfig.direction === "asc" ? " ↑" : " ↓") : "";



    const totalRecords = sortedData.length;
    const totalPages = Math.ceil(totalRecords / perPage);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * perPage;
        return sortedData.slice(startIndex, startIndex + perPage);
    }, [sortedData, currentPage, perPage]);
    const perPageOptions = [...Array(Math.ceil(totalRecords / 10))].map((_, i) => (i + 1) * 10);

    const handleAddEntry = () => {
        setIsModalOpen(true);
    }



    return (
        <>
            <Sidebar />
            <div className={`dashboard-body-wrp show ${isSidebarOpen ? 'active' : ''}`} style={isTableOpen ? { display: "none" } : {}}>
                <div className="dashboard-body">
                    <div className="ds-bdy-head">
                        <h1>Trust Account Journal</h1>
                        <strong>Search and Access Detailed Accounting Records for Your Clients</strong>
                    </div>
                    <div className="dsbdy-content">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="account-journal-form row">
                                <div className="input-grp w-50">
                                    <label>Bank Name</label>
                                    <select name="bankName" value={formData.bankName} onChange={handleInputChange}>
                                        <option value="" disabled>Bank Name</option>
                                        <option value="Bank of America">Bank of America</option>
                                        <option value="Other Bank">Other Bank</option>
                                    </select>
                                </div>
                                <div className="input-grp w-50">
                                    <label htmlFor="AccountNumber">Account Number</label>
                                    <input
                                        type="text"
                                        id="AccountNumber"
                                        name="accountNumber"
                                        value={formData.accountNumber}
                                        placeholder="Enter Account Number"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="input-grp w-50">
                                    <label htmlFor="AccountName">Account Name</label>
                                    <input
                                        type="text"
                                        id="AccountName"
                                        name="accountName"
                                        value={formData.accountName}
                                        placeholder="Enter Account Name"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="dsbdy-frm-btn-grp">
                                <button
                                    type="button"
                                    className="viewuploaded blue-bg cmn-btn-2"
                                    onClick={handleSubmit}
                                >
                                    Get Journal
                                </button>
                                <button
                                    type="button"
                                    className="viewuploaded blue-bg cmn-btn-2"
                                // onClick={handleSubmit}
                                >
                                    Add Entry
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className={`dashboard-body-wrp hide ${isSidebarOpen ? 'active' : ''}`} style={isTableOpen ? {} : { display: "none" }}>
                <div className="search-bar-wrp">
                    <div className="search-bar">
                        <form>
                            <div className="input-grp search">
                                <input type="text" name="search" placeholder="Search by client name" value={searchTerm} onChange={handleSearchChange} />
                                <button type="submit" aria-label="Perform search">
                                    <img src="images/search-icon.svg" alt="Search Icon" loading="lazy" />
                                </button>
                            </div>
                        </form>
                        <div className="dsbdy-frm-btn-grp mt-0">
                            <button className="cmn-btn-2 blue-bg" onClick={handleAddEntry}>
                                Add Entry
                            </button>
                        </div>
                    </div>
                </div>

                <div className="dashboard-body dsbrd-tbl-body">
                    <div className="dsbrd-client-info-wrp align-items-start" style={{ color: "#000" }}>
                        <div className="dsbrd-client-info-left">
                            <strong>
                                Account Name : <span className="client-name">Caroline Barton</span>
                            </strong>
                            <strong>
                                Firm Name : <span className="farm-name">Expert Law Firm </span>
                            </strong>
                            <p>
                                Bank : <span className="bank-name">Bank of America</span>
                            </p>
                            <p>
                                Account Open Date : <span className="date">03-01-2024</span>
                            </p>
                        </div>
                        <div className="dsbrd-client-info-right">
                            <strong>
                                Current Month and Year : <span className="currmnth-yr">January 2024</span>
                            </strong>
                            <strong>
                                Account : <span className="account-no">123456789</span>
                            </strong>
                            <p>
                                Account Close Date : <span className="close-date"></span>
                            </p>
                        </div>
                    </div>

                    <form>
                        <div className="ds-bdy-head mb-3">
                            <div className="ds-filter-wrp">
                                <p>
                                    *REQUIRED BY STANDARD (1)(b) IN ACCORDANCE WITH SUBDIVISIONS (d)(3)
                                    and (e) OF RULE 1.15.
                                </p>
                                <div className="ds-filter-input-wrp">
                                    {/* <div className="input-grp datefield-wrp">
                                        <input
                                            type="text"
                                            id="txtDateRange"
                                            name="txtDateRange"
                                            className="inputField shortInputField dateRangeField"
                                            placeholder="Date range"
                                            data-from-field="txtDateFrom"
                                            data-to-field="txtDateTo"
                                        />
                                        <input type="hidden" id="txtDateFrom" value="" />
                                        <input type="hidden" id="txtDateTo" value="" />
                                    </div> */}
                                    <CustomDateRangePicker onApply={handleApply} onCancel={handleCancel} />
                                </div>
                                <div className="dsfilter-rt-btns">
                                    <a
                                        href="./images/download-icon.svg"
                                        download="./images/download-icon.svg"
                                        className="cmn-btn"
                                    >
                                        <img src="./images/download-icon.svg" alt="" />Download Report
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="ds-bdy-content">
                            <div className="ds-bdy-table-wrp tbl-large">
                                <table>
                                    <thead>
                                        <tr>
                                            {[
                                                "id",
                                                "date",
                                                "payorPayee",
                                                "method",
                                                "checkNumber",
                                                "purpose",
                                                "deposit",
                                                "disbursement",
                                                "balance",
                                                "client",
                                                "notes",
                                            ].map((key) => (
                                                <th key={key} onClick={() => handleSort(key)} style={{ cursor: "pointer" }}>
                                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                                    {sortConfig.key === key ? (sortConfig.direction === "asc" ? " ↑" : " ↓") : ""}
                                                </th>
                                            ))}
                                            <th>Reconciled to Ledgers</th>
                                            <th>Reconciled to Bank Statement?</th>
                                            <th>Update</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedData.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.date}</td>
                                                <td>{item.payorPayee}</td>
                                                <td>{item.method}</td>
                                                <td>{item.checkNumber}</td>
                                                <td>{item.purpose}</td>
                                                <td>{item.deposit}</td>
                                                <td>{item.disbursement}</td>
                                                <td>{item.balance}</td>
                                                <td>{item.client}</td>
                                                <td>{item.notes}</td>
                                                <td>
                                                    <div className="status-icon-wrp">
                                                        <img src="images/check-green.png" alt="check" />
                                                        <img src="images/times-icon-red.svg" alt="cross" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="status-icon-wrp">
                                                        <img src="images/check-green.png" alt="check" />
                                                        <img src="images/times-icon-red.svg" alt="cross" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <a href="#" className="btn btn-sm">
                                                        <BsPencil className="me-1" />
                                                    </a>

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* Items Per Page Dropdown */}
                        <div className="select-item-count">
                            <select
                                value={perPage}
                                onChange={(e) => {
                                    setPerPage(Number(e.target.value));
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
            <EntryDetailForm
                onClose={() => setIsModalOpen(false)}
                isOpen={isModalOpen}
            />
        </>
    )
}

export default TrustAccountJournal
