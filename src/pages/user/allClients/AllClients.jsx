import React, { useEffect, useMemo, useState } from 'react'
import Sidebar from '../../../components/header/SideBar'
import { useAuth } from '../../../contexts/AuthContext'
import AddMatterModal from '../../../components/popup/AddMatterModal';
import AddClientModal from '../../../components/popup/AddClientModal';
import useSortableData from '../../../hooks/useSortableData';
import PaginationControls from '../../../components/user/PaginationControls';
import ReportDownloadDropdown from '../../../components/user/ReportDownloadDropdown';

const AllClients = () => {
    const { isSidebarOpen } = useAuth()
    const [isAddMatterModalOpen, setIsAddMatterModalOpen] = useState()
    const [isAddClientModalOpen, setIsAddClientModalOpen] = useState()
    const dummyData = Array.from({ length: 45 }, (_, i) => ({
        id: i + 1,
        date: new Date(2024, 0, i + 1).toLocaleDateString("en-US"),
        clientName: `Client ${String.fromCharCode(65 + (i % 26))}${i}`,
        feeType: ["Consultation", "Litigation", "Settlement", "Retainer"][i % 4],
        caseSummary: `Case summary #${(i % 10) + 1}`,
        ledgerBalance: (1000 + i * 37.5).toFixed(2),
        flag: i % 3 === 0 ? "red" : "gray"
    }));

    const uniqueCases = [...new Set(dummyData.map(item => item.caseSummary))];
    const uniqueClients = [...new Set(dummyData.map(item => item.clientName))];

    const [searchTerm, setSearchTerm] = useState("");
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCase, setSelectedCase] = useState("");
    const [selectedClient, setSelectedClient] = useState("");
    const [data, setData] = useState(dummyData);
    const [filteredData, setFilteredData] = useState(data);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };


    // 🔹 Apply Search, Case, Month filters
    useEffect(() => {
        let result = [...data];

        if (searchTerm || selectedClient) {
            result = result.filter(item =>
                item.clientName.toLowerCase().includes(searchTerm.toLowerCase() || selectedClient.toLowerCase())
            );
        }
        if (selectedCase) {
            result = result.filter(item => item.caseSummary.toLowerCase().includes(selectedCase.toLowerCase()));
        }


        setFilteredData(result);
        setCurrentPage(1);
    }, [data, searchTerm, selectedCase, selectedClient]);


    // 🔹 Apply Sort
    const { sortedData, sortConfig, handleSort } = useSortableData(filteredData);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * perPage;
        return sortedData.slice(start, start + perPage);
    }, [sortedData, currentPage, perPage]);

    const getSortArrow = (key) =>
        sortConfig.key === key ? (sortConfig.direction === "asc" ? " ↑" : " ↓") : "";

    const totalRecords = dummyData.length;
    const perPageOptions = [...Array(Math.ceil(totalRecords / 10))].map((_, i) => (i + 1) * 10);
    const handleModalOpen = () => {
        setIsAddMatterModalOpen(true)
    }

    // <CsvDownloader datas={} />;
    return (
        <>

            <div className={`dashboard-body-wrp ${isSidebarOpen ? 'active' : ''}`}>
                <div className="search-bar-wrp">
                    <div className="search-bar">
                        <form>
                            <div className="input-grp search">
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Search by client name"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                <button type="submit" aria-label="Perform search">
                                    <img src="images/search-icon.svg" alt="Search Icon" loading="lazy" />
                                </button>
                            </div>
                        </form>

                        <div className="dsbdy-frm-btn-grp mt-0 dbllrg-btn">
                            <button className="cmn-btn-2 blue-bg" onClick={handleModalOpen}><img src="images/plus-icon.svg" alt="Icon" />Add Matter</button>
                            <button className="cmn-btn-2 blue-bg" onClick={() => setIsAddClientModalOpen(true)}><img src="images/plus-icon.svg" alt="Icon" />Add Client</button>
                        </div>
                    </div>
                </div>

                <div className="dashboard-body dsbrd-tbl-body">
                    <form>
                        <div className="ds-bdy-head mb-3">
                            <div className="ds-filter-wrp">
                                <div className="dsfilter-rt-btns ds-filter-upr-wrp-new">
                                    <div className="dsfilter-wrp-text">
                                        <h3>Clients summary</h3>
                                        <p>Total Clients : 100</p>
                                    </div>
                                    <div className="dsfilter-inr-btn-wrp dbllrg-btn">
                                        <ReportDownloadDropdown name={'Download Report'} data={paginatedData} />
                                        {/* <a href="./images/download-icon.svg" download className="cmn-btn"><img src="./images/download-icon.svg" alt="" />Download Report</a> */}
                                        {/* <a href="./images/download-icon.svg" download className="cmn-btn"><img src="./images/download-icon.svg" alt="" />Master Download</a> */}
                                        <ReportDownloadDropdown name={'Master Download'} data={dummyData} />
                                    </div>
                                </div>

                                <div className="dsfilter-deep">
                                    <div className="dsfilterdp-left ds-filter-input-wrp">
                                        <div className="input-grp">
                                            <select value={selectedCase} onChange={(e) => { setCurrentPage(1); setSelectedCase(e.target.value) }}>
                                                <option value="">All Cases</option>
                                                {uniqueCases.map((c, i) => (
                                                    <option key={i} value={c}>{c}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="ds-filter-input-wrp">
                                        <div className="input-grp">
                                            <select value={selectedClient} onChange={(e) => { setCurrentPage(1); setSelectedClient(e.target.value) }}>
                                                <option value="">All Clients</option>
                                                {uniqueClients.map((client, i) => (
                                                    <option key={i} value={client}>{client}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ds-bdy-content">
                            <div className="ds-bdy-table-wrp">
                                <table>
                                    <thead>
                                        <tr >
                                            <th >S.No</th>
                                            <th onClick={() => handleSort("date")} style={{ cursor: "pointer" }}>Date {getSortArrow('date')}</th>
                                            <th onClick={() => handleSort("clientName")} style={{ cursor: "pointer" }}>Client Name  {getSortArrow('clientName')}</th>
                                            <th onClick={() => handleSort("feeType")} style={{ cursor: "pointer" }}>Fee Type {getSortArrow('feeType')}</th>
                                            <th>Case Summary</th>
                                            <th onClick={() => handleSort("ledgerBalance")} style={{ cursor: "pointer" }}>Ledger Balance {getSortArrow('ledgerBalance')}</th>
                                            <th>Ledger</th>
                                            <th>Flag</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedData.length > 0 ? (
                                            paginatedData.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{(currentPage - 1) * perPage + index + 1}</td>
                                                    <td>{item?.date}</td>
                                                    <td>{item?.clientName}</td>
                                                    <td>{item?.feeType}</td>
                                                    <td>{item?.caseSummary}</td>
                                                    <td>${item?.ledgerBalance}</td>
                                                    <td><a href="#" >View</a></td>
                                                    <td><img src={`images/flag-${item.flag}.png`} alt="Flag" className="w-5 h-5 mx-auto" /></td>
                                                </tr>
                                            ))) : (
                                            <tr>
                                                <td colSpan="8">No Data Found</td>
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
                                }}
                            >
                                {perPageOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option} per page
                                    </option>
                                ))}
                            </select>
                        </div>
                        <PaginationControls
                            data={sortedData}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            rowsPerPage={perPage}
                        />
                    </form>
                </div>
            </div>
            <AddMatterModal
                onClose={() => setIsAddMatterModalOpen(false)}
                isOpen={isAddMatterModalOpen}
            />
            <AddClientModal
                onClose={() => setIsAddClientModalOpen(false)}
                isOpen={isAddClientModalOpen}
            />
        </>
    );
};

export default AllClients;
