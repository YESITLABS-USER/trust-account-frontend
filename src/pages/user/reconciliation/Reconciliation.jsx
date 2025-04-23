import React, { useState } from "react";
import Sidebar from "../../../components/header/SideBar";
import { useAuth } from "../../../contexts/AuthContext";

const Reconciliation = () => {
  const { isSidebarOpen } = useAuth();
  const [isReconciliationOpen, setIsReconciliationOpen] = useState(false);
  const [formData, setFormData] = useState({
    firmName: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
    month: "",
    year: "",
    accountOpenDate: "",
    accountCloseDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.accountCloseDate ||
      !formData.accountOpenDate ||
      !formData.accountNumber ||
      !formData.accountName ||
      !formData.bankName ||
      !formData.firmName
    ) {
      alert("Please fill all the fields");
      return;
    }
    setIsReconciliationOpen((prev) => !prev);
    // console.log("Form Submitted", formData);
  };

  return (
    <>

      <div className={`dashboard-body-wrp  ${isSidebarOpen ? " show active" : ""} reconciliation-pg`}>
        {isReconciliationOpen !== true ? (
          <div className="dashboard-body">
            <div className="ds-bdy-head max">
              <h1>
                Monthly Trust Account Reconciliation and Review Certification
              </h1>
              <p>
                *REQUIRED BY STANDARD (1)(d) IN ACCORDANCE WITH SUBDIVISIONS
                (d)(3) and (e) OF RULE 1.15
              </p>
            </div>
            <div className="dsbdy-content">
              <form onSubmit={handleSubmit}>
                <div className="account-journal-form row">
                  <div className="input-grp w-50">
                    <label>Firm Name</label>
                    <input
                      type="text"
                      name="firmName"
                      placeholder="Firm Name"
                      value={formData?.firmName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-grp w-50">
                    <label>Bank Name</label>
                    <input
                      type="text"
                      name="bankName"
                      placeholder="Bank Name"
                      value={formData?.bankName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-grp w-50">
                    <label>Account Name</label>
                    <input
                      type="text"
                      name="accountName"
                      placeholder="Enter Account Name"
                      value={formData?.accountName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-grp w-50">
                    <label>Account Number</label>
                    <input
                      type="text"
                      name="accountNumber"
                      placeholder="Enter Account Number"
                      value={formData?.accountNumber}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="multifiled-wrp">
                    {/* <div className="input-grp">
                      <label htmlFor="month">Month</label>
                      <select
                        name="month"
                        id="month"
                        value={formData?.month}
                        onChange={handleChange}
                      >
                        <option value="">Select Month</option>
                        {[
                          "January",
                          "February",
                          "March",
                          "April",
                          "May",
                          "June",
                          "July",
                          "August",
                          "September",
                          "October",
                          "November",
                          "December",
                        ].map((month, index) => (
                          <option key={index} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </div> */}

                    {/* <div className="input-grp">
                      <label htmlFor="year">Year</label>
                      <select
                        name="year"
                        id="year"
                        value={formData?.year}
                        onChange={handleChange}
                      >
                        <option value="">Select Year</option>
                        {Array.from({ length: 25 }, (_, i) => {
                          const year = new Date().getFullYear() - i;
                          return (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          );
                        })}
                      </select>
                    </div> */}

                    <div className="input-grp">
                      <label>Account Open Date</label>
                      <input
                        type="date"
                        name="accountOpenDate"
                        value={formData?.accountOpenDate}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="input-grp">
                      <label>Account Close Date</label>
                      <input
                        type="date"
                        name="accountCloseDate"
                        value={formData?.accountCloseDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="dsbdy-frm-btn-grp">
                  <button type="submit" className="cmn-btn-2 blue-bg">
                    Get result
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="dashboard-body dsbrd-tbl-body">
            <form>
              <div className="back-btn-firm-records">
                <a href="#" onClick={handleSubmit}>
                  <img src="images/back-icon.svg" alt="Back icon" />
                </a>
                <div className="bank-charges-inr-btn-wrp">
                  <a
                    href="./images/download-icon.svg"
                    download="./images/download-icon.svg"
                    className="cmn-btn"
                  >
                    <img src="./images/download-icon.svg" alt="" />
                    Download in pdf
                  </a>
                </div>
              </div>
              <div className="firm-records-heading">
                <h1>FIRM RECORDS - ACCOUNT BALANCES</h1>
              </div>

              {/* <!-- QUESTION SECTION WRAP --> */}
              <div className="question-ans-main-wrap">
                {/* <!-- QUIZ SEC --> */}
                <div className="quiz-sec">
                  <div className="question-head-wrap">
                    <h4>
                      <span className="counterquiz">1.</span> TRUST ACCOUNT JOURNAL
                      BALANCE
                    </h4>
                  </div>
                  <div className="answer-para-wrap">
                    <p>
                      Does each entry contain the information required by
                      Standard (1)(b), adopted pursuant to rule
                      <br /> 1.15(e)? (client name, date, amount, payor/payee,
                      current balance)
                    </p>
                  </div>
                  <div className="yes-and-no-wrap">
                    <button type="button">No</button>
                    <button type="button">Yes</button>
                  </div>
                </div>
                {/* <!-- QUIZ SEC -->
                            <!-- AMOUNT SEC --> */}
                <div className="amount-sec">
                  <div className="amount-sec-wrap">
                    <span>$18,700</span>
                  </div>
                </div>
                {/* <!-- AMOUNT SEC --> */}
              </div>
              {/* <!-- QUESTION SECTION WRAP -->

                        <!-- QUESTION SECTION WRAP --> */}
              <div className="question-ans-main-wrap">
                {/* <!-- QUIZ SEC --> */}
                <div className="quiz-sec">
                  <div className="question-head-wrap">
                    <h4 className="pb-2">
                      <span className="counterquiz">2.</span> TOTAL OF ALL
                      INDIVIDUAL LEDGER BALANCES
                    </h4>
                    <h5>
                      <span className="counterquiz">A.</span> Total Individual
                      Client Ledger Balances, including all undisbursed funds
                      pursuant to rule 1.15(c)(2)
                    </h5>
                  </div>
                  <div className="answer-para-wrap">
                    <p>
                      Do all of the client ledgers have a positive or zero
                      balance?
                      <br />
                      If no, attach an explanation, including any corrective
                      action taken.
                    </p>
                  </div>
                  <div className="yes-and-no-wrap">
                    <button type="button">No</button>
                    <button type="button">Yes</button>
                  </div>
                  <div className="answer-para-wrap">
                    <p>
                      Does each entry contain the information required by
                      Standard (1)(b), adopted pursuant to rule
                      <br /> 1.15(e)? (date, amount, payor/payee, purpose,
                      current balance)
                      <br /> If no, attach an explanation, including any
                      corrective action taken.
                    </p>
                  </div>
                  <div className="yes-and-no-wrap">
                    <button type="button">No</button>
                    <button type="button">Yes</button>
                  </div>
                </div>
                {/* <!-- QUIZ SEC -->
                            <!-- AMOUNT SEC --> */}
                <div className="amount-sec">
                  <div className="amount-sec-wrap">
                    <span>$26,500</span>
                  </div>
                </div>
                {/* <!-- AMOUNT SEC -->
                            <!-- QUIZ SEC --> */}
                <div className="quiz-sec mt-3">
                  <div className="question-head-wrap">
                    <h5>
                      <span className="counterquiz">B.</span> Total Bank Charges
                      Balance in Trust Account
                    </h5>
                  </div>
                  <div className="answer-para-wrap">
                    <p>
                      In compliance with rule 1.15(c)(1), are the firm funds in
                      the account no more than reasonably
                      <br /> sufficient to pay bank charges?
                      <br /> If no, attach an explanation, including any
                      corrective action taken.
                    </p>
                  </div>
                  <div className="yes-and-no-wrap">
                    <button type="button">No</button>
                    <button type="button">Yes</button>
                  </div>
                </div>
                {/* <!-- QUIZ SEC -->
                            <!-- AMOUNT SEC --> */}
                <div className="amount-sec">
                  <div className="amount-sec-wrap">
                    <span>$175.00</span>
                  </div>
                </div>
                {/* <!-- AMOUNT SEC --> */}
              </div>
              {/* <!-- QUESTION SECTION WRAP -->

                        <!-- QUESTION SECTION WRAP --> */}
              <div className="question-ans-main-wrap">
                {/* <!-- QUIZ SEC --> */}
                <div className="quiz-sec">
                  <div className="question-head-wrap">
                    <h4 className="pb-2">
                      TOTAL 2. INDIVIDUAL LEDGERS (A+B) (automatically
                      calculated)
                    </h4>
                  </div>
                </div>
                {/* <!-- QUIZ SEC -->
                            <!-- AMOUNT SEC --> */}
                <div className="amount-sec">
                  <div className="amount-sec-wrap">
                    <span>$26,675.00</span>
                  </div>
                </div>
                {/* <!-- AMOUNT SEC --> */}
              </div>
              {/* <!-- QUESTION SECTION WRAP --> */}

              <div className="firm-records-heading">
                <h1>BANK RECORDS - ACCOUNT BALANCES</h1>
              </div>

              {/* <!-- QUESTION SECTION WRAP --> */}
              <div className="question-ans-main-wrap">
                {/* <!-- QUIZ SEC --> */}
                <div className="quiz-sec">
                  <div className="question-head-wrap">
                    <h4>
                      <span className="counterquiz">3.</span> ADJUSTED BANK
                      STATEMENT BALANCE
                    </h4>
                  </div>
                </div>
                {/* <!-- QUIZ SEC --> */}
              </div>
              {/* <!-- QUESTION SECTION WRAP -->

                        <!-- QUESTION SECTION WRAP --> */}
              <div className="question-ans-main-wrap">
                {/* <!-- QUIZ SEC --> */}
                <div className="quiz-sec">
                  <div className="question-head-wrap">
                    <h5>
                      <span className="counterquiz">A.</span> Bank Statement Ending
                      Balance
                    </h5>
                  </div>
                </div>
                {/* <!-- QUIZ SEC -->
                            <!-- AMOUNT SEC --> */}
                <div className="amount-sec">
                  <div className="amount-sec-wrap">
                    <span>$32,675.00</span>
                  </div>
                </div>
                {/* <!-- AMOUNT SEC --> */}
              </div>
              {/* <!-- QUESTION SECTION WRAP -->

                        <!-- QUESTION SECTION WRAP --> */}
              <div className="question-ans-main-wrap">
                {/* <!-- QUIZ SEC --> */}
                <div className="quiz-sec">
                  <div className="question-head-wrap">
                    <h5>
                      <span className="counterquiz">B.</span> Add Outstanding
                      Deposits (total deposits made to the account through the
                      end of bank statement period, but not reflected on bank
                      statement)
                    </h5>
                  </div>
                </div>
                {/* <!-- QUIZ SEC -->
                            <!-- AMOUNT SEC --> */}
                <div className="amount-sec">
                  <div className="amount-sec-wrap">
                    <span>$-</span>
                  </div>
                </div>
                {/* <!-- AMOUNT SEC --> */}
              </div>
              {/* <!-- QUESTION SECTION WRAP -->

                        <!-- QUESTION SECTION WRAP --> */}
              <div className="question-ans-main-wrap">
                {/* <!-- QUIZ SEC --> */}
                <div className="quiz-sec">
                  <div className="question-head-wrap">
                    <h5>
                      <span className="counterquiz">C.</span> Less Outstanding
                      Disbursements (checks and other disbursements made through
                      the end of the bank statement period, but not reflected in
                      bank statement)
                    </h5>
                  </div>
                </div>
                {/* <!-- QUIZ SEC -->
                            <!-- AMOUNT SEC --> */}
                <div className="amount-sec">
                  <div className="amount-sec-wrap">
                    <span>-$6000</span>
                  </div>
                </div>
                {/* <!-- AMOUNT SEC --> */}
              </div>
              {/* <!-- QUESTION SECTION WRAP -->

                        <!-- QUESTION SECTION WRAP --> */}
              <div className="question-ans-main-wrap">
                {/* <!-- QUIZ SEC --> */}
                <div className="quiz-sec">
                  <div className="question-head-wrap">
                    <h4>
                      TOTAL 3. (A+B-C) ADJUSTED BANK STATEMENT BALANCE
                      (automatically calculated)
                    </h4>
                  </div>
                  <div className="answer-para-wrap">
                    <p>
                      If no, your account is not reconciled. Identify the
                      error(s) and re-reconcile the account.
                    </p>
                  </div>
                  <div className="yes-and-no-wrap">
                    <button type="button">No</button>
                    <button type="button">Yes</button>
                  </div>
                </div>

                {/* <!-- QUIZ SEC -->
                            <!-- AMOUNT SEC --> */}
                <div className="amount-sec">
                  <div className="amount-sec-wrap">
                    <span>$26,675.00</span>
                  </div>
                </div>
                {/* <!-- AMOUNT SEC --> */}
              </div>
              {/* <!-- QUESTION SECTION WRAP --> */}

              <div className="firm-records-heading">
                <h1>BANK RECORDS - ACCOUNT BALANCES</h1>
                <div className="preparer-inr">
                  <div className="preparer-docs">
                    <div className="input-grp">
                      <input type="text" placeholder="Sally Mae" />
                      <label>Preparer Name</label>
                    </div>
                    <div className="input-grp">
                      <input type="text" placeholder="Preparer" />
                      <label>Position</label>
                    </div>
                    <div className="input-grp">
                      <div className="input-grp-inr">
                        <span className="upload">Upload </span>
                        <input type="file" placeholder="Upload" />
                      </div>
                      <label>Signature</label>
                    </div>
                    <div className="input-grp">
                      <div className="input-grp-inr">
                        <input
                          type="text"
                          className="date"
                          placeholder="05-02-2025"
                        />
                      </div>
                      <label>Date</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="firm-records-heading mt-5">
                <h2>ATTORNEY CERTIFICATION</h2>
                <p className="firmhdng-txt">
                  I certify that I personally reviewed the above trust account
                  reconciliation report and all supporting documents listed
                  above, and understand this reconciliation is not deemed
                  complete until all discrepancies are resolved and balances
                  agree. I acknowledge that I have a nondelegable duty and bear
                  responsibility to ensure all funds are properly held,
                  regardless of who prepared the reconciliation.
                </p>
                <div className="preparer-inr">
                  <div className="preparer-docs">
                    <div className="input-grp">
                      <input type="text" placeholder="Sally Mae" />
                      <label>Attorney Name</label>
                    </div>
                    <div className="input-grp">
                      <input type="text" placeholder="1313" />
                      <label>Bar Number</label>
                    </div>
                    <div className="input-grp">
                      <div className="input-grp-inr">
                        <span className="upload">Upload </span>
                        <input type="file" placeholder="Upload" />
                      </div>
                      <label>Signature</label>
                    </div>
                    <div className="input-grp">
                      <div className="input-grp-inr">
                        <input
                          type="text"
                          className="date"
                          placeholder="05-02-2025"
                        />
                      </div>
                      <label>Date</label>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Reconciliation;
