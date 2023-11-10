import './SignIn.css';

import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';

function SignIn() {
    return (
        <>
            <NavBar />
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form>
                        <div className="input-wrapper">
                            <label for="username">Username</label
                            ><input type="text" id="username" />
                        </div>
                        <div className="input-wrapper">
                            <label for="password">Password</label
                            ><input type="password" id="password" />
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" /><label for="remember-me">Remember me</label>
                        </div>
                        <a href="./user.html" className="sign-in-button">Sign In</a>

                    </form>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default SignIn;