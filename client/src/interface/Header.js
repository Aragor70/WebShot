import React from 'react';




const Header = ({ alert }) => {



    return (
        <div className="header-content">
            <p>WebShot</p>
            <p className="error-params" style={alert.alertType === 'danger' ? { color: 'red' } : { color: 'green' }}>{alert.message}</p>
        </div>
    );
}
export default Header;