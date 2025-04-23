import React, { useState } from "react";
import {
    Modal,
    Button,
    Form,
    Row,
    Col
} from "react-bootstrap";

const AddMatterModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        client: "",
        matterName: "",
        openDate: "",
        closeDate: "",
        description: "",
        caseDate: ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            const updatedForm = { ...prev, [name]: value };

            // Validation: Close Date should not be before Open Date
            if (name === "closeDate" && updatedForm.openDate && value < updatedForm.openDate) {
                alert("Close Date cannot be earlier than Open Date");
                return prev; // prevent update
            }
            if (name === "openDate" && updatedForm.closeDate && updatedForm.closeDate < value) {
                alert("Open Date cannot be after Close Date");
                return prev; // prevent update
            }

            return updatedForm;
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Saving matter:", formData);
        onClose();
    };

    const handleSaveAndNext = () => {
        console.log("Saving and preparing for next:", formData);
        setFormData({
            client: "",
            matterName: "",
            openDate: "",
            closeDate: "",
            description: "",
            caseDate: ""
        });
    };

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

    const buttonStyle = {
        backgroundColor: '#006aff',
        border: 'none',
        borderRadius: '8px',
        padding: '12px',
        fontWeight: '600',
        fontSize: '14px',
        width: '100%',
        marginBottom: '12px',
        color: 'white'
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
                }}
            >
                <div className="close-btn"
                    onClick={() => onClose()} // replace with your close handler
                >
                    ×
                </div>
            </div>
            <Modal.Body style={{ padding: '30px', borderRadius: '20px' }}>
                <div className="text-center mb-4">
                    <h5 style={{ fontWeight: 'bold', color: '#000429' }}>Add Matter</h5>
                    <p style={{ fontSize: '13px', color: '#6c757d' }}>
                        Lorem Ipsum has been the industry's standard dummy
                    </p>
                </div>

                <Form onSubmit={handleSubmit} style={{ marginRight: '30px', marginLeft: '30px' }}>
                    <Form.Group style={{ marginBottom: '20px', }}>
                        <Form.Select
                            name="client"
                            value={formData.client}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                            onFocus={(e) => {
                                e.target.style.border = '1.5px solid #6f95fc'; // maintain same border on focus
                                e.target.style.boxShadow = 'none';
                            }}
                            onBlur={(e) => {
                                e.target.style.border = '1.5px solid #000'; // reset on blur just in case
                                e.target.style.boxShadow = 'none';
                            }}
                        >
                            <option value="" disabled selected style={{color:'#000429'}}> Client</option>
                            <option value="Client A">Client A</option>
                            <option value="Client B">Client B</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group style={{ marginBottom: '20px', position: 'relative', }}>
                        <label
                            htmlFor="matterName"
                            style={labelStyle}
                        >
                            Matter Name
                        </label>
                        <Form.Control
                            id="matterName"
                            type="text"
                            placeholder="Enter Matter Name"
                            name="matterName"
                            value={formData.matterName}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                            onFocus={(e) => {
                                e.target.style.border = '1.5px solid #6f95fc'; // maintain same border on focus
                                e.target.style.boxShadow = 'none';
                            }}
                            onBlur={(e) => {
                                e.target.style.border = '1.5px solid #000'; // reset on blur just in case
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </Form.Group>


                    <Row>
                        <Col>
                            <Form.Group style={{ marginBottom: '20px', position: 'relative', }}>
                                <label
                                    htmlFor="openDate"
                                    style={labelStyle}>
                                    Open Date
                                </label>
                                <Form.Control
                                    type="date"
                                    name="openDate"
                                    value={formData.openDate}
                                    onChange={handleChange}
                                    required
                                    style={inputStyle}
                                    onFocus={(e) => {
                                        e.target.style.border = '1.5px solid #6f95fc'; // maintain same border on focus
                                        e.target.style.boxShadow = 'none';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.border = '1.5px solid #000'; // reset on blur just in case
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group style={{ marginBottom: '20px', position: 'relative', }}>
                                <label
                                    htmlFor="closeDate"
                                    style={labelStyle}>
                                    Close Date
                                </label>
                                <Form.Control
                                    type="date"
                                    name="closeDate"
                                    value={formData.closeDate}
                                    onChange={handleChange}
                                    required
                                    style={inputStyle}
                                    onFocus={(e) => {
                                        e.target.style.border = '1.5px solid #6f95fc'; // maintain same border on focus
                                        e.target.style.boxShadow = 'none';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.border = '1.5px solid #000'; // reset on blur just in case
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group style={{ marginBottom: '20px', position: 'relative', }}>
                        <label
                            htmlFor="description"
                            style={labelStyle}>
                            Description
                        </label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            name="description"
                            placeholder="Enter Description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            style={{ ...inputStyle, resize: 'none' }}
                            onFocus={(e) => {
                                e.target.style.border = '1.5px solid #6f95fc'; // maintain same border on focus
                                e.target.style.boxShadow = 'none';
                            }}
                            onBlur={(e) => {
                                e.target.style.border = '1.5px solid #000'; // reset on blur just in case
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </Form.Group>

                    <Form.Group style={{ marginBottom: '20px', position: 'relative', }}>
                        <label
                            htmlFor="status"
                            style={labelStyle}>
                            Case Date

                        </label>
                        <Form.Control
                            type="date"
                            name="caseDate"
                            placeholder="Enter Case Date"
                            value={formData.caseDate}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                            onFocus={(e) => {
                                e.target.style.border = '1.5px solid #6f95fc'; // maintain same border on focus
                                e.target.style.boxShadow = 'none';
                            }}
                            onBlur={(e) => {
                                e.target.style.border = '1.5px solid #000'; // reset on blur just in case
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </Form.Group>

                    <Button type="submit" style={buttonStyle}>
                        Add
                    </Button>
                    <Button type="button" onClick={handleSaveAndNext} style={buttonStyle}>
                        Save & Create Next Matter
                    </Button>
                </Form>
            </Modal.Body>
        </Modal >
    );
};

export default AddMatterModal;
