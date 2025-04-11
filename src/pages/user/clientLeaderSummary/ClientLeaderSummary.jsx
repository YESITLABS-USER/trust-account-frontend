import { useMemo, useState } from "react";
import Sidebar from "../../../components/header/SideBar";
import { useAuth } from "../../../contexts/AuthContext";
import CustomDateRangePicker from "../../../components/DateRangePicker";
import { useDateRangeFilter } from "../../../hooks/useDateRangeFilter";




const ClientLeaderSummary = () => {
  const { isSidebarOpen } = useAuth();
  const clientData = [
    { id: 1, name: "R&W Development", balance: 21000 },
    { id: 2, name: "Dr. Tran", balance: 21000 },
    { id: 3, name: "Dr. Tran", balance: 2000 },
    { id: 4, name: "Development", balance: 3000 },
  ];


  const [data, setData] = useState(clientData)
  const [filteredData, setFilteredData] = useState(data)
   const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
       const [perPage, setPerPage] = useState(10);
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
    console.log("Form Data Submitted:", formData);
    // Implement form submission logic
  };

  const { handleApply, handleCancel } = useDateRangeFilter({
    data,
    dateKey: 'date',
    onFilter: setFilteredData,
  });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

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




  return (
    <>
      <Sidebar />
      <div className={`dashboard-body-wrp ${isSidebarOpen ? "show active" : ""}`} >
        {openDaitles ? (
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
                      <a
                        href="./images/download-icon.svg"
                        download
                        className="cmn-btn"
                      >
                        <img src="./images/download-icon.svg" alt="" />
                        Download Report
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ds-bdy-content">
                <div className="ds-bdy-table-wrp">
                  <table className="leader-summry-table">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Individual Clients</th>
                        <th>Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.map((client, index) => (
                        <tr key={client.id}>
                          <td>{index + 1}</td>
                          <td>{client.name}</td>
                          <td>${client.balance.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="total-amount-wrap">
                  <h4>Total</h4>
                  <h4>$28000</h4>
                </div>
              </div>
            </form>
          </div>
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
                          value={formData.clientName}
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
                          value={formData.month}
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
                          value={formData.year}
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
                          value={formData.caseStatus}
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
                  <a href="#" onClick={() => setOpenDaitles(true)}>
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
