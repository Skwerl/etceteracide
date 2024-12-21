import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from '../Components/Spinner';
import { SITE_NAME, LOGOUT_TIMER } from '../Constants';
import './Main.css';

export default function Main(props) {

    const { children, auth, pagetitle = "" } = props;
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const { token, sessionId } = useSelector((state) => state.tokenReducer);

    useEffect(() => {
        const timer = setTimeout(() => { if (!!auth && !!!token) navigate("/login"); }, LOGOUT_TIMER);
        return () => clearTimeout(timer);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (!!token && !!sessionId) setLoggedIn(true);
    }, [token, sessionId]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        document.title = (!!pagetitle ? (pagetitle.toUpperCase() + " . ETCX") : SITE_NAME);
    }, [pagetitle]);

    return <React.Fragment>
        <div className="main-wrapper">
            <div className="main-header">
                <h1><Link to="/">{SITE_NAME}</Link></h1>
            </div>
            {(!auth || loggedIn)
                ? children
                : <Spinner />
            }
        </div>
    </React.Fragment>

}