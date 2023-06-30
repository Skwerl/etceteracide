// import React from 'react';
import { Link } from 'react-router-dom';

export default function Main(props) {
    const { children } = props;
    return <div style={{ margin: "20px 30px" }}>
        <h1><Link to="/">E T C E T E R A C I D E</Link></h1>
        {children}
    </div>
}