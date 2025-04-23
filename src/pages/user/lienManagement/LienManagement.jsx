import React, { useEffect, useMemo, useState } from 'react';
// // import Sidebar from '../../../components/header/SideBar';
import { useAuth } from '../../../contexts/AuthContext';
import CustomDateRangePicker from '../../../components/DateRangePicker';
import { useDateRangeFilter } from '../../../hooks/useDateRangeFilter';
import PaginationControls from '../../../components/user/PaginationControls';
import useSortableData from '../../../hooks/useSortableData';
import ReportDownloadDropdown from '../../../components/user/ReportDownloadDropdown';
import AddNotesModal from '../../../components/popup/AddNotesModal';

const parseDate = (dateStr) => {
    const parts = dateStr.split("/");
    return new Date(`${parts[1]}/${parts[0]}/${parts[2]}`);
};

const LienManagement = () => {
    const { isSidebarOpen } = useAuth();
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddNote, setShowAddNote] = useState(false);
    const [newNotes, setNewNotes] = useState({})
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [liensId, setLiensId] = useState('')
    const [liens, setLiens] = useState([
        { id: 1, holder: "Rita", amount: 100, date: "01/03/2024", status: true },
        { id: 2, holder: "Sita", amount: 200, date: "02/03/2024", status: false },
        { id: 3, holder: "Gita", amount: 150, date: "03/03/2024", status: true },
        { id: 4, holder: "Mita", amount: 250, date: "04/03/2024", status: false },
        { id: 5, holder: "Hita", amount: 50, date: "05/03/2024", status: true },
        { id: 6, holder: "Lita", amount: 300, date: "06/03/2024", status: false },
        { id: 7, holder: "Nita", amount: 400, date: "07/03/2024", status: true },
        { id: 8, holder: "Tina", amount: 500, date: "08/03/2024", status: false },
        { id: 9, holder: "Vita", amount: 600, date: "09/03/2024", status: true },
        { id: 10, holder: "Zara", amount: 700, date: "10/03/2024", status: false },
        { id: 11, holder: "Amar", amount: 800, date: "11/03/2024", status: true },
        { id: 12, holder: "Akash", amount: 900, date: "12/03/2024", status: false },
        { id: 13, holder: "Binod", amount: 1000, date: "13/03/2024", status: true },
        { id: 14, holder: "Chris", amount: 1100, date: "14/03/2024", status: false },
        { id: 15, holder: "David", amount: 1200, date: "15/03/2024", status: true },
        { id: 16, holder: "Esha", amount: 1300, date: "16/03/2024", status: false },
        { id: 17, holder: "Fiona", amount: 1400, date: "17/03/2024", status: true },
        { id: 18, holder: "George", amount: 1500, date: "18/03/2024", status: false },
        { id: 19, holder: "Henry", amount: 1600, date: "19/03/2024", status: true },
        { id: 20, holder: "Ivy", amount: 1700, date: "20/03/2024", status: false },
    ]);

    const [data, setData] = useState(liens);
    const [filteredData, setFilteredData] = useState(data)


    const handleSearchChange = (e) => setSearchTerm(e.target.value);

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
                item.holder.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredData(result);
        setCurrentPage(1);
    }, [data, searchTerm]);


    // 🔹 Apply Sort
    const { sortedData, sortConfig, handleSort } = useSortableData(filteredData);
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return sortedData.slice(start, start + itemsPerPage);
    }, [sortedData, currentPage, itemsPerPage]);

    const getSortArrow = (key) =>
        sortConfig.key === key ? (sortConfig.direction === "asc" ? " ↑" : " ↓") : "";

    const totalRecords = liens.length;
    const perPageOptions = [...Array(Math.ceil(totalRecords / 10))].map((_, i) => (i + 1) * 10);

    const handleAddNote = (noteText) => {
        const trimmedText = noteText.trim();
        if (!trimmedText) {
            console.warn("Note text is empty.");
            return; // prevent adding empty notes
        }

        const newNote = {
            id: liensId,
            text: trimmedText,
        };

        setNewNotes(newNote);
    };

    const handleAddNoteId = (itemId) => {
        setLiensId(itemId)
        setShowAddNote(true)
    }


    // console.log("Note added:", newNotes);
    return (
        <>

            <div className={`dashboard-body-wrp show ${isSidebarOpen ? "active" : ""}`}>
                <div className="search-bar-wrp">
                    <div className="search-bar">
                        <form>
                            <div className="input-grp search">
                                <input type="text" name="search" placeholder="Search by User name" value={searchTerm} onChange={handleSearchChange} />
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
                                <div className="dsfilter-deep">
                                    <div className="dsfilterdp-left ds-filter-input-wrp2">
                                        {/* <div className="input-grp datefield-wrp">
                                            <input type="text" id="txtDateRange" name="txtDateRange" className="inputField shortInputField dateRangeField" placeholder="Date range" value={dateRange} onChange={handleDateChange} />
                                        </div> */}
                                        <CustomDateRangePicker onApply={handleApply} onCancel={handleCancel} />
                                    </div>
                                    <div className="ds-filter-input-wrp ms-2">
                                        <div className="bank-charges-inr-btn-wrp d-flex justify-content-end rtat">
                                            {/* <a href="./images/download-icon.svg" download className="cmn-btn m-0">
                                                <img src="./images/download-icon.svg" alt="" />Export as csv
                                            </a> */}
                                            <ReportDownloadDropdown name={'Export as csv'} data={data} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ds-bdy-content">
                            <div className="ds-bdy-table-wrp">
                                <table className="leader-summry-table">
                                    <thead>
                                        <tr>
                                            <th onClick={() => handleSort("id")} style={{ cursor: "pointer" }}>S.No {getSortArrow('id')}</th>
                                            <th onClick={() => handleSort("holder")} style={{ cursor: "pointer" }}>Lien Holder {getSortArrow('holder')}</th>
                                            <th onClick={() => handleSort("amount")} style={{ cursor: "pointer" }}>Amount {getSortArrow('amount')}</th>
                                            <th onClick={() => handleSort("date")} style={{ cursor: "pointer" }}>Date Issue {getSortArrow('date')}</th>
                                            <th >Status</th>
                                            <th>Resolve Liens</th>
                                            <th>Add Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {paginatedData?.length > 0 ? (
                                            paginatedData?.map((lien, index) => (
                                                <tr key={lien?.id}>
                                                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                                    <td>{lien?.holder}</td>
                                                    <td>{lien?.amount}</td>
                                                    <td>{lien?.date}</td>
                                                    <td>{lien?.status ? "Active" : "Deactive"}</td>
                                                    <td className="resolve-anchor"><a href="#url">Resolve</a></td>
                                                    <td className="resolve-anchor"
                                                        // onClick={() => setShowAddNote(true)}
                                                        onClick={() => handleAddNoteId(lien?.id)}
                                                    ><a href="#">Add</a></td>

                                                </tr>
                                            ))) : (
                                            <tr>
                                                <td colSpan="7" style={{ textAlign: "center" }}>No Records Found</td>
                                            </tr>
                                        )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Items Per Page Dropdown */}
                        <div className="select-item-count">
                            <select
                                value={itemsPerPage}
                                onChange={(e) => {
                                    setItemsPerPage(Number(e.target.value));
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
                        <PaginationControls
                            data={sortedData}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            rowsPerPage={itemsPerPage}
                        />

                    </form>
                </div>
            </div>
            <AddNotesModal
                show={showAddNote}
                handleClose={() => setShowAddNote(false)}
                handleAddNote={handleAddNote}
            />
        </>
    );
};

export default LienManagement;
