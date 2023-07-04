import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from '../Components/Spinner';
import { LOGOUT_TIMER } from '../Constants';
import './Main.css';

export default function Main(props) {

    const { children, auth } = props;
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

    return <React.Fragment>
        <div style={{ margin: "20px 30px" }}>
            <h1><Link to="/">E T C E T E R A C I D E</Link></h1>
            {(!auth || loggedIn)
                ? children
                : <Spinner />
            }
        </div>
    </React.Fragment>

}