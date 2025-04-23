import React from 'react';
import { Dropdown } from 'react-bootstrap';
import CsvDownloader from 'react-csv-downloader';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ReportDownloadDropdown = ({ name, data }) => {
    const handleDownloadReport = (type) => {
        if (!data || data?.length === 0) return;
        if (type === 'pdf') {
            const doc = new jsPDF();

            const columns = Object.keys(data[0]);
            const rows = data.map((row) => columns.map((col) => row[col]));

            doc.text('Report', 14, 16);

            // ✅ Use autoTable as a function
            autoTable(doc, {
                head: [columns],
                body: rows,
                startY: 20,
            });

            doc.save('report.pdf');
        } else if (type === 'excel') {
            const content = Object.keys(data[0]).join(',') + '\n' +
                data.map(row => Object.values(row).join(',')).join('\n');
            const blob = new Blob([content], { type: 'application/vnd.ms-excel' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'report.xls';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const columns = data && data.length
        ? Object.keys(data[0]).map((key) => ({
            id: key,
            displayName: key,
        }))
        : [];

    return (
        <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic" className="cmn-btn">
                <img src="./images/download-icon.svg" alt="" /> {name}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleDownloadReport('pdf')}>
                    Download in PDF
                </Dropdown.Item>

                <Dropdown.Item as="div" >
                    <CsvDownloader
                        filename="report"
                        extension=".csv"
                        columns={columns}
                        datas={data}
                    >
                        <span style={{ cursor: 'pointer', display: 'block' }}>
                            Download in Excel
                        </span>
                    </CsvDownloader>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ReportDownloadDropdown;
