import dismiss from './assets/dismiss.png';
import './Resolve_.css'; 

function Dlreportcert({ onClose }) {
    const handleCancel = () => {
        onClose();
    };

    const downloadCertReport = async () => {
            const API_URL = import.meta.env.VITE_API_URL;
        try {
            const res = await fetch(`${API_URL}/generatecertreport.php`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            });

            const pdf = await res.blob();
            const url = window.URL.createObjectURL(pdf);

            window.open(url, '_blank');

            const a = document.createElement("a");
            a.href = url;
            a.download = "Certificate_Reports.pdf";
            a.click();

            window.URL.revokeObjectURL(url);
            onClose();
        } catch (err) {
            console.error("Error generating complaints report", err)
        }
    };

    return (
        <div className="DLReport-page">
            <div className="DLReport-container">
                <div className="DLReport-header-dismiss">
                    <div className="first-row-header">
                        <img src={dismiss} className="Dismiss" />
                        <h1 className="h1-DLReport-header"> Download Certificates Report?</h1>
                    </div>
                </div>
                <div className="DLReport-body">
                    <h2 className="h2-dismiss-header">Do you want to generate a file for certificates report?</h2>
                </div>

                <div className="DLReport-footer-dismiss">
                    <button className="b1-DLReport" onClick={handleCancel}>No</button>
                    <button className="b2-DLReport" onClick={() => {
                        downloadCertReport()
                    }}>
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Dlreportcert;
