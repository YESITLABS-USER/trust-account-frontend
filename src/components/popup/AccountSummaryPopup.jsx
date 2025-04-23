// import { Modal, Box, Typography, IconButton } from "@mui/material";
// import { Close } from "@mui/icons-material";

// const AccountSummaryPopup = ({ isOpen, onClose, accountSummary }) => {
//     console.log("Modal Open:", isOpen);
//     console.log("Account Summary:", accountSummary);

//     return (
//         <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-title">
//             <Box
//                 sx={{
//                     position: "absolute",
//                     top: "40%",
//                     left: "50%",
//                     transform: "translate(-50%, -50%)",
//                     bgcolor: "background.paper",
//                     boxShadow: 24,
//                     p: 4,
//                     borderRadius: 3,
//                     width: "90%",
//                     maxWidth: 400, // Ensures it doesn't get too wide
//                     textAlign: "center",
//                     height: '60%'
//                 }}
//             >
//                 {/* Close Button */}
//                 <IconButton onClick={onClose} sx={{ position: "absolute", top: 10, right: 9, bgcolor: '#3182CE', width: '30px', height: '30px', color: 'white' }}>
//                     <Close />
//                 </IconButton>

//                 {/* Title */}
//                 <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
//                     Account Summary
//                 </Typography>

//                 {/* Content */}
//                 <Typography sx={{ mt: 2, textAlign: "left", fontSize: "18px", fontWeight: 700, color: "#333" }}>
//                     {accountSummary ? (
//                         <Box sx={{ mt: 2 }}>
//                             {/* Start Date */}
//                             <Typography variant="body1" sx={{ display: "flex", mb: 2 }}>
//                                 <strong>Start Date:</strong> <span style={{
//                                     color: "#000",
//                                     fontSize: "16px",
//                                     marginLeft: '20px'
//                                 }}>{accountSummary.date || "N/A"}</span>
//                             </Typography>

//                             {/* End Date */}
//                             <Typography variant="body1" sx={{ display: "flex", mb: 2 }}>
//                                 <strong>End Date:</strong> <span style={{
//                                     color: "#000",
//                                     fontSize: "16px",
//                                     marginLeft: '20px'
//                                 }}>{accountSummary.date || "N/A"}</span>
//                             </Typography>

//                             <Typography variant="body1" sx={{ mb: 1 }}>
//                                 <strong>Description:</strong>
//                             </Typography>
//                             <Box
//                                 sx={{
//                                     fontWeight: 600,
//                                     borderRadius: "5px",
//                                     fontSize: "14px",
//                                     whiteSpace: "pre-wrap", // Ensures line breaks are respected
//                                     maxHeight: "100px", // Limits height
//                                     overflowY: "auto", // Enables vertical scrolling if content overflows
//                                 }}
//                             >
//                                 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi deserunt exercitationem, saepe, adipisci dolorum sequ
//                                 {/* {accountSummary.description || "No description available."} */}
//                             </Box>


//                             {/* Amount */}
//                             <Typography variant="body1" sx={{ display: "flex", mt: 2, mb: 1 }}>
//                                 <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
//                                     <div>
//                                         <strong>Amount:</strong> <span style={{
//                                             color: "#000",
//                                             fontSize: "18px",
//                                             marginLeft: '20px'
//                                         }}>${accountSummary.dailyBalance ?? "0"}</span>
//                                     </div>
//                                     <div>

//                                         <strong>Interest:</strong> <span style={{
//                                             color: "#000",
//                                             fontSize: "18px",
//                                             marginLeft: '20px'
//                                         }}>{accountSummary.interest ?? "0"}%</span>
//                                     </div>
//                                 </div>
//                             </Typography>

//                             {/* Interest */}
//                             <Typography variant="body1" sx={{ display: "flex", mb: 1 }}>
//                             </Typography>
//                         </Box>
//                     ) : (
//                         "Loading..."
//                     )}
//                 </Typography>
//             </Box>
//         </Modal>
//     );
// };

// export default AccountSummaryPopup;
import React from "react";
import { Modal } from "react-bootstrap";

const AccountSummaryPopup = ({ isOpen, onClose, accountSummary }) => {


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
      size="md"
      aria-labelledby="modal-title"
      backdrop="static"
      style={{
        borderRadius: '15px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(5px)',
        zIndex: '1000000000'
      }}
    >
      {/* Header with custom close button */}
      <div style={{ position: "relative", marginBottom: "15px" }}>
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
            fontSize: '28px'

          }}
        >
          Account Summary
        </h5>
      </div>
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "20px",
          maxWidth: "100%",
          width: "100%",
          minHeight: "250px",
        }}
      >
        {/* Body */}
        <Modal.Body style={{ maxHeight: "60vh", overflowY: "auto", paddingTop: 0 }}>
          {accountSummary ? (
            <div style={{ fontSize: "16px", color: "#333" }}>
              {/* Start Date */}
              <div className="mb-3 d-flex">
                <strong style={{color:'#000429'}}>Start Date:</strong>
                <span style={{ marginLeft: "68%", color: "#000400" }}>
                  {accountSummary.startDate || "N/A"}
                </span>
              </div>

              {/* End Date */}
              <div className="mb-3 d-flex">
                <strong style={{color:'#000429'}}>End Date:</strong>
                <span style={{ marginLeft: "70%", color: "#000" }}>
                  {accountSummary.endDate || "N/A"}
                </span>
              </div>

              {/* Description */}
              <div className="mb-2">
                <strong style={{color:'#000429'}}>Description:</strong>
              </div>
              <div
                style={{
                  fontWeight: 500,
                  borderRadius: "5px",
                  fontSize: "14px",
                  whiteSpace: "pre-wrap",
                  maxHeight: "100px",
                  overflowY: "auto",
                  padding: "5px",
                  border: "1px solid #ddd",
                  backgroundColor: "#f9f9f9",
                }}
              >
                {accountSummary.description || "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus?"}
              </div>

              {/* Amount and Interest */}
              <div className="d-flex justify-content-between mt-3">
                <div>
                  <strong style={{color:'#000429'}}>Amount:</strong>
                  <span style={{ marginLeft: "18%", color: "#000" }}>
                    ${accountSummary.dailyBalance ?? "0"}
                  </span>
                </div>
                <div>
                  <strong style={{color:'#000429'}}>Interest:</strong>
                  <span style={{ marginLeft: "18%", color: "#000" }}>
                    {accountSummary.interest ?? "0"}%
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", color: "#888" }}>Loading...</div>
          )}
        </Modal.Body>
      </div>
    </Modal >
  );
};

export default AccountSummaryPopup;


