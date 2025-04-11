import React, { useState } from "react";
import {
    Modal,
    Button,
    Form,
    Row,
    Col
} from "react-bootstrap";

const EntryDetailForm = ({ isOpen, onClose }) => {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRadioChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        onClose();
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Entry Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md={4}>
                            <Form.Group controlId="date">
                                <Form.Label>Select Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="payorPayee">
                                <Form.Label>Enter Payor or Payee</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="payorPayee"
                                    placeholder="e.g. John Doe"
                                    value={formData.payorPayee}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="transactionMethod">
                                <Form.Label>Select Transaction Method</Form.Label>
                                <Form.Select
                                    name="transactionMethod"
                                    value={formData.transactionMethod}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Method</option>
                                    <option value="check">Check</option>
                                    <option value="electronic-transfer">Electronic Transfer</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={4}>
                            <Form.Group controlId="checkNumber">
                                <Form.Label>Enter Check Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="checkNumber"
                                    placeholder="e.g. 123456"
                                    value={formData.checkNumber}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="purpose">
                                <Form.Label>Enter Purpose</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="purpose"
                                    placeholder="e.g. Legal Fee"
                                    value={formData.purpose}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="transactionType">
                                <Form.Label>Select Transaction Type</Form.Label>
                                <Form.Select
                                    name="transactionType"
                                    value={formData.transactionType}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Type</option>
                                    <option value="deposit">Deposit Amount</option>
                                    <option value="disbursement">Disbursement Amount</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={4}>
                            <Form.Group controlId="amount">
                                <Form.Label>Enter Amount</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="amount"
                                    placeholder="e.g. 1000.00"
                                    value={formData.amount}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="clientName">
                                <Form.Label>Enter Client Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="clientName"
                                    placeholder="e.g. Jane Smith"
                                    value={formData.clientName}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="notes">
                                <Form.Label>Enter Notes (Optional)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="notes"
                                    placeholder="e.g. Payment for retainer"
                                    value={formData.notes}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Label>Reconciled to Ledger?</Form.Label>
                            <div>
                                <Form.Check
                                    inline
                                    label="Yes"
                                    name="reconciled"
                                    type="radio"
                                    value="yes"
                                    checked={formData.reconciled === "yes"}
                                    onChange={handleRadioChange}
                                />
                                <Form.Check
                                    inline
                                    label="No"
                                    name="reconciled"
                                    type="radio"
                                    value="no"
                                    checked={formData.reconciled === "no"}
                                    onChange={handleRadioChange}
                                />
                            </div>
                        </Col>
                        <Col md={6}>
                            <Form.Label>Reconciled to Bank Statement?</Form.Label>
                            <div>
                                <Form.Check
                                    inline
                                    label="Yes"
                                    name="bankStatement"
                                    type="radio"
                                    value="yes"
                                    checked={formData.bankStatement === "yes"}
                                    onChange={handleRadioChange}
                                />
                                <Form.Check
                                    inline
                                    label="No"
                                    name="bankStatement"
                                    type="radio"
                                    value="no"
                                    checked={formData.bankStatement === "no"}
                                    onChange={handleRadioChange}
                                />
                            </div>
                        </Col>
                    </Row>

                    <div className="text-center">
                        <Button variant="primary" type="submit">
                            Add Entry
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EntryDetailForm;
