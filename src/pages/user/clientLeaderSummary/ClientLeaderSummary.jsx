import { useMemo, useState } from "react";
import Sidebar from "../../../components/header/SideBar";
import { useAuth } from "../../../contexts/AuthContext";
import CustomDateRangePicker from "../../../components/DateRangePicker";
import { useDateRangeFilter } from "../../../hooks/useDateRangeFilter";
import useSortableData from "../../../hooks/useSortableData";
import ReportDownloadDropdown from "../../../components/user/ReportDownloadDropdown";
import PaginationControls from "../../../components/user/PaginationControls";




const ClientLeaderSummary = () => {
  const { isSidebarOpen } = useAuth();
  const clientData = [
    { id: 1, name: "R&W Development", balance: 21000 },
    { id: 2, name: "Dr. Tran", balance: 21000 },
    { id: 3, name: "Dr. Tran", balance: 2000 },
    { id: 4, name: "Development", balance: 3000 },
    { id: 5, name: "Jane Smith", balance: 4500 },
    { id: 6, name: "Global Holdings", balance: 12000 },
    { id: 7, name: "Michael Johnson", balance: 8000 },
    { id: 8, name: "Acme Corp", balance: 17850 },
    { id: 9, name: "Samantha Lee", balance: 2200 },
    { id: 10, name: "Taylor Industries", balance: 9500 },
    { id: 11, name: "Sunshine LLC", balance: 6750 },
    { id: 12, name: "Nova Real Estate", balance: 25000 },
    { id: 13, name: "John Doe", balance: 1400 },
    { id: 14, name: "Unity Ventures", balance: 19000 },
    { id: 15, name: "Northwood Partners", balance: 5100 },
    { id: 16, name: "Pine & Oak", balance: 3250 },
    { id: 17, name: "Horizon Medical", balance: 4300 },
    { id: 18, name: "Prestige Builders", balance: 8900 },
    { id: 19, name: "Ellie Turner", balance: 700 },
    { id: 20, name: "Legacy Corp", balance: 10500 },
    { id: 21, name: "Quantum Systems", balance: 15400 },
    { id: 22, name: "Innovatech", balance: 6400 },
    { id: 23, name: "Bold Legal", balance: 3300 },
    { id: 24, name: "Evergreen Group", balance: 12800 },
    { id: 25, name: "Carter & Co", balance: 2150 },
  ];

  const totalBalance = useMemo(() => {
    return clientData.reduce((acc, curr) => {
      return acc + curr.balance;
    }, 0);
  }, [clientData]);
  const [data, setData] = useState(clientData)
  const [filteredData, setFilteredData] = useState(data)
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    clientName: "",
    month: "",
    year: "",
    caseStatus: "",
  });
  const [openDaitles, setOpenDaitles] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.clientName || !formData.month || !formData.year || !formData.caseStatus) { alert("Please fill in all fields"); return; }
    setOpenDaitles(true)
  };

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

  const totalRecords = clientData.length;
  const perPageOptions = [...Array(Math.ceil(totalRecords / 10))].map((_, i) => (i + 1) * 10);

  return (
    <>

      <div className={`dashboard-body-wrp ${isSidebarOpen ? "show active" : ""}`} >
        {openDaitles ? (
          <>
            <div className="dashboard-body dsbrd-tbl-body">
              <form>
                <div className="back-btn-summary-client">
                  <a
                    href="#"
                    className="back-btn"
                    onClick={() => setOpenDaitles(false)}
                  >
                    <img src="images/back-icon.svg" alt="Back icon" />
                  </a>
                </div>
                <div className="ds-bdy-head mb-3">
                  <div className="ds-filter-wrp">
                    <div className="dsfilter-rt-btns ds-filter-upr-wrp-new flex-wrap">
                      <div className="dsfilter-wrp-text">
                        <h3>Client Name : Caroline Barton</h3>
                      </div>
                      <div className="dsfilter-wrp-text">
                        <h3>Current Month and Year : January 2024</h3>
                      </div>
                    </div>
                    <div className="dsfilter-deep">
                      <div className="dsfilterdp-left ds-filter-input-wrp2">
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
                      <div className="bank-charges-inr-btn-wrp">
                        {/* <a
                        href="./images/download-icon.svg"
                        download
                        className="cmn-btn"
                      >
                        <img src="./images/download-icon.svg" alt="" />
                        Download Report
                      </a> */}
                        <ReportDownloadDropdown name={'Download Report'} data={data} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ds-bdy-content">
                  <div className="ds-bdy-table-wrp">
                    <table className="leader-summry-table">
                      <thead>
                        <tr>
                          <th >S.No</th>
                          <th onClick={() => handleSort('individualClients')} style={{ cursor: "pointer" }}>Individual Clients {getSortArrow('individualClients')}</th>
                          <th onClick={() => handleSort('balance')} style={{ cursor: "pointer" }}>Balance {getSortArrow('balance')}</th>
                        </tr>
                      </thead>
                      <tbody>

                        {paginatedData?.length > 0 ? (
                          paginatedData?.map((client, index) => (
                            <tr key={client?.id} >
                              <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                              <td>{client?.name}</td>
                              <td>${client?.balance.toLocaleString()}</td>
                            </tr>
                          ))) : (
                          <tr>
                            <td colSpan={3}>No data available</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="total-amount-wrap">
                    <h4>Total</h4>
                    <h4>${totalBalance}</h4>
                  </div>
                </div>
              </form>

              {/* Items Per Page Dropdown */}
              <div style={{ marginTop: '60px', }}>


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
            </div>
          </>
        ) : (
          <div className="dashboard-body">
            <div className="ds-bdy-head max">
              <h1>Client Ledger Summary</h1>
            </div>
            <form action="" onSubmit={handleSubmit}>
              <div className="client-leader-form-in">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-6">
                      <label>
                        <h3>Client Name</h3>
                        <select
                          name="clientName"
                          value={formData?.clientName}
                          onChange={handleChange}
                        >
                          <option value="Select client">Select client</option>
                          <option value="0">One</option>
                          <option value="1">Two</option>
                        </select>
                      </label>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <label>
                        <h3>Month</h3>
                        <select
                          name="month"
                          value={formData?.month}
                          onChange={handleChange}
                        >
                          <option value="Select Month">Select Month</option>
                          <option value="0">One</option>
                          <option value="1">Two</option>
                        </select>
                      </label>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <label>
                        <h3>Year</h3>
                        <select
                          name="year"
                          value={formData?.year}
                          onChange={handleChange}
                        >
                          <option value="Select Year">Select Year</option>
                          <option value="0">One</option>
                          <option value="1">Two</option>
                        </select>
                      </label>
                    </div>
                    <div className="col-lg-6">
                      <label>
                        <h3>Case Status</h3>
                        <select
                          name="caseStatus"
                          value={formData?.caseStatus}
                          onChange={handleChange}
                        >
                          <option value="Select Case Status">
                            Select Case Status
                          </option>
                          <option value="0">One</option>
                          <option value="1">Two</option>
                        </select>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="bank-charges-btns">
                  <a href="#" type="submit" onClick={handleSubmit}>
                    Get result
                  </a>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default ClientLeaderSummary;
