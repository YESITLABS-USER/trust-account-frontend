import React, { useEffect, useState } from "react";
import {
    Modal,
    Button,
    Form,
} from "react-bootstrap";

const EntryDetailForm = ({ isOpen, onClose, itemData }) => {
    const [formData, setFormData] = useState({
        date: "",
        payorPayee: "",
        transactionMethod: "",
        checkNumber: "",
        purpose: "",
        transactionType: "",
        amount: "",
        clientName: "",
        notes: "",
        reconciled: "",
        bankStatement: ""
    });

    console.log("itemData Data", itemData)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRadioChange = (e) => {
        const { name, value } = e.target;
        console.log(
            "Radio Change Event:",
            name,
            value
        )
        if (name === "reconciled" && value == "Yes") {
            itemData.reconciledToLedgers = "1"
            console.log(itemData.reconciledToLedgers)
        } else if (name === "reconciled" && value == "No") {
            itemData.reconciledToLedgers = "0"
            console.log(itemData.reconciledToLedgers)
        }
        if (name === 'bankStatement' && value == 'Yes') {
            itemData.reconciledToBankStatement = "1"
            console.log(itemData.reconciledToBankStatement)
        } else if (name === 'bankStatement' && value == 'No') {
            itemData.reconciledToBankStatement = "0"
            console.log(itemData.reconciledToBankStatement)
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        onClose();
    };

    const labelStyle = {
        fontSize: '14px',
        fontWeight: '500',
        color: '#000429',
        marginBottom: '4px',
        marginRight: "-12px"
    };

    const inputStyle = {
        padding: '10px 12px',
        border: '1px solid rgb(84, 84, 87)',
        borderRadius: '14px',
        fontSize: '12px',
        color: '#0b0c2a',
        outline: 'none',
        height: '35px',
        cursor: 'pointer',
        width: '100%',
        backgroundColor: 'white',
        boxShadow: 'none'
    };

    const buttonStyle = {
        backgroundColor: '#3182CE',
        border: 'none',
        borderRadius: '8px',
        padding: '12px',
        fontWeight: '600',
        fontSize: '14px',
        width: '30%',
        marginBottom: '5px',
        color: 'white'
    };

    const checkboxStyle = {
        boxShadow: 'none',
        border: 'none',
        backgroundColor: 'transparent',
    }
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
        alignitemDatas: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 10,
    }

    return (
        <Modal show={isOpen} onHide={onClose} size="lg"
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(5px)',
                zIndex: '1000000000'
            }}>
            <div
                style={{
                    borderRadius: "40px",
                    backgroundColor: "white",
                    overflow: "hidden",
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
                        Entry Detail
                    </h5>
                </div>
                <Modal.Body style={{
                    padding: '40px',
                }}>
                    <Form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <div className="pop-form-inr-wrp">
                                {/* First row */}
                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <div style={{ marginBottom: '20px' }}>
                                            <Form.Label style={labelStyle}>Select date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="date"
                                                value={formData.date !== undefined ? formData.date : itemData?.date || ""}
                                                onChange={handleChange}
                                                style={inputStyle}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div style={{ marginBottom: '20px' }}>
                                            <Form.Label style={labelStyle}>Enter Payor or Payee</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="payorPayee"
                                                value={formData.payorPayee || itemData?.payorPayee}
                                                onChange={handleChange}
                                                placeholder="lorem ipsum"
                                                style={inputStyle}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div style={{ marginBottom: '20px' }}>
                                            <Form.Label style={labelStyle}>Select Transaction Method</Form.Label>
                                            <Form.Select
                                                name="transactionMethod"
                                                value={formData.transactionMethod ?? itemData?.method ?? ""}
                                                onChange={handleChange}
                                                style={inputStyle}
                                            >
                                                <option value="" disabled>lorem ipsum</option>
                                                <option value="Wire">Wire</option>
                                                <option value="Check">Check</option>
                                                <option value="Cash">Cash</option>
                                                <option value="ACH">ACH</option>
                                            </Form.Select>
                                        </div>
                                    </div>
                                </div>
                                {/* Second row */}
                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <div style={{ marginBottom: '20px' }}>
                                            <Form.Label style={labelStyle}>Enter Check Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="checkNumber"
                                                value={formData.checkNumber || itemData?.checkNumber}
                                                onChange={handleChange}
                                                placeholder="554455451545151"
                                                style={inputStyle}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div style={{ marginBottom: '20px' }}>
                                            <Form.Label style={labelStyle}>Enter Purpose</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="purpose"
                                                value={formData.purpose || itemData?.purpose}
                                                onChange={handleChange}
                                                placeholder="lorem ipsum"
                                                style={inputStyle}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div style={{ marginBottom: '20px' }}>
                                            <Form.Label style={labelStyle}>Select Transaction Type</Form.Label>
                                            <Form.Select
                                                name="transactionType"
                                                value={formData.transactionType || (itemData?.deposit > 0
                                                    ? "deposit"
                                                    : itemData?.disbursement > 0
                                                        ? "disbursement"
                                                        : "")}
                                                onChange={handleChange}
                                                style={inputStyle}
                                            >
                                                <option value="" disabled>lorem ipsum</option>
                                                <option value="deposit" >Deposit Amount</option>
                                                <option value="disbursement">Disbursement Amount</option>
                                            </Form.Select>

                                        </div>
                                    </div>
                                </div>

                                {/* Third row */}
                                <div className="row mb-3">
                                    <div className="col-md-4 mb-3">
                                        <div style={{ marginBottom: '20px' }}>
                                            <Form.Label style={labelStyle}>Enter Amount</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="amount"
                                                value={formData.amount || itemData?.balance}
                                                onChange={handleChange}
                                                placeholder="55433"
                                                style={inputStyle}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <div style={{ marginBottom: '20px' }}>
                                            <Form.Label style={labelStyle}>Enter Client Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="clientName"
                                                value={formData.clientName || itemData?.client}
                                                onChange={handleChange}
                                                placeholder="lorem ipsum"
                                                style={inputStyle}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <div style={{ marginBottom: '20px' }}>
                                            <Form.Label style={labelStyle}>Enter Notes (Optional)</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="notes"
                                                value={formData.notes || itemData?.notes}
                                                onChange={handleChange}
                                                placeholder="lorem ipsum"
                                                style={inputStyle}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Checkboxes */}
                                <div className="row mb-4" style={{ alignitems: 'center' }}>
                                    <div className="col-md-6 d-flex align-items-center">
                                        <p style={{ marginBottom: 0, marginRight: '20px', minWidth: '180px', fontSize: '14px', fontWeight: '500', color: '#000429' }}>
                                            Reconciled to Ledger?
                                        </p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                            <Form.Label style={labelStyle}>Yes</Form.Label>
                                            <input
                                                type="checkbox"
                                                label="Yes"
                                                name="reconciled"
                                                value="yes"
                                                checked={formData.reconciled === "yes" || itemData?.reconciledToLedgers === "1"}
                                                onChange={handleRadioChange}
                                                style={checkboxStyle}
                                            />
                                            <Form.Label style={labelStyle}>No</Form.Label>
                                            <input
                                                type="checkbox"
                                                label="No"
                                                name="reconciled"
                                                value="no"
                                                checked={formData.reconciled === "no" || itemData?.reconciledToLedgers === "0"}
                                                onChange={handleRadioChange}
                                                style={checkboxStyle}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 d-flex align-items-center">
                                        <p style={{ color: '#000429', marginBottom: 0, marginRight: '20px', minWidth: '220px', fontSize: '14px', fontWeight: '500' }}>
                                            Reconciled to Bank Statement?
                                        </p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                            <Form.Label style={labelStyle}>Yes</Form.Label>
                                            <input
                                                type="checkbox"
                                                label="Yes"
                                                name="bankStatement"
                                                value="yes"
                                                checked={formData.bankStatement === "yes" || itemData?.reconciledToBankStatement === "1"}
                                                onChange={handleRadioChange}
                                                style={checkboxStyle}
                                            />
                                            <Form.Label style={labelStyle}>No</Form.Label>
                                            <input
                                                type="checkbox"
                                                label="No"
                                                name="bankStatement"
                                                value="no"
                                                checked={formData.bankStatement === "no" || itemData?.reconciledToBankStatement === "0"}
                                                onChange={handleRadioChange}
                                                style={checkboxStyle}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="dsbdy-frm-btn-grp w-100 text-center">
                                    <Button type="submit" style={buttonStyle}>
                                        Add Entry
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
            </div>
        </Modal>
    );
};

export default EntryDetailForm;
