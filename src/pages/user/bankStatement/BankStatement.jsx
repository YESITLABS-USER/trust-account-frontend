import React, { useContext, useState } from "react";
import SideBar from "../../../components/header/SideBar";
import { useAuth } from "../../../contexts/AuthContext";
import DynamicTable from "../../../components/user/DynamicTable";

const BankStatement = () => {

  const { isSidebarOpen, setSidebarOpen } = useAuth()
  const [showTabel, setShowTable] = useState(false);

  const tableData = [
    { id: 1, date: "13/12/2024", userName: "Rita", bankName: "Rita", accountNumber: 121212156666, statementPeriod: "Rita", endingBalance: 100, dailyBalance: 100 },
    { id: 2, date: "15/06/2023", userName: "Donnie", bankName: "Donnie", accountNumber: 2022688555, statementPeriod: "Donnie", endingBalance: 100, dailyBalance: 100 },
    { id: 3, date: "12/01/2024", userName: "Nick", bankName: "Nick", accountNumber: 100036589488855, statementPeriod: "Nick", endingBalance: 100, dailyBalance: 100 },
    { id: 4, date: "02/01/2020", userName: "Marian", bankName: "Marian", accountNumber: 898989546559, statementPeriod: "Marian", endingBalance: 100, dailyBalance: 100 },
    { id: 5, date: "25/07/2022", userName: "Jake", bankName: "Jake Bank", accountNumber: 456123789652, statementPeriod: "July 2022", endingBalance: 5000, dailyBalance: 150 },
    { id: 6, date: "05/11/2023", userName: "Laura", bankName: "Laura Savings", accountNumber: 789654123, statementPeriod: "Nov 2023", endingBalance: 3000, dailyBalance: 120 },
    { id: 7, date: "30/03/2021", userName: "Samuel", bankName: "Samuel Finance", accountNumber: 852741963, statementPeriod: "March 2021", endingBalance: 2500, dailyBalance: 80 },
    { id: 8, date: "10/09/2020", userName: "Alice", bankName: "Alice Investments", accountNumber: 369258147, statementPeriod: "Sept 2020", endingBalance: 7000, dailyBalance: 200 },
    { id: 9, date: "18/06/2023", userName: "Oliver", bankName: "Oliver Bank", accountNumber: 123987456, statementPeriod: "June 2023", endingBalance: 6000, dailyBalance: 180 },
    { id: 10, date: "20/12/2024", userName: "Sophia", bankName: "Sophia Trust", accountNumber: 741852963, statementPeriod: "Dec 2024", endingBalance: 4000, dailyBalance: 130 },
    { id: 11, date: "05/04/2022", userName: "Michael", bankName: "Michael Holdings", accountNumber: 963258741, statementPeriod: "April 2022", endingBalance: 4500, dailyBalance: 140 },
    { id: 12, date: "29/07/2023", userName: "Emma", bankName: "Emma Bank", accountNumber: 147852369, statementPeriod: "July 2023", endingBalance: 5500, dailyBalance: 170 },
    { id: 13, date: "07/10/2021", userName: "Daniel", bankName: "Daniel Credit", accountNumber: 258369147, statementPeriod: "Oct 2021", endingBalance: 3200, dailyBalance: 110 },
    { id: 14, date: "14/02/2020", userName: "Ava", bankName: "Ava Finance", accountNumber: 357951258, statementPeriod: "Feb 2020", endingBalance: 2750, dailyBalance: 90 },
    { id: 15, date: "21/05/2024", userName: "William", bankName: "William Savings", accountNumber: 654789321, statementPeriod: "May 2024", endingBalance: 4900, dailyBalance: 160 },
    { id: 16, date: "08/11/2023", userName: "Mia", bankName: "Mia Bank", accountNumber: 852963741, statementPeriod: "Nov 2023", endingBalance: 5200, dailyBalance: 175 },
    { id: 17, date: "16/06/2021", userName: "Ethan", bankName: "Ethan Wealth", accountNumber: 951357258, statementPeriod: "June 2021", endingBalance: 3800, dailyBalance: 125 },
    { id: 18, date: "24/03/2022", userName: "Charlotte", bankName: "Charlotte Investments", accountNumber: 369147258, statementPeriod: "March 2022", endingBalance: 4300, dailyBalance: 135 },
    { id: 19, date: "12/08/2020", userName: "James", bankName: "James Bank", accountNumber: 258741369, statementPeriod: "Aug 2020", endingBalance: 3100, dailyBalance: 115 },
    { id: 20, date: "30/09/2023", userName: "Harper", bankName: "Harper Finance", accountNumber: 147369852, statementPeriod: "Sept 2023", endingBalance: 5700, dailyBalance: 185 },
    { id: 21, date: "17/07/2022", userName: "Benjamin", bankName: "Benjamin Trust", accountNumber: 753951258, statementPeriod: "July 2022", endingBalance: 6200, dailyBalance: 190 },
    { id: 22, date: "03/12/2021", userName: "Amelia", bankName: "Amelia Holdings", accountNumber: 159753258, statementPeriod: "Dec 2021", endingBalance: 4600, dailyBalance: 145 },
    { id: 23, date: "26/05/2023", userName: "Henry", bankName: "Henry Bank", accountNumber: 654987321, statementPeriod: "May 2023", endingBalance: 5900, dailyBalance: 180 },
    { id: 24, date: "09/04/2020", userName: "Lucas", bankName: "Lucas Credit", accountNumber: 357852159, statementPeriod: "April 2020", endingBalance: 2850, dailyBalance: 100 },
    { id: 25, date: "15/11/2024", userName: "Liam", bankName: "Liam Finance", accountNumber: 369852147, statementPeriod: "Nov 2024", endingBalance: 4800, dailyBalance: 155 },
    { id: 26, date: "06/10/2021", userName: "Zoe", bankName: "Zoe Bank", accountNumber: 852741963, statementPeriod: "Oct 2021", endingBalance: 3500, dailyBalance: 130 },
    { id: 27, date: "28/02/2023", userName: "Isabella", bankName: "Isabella Wealth", accountNumber: 753258951, statementPeriod: "Feb 2023", endingBalance: 5300, dailyBalance: 165 },
    { id: 28, date: "11/01/2022", userName: "Elijah", bankName: "Elijah Trust", accountNumber: 951357852, statementPeriod: "Jan 2022", endingBalance: 4900, dailyBalance: 150 },
    { id: 29, date: "04/06/2024", userName: "Emily", bankName: "Emily Holdings", accountNumber: 258963147, statementPeriod: "June 2024", endingBalance: 5100, dailyBalance: 170 },
    { id: 30, date: "22/09/2023", userName: "Alexander", bankName: "Alexander Bank", accountNumber: 654159753, statementPeriod: "Sept 2023", endingBalance: 6000, dailyBalance: 200 },
    { id: 31, date: "22/09/2023", userName: "Alexander", bankName: "Alexander Bank", accountNumber: 654159753, statementPeriod: "Sept 2023", endingBalance: 6000, dailyBalance: 200 }
  ];

  const handleSaveAndOpenTable = async () => {
    console.log("Save and Open Table");
    setShowTable(true);
  }

  return (
    <>
      <SideBar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`dashboard-body-wrp show ${isSidebarOpen ? " active" : ""}`}>
        {
          showTabel ?
            (
              <DynamicTable data={tableData} />
            ) : (
              <div className="dashboard-body">
                <div className="ds-bdy-head">
                  <h1>Bank Statement</h1>
                  <strong>Enter your IOLTA Account Bank Statement</strong>
                  <p>
                    *REQUIRED BY STANDARD (1)(c) IN ACCORDANCE WITH SUBDIVISIONS
                    (d)(3) and (e) OF RULE 1.15.
                  </p>
                </div>

                <div className="dsbdy-content">
                  <h2 className="dsbdy-content-title">Upload Document</h2>
                  <form>
                    <div className="input-grp">
                      <label>Upload Bank Statement</label>
                      <div className="file-input">
                        <input type="file" />
                        <div className="upload-placeholder">
                          <img
                            className="upload-icon"
                            src="/images/upload-img.svg"
                            alt="Icon"
                          />
                          <p>PDFs, Word documents, Excel files, images (JPEG, PNG)</p>
                        </div>
                      </div>
                    </div>

                    <div className="addon-info">
                      *All documents and information shall be exportable. + All document
                      uploads shall have the ability for note and name entry.
                    </div>

                    {/* <div className="dsbdy-frm-btn-grp">
                      <button type="button" className="viewuploaded" >
                        Save
                      </button>
                      <button type="button">Print</button>
                      <div className="dsbdy-frm-btn-grp-btn">
                        <button type="button" className="viewuploaded">View recently uploadded.</button>
                      </div>

                    </div> */}

                    <div className="dsbdy-frm-btn-grp" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                      <div style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "center",
                        flexGrow: 1
                      }}>
                        <button type="button" className="viewuploaded" onClick={() => handleSaveAndOpenTable()}>Save</button>
                        <button type="button" onClick={() => window.print()}>Print</button>
                      </div>
                      <a href="#" className="viewuploaded" style={{ whiteSpace: "nowrap", fontSize: "22px", fontWeight: '500', textDecoration: "underline" }} onClick={() => setIsOpenTab(false)}>View Recently Uploaded</a>
                    </div>
                  </form>
                </div>
              </div>
            )
        }
      </div>
    </>
  );
};

export default BankStatement;
