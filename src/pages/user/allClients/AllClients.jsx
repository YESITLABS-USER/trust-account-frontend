import React, { useEffect, useMemo, useState } from 'react'
import Sidebar from '../../../components/header/SideBar'
import { useAuth } from '../../../contexts/AuthContext'
import AddMatterModal from '../../../components/popup/AddMatterModal';
import AddClientModal from '../../../components/popup/AddClientModal';

const parseDate = (dateStr) => {
    const parts = dateStr.split("/");
    return new Date(`${parts[1]}/${parts[0]}/${parts[2]}`);
};

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
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
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

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
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





    const totalRecords = sortedData.length;
    const totalPages = Math.ceil(totalRecords / perPage);
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * perPage;
        return sortedData.slice(startIndex, startIndex + perPage);
    }, [sortedData, currentPage, perPage]);

    const perPageOptions = [...Array(Math.ceil(totalRecords / 10))].map((_, i) => (i + 1) * 10);

    const handleModalOpen = () => {
        setIsAddMatterModalOpen(true)
    }

    return (
        <>
            <Sidebar />

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
                                        <a href="./images/download-icon.svg" download className="cmn-btn"><img src="./images/download-icon.svg" alt="" />Download Report</a>
                                        <a href="./images/download-icon.svg" download className="cmn-btn"><img src="./images/download-icon.svg" alt="" />Master Download</a>
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
                                        <tr>
                                            <th>S.No</th>
                                            <th onClick={() => handleSort("date")}>Date</th>
                                            <th onClick={() => handleSort("clientName")}>Client Name</th>
                                            <th onClick={() => handleSort("feeType")}>Fee Type</th>
                                            <th>Case Summary</th>
                                            <th onClick={() => handleSort("ledgerBalance")}>Ledger Balance</th>
                                            <th>Ledger</th>
                                            <th>Flag</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedData.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{(currentPage - 1) * perPage + index + 1}</td>
                                                <td>{item.date}</td>
                                                <td>{item.clientName}</td>
                                                <td>{item.feeType}</td>
                                                <td>{item.caseSummary}</td>
                                                <td>${item.ledgerBalance}</td>
                                                <td><a href="#" >View</a></td>
                                                <td><img src={`images/flag-${item.flag}.png`} alt="Flag" className="w-5 h-5 mx-auto" /></td>
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
                                }}
                            >
                                {perPageOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option} per page
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="dsbrd-pagination">
                            <ul>
                                <li className="prev" onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>
                                    <img src="images/left-chevron.svg" alt="Prev" />
                                </li>
                                {[...Array(totalPages).keys()].map((num) => (
                                    <li
                                        key={num + 1}
                                        className={currentPage === num + 1 ? "active" : ""} style={{
                                            color: 'black'
                                        }}
                                        onClick={() => setCurrentPage(num + 1)}
                                    >
                                        {num + 1}
                                    </li>
                                ))}
                                <li className="next" onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}>
                                    <img src="images/left-chevron.svg" alt="Next" />
                                </li>
                            </ul>
                        </div>
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
