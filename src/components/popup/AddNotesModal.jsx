import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddNotesModal = ({ show, handleClose, handleAddNote }) => {
    const [noteText, setNoteText] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault(); 
        // alert(`Hello ${noteText}`); 
        console.log(noteText);
        if (noteText.trim()) {
            handleAddNote(noteText);
            setNoteText("");
            handleClose();
        }
    };

    const inputStyle = {
        padding: '10px 12px',
        border: '1px solid #000429',
        borderRadius: '14px',
        fontSize: '12px',
        color: '#0b0c2a',
        outline: 'none',
        height: '45px',
        cursor: 'pointer',
        width: '100%',
        backgroundColor: 'white',
        boxShadow: 'none'
    };
    return (
        <Modal show={show} onHide={handleClose} centered size="md" className="add-notes" style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(5px)',
            zIndex:'1000000000'
        }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    borderRadius: "10px",
                    maxWidth: "100%",
                }}
            >
                <div
                    className="close-btn"
                    onClick={handleClose} 
                    style={{
                        alignSelf: "flex-end", 
                        cursor: "pointer",
                        fontSize: "20px",
                    }}
                >
                    ×
                </div>
            </div>

            <div style={{
                padding: '10px',
                margin: '10px ',
            }}>
                <Modal.Body>
                    <div className="text-center mb-4 text-white p-4">
                        <h5 style={{ color: '#2d2f54', fontSize: '28px' }}>Add Notes</h5>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="noteInput" style={{
                            padding: '15px',
                            borderRadius: '10px',
                            padding: '15px',
                            borderRadius: '10px',
                        }}>
                            <Form.Label style={{ color: 'black' }}>Add Notes</Form.Label>
                            <Form.Control type="text" placeholder="Add" required value={noteText}
                                onChange={(e) => setNoteText(e.target.value)} style={inputStyle}
                            />
                        </Form.Group>

                        <div className="dsbdy-frm-btn-grp mt-4 d-flex justify-content-Center">
                            <Button type="submit" className="cmn-btn-2 blue-bg">
                                Add
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </div>
        </Modal>
    );
};

export default AddNotesModal;
