import {Link} from "react-router-dom"
import officialsPic from './assets/officials.jpg'
import Chairman from './assets/c.png'
import Secretary from './assets/s.png'
import Treasurer from './assets/t.png'
import Kagawad1 from './assets/kagjacinto.png'
import Kagawad2 from './assets/kagmaddatu.png'
import Kagawad3 from './assets/kagtoni.png'
import Kagawad4 from './assets/kagoly.png'
import Kagawad5 from './assets/kagcaballero.png'
import Kagawad6 from './assets/kagmichael.png'
import Kagawad7 from './assets/kagzafe.png'

function Front(){
    const officials = [
        {id: 1, name: "Edgardo A. Bornales", role: "Chairman", img: Chairman},
        {id: 2, name: "Manilyn R. Malonzo", role: "Secretary", img: Secretary},
        {id: 3, name: "Amalia V. Guina", role: "Treasurer", img: Treasurer},
        {id: 4, name: "Conrad S. Jacinto", role: "Kagawad", img: Kagawad1},
        {id: 5, name: "Pedro S. Maddatu", role: "Kagawad", img: Kagawad2},
    ];

    const officialsTwo = [
        {id: 1, name: "Anthony O. Sera Jose", role: "Kagawad", img: Kagawad3},
        {id: 2, name: "Yolanda S. Tangi", role: "Kagawad", img: Kagawad4},
        {id: 3, name: "Gilbert D.C. Caballero", role: "Kagawad", img: Kagawad5},
        {id: 4, name: "Michael C. Sera Jose", role: "Kagawad", img: Kagawad6},
        {id: 5, name: "Dorida B. Zape", role: "Kagawad", img: Kagawad7}
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