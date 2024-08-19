import React from 'react';
import './AddressDisplay.modules.css';

const AddressDisplay = ({ type, address, onDelete }) => {
    return (
        <div className='addressDisplay'>
            <div className='addressInfo'>
                <p><strong>{type} Address:</strong> {address}</p>
            </div>
            <button onClick={onDelete} className='deleteButton'>
                Delete
            </button>
        </div>
    );
};

export default AddressDisplay;
