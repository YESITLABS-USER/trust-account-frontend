import { Modal, Box, Typography, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const AccountSummaryPopup = ({ isOpen, onClose, accountSummary }) => {
    console.log("Modal Open:", isOpen);
    console.log("Account Summary:", accountSummary);

    return (
        <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-title">
            <Box
                sx={{
                    position: "absolute",
                    top: "40%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 3,
                    width: "90%",
                    maxWidth: 400, // Ensures it doesn't get too wide
                    textAlign: "center",
                    height: '60%'
                }}
            >
                {/* Close Button */}
                <IconButton onClick={onClose} sx={{ position: "absolute", top: 10, right: 9, bgcolor: '#3182CE', width: '30px', height: '30px', color: 'white' }}>
                    <Close />
                </IconButton>

                {/* Title */}
                <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                    Account Summary
                </Typography>

                {/* Content */}
                <Typography sx={{ mt: 2, textAlign: "left", fontSize: "18px", fontWeight: 700, color: "#333" }}>
                    {accountSummary ? (
                        <Box sx={{ mt: 2 }}>
                            {/* Start Date */}
                            <Typography variant="body1" sx={{ display: "flex", mb: 2 }}>
                                <strong>Start Date:</strong> <span style={{
                                    color: "#000",
                                    fontSize: "16px",
                                    marginLeft: '20px'
                                }}>{accountSummary.date || "N/A"}</span>
                            </Typography>

                            {/* End Date */}
                            <Typography variant="body1" sx={{ display: "flex", mb: 2 }}>
                                <strong>End Date:</strong> <span style={{
                                    color: "#000",
                                    fontSize: "16px",
                                    marginLeft: '20px'
                                }}>{accountSummary.date || "N/A"}</span>
                            </Typography>

                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>Description:</strong>
                            </Typography>
                            <Box
                                sx={{
                                    fontWeight: 600,
                                    borderRadius: "5px",
                                    fontSize: "14px",
                                    whiteSpace: "pre-wrap", // Ensures line breaks are respected
                                    maxHeight: "100px", // Limits height
                                    overflowY: "auto", // Enables vertical scrolling if content overflows
                                }}
                            >
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi deserunt exercitationem, saepe, adipisci dolorum sequ
                                {/* {accountSummary.description || "No description available."} */}
                            </Box>


                            {/* Amount */}
                            <Typography variant="body1" sx={{ display: "flex", mt: 2, mb: 1 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                    <div>
                                        <strong>Amount:</strong> <span style={{
                                            color: "#000",
                                            fontSize: "18px",
                                            marginLeft: '20px'
                                        }}>${accountSummary.dailyBalance ?? "0"}</span>
                                    </div>
                                    <div>

                                        <strong>Interest:</strong> <span style={{
                                            color: "#000",
                                            fontSize: "18px",
                                            marginLeft: '20px'
                                        }}>{accountSummary.interest ?? "0"}%</span>
                                    </div>
                                </div>
                            </Typography>

                            {/* Interest */}
                            <Typography variant="body1" sx={{ display: "flex", mb: 1 }}>
                            </Typography>
                        </Box>
                    ) : (
                        "Loading..."
                    )}
                </Typography>
            </Box>
        </Modal>
    );
};

export default AccountSummaryPopup;
