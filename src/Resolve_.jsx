import resolve from './assets/resolve.png';
import './Resolve_.css';
import {useState, useEffect} from "react";
import Dismiss from './Dismiss.jsx';

function Resolve ({onClose, resolved, refreshList}) {

    const [complaintStatus, setComplaintStatus] = useState("");
    const [type, setType] = useState("");
    const [compliance, setCompliance] = useState("");
    const [amount, setAmount] = useState("");
    const [monetaryType, setMonetaryType] = useState("");
    const [paymentDate, setPaymentDate] = useState("");
    const [installmentDetail, setInstallmentDetail] = useState("");
    const [agreementDate, setAgreementDate] = useState("");
    // const [complianceDate, setComplianceDate] = useState("");
    const [itemDesc, setItemDesc] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [serviceDesc, setServiceDesc] = useState("");
    const [deadline, setDeadline] = useState("");
    const [apologyDate, setApologyDate] = useState("");
    const [moveoutDate, setMoveoutDate] = useState("");
    const [debtAmount, setDebtAmount] = useState("");
    const [paymentPlan, setPaymentPlan] = useState("");
    const [description, setDescription] = useState("");
    const [withdrawalDate, setWithdrawalDate] = useState("");
    const [issuanceDate, setIssuanceDate] = useState("");
    const [fileAction, setFileAction] = useState(null);
    const [agreementStatus, setAgreementStatus] = useState("");

    const today = new Date();
    const year = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const date = String(today.getDate()).padStart(2,"0");
    const minDate = resolved.date;
    const maxDate = `${year}-${mm}-${date}`;
    const maxCompliance = `${year}-12-31`;


    const isAgreement =
        type === "Amicable Settlement (Kasunduang Pag-aayos)" ||
        type === "Arbitration Award";

    useEffect(() => {
    if(type === ""){
        setAgreementStatus("");
    }else if(type === "Amicable Settlement (Kasunduang Pag-aayos)" || type === "Arbitration Award"){
        setAgreementStatus("pending compliance");
        setComplaintStatus("monitoring")
    }else if(type === "Withdrawal of Complaint"){
        setAgreementStatus("withdrawn");
        setComplaintStatus("resolved")
    }else{
        setAgreementStatus("file action issued");
    }
    }, [type]);


    const handleCancel = () => {
        onClose();
    };


    const handleSave = async(e) => {
        e.preventDefault();


        try{
            const res = await fetch("http://localhost/bicms_backend/resolution.php",{
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                credentials: "include",
                body: JSON.stringify({
                    complaint_id: resolved.id,
                    resolution_type: type,
                    agreement_date: agreementDate,
                    TaC: compliance,
                    monetary_amount: amount,
                    payment_type: monetaryType,
                    payment_date: paymentDate,
                    installment_sched: installmentDetail,
                    item_desc: itemDesc,
                    return_date: returnDate,
                    service_desc: serviceDesc,
                    deadline: deadline,
                    apology_date: apologyDate,
                    moveout_date: moveoutDate,
                    debt_amount: debtAmount,
                    payment_plan: paymentPlan,
                    others_desc: description,
                    withdrawal_date: withdrawalDate,
                    issuance_date: issuanceDate,
                    resolution_status: agreementStatus,
                    complaint_status: complaintStatus 
                })
            });


            const data = await res.json();
            alert(data.message);


            if(data.success){
                alert(data.message);
                setResolution("");
                refreshList();
                onClose();
            } else {
                 alert(data.message,);
            }


        }catch(err){
            console.error(err);
            alert("Failed to update resolution");
        }
    };

    if (fileAction) {
        return (
            <Dismiss 
                dismissed={fileAction}
                onClose={() => {
                    setFileAction(null)
                }} 
            />
        );
    }

    return (
        <div className =  "resolve-page">    
            <div className ="resolve-container1">
                <div className = "resolve-header">
                    <div className = "first-row-header">    
                        <img src = {resolve} />
                        <h1 className  = "h1-resolve-header"> Resolve Complaint</h1>
                    </div>
                    <p className = "p1-resolve-header">Provide details about how this complaint was resolved.</p>
                </div>

                <div className = "resolve-body">
                    <div className="cont">
                    <h2 className = "h2-resolve-headers">Type of Resolution</h2>
                    <select
                    className="resolve-select"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    >
                        <option value="" disabled>Choose One</option>
                        <option value="Amicable Settlement (Kasunduang Pag-aayos)">Amicable Settlement (Kasunduang Pag-aayos)</option>
                        <option value="Arbitration Award">Arbitration Award</option>
                        <option value="Withdrawal of Complaint">Withdrawal of Complaint</option>
                        <option value="Referral to Court/Proper Agency">Referral to Court/Proper Agency</option>
                    </select>
                    </div>

                    {isAgreement &&
                    <div className="dates">
                    <div className="keydates">
                        <h2 className = "h2-resolve-headers">Date of Agreement:</h2>
                            <input
                            className="paymentdate"
                            type = "date"
                            min={minDate}
                            max={maxDate}
                            value={agreementDate}
                            onChange={(e) => setAgreementDate(e.target.value)}
                            />
                    </div>
                    {/* <div className="keydates">
                        <h2 className = "h2-resolve-headers">Date of Compliance:</h2>
                            <input
                            className="paymentdate"
                            type = "date"
                            min={agreementDate}
                            max={maxCompliance}
                            value={complianceDate}
                            onChange={(e) => setComplianceDate(e.target.value)}
                            />
                    </div> */}
                    </div>
                    }

                {isAgreement && 
                <div className="cont">
                <h2 className = "h2-resolve-headers">Terms and Conditions of Compliance</h2>
                <select
                className="resolve-select"
                value={compliance}
                onChange={(e) => setCompliance(e.target.value)}
                >
                    <option value="" disabled>Choose One</option>
                    <option value="Monetary Claim Settlement">Monetary Claim Settlement</option>
                    <option value="Return/Restitution of Property">Return/Restitution of Property</option>
                    <option value="Performance of Service/Action">Performance of Service/Action</option>
                    <option value="Apology/Formal Reconciliation">Apology/Formal Reconciliation</option>
                    <option value="Agreement to Vacate Property">Agreement to Vacate Property</option>
                    <option value="Acknowledgement of Debt">Acknowledgement of Debt</option>
                    <option value="Others">Others</option>
                </select>
                </div>
                }

            
                {compliance === "Monetary Claim Settlement" &&
                <div className="cont1">
                    <h2 className = "h2-resolve-headers">Total Amount</h2>
                    <input
                    className="amount"
                    type="text"
                    step="0.01"
                    placeholder="Follow the format (0.00) and don't use comma"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    />
                    <div className="type-payment">
                    <h2 className = "h2-resolve-headers">Type of Payment:</h2>
                    <div className="radio-group">
                    <div className="radio-option">
                    <label className="type">
                    <input
                    type = "radio"
                    className = "type_resolve"
                    name ="type"
                    value="Full Payment"
                    onChange={(e) => setMonetaryType(e.target.value)}
                    />
               
                   Full Payment</label>
                    </div>
                    <div className="radio-option">
                     <label className="type">
                    <input
                    type = "radio"
                    className = "type_resolve"
                    name ="type"
                    value="Partial Payment"
                    onChange={(e) => setMonetaryType(e.target.value)}
                    />
                   Partial Payment</label>
                    </div>
                    </div>
                    </div>
                    {monetaryType === "Full Payment" &&
                    <div className="fullpayment">
                     <h2 className = "h2-resolve-headers">Payment Date</h2>
                     <input
                     className="paymentdate"
                     type = "date"
                     value={paymentDate}
                     min={agreementDate}
                     max={maxCompliance}
                     onChange={(e) => setPaymentDate(e.target.value)}
                     />
                    </div>
                     }
                    {monetaryType === "Partial Payment" &&
                    <div className="partialpayment">
                    <h2 className = "h2-resolve-headers">Installment Schedule</h2>
                    <textarea
                    className="installment"
                    rows = "3"
                    cols ="40"
                    placeholder = "Please detail the installment schedule as well as the amount"
                    value={installmentDetail}
                    onChange={(e) => setInstallmentDetail(e.target.value)}
                    />
                    </div>
                    }
                </div>
                }
            </div>
                {compliance === "Return/Restitution of Property" &&
                    <div className="return">
                        <div className="cont">
                            <h2 className = "h2-resolve-headers">Item Description</h2>
                            <textarea
                                className="desc"
                                rows = "3"
                                cols ="50"
                                placeholder = "Describe the item"
                                value={itemDesc}
                                onChange={(e) => setItemDesc(e.target.value)}
                            />
                        </div>
                        <div className="cont">
                            <h2 className = "h2-resolve-headers">Return Date</h2>
                            <input
                                className="returndate"
                                type = "date"
                                value={returnDate}
                                min={agreementDate}
                                max={maxCompliance}
                                onChange={(e) => setReturnDate(e.target.value)}
                            />
                        </div>
                    </div>
                }

                {compliance === "Performance of Service/Action" &&
                 <div className="service">
                        <div className="cont">
                            <h2 className = "h2-resolve-headers">Description of service</h2>
                            <textarea
                                className="desc"
                                rows = "3"
                                cols ="50"
                                placeholder = "Describe the service to be done"
                                value={serviceDesc}
                                onChange={(e) => setServiceDesc(e.target.value)}
                            />
                        </div>
                        <div className="cont">
                            <h2 className = "h2-resolve-headers">Deadline</h2>
                            <input
                                className="deadline"
                                type = "date"
                                value={deadline}
                                min={agreementDate}
                                max={maxCompliance}
                                onChange={(e) => setDeadline(e.target.value)}
                            />
                        </div>
                    </div>
                }

                {compliance === "Apology/Formal Reconciliation" &&
                <div classname="apology">
                    <div className="cont">
                            <h2 className = "h2-resolve-headers">Date of Apology</h2>
                            <input
                                className="deadline"
                                type = "date"
                                value={apologyDate}
                                min={agreementDate}
                                max={maxCompliance}
                                onChange={(e) => setApologyDate(e.target.value)}
                            />
                        </div>
                </div>
                }

                {compliance === "Agreement to Vacate Property" &&
                <div classname="move-out">
                    <div className="cont">
                            <h2 className = "h2-resolve-headers">Move-out Date</h2>
                            <input
                                className="deadline"
                                type = "date"
                                value={moveoutDate}
                                min={agreementDate}
                                max={maxCompliance}
                                onChange={(e) => setMoveoutDate(e.target.value)}
                            />
                        </div>
                </div>
                }

                {compliance === "Acknowledgement of Debt" &&
                <div className="debt">
                    <div className="cont">
                         <h2 className = "h2-resolve-headers">Total Debt Amount</h2>
                            <input
                                className="amount"
                                step="0.01"
                                type="text"
                                placeholder="Follow the format (0.00) and don't use comma"
                                value={debtAmount}
                                onChange={(e) => setDebtAmount(e.target.value)}
                            />
                    </div>
                    <div className="cont">
                        <h2 className = "h2-resolve-headers">Payment Plan</h2>
                            <textarea
                                className="desc"
                                rows = "3"
                                cols ="50"
                                placeholder = "Please detail the payment schedule as well as the amount"
                                value={paymentPlan}
                                onChange={(e) => setPaymentPlan(e.target.value)}
                            />
                    </div>
                </div>
                }

                {compliance === "Others" &&
                <div className="others">
                    <div className="cont">
                        <h2 className = "h2-resolve-headers">Description</h2>
                            <textarea
                                className="desc"
                                rows = "3"
                                cols ="50"
                                placeholder = "Describe the terms and conditions of compliance"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                    </div>
                </div>
                }

                {type === "Withdrawal of Complaint" &&
                <div className="withdrawal">
                    <div className="cont">
                         <h2 className = "h2-resolve-headers">Date of Withdrawal</h2>
                            <input
                                className="deadline"
                                type = "date"
                                value={withdrawalDate}
                                min={minDate}
                                max={maxDate}
                                onChange={(e) => setWithdrawalDate(e.target.value)}
                            />
                    </div>
                </div>
                }

                {type === "Referral to Court/Proper Agency" &&
                <div className="referral">
                    <div className="cont">
                         <h2 className = "h2-resolve-headers">Date of Issuance</h2>
                            <input
                                className="deadline"
                                type = "date"
                                value={issuanceDate}
                                min={minDate}
                                max={maxDate}
                                onChange={(e) => setIssuanceDate(e.target.value)}
                            />
                    </div>
                    <div className="cont">
                        <h2 className = "h2-resolve-headers">Would you like a certificate to file action?</h2>
                        <button className="fileaction" onClick={() => setFileAction(resolved)}>Generate Certificate to File Action</button>
                    </div>
                </div>
                }

                    {/* <h2 className = "h2-resolve-header">Resolution Details</h2>
                    <textarea rows="5" cols = "40" placeholder="Describe how the complaint was resolved." />
                </div> */}

                <div className = "resolve-footer1">
                    <button className = "b1-resolve" onClick={handleCancel}>Cancel</button>
                    <button className = "b2-resolve">Mark as Resolved</button>
                </div>
            </div>

            
        </div>
    );
}

export default Resolve