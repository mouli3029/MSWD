import React from 'react';

const Notification = ({errorMessage}) => {
    return(
        <>
        {errorMessage && 
          <div className="success">
              {errorMessage}
          </div>
        }
        </>
    )
}