import React, { useEffect, useState } from "react";
import AccountSummaryPopup from "../popup/AccountSummaryPopup";
import DetailTransactionsPopup from "../popup/DetailTransactionsPopup";
import CustomDateRangePicker from "../DateRangePicker";
import { useDateRangeFilter } from "../../hooks/useDateRangeFilter";

const DynamicTable = ({ data }) => {
  // const [sortedData, setSortedData] = useState(data);
  // const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  // const [searchQuery, setSearchQuery] = useState("");
  // const [dateRange, setDateRange] = useState([null, null]);
  // const [startDate, endDate] = dateRange;
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [transactionDetailsPopup, setTransactionDetailsPopup] = useState(false)
  // // Pagination State
  // const [itemsPerPage, setItemsPerPage] = useState(10);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [uniqueBanks, setUniqueBanks] = useState([]);
  // const [selectedBank, setSelectedBank] = useState()
  const [isPopupOpen, setIsPopupOpen] = useState(false);




  // useEffect(() => {
  //   const banks = Array.from(new Set(data.map((item) => item.bankName))).sort();
  //   setUniqueBanks(banks);
  // }, [data]);



  // const parseDate = (dateStr) => {
  //   const dateParts = dateStr.split("/");
  //   if (dateParts.length === 3) {
  //     return new Date(`${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`);
  //   }
  //   return new Date(dateStr);
  // };

  // const handleSort = (key, type = "string") => {
  //   let direction = "asc";
  //   if (sortConfig.key === key && sortConfig.direction === "asc") {
  //     direction = "desc";
  //   }

  //   const sorted = [...sortedData].sort((a, b) => {
  //     let aValue = a[key];
  //     let bValue = b[key];

  //     if (type === "number") {
  //       aValue = Number(String(aValue).replace(/[^0-9.-]+/g, "")); // Removes $ and converts to number
  //       bValue = Number(String(bValue).replace(/[^0-9.-]+/g, ""));
  //     } else if (type === "date") {
  //       aValue = parseDate(aValue);
  //       bValue = parseDate(bValue);
  //     } else {
  //       // Default string comparison
  //       aValue = String(aValue);
  //       bValue = String(bValue);
  //     }

  //     if (aValue < bValue) return direction === "asc" ? -1 : 1;
  //     if (aValue > bValue) return direction === "asc" ? 1 : -1;
  //     return 0;
  //   });

  //   setSortedData(sorted);
  //   setSortConfig({ key, direction });
  // };


  // const getSortArrow = (key) => {
  //   return sortConfig.key === key ? (sortConfig.direction === "asc" ? " ↑" : " ↓") : "";
  // };

  // // Universal Search
  // //  const filteredData = sortedData.filter((item) =>
  // //   Object.values(item).some((value) =>
  // //     String(value).toLowerCase().includes(searchQuery.toLowerCase())
  // //   )
  // // );

  // // Apply filters
  // const filteredData = sortedData.filter((item) =>
  //   item.userName.toLowerCase().includes(searchQuery.toLowerCase()) &&
  //   (selectedBank ? item.bankName === selectedBank : true)
  // );

  // // const [filteredDataTable, setFilteredDataTable] = useState(filteredData);
  // console.log("filteredData", filteredData);
  // const [filteredDataTable, setFilteredDataTable] = useState(filteredData);
  // const { handleApply, handleCancel } = useDateRangeFilter({
  //   data: filteredData,
  //   dateKey: 'date',
  //   onFilter: setFilteredDataTable,
  // });
  // console.log("filteredDataTable", filteredDataTable)

  // // Pagination Logic
  // const totalPages = Math.ceil(filteredDataTable.length / rowsPerPage);
  // const indexOfLastRow = currentPage * rowsPerPage;
  // const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  // const currentRows = filteredDataTable.slice(indexOfFirstRow, indexOfLastRow);

  // // Generate Page Number Options
  // const pageNumbers = [];
  // for (let i = 1; i <= totalPages; i++) {
  //   pageNumbers.push(i);
  // }

  // // Generate Rows Per Page Options (Multiples of 10 up to total count)
  // const maxRows = Math.ceil(sortedData.length / 10) * 10;
  // const pageSizeOptions = Array.from({ length: maxRows / 10 }, (_, i) => (i + 1) * 10);

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   setCurrentPage(1); // Reset to first page when searching
  // };

  const handleViewAccountDetails = (item, type) => {
    if (type == 'summary') {
      setSelectedAccount(item); // Store selected account data
      setIsPopupOpen(true); // Open popup
    }
    if (type == 'transactions') {
      setSelectedTransaction(item); // Store selected transaction data
      setTransactionDetailsPopup(true); // Open popup
    }
  };



  const [sortedData, setSortedData] = useState(data);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBank, setSelectedBank] = useState();
  const [filteredDataTable, setFilteredDataTable] = useState(data);
  const [uniqueBanks, setUniqueBanks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const parseDate = (dateStr) => {
    const dateParts = dateStr.split("/");
    if (dateParts.length === 3) {
      return new Date(`${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`);
    }
    return new Date(dateStr);
  };

  const handleSort = (key, type = "string") => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sorted = [...filteredDataTable].sort((a, b) => {
      let aValue = a[key];
      let bValue = b[key];

      if (type === "number") {
        aValue = Number(String(aValue).replace(/[^0-9.-]+/g, ""));
        bValue = Number(String(bValue).replace(/[^0-9.-]+/g, ""));
      } else if (type === "date") {
        aValue = parseDate(aValue);
        bValue = parseDate(bValue);
      } else {
        aValue = String(aValue);
        bValue = String(bValue);
      }

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredDataTable(sorted);
    setSortConfig({ key, direction });
  };

  const getSortArrow = (key) => {
    return sortConfig.key === key ? (sortConfig.direction === "asc" ? " ↑" : " ↓") : "";
  };

  const { handleApply, handleCancel } = useDateRangeFilter({
    data,
    dateKey: "date",
    onFilter: setFilteredDataTable,
    parseDate,
  });

  useEffect(() => {
    const banks = Array.from(new Set(data.map((item) => item.bankName))).sort();
    setUniqueBanks(banks);
  }, [data]);

  useEffect(() => {
    let filtered = [...data];

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.userName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedBank) {
      filtered = filtered.filter((item) => item.bankName === selectedBank);
    }

    setFilteredDataTable(filtered);
  }, [data, searchQuery, selectedBank]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredDataTable.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredDataTable.slice(indexOfFirstRow, indexOfLastRow);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const maxRows = Math.ceil(sortedData.length / 10) * 10;
  const pageSizeOptions = Array.from({ length: maxRows / 10 }, (_, i) => (i + 1) * 10);



  return (
    <>
      <style>
        {`
          .view-button {
            color: #000429;
            border: none;
            background-color: transparent;
            cursor: pointer;
            padding: 8px 12px;
            font-size: 14px;
            font-weight: bold;
            border-radius: 4px;
            transition: all 0.3s ease;
          }

          .view-button:hover {
            color: #002366;
          }
        `}
      </style>



      <div className="search-bar-wrp">
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <div className="input-grp search">
              <input
                type="text"
                name="search"
                placeholder="Search by User name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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
              <div className="ds-filter-input-wrp">
                {/* <div className="input-grp datefield-wrp"> */}
                {/* <input
                    type="text"
                    id="txtDateRange"
                    name="txtDateRange"
                    className="inputField shortInputField dateRangeField"
                    placeholder="Date range"
                  /> */}
                <CustomDateRangePicker onApply={handleApply} onCancel={handleCancel} />
                {/* </div> */}
                <div className="input-grp">
                  <select
                    value={selectedBank}
                    onChange={(e) => {
                      setSelectedBank(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="">All Banks</option>
                    {uniqueBanks.map((bank, index) => (
                      <option key={index} value={bank}>{bank}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="dsfilter-rt-btns">
                <button type="button" className="cmn-btn">Sort</button>
                <a href="#url" className="cmn-btn" download>
                  <img src="./images/download-icon.svg" alt="Download" /> Download Report
                </a>
              </div>
            </div>
          </div>

          <div className="ds-bdy-content">
            <div className="ds-bdy-table-wrp">
              <table>
                <thead>
                  <tr>
                    <th onClick={() => handleSort("sno", "number")}>S.No {getSortArrow("sno")}</th>
                    <th onClick={() => handleSort("date", "date")}>Date {getSortArrow("date")}</th>
                    <th onClick={() => handleSort("userName")}>User Name {getSortArrow("userName")}</th>
                    <th onClick={() => handleSort("bankName")}>Bank Name {getSortArrow("bankName")}</th>
                    <th onClick={() => handleSort("accountNumber", "number")}>
                      Account Number {getSortArrow("accountNumber")}
                    </th>
                    <th onClick={() => handleSort("statementPeriod", "date")}>
                      Statement Period {getSortArrow("statementPeriod")}
                    </th>
                    <th onClick={() => handleSort("endingBalance", "number")}>
                      Ending Balance {getSortArrow("endingBalance")}
                    </th>
                    <th>Account Detail</th>
                    <th>Transactions Detail</th>
                    <th onClick={() => handleSort("dailyBalance", "number")}>
                      Daily Balance {getSortArrow("dailyBalance")}
                    </th>

                  </tr>
                </thead>
                <tbody>
                  {currentRows.length > 0 ? (
                    currentRows.map((item, index) => (
                      <tr key={index}>
                        <td>{indexOfFirstRow + index + 1}</td>
                        <td>{item.date}</td>
                        <td>{item.userName}</td>
                        <td>{item.bankName}</td>
                        <td>{item.accountNumber}</td>
                        <td>{item.statementPeriod}</td>
                        <td>{item.endingBalance}</td>
                        <td>
                          <button className="view-button" onClick={(e) => { e.preventDefault(); handleViewAccountDetails(item, 'summary') }}>View</button>
                          {/* <a href="#url" data-popup="account-details"></a> */}

                        </td>
                        <td>
                          <button className="view-button" onClick={(e) => { e.preventDefault(); handleViewAccountDetails(item, 'transactions') }}>View</button>
                          {/* <a href="#url" data-popup="detail-transactions">View</a> */}
                        </td>
                        <td>{item.dailyBalance}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="11" style={{ textAlign: "center" }}>No data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Par Page Controls */}
            <div className="select-item-count">
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
          </div>
        </form>
      </div>
      {/* Modal Component */}
      <AccountSummaryPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        accountSummary={selectedAccount}
      />
      <DetailTransactionsPopup
        isOpen={transactionDetailsPopup}
        onClose={() => setTransactionDetailsPopup(false)}
        accountSummary={selectedTransaction}
      />
    </>
  );
};

export default DynamicTable;
