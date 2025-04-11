import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../../../components/header/SideBar";
import { useAuth } from "../../../contexts/AuthContext";
import EntryDetailForm from "../../../components/popup/EntryDetailForm";
import CustomDateRangePicker from "../../../components/DateRangePicker";
import { useDateRangeFilter } from "../../../hooks/useDateRangeFilter";

// 🔹 Dummy data generator
const generateDummyData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const data = [];
  for (let i = 1; i <= 50; i++) {
    const monthIndex = Math.floor(Math.random() * 12);
    const year = 2025 - Math.floor(Math.random() * 3);
    data.push({
      id: i,
      date: `${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}/${String(monthIndex + 1).padStart(2, "0")}/${year}`,
      payorPayee: `Payee ${i}`,
      transactionMethod: "Method A",
      checkNumber: `CHK${i}`,
      purpose: "General Expense",
      depositAmount: (Math.random() * 1000).toFixed(2),
      disbursementAmount: (Math.random() * 500).toFixed(2),
      runningBalance: (Math.random() * 5000).toFixed(2),
      notes: "Sample note",
      reconciled: Math.random() > 0.5,
      monthYear: `${months[monthIndex]} ${year}`,
    });
  }
  return data;
};

const parseDate = (dateStr) => {
  const parts = dateStr.split("/");
  return new Date(`${parts[1]}/${parts[0]}/${parts[2]}`);
};



