import './Login.css';

import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import { fetchLogin } from '../../features/login';
import { useNavigate } from 'react-router-dom';
import { useSelector, useStore } from 'react-redux';
import { selectLogin } from '../../utils/selectors';
import { useEffect } from 'react';

function Login() {
    const navigate = useNavigate();
    const store = useStore();
    const login = useSelector(selectLogin);

    async function onClickSignInButton(e) {
        e.preventDefault();
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const usernameValue = usernameInput.value;
        const passwordValue = passwordInput.value;
        await fetchLogin(store, usernameValue, passwordValue);
    }

    useEffect(() => {
        if (login.status === 'resolved') {
            navigate("/");
        } else if (login.status === 'rejected') {
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
        }
    }, [login, navigate]);

    return (
        <>
            <NavBar />
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form>
                        <div className="input-wrapper">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                style={login.status === 'rejected' ? { border: "2px solid red" } : {}}
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                style={login.status === 'rejected' ? { border: "2px solid red" } : {}}
                            />
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        {login.status === 'rejected' ? 
                        (<div className="error-message">
                            <span className="error-message-text">Wrong username and/or password</span>
                        </div>) : null}
                        <button className="sign-in-button" onClick={onClickSignInButton}>Sign In</button>
                    </form>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Login;