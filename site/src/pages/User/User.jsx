import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { useSelector, useStore } from "react-redux";
import "./User.css";
import { selectProfil } from "../../utils/selectors";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfil } from "../../features/profil";

function User() {
    let profil = useSelector(selectProfil);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const store = useStore();
    const [toogleForm, setToggleForm] = useState(false);

    async function onClickSaveButton() {
        const firstNameInput = document.getElementById("firstName");
        const lastNameInput = document.getElementById("lastName");
        const firstName = firstNameInput.value;
        const lastName = lastNameInput.value;
        await updateProfil(store, token, firstName, lastName);
        
    }

    useEffect(() => {
        if(profil.status === "resolved") {
            setToggleForm(false);
        }
    }, [profil]);

    useEffect(() => {
        if (token === null || token === undefined) {
            navigate("/")
        }
    }, [token]);

    return <>
        <NavBar />
        <main className="main bg-dark">
            {toogleForm === true ? (
                <div className="header header__form">
                    <h1>Welcome back</h1>
                    <form>
                        <div>
                            <input type="text" name="firstName" id="firstName" placeholder={profil.status === "resolved" ? profil.data.firstName : ""}></input>
                            <input type="text" name="lastName" id="lastName" placeholder={profil.status === "resolved" ? profil.data.lastName : ""}></input>
                        </div>
                        <div>
                            <button className="save-button" onClick={onClickSaveButton}>Save</button>
                            <button className="cancel-button" onClick={() => setToggleForm(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="header">
                    <h1>Welcome back<br />{profil.status === "resolved" ? profil.data.firstName + " " + profil.data.lastName : ""}!</h1>
                    <button className="edit-button" onClick={() => setToggleForm(true)}>Edit Name</button>
                </div>
            )
            }
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">Current Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
        </main>
        <Footer />
    </>
}

export default User;