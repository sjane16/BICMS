import officialsPic from './assets/chairman.jpg'

function Front(){
    const officials = [
        {id: 1, name: "Edgardo A. Bornales", role: "Chairman", img: officialsPic},
        {id: 2, name: "Manilyn R. Malonzo", role: "Secretary", img: officialsPic},
        {id: 3, name: "Amalia V. Guina", role: "Treasurer", img: officialsPic},
        {id: 4, name: "Conrad S. Jacinto", role: "Kagawad", img: officialsPic},
        {id: 5, name: "Pedro S. Maddatu", role: "Kagawad", img: officialsPic},
    ];

    const officialsTwo = [
        {id: 1, name: "Anthony O. Sera Jose", role: "Kagawad", img: officialsPic},
        {id: 2, name: "Yolanda Purisima S. Tangi", role: "Kagawad", img: officialsPic},
        {id: 3, name: "Gilbert D.C. Caballero", role: "Kagawad", img: officialsPic},
        {id: 4, name: "Michael C. Sera Jose", role: "Kagawad", img: officialsPic},
        {id: 5, name: "Dorida B. Zape", role: "Kagawad", img: officialsPic}
    ];

    return(
        <>
         <div className = "front">
                <h1 className="main"><b>Streamline Your Barangay Operations</b></h1>
                <p className="desc">Efficiently manage complaints, issue certificates, and generate reports for your barangay</p>
                <div className="bpage">
                    <button className="bp1"><b>Get Started     →</b></button>
                </div>
            </div>
            <div className="container">
                    <div className="officials">
                        <h1 className="offtitle">Barangay Officials</h1>
                    </div>
                    <div className="cards">
        
                    </div>
            </div>
        </>
    );
}
export default Front