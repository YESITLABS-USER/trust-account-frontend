import React, { useEffect, useMemo, useState } from "react";
import AccountSummaryPopup from "../popup/AccountSummaryPopup";
import DetailTransactionsPopup from "../popup/DetailTransactionsPopup";
import CustomDateRangePicker from "../DateRangePicker";
import { useDateRangeFilter } from "../../hooks/useDateRangeFilter";
import PaginationControls from "./PaginationControls";
import useSortableData from "../../hooks/useSortableData";
import ReportDownloadDropdown from "./ReportDownloadDropdown";

const DynamicTable = ({ data }) => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [transactionDetailsPopup, setTransactionDetailsPopup] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBank, setSelectedBank] = useState();
  const [filteredDataTable, setFilteredDataTable] = useState(data);
  const [uniqueBanks, setUniqueBanks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const parseDate = (dateStr) => {
    const dateParts = dateStr.split("/");
    if (dateParts?.length === 3) {
      return new Date(`${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`);
    }
    return new Date(dateStr);
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
        item?.userName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedBank) {
      filtered = filtered.filter((item) => item?.bankName === selectedBank);
    }
    setFilteredDataTable(filtered);
    setCurrentPage(1);
  }, [data, searchQuery, selectedBank]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };
  // 🔹 Apply Sort
  const { sortedData, sortConfig, handleSort } = useSortableData(filteredDataTable);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  const getSortArrow = (key) =>
    sortConfig?.key === key ? (sortConfig?.direction === "asc" ? " ↑" : " ↓") : "";

  const totalRecords = data?.length;
  const pageSizeOptions = [...Array(Math.ceil(totalRecords / 10))].map((_, i) => (i + 1) * 10);

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
                    <option value="" selected>All Banks</option>
                    {uniqueBanks.map((bank, index) => (
                      <option key={index} value={bank}>{bank}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="dsfilter-rt-btns" style={{ display: "flex" }}>
                <button type="button" className="cmn-btn">Sort</button>
                {/* <a href="#url" className="cmn-btn" download>
                  <img src="./images/download-icon.svg" alt="Download" /> Download Report
                </a> */}
                <ReportDownloadDropdown name={'Download Report'} data={sortedData} />
              </div>
            </div>
          </div>
          <div className="ds-bdy-content">
            <div className="ds-bdy-table-wrp">
              <table>
                <thead>
                  <tr>
                    <th onClick={() => handleSort("sno")}  style={{ cursor: "pointer" }}>S.No {getSortArrow("sno")}</th>
                    <th onClick={() => handleSort("date")} style={{ cursor: "pointer" }}>Date {getSortArrow("date")}</th>
                    <th onClick={() => handleSort("userName")} style={{ cursor: "pointer" }}>User Name {getSortArrow("userName")}</th>
                    <th onClick={() => handleSort("bankName")} style={{ cursor: "pointer" }}>Bank Name {getSortArrow("bankName")}</th>
                    <th onClick={() => handleSort("accountNumber", "number")} style={{ cursor: "pointer" }}>
                      Account Number {getSortArrow("accountNumber")}
                    </th>
                    <th onClick={() => handleSort("statementPeriod", "date")} style={{ cursor: "pointer" }}>
                      Statement Period {getSortArrow("statementPeriod")}
                    </th>
                    <th onClick={() => handleSort("endingBalance", "number")} style={{ cursor: "pointer" }}>
                      Ending Balance {getSortArrow("endingBalance")}
                    </th>
                    <th>Account Detail</th>
                    <th>Transactions Detail</th>
                    <th onClick={() => handleSort("dailyBalance", "number")} style={{ cursor: "pointer" }}>
                      Daily Balance {getSortArrow("dailyBalance")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData?.length > 0 ? (
                    paginatedData?.map((item, index) => (
                      <tr key={index}>
                        <td>{indexOfFirstRow + index + 1}</td>
                        <td>{item?.date}</td>
                        <td>{item?.userName}</td>
                        <td>{item?.bankName}</td>
                        <td>{item?.accountNumber}</td>
                        <td>{item?.statementPeriod}</td>
                        <td>{item?.endingBalance}</td>
                        <td>
                          <button className="view-button" onClick={(e) => { e.preventDefault(); handleViewAccountDetails(item, 'summary') }}>View</button>
                          {/* <a href="#url" data-popup="account-details"></a> */}

                        </td>
                        <td>
                          <button className="view-button" onClick={(e) => { e.preventDefault(); handleViewAccountDetails(item, 'transactions') }}>View</button>
                          {/* <a href="#url" data-popup="detail-transactions">View</a> */}
                        </td>
                        <td>{item?.dailyBalance}</td>
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
            <PaginationControls
              data={sortedData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              rowsPerPage={rowsPerPage}
            />

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
