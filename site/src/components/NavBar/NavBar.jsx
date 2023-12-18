import './NavBar.css'

import argentBankLogo from '../../assets/img/argentBankLogo.png';

import { useStore, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchProfil } from '../../features/profil';
import { selectProfil } from '../../utils/selectors';

function NavBar() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const store = useStore();
    const profil = useSelector(selectProfil);
    const navigate = useNavigate();

    function logoutButtonOnClick() {
        localStorage.removeItem('token');
        setToken(localStorage.getItem('token'));
        navigate("/");
    }

    useEffect(() => {
        if (token !== null) {
            fetchProfil(store, token);
        }
    }, [store, token]);

    return (
        <nav className="main-nav">
            <a className="main-nav-logo" href="/">
                <img
                    className="main-nav-logo-image"
                    src={argentBankLogo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </a>
            <div>
                {profil.status === 'resolved' && token !== null ?
                    <>
                        <a className="main-nav-item" href="/user">
                            <i className="fa fa-user-circle"></i>
                            {profil.data.firstName + ' ' + profil.data.lastName}
                        </a>
                        <span className="main-nav-item"
                            onClick={logoutButtonOnClick}
                        >
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </span>
                    </>
                    :
                    <a className="main-nav-item" href="/login">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </a>
                }
            </div>
        </nav >
    );
}

export default NavBar;