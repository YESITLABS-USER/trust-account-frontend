import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const DetailTransactionsPopup = ({ isOpen, onClose, transactionDetails }) => {
  console.log(transactionDetails); // Debugging line to check if data is available

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          width: 400,
          minHeight: 200, // Ensure content has enough space
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 10, right: 10, bgcolor: "#3182CE", width: 30, height: 30, p: 0.5 }}
        >
          <Close fontSize="small" sx={{ color: "#fff" }} />
        </IconButton>

        {/* Popup Heading */}
        <Typography id="modal-title" variant="h6" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
          Detail Transactions
        </Typography>

        {/* Show content only if transactionDetails exists */}
        {transactionDetails ? (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <strong>Date:</strong> <span>{transactionDetails?.date || "N/A"}</span>
            </Typography>

            <Typography variant="body1" sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <strong>Transaction:</strong> <span>{transactionDetails?.transactionType || "N/A"}</span>
            </Typography>

            <Typography variant="body1" sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <strong>Balance:</strong> <span>${transactionDetails?.balance ?? "0"}</span>
            </Typography>

            <Typography variant="body1" sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <strong>Reconciled to Account Journal:</strong> <span>{transactionDetails?.reconciled ? "Yes" : "No"}</span>
            </Typography>
          </Box>
        ) : (
          <Typography variant="body1" sx={{ textAlign: "center", mt: 2, color: "gray" }}>
            No transaction data available.
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default DetailTransactionsPopup;
