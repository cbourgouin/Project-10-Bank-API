import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { useDispatch, useSelector, useStore } from "react-redux";
import "./User.css";
import { selectProfil, selectUserPage } from "../../utils/selectors";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfil } from "../../features/profil";
import { formVisibleToggle } from "../../features/userPage";

function User() {
    const profil = useSelector(selectProfil);
    const userPageState = useSelector(selectUserPage)
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const store = useStore();

    async function onClickSaveButton(e) {
        e.preventDefault();
        const firstNameInput = document.getElementById("firstName");
        const lastNameInput = document.getElementById("lastName");
        const firstName = firstNameInput.value;
        const lastName = lastNameInput.value;
        await updateProfil(store, token, firstName, lastName);

    }

    useEffect(() => {
        if (profil.status === "resolved") {
            dispatch(formVisibleToggle());
        }
    }, [profil, dispatch]);

    useEffect(() => {
        if (token === null || token === undefined) {
            navigate("/")
        }
    }, [token, navigate]);

    return <>
        <NavBar />
        <main className="main bg-dark">
            {userPageState.formVisible === false ? (
                <div className="header header__form">
                    <h1>Welcome back</h1>
                    <form>
                        <div>
                            <input type="text" name="firstName" id="firstName" placeholder={profil.status === "resolved" ? profil.data.firstName : ""}></input>
                            <input type="text" name="lastName" id="lastName" placeholder={profil.status === "resolved" ? profil.data.lastName : ""}></input>
                        </div>
                        <div>
                            <button className="save-button" onClick={onClickSaveButton}>Save</button>
                            <button className="cancel-button" onClick={() => dispatch(formVisibleToggle())}>Cancel</button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="header">
                    <h1>Welcome back<br />{profil.status === "resolved" ? profil.data.firstName + " " + profil.data.lastName : ""}!</h1>
                    <button className="edit-button" onClick={() => dispatch(formVisibleToggle())}>Edit Name</button>
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