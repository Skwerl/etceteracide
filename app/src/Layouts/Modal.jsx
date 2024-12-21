import React from 'react';
import './Modal.css';

export default function Modal(props) {

    const { children } = props;

    return <React.Fragment>
        <div className="modal-wrapper fade-in-faster">
            {children}
        </div>
    </React.Fragment>

}