// import React from "react";
// import { Modal, Box, Typography, IconButton } from "@mui/material";
// import { Close } from "@mui/icons-material";

// const DetailTransactionsPopup = ({ isOpen, onClose, accountSummary }) => {
//   console.log(accountSummary); // Debugging line to check if data is available

//   return (
//     <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-title">
//       <Box
//         sx={{
// position: "absolute",
// top: "50%",
// left: "50%",
// transform: "translate(-50%, -50%)",
// bgcolor: "background.paper",
// boxShadow: 24,
// p: 4,
// borderRadius: 2,
// width: 400,
// minHeight: 200, // Ensure content has enough space
// display: "flex",
// flexDirection: "column",
// justifyContent: "center",
//         }}
//       >
//         {/* Close Button */}
//         <IconButton
//           onClick={onClose}
//           sx={{ position: "absolute", top: 10, right: 10, bgcolor: "#3182CE", width: 30, height: 30, p: 0.5 }}
//         >
//           <Close fontSize="small" sx={{ color: "#fff" }} />
//         </IconButton>

//         {/* Popup Heading */}
//         <Typography id="modal-title" variant="h6" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
//           Detail Transactions
//         </Typography>

//         {/* Show content only if accountSummary exists */}
//         {accountSummary ? (
//           <Box sx={{ mt: 2 }}>
//             <Typography variant="body1" sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//               <strong>Date:</strong> <span>{accountSummary?.date || "N/A"}</span>
//             </Typography>

//             <Typography variant="body1" sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//               <strong>Transaction:</strong> <span>{accountSummary?.transactionType || "N/A"}</span>
//             </Typography>

//             <Typography variant="body1" sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//               <strong>Balance:</strong> <span>${accountSummary?.balance ?? "0"}</span>
//             </Typography>

//             <Typography variant="body1" sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//               <strong>Reconciled to Account Journal:</strong> <span>{accountSummary?.reconciled ? "Yes" : "No"}</span>
//             </Typography>
//           </Box>
//         ) : (
//           <Typography variant="body1" sx={{ textAlign: "center", mt: 2, color: "gray" }}>
//             No transaction data available.
//           </Typography>
//         )}
//       </Box>
//     </Modal>
//   );
// };

// export default DetailTransactionsPopup;

import React from "react";
import { Modal } from "react-bootstrap";

const DetailTransactionsPopup = ({ isOpen, onClose, accountSummary }) => {



  const closeButton = {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "#3182CE",
    color: "white",
    fontWeight: "500",
    fontSize: "20px",
    height: "25px",
    width: "25px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 10,
  }




  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      centered
      size="sm"
      aria-labelledby="modal-title"
      backdrop="static"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(5px)',
        zIndex: '1000000000'
      }}
    >

      {/* Header
        <div style={{ position: "relative", marginBottom: "10px" }}>
          <h5
            id="modal-title"
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: 0,
              color: "#333",
            }}
          >
            Detail Transactions
          </h5> */}

      {/* Circular Close Button */}
      <div style={{ position: "relative", marginBottom: "5px"}}>
        {/* Circular Close Button */}
        <div
          onClick={onClose}
          style={closeButton}
        >
          ×
        </div>
        <h5
          id="modal-title"
          style={{
            textAlign: "center",
            fontWeight: "500",
            color: "#000429",
            marginTop: 0,
            paddingTop: "70px",
            fontSize: '22px'

          }}
        >
          Detail Transactions
        </h5>
      </div>
      <div
        style={{
          // backgroundColor: "#fff",
          // borderRadius: "12px",
          padding: "20px",
          maxHeight: "100%",
          width: "100%",
        }}
      >

        {/* Body */}
        <Modal.Body>
          {accountSummary ? (
            <div style={{ fontSize: "16px", color: "#333" }}>
              {/* Date */}
              <div className="d-flex justify-content-between mb-2">
                <strong style={{color:'#000429'}}>Date:</strong>
                <span style={{color:'#000400'}}>{accountSummary.date || "N/A"}</span>
              </div>

              {/* Transaction Type */}
              <div className="d-flex justify-content-between mb-2">
                <strong style={{color:'#000429'}}>Transaction:</strong>
                <span style={{color:'#000400'}}>{accountSummary.transactionType || "N/A"}</span>
              </div>

              {/* Balance */}
              <div className="d-flex justify-content-between mb-2">
                <strong style={{color:'#000429'}}>Balance:</strong>
                <span style={{color:'#000400'}}>${accountSummary.balance ?? "0"}</span>
              </div>

              {/* Reconciled */}
              <div className="d-flex justify-content-between mb-2">
                <strong style={{color:'#000429'}}>Reconciled to Account Journal:</strong>
                <span style={{color:'#000400'}}>{accountSummary.reconciled ? "Yes" : "No"}</span>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", color: "gray" }}>
              No transaction data available.
            </div>
          )}
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default DetailTransactionsPopup;

