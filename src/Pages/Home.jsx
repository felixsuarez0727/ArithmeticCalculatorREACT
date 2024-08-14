import React from 'react';

const Home = () => {
  return (
    <div className='container'>
        <div className='row' style={{ height: '100vh' }}>
          <div className='col d-flex justify-content-center align-items-center flex-column'>

              {
                localStorage.getItem('token') ? (<h4>You are signed in! Enjoy the Calculator</h4>) : 
                (
                  <>
                    <h1>Welcome to the Calculator</h1>
                    <h1>Click here to login</h1>
                    <a href='/login' className='btn btn-success btn-primary mt-3'>Login</a>     
                  </>           
                )                 
              }

            
          </div>
        </div>
      </div>
  );
};

export default Home;