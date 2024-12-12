// import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_NAME } from '../Constants';
import './Centered.css';

export default function Centered(props) {
    const { children } = props;
    return <div style={{ margin: "20px 30px" }}>
        <div className="flex-centered">
            <div style={{ textAlign: "center" }}>
                <h2><Link to="/">{SITE_NAME}</Link></h2>
                {children}
            </div>
        </div>
    </div>
}