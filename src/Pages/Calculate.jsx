import React, { useState } from 'react';
import axios from 'axios';
 


const Calculate = () => {
  const apiurl=import.meta.env.VITE_BACKEND_API;
  
  if (!apiurl) {
    console.error("API URL is not defined! Please check your .env file.");
  }
  
  const [randomString, setRandomString] = useState('');
  const [squareRoot, setSquareRoot] = useState('');
  const [numberRoot, setNumberRoot] = useState('');

  const [number_a, setNumberA] = useState('');
  const [number_b, setNumberB] = useState('');

  const [operationResponseField, setoperationResponseField] = useState('');

  const validateNumber = (value) => {
    return !isNaN(value) && value.trim() !== '';
  };

  const handleOperation = async (op) =>{
    try {
      
      if (!validateNumber(number_a) ) {
        setoperationResponseField('Number A must be a valid number.');       
        return;
      }

      if (!validateNumber(number_b) ) {
        setoperationResponseField('Number B must be a valid number.');       
        return;
      }
      
      const response = await axios.post(
        apiurl+op,
        { num_a: number_a, num_b : number_b, operation : op },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      // Manejar la respuesta exitosa
      if (response.status === 200) {
        setoperationResponseField(op+': '+response.data.data); // Ajustar según el formato de la respuesta
         
      } else {
        // Manejar casos de otros códigos de estado si es necesario
        setoperationResponseField(op+': '+'Unexpected response status');
      }
    } catch (error) {
      // Manejar errores de la solicitud
      if (error.response && error.response.status === 400) {
        // Mostrar el mensaje de error del backend
        setoperationResponseField(op+': '+error.response.data.detail || 'Error occurred');
      } else {
        // Manejar otros errores
        setoperationResponseField(op+': '+'Request failed');
      }
      console.error(op+': '+'Request failed:', error);
    }
  };

  const handleSquareRoot = async () => {
    try {
      if (!validateNumber(numberRoot)) {
        setSquareRoot('Number field must be a valid number.');
        return;
      }


      const response = await axios.post(
        apiurl+'square_root',
        { number: numberRoot },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      // Manejar la respuesta exitosa
      if (response.status === 200) {
        setSquareRoot(response.data.data); // Ajustar según el formato de la respuesta
         
      } else {
        // Manejar casos de otros códigos de estado si es necesario
        setSquareRoot('Unexpected response status');
      }
    } catch (error) {
      // Manejar errores de la solicitud
      if (error.response && error.response.status === 400) {
        // Mostrar el mensaje de error del backend
        setSquareRoot(error.response.data.detail || 'Error occurred');
      } else {
        // Manejar otros errores
        setSquareRoot('Request failed');
      }
      console.error('Request failed:', error);
    }
  };

  const handleRandomString = async () => {
    
    try {
      const response = await axios.get( apiurl + 'random_string', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200) {
        setRandomString(response.data.data);
      } else {
        setRandomString(response.data.message);
      }
    } catch (error) {
      setRandomString(error);
      console.error('Request failed:', error);
    }
  }

  return (
    <div className="container">
      <div>
        <h1>Calculator Functions</h1>

        <hr></hr>
        <h1>Common Arithmetic:</h1>
        <div className="form-group">
                <label htmlFor="number_a">Number A</label>
                <input
                  className="form-control"
                  id="number_a"
                  type="number"
                  placeholder="0" 
                            
                  onChange={(e) => setNumberA(e.target.value)}
                />
              </div>
        <div className="form-group">
            <label htmlFor="number_b">Number B</label>
              <input
                className="form-control"
                id="number_b"
                type="number"
                
                placeholder="0"              
                onChange={(e) => setNumberB(e.target.value)}
              />
            </div>
             
        <button   onClick={() =>handleOperation('addition')} className='btn btn-success btn-primary mt-3 gap'>
          Sum
        </button>

        <button onClick={() =>handleOperation('subtraction')} className='btn btn-success btn-primary mt-3 gap'>
          Subtraction
        </button>

        <button onClick={() =>handleOperation('multiplication')} className='btn btn-success btn-primary mt-3 gap'>
          Multiplication
        </button>

        <button onClick={() =>handleOperation('division')} className='btn btn-success btn-primary mt-3 gap'>
          Division
        </button>

        <div className="mt-3">
          <label htmlFor="responseFieldOperation">Response:</label>
          <input
            type="text"
            id="responseFieldOperation"
            className="form-control"
            value={operationResponseField}
            readOnly
          />
        </div>

        <hr></hr>
        <h1>Square Root:</h1>
        <div className="form-group">
                <label htmlFor="number_root">Number</label>
                <input
                  className="form-control"
                  id="number_root"
                  type="number"
                  placeholder="0"   
                          
                  onChange={(e) => setNumberRoot(e.target.value)}
                />
              </div>
        <button onClick={handleSquareRoot} className='btn btn-success btn-primary mt-3'>
          Get Square Root
        </button>
        <div className="mt-3">
          <label htmlFor="responseFieldSquareRoot">Response:</label>
          <input
            type="text"
            id="responseFieldSquareRoot"
            className="form-control"
            value={squareRoot}
            readOnly
          />
        </div>

        <hr></hr>

        <h1>Random String:</h1>
        <button onClick={handleRandomString} className='btn btn-success btn-primary mt-3'>
          Get Random String
        </button>
        <div className="mt-3">
          <label htmlFor="responseFieldRandomString">Response:</label>
          <input
            type="text"
            id="responseFieldRandomString"
            className="form-control"
            value={randomString}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

export default Calculate;
