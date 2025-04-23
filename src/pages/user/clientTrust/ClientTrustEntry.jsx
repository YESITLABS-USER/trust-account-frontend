import React, { useContext, useEffect, useMemo, useState } from "react";
import Sidebar from "../../../components/header/SideBar";
import { useAuth } from "../../../contexts/AuthContext";
import CustomDateRangePicker from "../../../components/DateRangePicker";
import { useDateRangeFilter } from "../../../hooks/useDateRangeFilter";
import useSortableData from "../../../hooks/useSortableData";
import PaginationControls from "../../../components/user/PaginationControls";


// Sample helper to parse DD/MM/YYYY into Date object
const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split("/");
    return new Date(year, month - 1, day);
}

const ClientTrustEntry = () => {
    const { isSidebarOpen } = useAuth();
    const [isOpenTabel, setIsOpenTab] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMonthYear, setSelectedMonthYear] = useState("");

    const tableData = [
        { id: 1, date: "12/01/2025", bankInfo: "Bank ABC - Account 123456789", bankName: "ABC Bank", uploadDoc: "Statement_1.pdf" },
        { id: 2, date: "15/01/2025", bankInfo: "Bank XYZ - Account 987654321", bankName: "XYZ Bank", uploadDoc: "Report_2.docx" },
        { id: 3, date: "22/02/2025", bankInfo: "Bank DEF - Account 456789123", bankName: "DEF Bank", uploadDoc: "Invoice_3.xlsx" },
        { id: 4, date: "08/03/2025", bankInfo: "Bank LMN - Account 321654987", bankName: "LMN Bank", uploadDoc: "Ledger_4.csv" },
        { id: 5, date: "14/03/2025", bankInfo: "Bank PQR - Account 147852369", bankName: "PQR Bank", uploadDoc: "Receipt_5.pdf" },
        { id: 6, date: "19/04/2025", bankInfo: "Bank STU - Account 258963147", bankName: "STU Bank", uploadDoc: "Statement_6.pdf" },
        { id: 7, date: "05/05/2025", bankInfo: "Bank VWX - Account 369147258", bankName: "VWX Bank", uploadDoc: "Report_7.docx" },
        { id: 8, date: "21/05/2025", bankInfo: "Bank YZA - Account 987123654", bankName: "YZA Bank", uploadDoc: "Invoice_8.xlsx" },
        { id: 9, date: "30/06/2025", bankInfo: "Bank BCD - Account 654987321", bankName: "BCD Bank", uploadDoc: "Ledger_9.csv" },
        { id: 10, date: "11/07/2025", bankInfo: "Bank EFG - Account 789321654", bankName: "EFG Bank", uploadDoc: "Statement_10.pdf" },
        { id: 11, date: "16/08/2025", bankInfo: "Bank HIJ - Account 963258741", bankName: "HIJ Bank", uploadDoc: "Report_11.docx" },
        { id: 12, date: "09/09/2025", bankInfo: "Bank KLM - Account 741852963", bankName: "KLM Bank", uploadDoc: "Invoice_12.xlsx" },
        { id: 13, date: "22/09/2025", bankInfo: "Bank NOP - Account 852369741", bankName: "NOP Bank", uploadDoc: "Ledger_13.csv" },
        { id: 14, date: "02/10/2025", bankInfo: "Bank QRS - Account 123789456", bankName: "QRS Bank", uploadDoc: "Receipt_14.pdf" },
        { id: 15, date: "13/10/2025", bankInfo: "Bank TUV - Account 456123789", bankName: "TUV Bank", uploadDoc: "Statement_15.pdf" },
        { id: 16, date: "25/11/2025", bankInfo: "Bank WXY - Account 789654321", bankName: "WXY Bank", uploadDoc: "Report_16.docx" },
        { id: 17, date: "18/12/2025", bankInfo: "Bank ZAB - Account 321987654", bankName: "ZAB Bank", uploadDoc: "Invoice_17.xlsx" },
        { id: 18, date: "29/12/2025", bankInfo: "Bank CDE - Account 654321987", bankName: "CDE Bank", uploadDoc: "Ledger_18.csv" },
        { id: 19, date: "05/01/2024", bankInfo: "Bank FGH - Account 789456123", bankName: "FGH Bank", uploadDoc: "Statement_19.pdf" },
        { id: 20, date: "10/02/2024", bankInfo: "Bank IJK - Account 963741852", bankName: "IJK Bank", uploadDoc: "Report_20.docx" },
        { id: 21, date: "21/03/2024", bankInfo: "Bank LMN - Account 852147369", bankName: "LMN Bank", uploadDoc: "Invoice_21.xlsx" },
        { id: 22, date: "15/04/2024", bankInfo: "Bank OPQ - Account 147963852", bankName: "OPQ Bank", uploadDoc: "Ledger_22.csv" },
        { id: 23, date: "30/05/2024", bankInfo: "Bank RST - Account 258741963", bankName: "RST Bank", uploadDoc: "Receipt_23.pdf" },
        { id: 24, date: "12/06/2024", bankInfo: "Bank UVW - Account 369852147", bankName: "UVW Bank", uploadDoc: "Statement_24.pdf" },
        { id: 25, date: "08/07/2024", bankInfo: "Bank XYZ - Account 147258963", bankName: "XYZ Bank", uploadDoc: "Report_25.docx" },
        { id: 26, date: "23/08/2024", bankInfo: "Bank ABC - Account 852369147", bankName: "ABC Bank", uploadDoc: "Invoice_26.xlsx" },
        { id: 27, date: "14/09/2024", bankInfo: "Bank DEF - Account 741369852", bankName: "DEF Bank", uploadDoc: "Ledger_27.csv" },
        { id: 28, date: "05/10/2024", bankInfo: "Bank GHI - Account 369147852", bankName: "GHI Bank", uploadDoc: "Receipt_28.pdf" },
        { id: 29, date: "28/10/2024", bankInfo: "Bank JKL - Account 789852369", bankName: "JKL Bank", uploadDoc: "Statement_29.pdf" },
        { id: 30, date: "17/11/2024", bankInfo: "Bank MNO - Account 963852741", bankName: "MNO Bank", uploadDoc: "Report_30.docx" },
        { id: 31, date: "26/12/2024", bankInfo: "Bank PQR - Account 852741369", bankName: "PQR Bank", uploadDoc: "Invoice_31.xlsx" },
        { id: 32, date: "07/01/2023", bankInfo: "Bank STU - Account 741852963", bankName: "STU Bank", uploadDoc: "Ledger_32.csv" },
        { id: 33, date: "18/02/2023", bankInfo: "Bank VWX - Account 963258147", bankName: "VWX Bank", uploadDoc: "Receipt_33.pdf" },
        { id: 34, date: "23/03/2023", bankInfo: "Bank YZA - Account 147963258", bankName: "YZA Bank", uploadDoc: "Statement_34.pdf" },
        { id: 35, date: "30/04/2023", bankInfo: "Bank BCD - Account 258147963", bankName: "BCD Bank", uploadDoc: "Report_35.docx" },
        { id: 36, date: "11/05/2023", bankInfo: "Bank EFG - Account 369741852", bankName: "EFG Bank", uploadDoc: "Invoice_36.xlsx" },
        { id: 37, date: "19/06/2023", bankInfo: "Bank HIJ - Account 852369147", bankName: "HIJ Bank", uploadDoc: "Ledger_37.csv" },
        { id: 38, date: "25/07/2023", bankInfo: "Bank KLM - Account 741369258", bankName: "KLM Bank", uploadDoc: "Receipt_38.pdf" },
    ];
    const [data, setData] = useState(tableData)
    const [filteredData, setFilteredData] = useState(data);
    // 🔹 Extract unique Month-Year for dropdown
    const monthYearOptions = useMemo(() => {
        const uniqueMonths = new Set(
            tableData.map((row) => {
                const [day, month, year] = row.date.split("/");
                return `${new Date(year, month - 1).toLocaleString("en-US", {
                    month: "short",
                })}-${year}`;
            })
        );
        return Array.from(uniqueMonths).sort();
    }, [tableData]);

    // 🔹 Date Range Hook
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

        setFilteredData(result);
        setCurrentPage(1);
    }, [data, selectedMonthYear]);

    // 🔹 Apply Sort
    const { sortedData, sortConfig, handleSort } = useSortableData(filteredData);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return sortedData.slice(start, start + rowsPerPage);
    }, [sortedData, currentPage, rowsPerPage]);

    const getSortArrow = (key) =>
        sortConfig.key === key ? (sortConfig.direction === "asc" ? " ↑" : " ↓") : "";

    const totalRecords = tableData.length;
    const perPageOptions = [...Array(Math.ceil(totalRecords / 10))].map((_, i) => (i + 1) * 10);


    return (
        <>

            <div className={`dashboard-body-wrp show ${isSidebarOpen ? "active" : ""}`}>
                {
                    isOpenTabel !== true ? (
                        <>
                            {/* Back Button */}
                            <div className="back-btn" onClick={() => setIsOpenTab(true)} style={{ cursor: "pointer" }}>
                                <img src="images/back-icon.svg" alt="Back icon" />
                            </div>
                            <div className="dashboard-body dsbrd-tbl-body">
                                <form>
                                    <div className="ds-bdy-head mb-3">
                                        <div className="ds-filter-wrp">

                                            <div className="ds-filter-input-wrp">
                                                <p className="inr-panel-title" style={{
                                                    fontSize: "24px",
                                                    marginRight: "5rem",
                                                }}>Previously Uploaded Documents</p>
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
                                        </div>
                                    </div>

                                    {/* Table Content */}
                                    <div className="ds-bdy-content">
                                        <div className="ds-bdy-table-wrp">
                                            <div className="table-container">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th className="small-col" onClick={() => handleSort("id")} style={{ cursor: "pointer" }}>S.No {getSortArrow("id")}</th>
                                                            <th className="date-col" onClick={() => handleSort("date")} style={{ cursor: "pointer" }}>Date {getSortArrow("date")}</th>
                                                            <th className="bank-info-col" onClick={() => handleSort("bankInfo")} style={{ cursor: "pointer" }}>Bank Info {getSortArrow("bankInfo")}</th>
                                                            <th className="bank-name-col" onClick={() => handleSort("bankName")} style={{ cursor: "pointer" }}>Bank Name {getSortArrow("bankName")}</th>
                                                            <th className="upload-doc-col">Upload Documents</th>
                                                            <th className="download-doc-col">Download</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {paginatedData?.length > 0 ? (
                                                            paginatedData?.map((row, index) => (
                                                                <tr key={row?.id}>
                                                                    <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                                                                    <td>{row?.date}</td>
                                                                    <td className="text-truncate">{row?.bankInfo}</td>
                                                                    <td className="text-truncate">{row?.bankName}</td>
                                                                    <td className="text-truncate">{row?.uploadDoc}</td>
                                                                    <td>
                                                                        <a href="./images/download-icon.svg" download>📥</a>
                                                                    </td>
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

                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="dashboard-body">
                            {/* Header Section */}
                            <div className="ds-bdy-head max">
                                <h1>Client Trust Entry</h1>
                                <strong>Enter your documents for monthly reconciliation and accounts management</strong>
                            </div>

                            {/* Client Information Section */}
                            <div className="ds-client-info-wrp">
                                <h3>Client Information</h3>
                                <form>
                                    <div className="ds-client-info-form">
                                        <div className="input-grp">
                                            <label htmlFor="bank-info">Bank Information</label>
                                            <input type="text" id="bank-info" placeholder="Enter Bank Information" />
                                        </div>
                                        <div className="input-grp">
                                            <label htmlFor="bank-name">Bank Name</label>
                                            <input type="text" id="bank-name" placeholder="Enter Bank Name" />
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* Upload Document Section */}
                            <div className="dsbdy-content">
                                <h2 className="dsbdy-content-title">Upload Document</h2>
                                <form>
                                    <div className="input-grp">
                                        <label htmlFor="file-upload">Upload Disclosures + Other Client(s) Documents</label>
                                        <div className="file-input">
                                            <input type="file" id="file-upload" />
                                            <div className="upload-placeholder">
                                                <img className="upload-icon" src="images/upload-img.svg" alt="Upload Icon" />
                                                <p>PDFs, Word documents, Excel files, images (JPEG, PNG)</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="addon-info">
                                        *All documents and information shall be exportable. + All document uploads shall have the ability for note and name entry.
                                    </div>
                                    <div className="dsbdy-frm-btn-grp" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                                        <div style={{
                                            display: "flex",
                                            gap: "10px",
                                            justifyContent: "center",
                                            flexGrow: 1
                                        }}>
                                            <button type="button" className="viewuploaded" onClick={() => alert("Saved!")}>Save</button>
                                            <button type="button" onClick={() => window.print()}>Print</button>
                                        </div>
                                        <button href="#" className="viewuploaded" style={{ whiteSpace: "nowrap", fontSize: "22px", fontWeight: '500' }} onClick={() => setIsOpenTab(false)}>View Recently Uploaded</button>
                                    </div>

                                </form>

                            </div>
                            <p>
                                Note:-
                            </p>

                        </div>
                    )
                }

            </div>
        </>
    );
};

export default ClientTrustEntry;
