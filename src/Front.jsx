import {Link} from "react-router-dom"
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
        {id: 2, name: "Yolanda S. Tangi", role: "Kagawad", img: officialsPic},
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
                    <Link to="/login">
                    <button className="bp1"><b>Get Started     →</b></button>
                    </Link>
                </div>
            </div>
            <div className="container">
                    <div className="officials">
                        <h1 className="offtitle">Barangay Officials</h1>
                    </div>
                    <div className="cards">
                        {officials.map((person) => (
                            <div className="card" key={person.id}>
                                <img className="pic" src={person.img} alt={person.role}></img>
                                <div className="identity">
                                    <p>{person.name}</p>
                                    <p className="role"><b>{person.role}</b></p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cards">
                        {officialsTwo.map((user) => (
                            <div className="card" key={user.id}>
                                <img className="pic" src={user.img} alt={user.role}></img>
                                <div className="identity">
                                    <p>{user.name}</p>
                                    <p className="role"><b>{user.role}</b></p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="space"></div>
            </div>
        </>
    );
}
export default Front