const BankChargesLedgers = () => {
  const { isSidebarOpen } = useAuth();
  const [firmName, setFirmName] = useState("");
  const [ledgerDetail, setLedgerDetail] = useState("");
  const [purpose, setPurpose] = useState("");
  const [search, setSearch] = useState("");
  const [caseSelection, setCaseSelection] = useState("");
  const [monthYear, setMonthYear] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState(generateDummyData());
  const [filteredData, setFilteredData] = useState(data);
  const [isTableOpen, setIsTableOpen] = useState(false);
 
  
  const handleGetLedger = () => {
    console.log("Fetching Ledger Details...", { firmName, ledgerDetail, purpose });
    setIsTableOpen(true);
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
  
      if (search) {
        result = result.filter(item =>
          item.payorPayee.toLowerCase().includes(search.toLowerCase())
        );
      }
      if (caseSelection) {
        result = result.filter(item => item.purpose === caseSelection);
      }
      if (monthYear) {
        result = result.filter(item => item.monthYear === monthYear);
      }
  
      setFilteredData(result);
      setCurrentPage(1);
    }, [data, search, caseSelection, monthYear]);



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



    // // 🔹 Pagination
    // const totalPages = Math.ceil(sortedData.length / rowsPerPage);
    // const currentRows = sortedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  
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
  
    const pageSizeOptions = Array.from({ length: 5 }, (_, i) => (i + 1) * 10);

  const [isPopupOpen, setIsPopupOpen] = useState(false);





  // const { handleApply, handleCancel } = useDateRangeFilter({
  //   data: sortedData1,
  //   dateKey: 'date',
  //   onFilter: setFilteredDataTable,
  // });



  // Compute total pages dynamically
  // const totalPages = Math.ceil(filteredDataTable.length / rowsPerPage);
  // const paginatedData = filteredDataTable.slice(
  //   (currentPage - 1) * rowsPerPage,
  //   currentPage * rowsPerPage
  // );

  // Handle page change
  const handlePageChange = (e) => {
    setCurrentPage(Number(e.target.value));
  };

  // 🔵 Sorting Toggle
  // const toggleSort = (field) => {
  //   setSortField(field);
  //   setSortOrder(sortField === field && sortOrder === "asc" ? "desc" : "asc");
  // };

  // const toggleSort = (key, type = "string") => {
  //   let direction = "asc";
  //   if (sortConfig.key === key && sortConfig.direction === "asc") {
  //     direction = "desc";
  //   }

  //   const sorted = [...filteredDataTable].sort((a, b) => {
  //     let aValue = a[key];
  //     let bValue = b[key];

  //     if (type === "number") {
  //       aValue = Number(String(aValue).replace(/[^0-9.-]+/g, ""));
  //       bValue = Number(String(bValue).replace(/[^0-9.-]+/g, ""));
  //     } else if (type === "date") {
  //       aValue = parseDate(aValue);
  //       bValue = parseDate(bValue);
  //     } else {
  //       aValue = String(aValue);
  //       bValue = String(bValue);
  //     }

  //     if (aValue < bValue) return direction === "asc" ? -1 : 1;
  //     if (aValue > bValue) return direction === "asc" ? 1 : -1;
  //     return 0;
  //   });

  //   setFilteredDataTable(sorted);
  //   setSortConfig({ key, direction });
  // };

  // const getSortArrow = (key) => {
  //   return sortConfig.key === key ? (sortConfig.direction === "asc" ? " ↑" : " ↓") : "";
  // };

  const handleSearch = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle changing rows per page
  const handleRowsPerPageChange = (rowCount) => {
    rowCount <= sortedData.length
      ? setRowsPerPage(rowCount)
      : setRowsPerPage(10);
    setCurrentPage(1); // Reset to first page after changing rows per page
  }


  // Compute total pages dynamically
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <>
      <Sidebar />
      <div className={`dashboard-body-wrp ${isSidebarOpen ? "show active" : ""}`}>
        {isTableOpen ? (
          <>
            <div class="search-bar-wrp">
              <div class="search-bar">
                <form onSubmit={handleSearch}>
                  <div class="input-grp search">
                    <input
                      type="text"
                      name="search"
                      placeholder="Search by client name"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="submit" aria-label="Perform search">
                      <img
                        src="images/search-icon.svg"
                        alt="Search Icon"
                        loading="lazy"
                      />
                    </button>
                  </div>
                </form>
                <div class="dsbdy-frm-btn-grp mt-0">
                  <button
                    class="cmn-btn-2 blue-bg"
                    data-popup="add-entry"
                    onClick={() => setIsPopupOpen(true)}
                  >
                    Add Entry
                  </button>
                </div>
              </div>
            </div>
            <div class="dashboard-body dsbrd-tbl-body">
              <form>
                <div class="ds-bdy-head mb-3">
                  <div class="ds-filter-wrp">
                    <div class="dsfilter-rt-btns ds-filter-upr-wrp-new">
                      <div class="dsfilter-wrp-text">
                        <h3>Firm Name : R&W Development</h3>
                        <p>Purpose : Subcontractor Dispute</p>
                      </div>
                      <div class="dsfilter-wrp-text">
                        <h3>Current Month and Year : January 2024</h3>
                        <p>Case open date : 03-01-2024</p>
                        <p>Case close date :</p>
                      </div>
                    </div>
                    <span
                      class="required-text"
                      style={{
                        color: "black",
                      }}
                    >
                      *REQUIRED BY STANDARD (1)(b) IN ACCORDANCE WITH
                      SUBDIVISIONS (d)(3) and (e) OF RULE 1.15.
                    </span>
                    <div class="dsfilter-deep">
                      <div class="dsfilterdp-left ds-filter-input-wrp2">
                        <CustomDateRangePicker onApply={handleApply} onCancel={handleCancel} />
                        <div class="input-grp">
                          <select
                            value={caseSelection}
                            onChange={(e) => setCaseSelection(e.target.value)}
                          >
                            <option value="">All Cases</option>
                            <option value="General Expense">
                              General Expense
                            </option>
                          </select>
                        </div>
                        <div class="input-grp">
                          <select
                            value={monthYear}
                            onChange={(e) => setMonthYear(e.target.value)}
                          >
                            <option value="">All Months</option>
                            {[
                              ...new Set(data.map((item) => item.monthYear)),
                            ].map((m) => (
                              <option key={m} value={m}>
                                {m}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div class="bank-charges-inr-btn-wrp">
                        <a
                          href="./images/download-icon.svg"
                          download
                          class="cmn-btn"
                        >
                          <img
                            src="./images/download-icon.svg"
                            alt="Download"
                          />{" "}
                          Download Report
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="ds-bdy-content">
                  <div class="ds-bdy-table-wrp">
                    <table>
                      <thead>
                        <tr>
                          <th onClick={() => handleSort("id")}>S.No {getSortArrow("sno")}</th>
                          <th onClick={() => handleSort("date")}>Date {getSortArrow("date")}</th>
                          <th onClick={() => handleSort("payorPayee")}>
                            Payor or Payee {getSortArrow("snopayorPayee")}
                          </th>
                          <th>Transaction Method </th>
                          <th onClick={() => handleSort("Checknumber")}>
                            Check Number {getSortArrow("Checknumber")}
                          </th>
                          <th onClick={() => handleSort("purpose")}>Purpose {getSortArrow("purpose")}</th>
                          <th onClick={() => handleSort("depositAmount")}>
                            Deposit Amount {getSortArrow("depositAmount")}
                          </th>
                          <th onClick={() => handleSort("disbursementAmount")}>
                            Disbursement Amount {getSortArrow("disbursementAmount")}
                          </th>
                          <th onClick={() => handleSort("runningBalance")}>
                            Running Balance {getSortArrow("runningBalance")}
                          </th>
                          <th>Notes</th>
                          <th>Reconciled</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.length > 0 ? (
                          paginatedData.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.date}</td>
                              <td>{item.payorPayee}</td>
                              <td>{item.transactionMethod}</td>
                              <td>{item.checkNumber}</td>
                              <td>{item.purpose}</td>
                              <td>{item.depositAmount}</td>
                              <td>{item.disbursementAmount}</td>
                              <td>{item.runningBalance}</td>
                              <td>{item.notes}</td>
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
                          ))
                        ) : (
                          <tr>
                            <td colSpan="11" style={{ textAlign: "center" }}>
                              No data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div></div>
                <div className="select-item-count">
                  <select
                    value={rowsPerPage}
                    onChange={(e) => {
                      handleRowsPerPageChange(Number(e.target.value));
                    }}
                  >
                    {Array.from(
                      { length: Math.ceil(data.length / 10) },
                      (_, index) => {
                        const rows = (index + 1) * 10;
                        return (
                          <option key={rows} value={rows}>
                            {rows} per page
                          </option>
                        );
                      }
                    )}
                  </select>
                </div>
              </form>
              <div className="dsbrd-pagination">
                <ul>
                  <li
                    className="prev"
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  >
                    <img src="images/left-chevron.svg" alt="Icon" />
                  </li>
                  {[...Array(totalPages).keys()].map((num) => (
                    <li
                      key={num + 1}
                      className={currentPage === num + 1 ? "active" : ""}
                      style={{
                        color: "black",
                      }}
                      onClick={() => setCurrentPage(num + 1)}
                    >
                      {num + 1}
                    </li>
                  ))}
                  <li
                    className="next"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                  >
                    <img src="images/left-chevron.svg" alt="Icon" />
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <div className="dashboard-body">
            <div className="ds-bdy-head max">
              <h1>Bank Charges Ledgers</h1>
              <strong>
                Search and Access Detailed Accounting Records for Your Clients
              </strong>
            </div>

            <div className="bank-charges-form-in">
              <label>
                <h3>Firm Name</h3>
                <input
                  type="text"
                  placeholder="Firm Name"
                  value={firmName}
                  onChange={(e) => setFirmName(e.target.value)}
                />
              </label>
              {/* <label>
                <h3>Ledgers Detail</h3>
                <select
                  value={ledgerDetail}
                  onChange={(e) => setLedgerDetail(e.target.value)}
                >
                  <option value="">Ledgers Detail</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                </select>
              </label> */}
              <label>
                <h3>Purpose</h3>
                <input
                  type="text"
                  placeholder="Enter Purpose"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                />
              </label>
              <div
                className="bank-charges-btns coursir-ponter"
                onClick={handleGetLedger}
              >
                <a className="cmn-btn-2">
                  <img src="./images/get-ledger-icon.svg" alt="" />
                  Get Ledger
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* <div class="popup-wrp add-entry table-content pop-form">
                <div class="pop-overlay"></div>
                <div class="pop-up-inr-wrp">
                    <div class="sign-popup">
                        <div class="close-btn">
                            <i class="fa-solid fa-times"></i>
                        </div>
                        <div class="sign-pop-head">
                            <h2>Entry Detail</h2>
                        </div>
                        <div class="pop-bdy-content">
                            <form>
                                <div class="pop-form-inr-wrp">
                                    <div class="input-grp datefield-wrp">
                                        <label>Select date</label>
                                        <input type="text" placeholder="Date range" class="date" />
                                    </div>
                                    <div class="input-grp">
                                        <label>Enter Payor or Payee</label>
                                        <input type="text" placeholder="lorem ipsum" />
                                    </div>
                                    <div class="input-grp">
                                        <label>Select Transaction Method</label>
                                        <select>
                                            <option value="" selected>lorem ipsum</option>
                                            <option value="check">Check</option>
                                            <option value="electronic-transfer">Electronic Transfer</option>
                                        </select>
                                    </div>
                                    <div class="input-grp">
                                        <label>Enter Check Number</label>
                                        <input type="text" placeholder="554455451545151" />
                                    </div>
                                    <div class="input-grp">
                                        <label>Enter Purpose</label>
                                        <input type="text" placeholder="lorem ipsum" />
                                    </div>
                                    <div class="input-grp">
                                        <label>Select Transaction Type</label>
                                        <select>
                                            <option value="" selected>lorem ipsum</option>
                                            <option value="">Deposit Amount</option>
                                            <option value="">Disbursement Amount</option>
                                        </select>
                                    </div>
                                    <div class="input-grp">
                                        <label>Enter Amount</label>
                                        <input type="text" placeholder="55433" />
                                    </div>
                                    <div class="input-grp">
                                        <label>Enter Client Name</label>
                                        <input type="text" placeholder="lorem ipsum" />
                                    </div>
                                    <div class="input-grp">
                                        <label>Enter Notes ( Optional )</label>
                                        <input type="text" placeholder="lorem ipsum" />
                                    </div>
                                </div>

                                <div class="checks-wrp">
                                    <div class="check-wrp">
                                        <p>Reconciled to Ledger?</p>
                                        <div class="radio-container">

                                            <input type="radio" id="reconciled-yes" name="reconciled" value="yes" />
                                            <label for="reconciled-yes">Yes</label>


                                            <input type="radio" id="reconciled-no" name="reconciled" value="no" />
                                            <label for="reconciled-no">No</label>
                                        </div>
                                    </div>

                                    <div class="check-wrp">
                                        <p>Reconciled to Bank Statement?</p>
                                        <div class="radio-container">

                                            <input type="radio" id="bank-statement-yes" name="bank-statement" value="yes" />
                                            <label for="bank-statement-yes">Yes</label>


                                            <input type="radio" id="bank-statement-no" name="bank-statement" value="no" />
                                            <label for="bank-statement-no">No</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="dsbdy-frm-btn-grp w-100 mt-0">
                                    <button class="cmn-btn-2 blue-bg">Add Entry</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div> */}

      <EntryDetailForm
        onClose={() => setIsPopupOpen(false)}
        isOpen={isPopupOpen}
      />
    </>
  );
};

export default BankChargesLedgers;
