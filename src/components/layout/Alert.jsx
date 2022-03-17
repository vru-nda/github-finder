import React from 'react';

const Alert = ({ alert }) => {
  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i className='fa fa-info-circle'></i>
        {alert.msg}
      </div>
    )
  );
};

export default Alert;
