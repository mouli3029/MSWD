import React from 'react';

const Notification = ({message}) => {
    return(
        <>
        {message && 
          <div className="success">
              {message}
          </div>
        }
        </>
    )
}

export default Notification;