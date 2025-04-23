import React, { useState } from "react";
import {
    Modal,
    Button,
    Form
} from "react-bootstrap";

const AddClientModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        clientName: "",
        feeType: "",
        caseSummary: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("New Client Data:", formData);
        onClose();
    };
    const labelStyle = {
        position: 'absolute',
        top: '-10px',
        left: '12px',
        background: 'white',
        padding: '0 5px',
        fontSize: '16px',
        color: '#000429',
        zIndex: 1
    }

    const inputStyle = {
        borderRadius: '10px',
        padding: '12px 14px',
        fontSize: '14px',
        border: '1.5px solid #000',
        width: '100%',
        color: 'black',
        backgroundColor: 'white',
        outline: 'none',
        boxShadow: 'none',
    };

    const buttonStyle = {
        backgroundColor: '#006aff',
        border: 'none',
        borderRadius: '8px',
        padding: '12px',
        fontWeight: '600',
        fontSize: '14px',
        width: '100%',
        marginBottom: '12px',
        color: 'white',
    };

    const handleFocus = (e) => {
        e.target.style.border = '1.5px solid #6f95fc';
        e.target.style.boxShadow = 'none';
    };

    const handleBlur = (e) => {
        e.target.style.border = '1.5px solid #000';
        e.target.style.boxShadow = 'none';
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered style={{
                borderRadius: '15px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(5px)',
                zIndex: '1000000000'
            }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    borderRadius: "10px",
                    maxWidth: "100%",
                    zIndex: '1000000000'
                }}
            >
                <div className="close-btn"
                    onClick={() => onClose()} // replace with your close handler
                >
                    ×
                </div>
            </div>
            <Modal.Body className="p-4">
                <div className="text-center mb-3">
                    <h5 style={{ color: '#2d2f54', fontSize: '28px' }}>Add Client</h5>
                    <p className="text-muted small">
                        Lorem Ipsum has been the industry's standard dummy
                    </p>
                </div>

                <Form onSubmit={handleSubmit} style={{
                    margin: '40px'
                }}>
                    <Form.Group className="mb-3" style={{ marginBottom: '20px', position: 'relative' }}>
                        <label style={labelStyle}>
                            Client Name
                        </label>
                        <Form.Control
                            type="text"
                            name="clientName"
                            placeholder="Enter Client Name"
                            value={formData.clientName}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" style={{ marginBottom: '20px', position: 'relative' }}>
                        <label style={labelStyle}>
                            Fee Type
                        </label>
                        <Form.Control
                            type="text"
                            name="feeType"
                            placeholder="Enter Fee Type"
                            value={formData.feeType}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </Form.Group>

                    <Form.Group className="mb-4" style={{ marginBottom: '20px', position: 'relative' }}>
                        <label style={labelStyle}>
                            Case Summary
                        </label>
                        <Form.Control
                            type="text"
                            name="caseSummary"
                            placeholder="Enter Case Summary"
                            value={formData.caseSummary}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </Form.Group>

                    <div className="d-grid">
                        <Button type="submit" style={buttonStyle}>
                            Add
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddClientModal;
