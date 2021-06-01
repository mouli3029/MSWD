import React from 'react';

const Notification = ({message,errMess}) => {
    console.log(errMess)
    return(
        <>
        {message && 
          <div className="success">
              {message}
          </div>
        }
        {errMess && 
          <div className="error">
              {errMess}
          </div>
        }

        </>
    )
}

export default Notification;