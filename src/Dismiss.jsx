import dismiss from './assets/dismiss.png';
import './Resolve_.css';

function Dismiss ({onClose, dismissed, refreshList}) {
    const handleCancel = () => {
        onClose();
    };

    const handleDismiss = async(e) => {
            const API_URL = import.meta.env.VITE_API_URL;
        try{
            const res = await fetch(`${API_URL}/dismiss.php`, {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                credentials: "include",
                body: JSON.stringify({
                    id: dismissed.id,
                    status: "escalated"
                })
            });

            const data = await res.json();
            alert(data.message);

            if(data.success){
                refreshList();
                onClose();
            }
        }catch(err){
            console.error(err);
            alert("Failed to dismiss the complaint")
        }
    }

    const downloadCertAction = async () =>{
            const API_URL = import.meta.env.VITE_API_URL;
        try{
            const res = await fetch(`${API_URL}/generatefileaction.php`, {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    id: dismissed.id,
                    complainant_name: dismissed.fullname,
                    respondent_name: dismissed.respondent_name,
                    subject: dismissed.subject
                })
            });

            const pdf = await res.blob();
            const url = window.URL.createObjectURL(pdf);

            window.open(url, '_blank');

            const a = document.createElement("a");
            a.href = url;
            a.download = "Summon_Letter.pdf";
            a.Click();

            window.URL.revokeObjectURL(url);
        }catch(err){
            console.error("Error generating summon letter", err)
        }
    };

    return (
        <div className =  "resolve-page">    
            <div className ="resolve-container">
                <div className = "resolve-header-dismiss">
                    <div className = "first-row-header">    
                        <img src = {dismiss} className ="Dismiss"/>
                        <h1 className  = "h1-resolve-header"> Dismiss Complaint?</h1>
                    </div>
                </div>
                <div className = "resolve-body">
                    <h2 className = "h2-dismiss-header">Are you sure you want to file an action to higher authority for this case?</h2>
                </div>

                <div className = "resolve-footer-dismiss">
                    <button className = "b1-resolve" onClick={handleCancel}>Cancel</button>
                    <button className = "b2-resolve"onClick={() => {
                        handleDismiss(dismissed.id);
                        downloadCertAction(dismissed)
                    }}>
                        File Action
                        </button>
                </div>
            </div>
        </div>
    );
}

export default Dismiss