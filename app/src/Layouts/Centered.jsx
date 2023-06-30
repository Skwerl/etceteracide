// import React from 'react';
import { Link } from 'react-router-dom';
import './Centered.css';

export default function Centered(props) {
    const { children } = props;
    return <div style={{ margin: "20px 30px" }}>
        <div className="flex-centered">
            <div style={{ textAlign: "center" }}>
                <h2><Link to="/">E T C E T E R A C I D E</Link></h2>
                {children}
            </div>
        </div>
    </div>
}