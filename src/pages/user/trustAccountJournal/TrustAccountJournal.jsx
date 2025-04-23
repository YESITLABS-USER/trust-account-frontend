import React, { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext';
import Sidebar from '../../../components/header/SideBar';
import EntryDetailForm from '../../../components/popup/EntryDetailForm';
import CustomDateRangePicker from '../../../components/DateRangePicker';
import { useDateRangeFilter } from '../../../hooks/useDateRangeFilter';
import { BsPencil } from 'react-icons/bs'
import ReportDownloadDropdown from '../../../components/user/ReportDownloadDropdown';
import useSortableData from '../../../hooks/useSortableData';


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
        if (!formData.bankName || !formData.accountNumber || !formData.accountName) {
            alert("Please fill all fields");
            return 
        }
        // console.log("Form Data:", formData);
        handleTableOpen(); // This shows the table
    };
    // Table Logics
    const handleTableOpen = () => {
        setTableOpen(true)
    }

    const dummyData = [
        { id: 1, date: "04/11/2025", payorPayee: "John Smith", method: "Check", checkNumber: "1001", purpose: "Retainer", deposit: "1500", disbursement: "0", balance: "1500", client: "Wayne Enterprises", notes: "Auto-generated note", reconciledToLedgers: "1", reconciledToBankStatement: "1" },
        { id: 2, date: "04/12/2025", payorPayee: "Mary Johnson", method: "Wire", checkNumber: "2345", purpose: "Consultation", deposit: "0", disbursement: "500", balance: "1000", client: "Stark Industries", notes: "Auto-generated note", reconciledToLedgers: "0", reconciledToBankStatement: "1" },
        { id: 3, date: "04/10/2025", payorPayee: "Alice Brown", method: "Cash", checkNumber: "3827", purpose: "Filing", deposit: "1200", disbursement: "0", balance: "2200", client: "Oscorp", notes: "Auto-generated note", reconciledToLedgers: "1", reconciledToBankStatement: "0" },
        { id: 4, date: "04/09/2025", payorPayee: "James Wilson", method: "ACH", checkNumber: "7632", purpose: "Settlement", deposit: "0", disbursement: "300", balance: "1900", client: "LexCorp", notes: "Auto-generated note", reconciledToLedgers: "0", reconciledToBankStatement: "0" },
        { id: 5, date: "04/06/2025", payorPayee: "Emily Davis", method: "Check", checkNumber: "9248", purpose: "Travel", deposit: "1000", disbursement: "0", balance: "2900", client: "Hooli", notes: "Auto-generated note", reconciledToLedgers: "1", reconciledToBankStatement: "1" },
        { id: 6, date: "04/07/2025", payorPayee: "Michael Miller", method: "Wire", checkNumber: "4432", purpose: "Court Fees", deposit: "0", disbursement: "450", balance: "2450", client: "Massive Dynamic", notes: "Auto-generated note", reconciledToLedgers: "0", reconciledToBankStatement: "1" },
        { id: 7, date: "04/15/2025", payorPayee: "Olivia Anderson", method: "ACH", checkNumber: "1187", purpose: "Deposition", deposit: "2000", disbursement: "0", balance: "4450", client: "Initech", notes: "Auto-generated note", reconciledToLedgers: "1", reconciledToBankStatement: "0" },
        { id: 8, date: "04/10/2025", payorPayee: "William Martinez", method: "Cash", checkNumber: "8872", purpose: "Filing", deposit: "0", disbursement: "620", balance: "3830", client: "Globex Corporation", notes: "Auto-generated note", reconciledToLedgers: "1", reconciledToBankStatement: "1" },
        { id: 9, date: "04/16/2025", payorPayee: "Sophia Lee", method: "Check", checkNumber: "7123", purpose: "Retainer", deposit: "1800", disbursement: "0", balance: "5630", client: "Vehement Capital Partners", notes: "Auto-generated note", reconciledToLedgers: "0", reconciledToBankStatement: "1" },
        { id: 10, date: "04/11/2025", payorPayee: "Liam Thompson", method: "Wire", checkNumber: "5056", purpose: "Consultation", deposit: "0", disbursement: "388", balance: "5242", client: "Wonka Industries", notes: "Auto-generated note", reconciledToLedgers: "1", reconciledToBankStatement: "0" },
        { id: 11, date: "04/05/2025", payorPayee: "Isabella Brooks", method: "Wire", checkNumber: "6134", purpose: "Deposition", deposit: "1700", disbursement: "0", balance: "7242", client: "Cyberdyne Systems", notes: "Auto-generated note", reconciledToLedgers: "0", reconciledToBankStatement: "1" },
        { id: 12, date: "04/14/2025", payorPayee: "Logan Perez", method: "ACH", checkNumber: "2491", purpose: "Filing", deposit: "0", disbursement: "950", balance: "6292", client: "Nakatomi Trading", notes: "Auto-generated note", reconciledToLedgers: "1", reconciledToBankStatement: "1" },
        { id: 13, date: "04/13/2025", payorPayee: "Chloe Morgan", method: "Cash", checkNumber: "3598", purpose: "Settlement", deposit: "2200", disbursement: "0", balance: "8492", client: "Acme Corp", notes: "Auto-generated note", reconciledToLedgers: "0", reconciledToBankStatement: "0" },
        { id: 14, date: "04/17/2025", payorPayee: "Jack White", method: "Check", checkNumber: "4461", purpose: "Travel", deposit: "0", disbursement: "720", balance: "7772", client: "Globex Corp", notes: "Auto-generated note", reconciledToLedgers: "1", reconciledToBankStatement: "1" },
        { id: 15, date: "04/18/2025", payorPayee: "Zoe Hall", method: "Wire", checkNumber: "2044", purpose: "Court Fees", deposit: "1800", disbursement: "0", balance: "9572", client: "Vought International", notes: "Auto-generated note", reconciledToLedgers: "1", reconciledToBankStatement: "0" },
        { id: 16, date: "04/16/2025", payorPayee: "Henry Adams", method: "ACH", checkNumber: "3412", purpose: "Retainer", deposit: "0", disbursement: "390", balance: "9182", client: "Waystar Royco", notes: "Auto-generated note", reconciledToLedgers: "0", reconciledToBankStatement: "1" },
        { id: 17, date: "04/15/2025", payorPayee: "Ella Scott", method: "Cash", checkNumber: "8823", purpose: "Consultation", deposit: "1100", disbursement: "0", balance: "10282", client: "Oceanic Airlines", notes: "Auto-generated note", reconciledToLedgers: "1", reconciledToBankStatement: "1" },
        { id: 18, date: "04/10/2025", payorPayee: "Luke Reed", method: "Wire", checkNumber: "7865", purpose: "Deposition", deposit: "0", disbursement: "830", balance: "9452", client: "Umbrella Corporation", notes: "Auto-generated note", reconciledToLedgers: "0", reconciledToBankStatement: "0" },
        { id: 19, date: "04/08/2025", payorPayee: "Grace Ward", method: "ACH", checkNumber: "9001", purpose: "Filing", deposit: "1700", disbursement: "0", balance: "11152", client: "Duff Beer", notes: "Auto-generated note", reconciledToLedgers: "1", reconciledToBankStatement: "1" },
        { id: 20, date: "04/13/2025", payorPayee: "Owen King", method: "Cash", checkNumber: "3002", purpose: "Settlement", deposit: "0", disbursement: "1100", balance: "10052", client: "Paper Street Soap Co.", notes: "Auto-generated note", reconciledToLedgers: "1", reconciledToBankStatement: "0" },
        { id: 21, date: "04/12/2025", payorPayee: "Noah Green", method: "Check", checkNumber: "1133", purpose: "Travel", deposit: "900", disbursement: "0", balance: "10952", client: "Prestige Worldwide", notes: "Auto-generated note", reconciledToLedgers: "0", reconciledToBankStatement: "1" },
        { id: 22, date: "04/11/2025", payorPayee: "Mia Turner", method: "Wire", checkNumber: "7789", purpose: "Court Fees", deposit: "0", disbursement: "460", balance: "10492", client: "Soylent Corp", notes: "Auto-generated note", reconciledToLedgers: "1", reconciledToBankStatement: "1" },
        { id: 23, date: "04/10/2025", payorPayee: "Ethan Hill", method: "ACH", checkNumber: "9988", purpose: "Deposition", deposit: "1300", disbursement: "0", balance: "11792", client: "BiffCo Enterprises", notes: "Auto-generated note", reconciledToLedgers: "0", reconciledToBankStatement: "0" },
        { id: 24, date: "04/14/2025", payorPayee: "Ava Mitchell", method: "Cash", checkNumber: "4522", purpose: "Settlement", deposit: "0", disbursement: "890", balance: "10902", client: "Tyrell Corporation", notes: "Auto-generated note", reconciledToLedgers: "1", reconciledToBankStatement: "0" },
        { id: 25, date: "04/15/2025", payorPayee: "Benjamin Cox", method: "Check", checkNumber: "6711", purpose: "Filing", deposit: "1700", disbursement: "0", balance: "12602", client: "Monsters Inc", notes: "Auto-generated note", reconciledToLedgers: "1", reconciledToBankStatement: "1" },
        { id: 26, date: "04/16/2025", payorPayee: "Harper Lewis", method: "Wire", checkNumber: "8845", purpose: "Retainer", deposit: "0", disbursement: "670", balance: "11932", client: "Planet Express", notes: "Auto-generated note", reconciledToLedgers: "0", reconciledToBankStatement: "1" },
        { id: 27, date: "04/17/2025", payorPayee: "Daniel Foster", method: "ACH", checkNumber: "2934", purpose: "Consultation", deposit: "1500", disbursement: "0", balance: "13432", client: "Pied Piper", notes: "Auto-generated note", reconciledToLedgers: "1", reconciledToBankStatement: "0" },
        { id: 28, date: "04/18/2025", payorPayee: "Victoria Barnes", method: "Cash", checkNumber: "1467", purpose: "Deposition", deposit: "0", disbursement: "800", balance: "12632", client: "Spacely Space Sprockets", notes: "Auto-generated note", reconciledToLedgers: "1", reconciledToBankStatement: "1" },
        { id: 29, date: "04/13/2025", payorPayee: "Logan Hayes", method: "Check", checkNumber: "3742", purpose: "Settlement", deposit: "1100", disbursement: "0", balance: "13732", client: "Dunder Mifflin", notes: "Auto-generated note", reconciledToLedgers: "0", reconciledToBankStatement: "1" },
        { id: 30, date: "04/10/2025", payorPayee: "Scarlett Simmons", method: "Wire", checkNumber: "6123", purpose: "Travel", deposit: "0", disbursement: "720", balance: "13012", client: "Los Pollos Hermanos", notes: "Auto-generated note", reconciledToLedgers: "1", reconciledToBankStatement: "0" },
        { id: 31, date: "04/09/2025", payorPayee: "Owen Ross", method: "ACH", checkNumber: "8182", purpose: "Court Fees", deposit: "1900", disbursement: "0", balance: "14912", client: "Freddy Fazbear's Pizza", notes: "Auto-generated note", reconciledToLedgers: "1", reconciledToBankStatement: "1" },
        { id: 32, date: "04/08/2025", payorPayee: "Nora Bennett", method: "Cash", checkNumber: "7353", purpose: "Filing", deposit: "0", disbursement: "930", balance: "13982", client: "Gekko & Co.", notes: "Auto-generated note", reconciledToLedgers: "0", reconciledToBankStatement: "0" },
        { id: 33, date: "04/07/2025", payorPayee: "Caleb Morris", method: "Check", checkNumber: "4567", purpose: "Deposition", deposit: "1500", disbursement: "0", balance: "15482", client: "Initrode", notes: "Auto-generated note", reconciledToLedgers: "1", reconciledToBankStatement: "1" },
        { id: 34, date: "04/06/2025", payorPayee: "Aria Murphy", method: "Wire", checkNumber: "9856", purpose: "Retainer", deposit: "0", disbursement: "710", balance: "14772", client: "Virtucon", notes: "Auto-generated note", reconciledToLedgers: "0", reconciledToBankStatement: "1" },
        { id: 35, date: "04/05/2025", payorPayee: "Levi Rivera", method: "ACH", checkNumber: "2233", purpose: "Settlement", deposit: "1400", disbursement: "0", balance: "16172", client: "Rich Industries", notes: "Auto-generated note", reconciledToLedgers: "1", reconciledToBankStatement: "0" },
        { id: 36, date: "04/04/2025", payorPayee: "Luna Bell", method: "Cash", checkNumber: "3981", purpose: "Consultation", deposit: "0", disbursement: "450", balance: "15722", client: "Cyberdyne Systems", notes: "Auto-generated note", reconciledToLedgers: "1", reconciledToBankStatement: "1" },
        { id: 37, date: "04/03/2025", payorPayee: "Nathan Cooper", method: "Check", checkNumber: "8890", purpose: "Travel", deposit: "1600", disbursement: "0", balance: "17322", client: "Stark Industries", notes: "Auto-generated note", reconciledToLedgers: "0", reconciledToBankStatement: "1" },
        { id: 38, date: "04/02/2025", payorPayee: "Hazel Bailey", method: "Wire", checkNumber: "1029", purpose: "Court Fees", deposit: "0", disbursement: "690", balance: "16632", client: "LexCorp", notes: "Auto-generated note", reconciledToLedgers: "1", reconciledToBankStatement: "0" },
        { id: 39, date: "04/01/2025", payorPayee: "Hudson Rivera", method: "ACH", checkNumber: "5642", purpose: "Retainer", deposit: "2000", disbursement: "0", balance: "18632", client: "Wayne Enterprises", notes: "Auto-generated note", reconciledToLedgers: "1", reconciledToBankStatement: "1" },
        { id: 40, date: "03/31/2025", payorPayee: "Savannah Flores", method: "Cash", checkNumber: "3774", purpose: "Filing", deposit: "0", disbursement: "720", balance: "17912", client: "Massive Dynamic", notes: "Auto-generated note", reconciledToLedgers: "0", reconciledToBankStatement: "1" },
        { id: 41, date: "03/30/2025", payorPayee: "Elijah Long", method: "Check", checkNumber: "9462", purpose: "Consultation", deposit: "1700", disbursement: "0", balance: "19612", client: "Globex Corporation", notes: "Auto-generated note", reconciledToLedgers: "1", reconciledToBankStatement: "0" },
        { id: 42, date: "03/29/2025", payorPayee: "Brooklyn Patterson", method: "Wire", checkNumber: "6893", purpose: "Deposition", deposit: "0", disbursement: "500", balance: "19112", client: "Acme Corp", notes: "Auto-generated note", reconciledToLedgers: "1", reconciledToBankStatement: "1" },
        { id: 43, date: "03/28/2025", payorPayee: "David James", method: "ACH", checkNumber: "3278", purpose: "Settlement", deposit: "1200", disbursement: "0", balance: "20312", client: "Vought International", notes: "Auto-generated note", reconciledToLedgers: "0", reconciledToBankStatement: "0" },
        { id: 44, date: "03/27/2025", payorPayee: "Layla Griffin", method: "Cash", checkNumber: "4126", purpose: "Travel", deposit: "0", disbursement: "880", balance: "19432", client: "Oscorp", notes: "Auto-generated note", reconciledToLedgers: "1", reconciledToBankStatement: "1" },
        { id: 45, date: "03/26/2025", payorPayee: "Gabriel Barnes", method: "Check", checkNumber: "1943", purpose: "Court Fees", deposit: "1500", disbursement: "0", balance: "20932", client: "Hooli", notes: "Auto-generated note", reconciledToLedgers: "1", reconciledToBankStatement: "1" }
    ]



    const [searchTerm, setSearchTerm] = useState("");
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState(dummyData);
    const [filteredData, setFilteredData] = useState(data);
    const [item, setItem] = useState({});
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

    // 🔹 Apply Sort
    const { sortedData, sortConfig, handleSort } = useSortableData(filteredData);

    // 🔹 Apply Pagination
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * perPage;
        return sortedData.slice(startIndex, startIndex + perPage);
    }, [sortedData, currentPage, perPage]);

    // Find out total pages
    const totalRecords = sortedData.length;
    const totalPages = Math.ceil(totalRecords / perPage);
    const perPageOptions = [...Array(Math.ceil(totalRecords / 10))].map((_, i) => (i + 1) * 10);

    const handleStatusUpdate = () => {
        alert("status updated successfully!")
    }
    const handleUpdate = (item) => {
        setItem(item)
        setIsModalOpen(true);
    }

    return (
        <>
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
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setIsModalOpen(true);
                                    }}
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
                            <button className="cmn-btn-2 blue-bg" onClick={() => setIsModalOpen(true)}>
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
                                {/* <a
                                        href="./images/download-icon.svg"
                                        download="./images/download-icon.svg"
                                        className="cmn-btn"
                                    >
                                        <img src="./images/download-icon.svg" alt="" />Download Report
                                    </a> */}
                                <ReportDownloadDropdown name={'Download Report'} data={data} />
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
                                    {paginatedData.length !== 0 ? (
                                        paginatedData?.map((item) => (
                                            <tr key={item?.id}>
                                                <td>{item?.id}</td>
                                                <td>{item?.date}</td>
                                                <td>{item?.payorPayee}</td>
                                                <td>{item?.method}</td>
                                                <td>{item?.checkNumber}</td>
                                                <td>{item?.purpose}</td>
                                                <td>{item?.deposit}</td>
                                                <td>{item?.disbursement}</td>
                                                <td>{item?.balance}</td>
                                                <td>{item?.client}</td>
                                                <td>{item?.notes}</td>
                                                <td >
                                                    <div className="status-icon-wrp" onClick={handleStatusUpdate}>
                                                        {
                                                            item?.reconciledToLedgers == "0" ?
                                                                <img src="images/times-icon-red.svg" alt="cross" /> :
                                                                <img src="images/check-green.png" alt="check" />
                                                        }
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="status-icon-wrp" onClick={handleStatusUpdate}>
                                                        {
                                                            item?.reconciledToBankStatement == "0" ?
                                                                <img src="images/times-icon-red.svg" alt="cross" /> :
                                                                <img src="images/check-green.png" alt="check" />}

                                                    </div>
                                                </td>
                                                <td>
                                                    <button href="#" className="btn btn-sm" onClick={(e) => {
                                                        e.preventDefault()
                                                        handleUpdate(item);
                                                        setIsModalOpen(true);
                                                    }}>
                                                        <BsPencil className="me-1" />
                                                    </button>

                                                </td>
                                            </tr>
                                        ))) : (
                                        <tr>
                                            <td colSpan="14">No data found</td>
                                        </tr>
                                    )}
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
                            {perPageOptions?.map((option) => (
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
        </div >
            <EntryDetailForm
                onClose={() => { setIsModalOpen(false), setItem(null) }}
                isOpen={isModalOpen}
                itemData={item}
            />
        </>
    )
}

export default TrustAccountJournal
