import React, { useState, useEffect } from 'react';
import './generate.css';
import axios from 'axios';
import { MdOutlineContentCopy } from "react-icons/md";
function Generate() {
  const [password, setPassword] = useState('');
  const [passwordlength, setPasswordLength] = useState(20);
  const [passwordtype, setPasswordType] = useState([]);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(20);

  useEffect(() => {
    updateLabelValue();
  }, [value]);

  const updateLabelValue = () => {
    const progressValue = document.getElementById('progress-value');
    if (progressValue) {
      progressValue.innerHTML = value;
    }
  };

  const fetchPassword = async () => {
    setLoading(true);
    const types = passwordtype.join(',');
    try {
      const response = await axios.get(`https://password-wtsk.onrender.com/password_length/${passwordlength}/${types}`);
      setPassword(response.data.password);
      setPasswordLength(response.data.length);
      console.log(password);
      console.log(passwordlength);
      let passwordStrength;

      if (passwordlength >= 3 && passwordlength <= 10) {
        passwordStrength = 'Weak';
      } else if (passwordlength >= 8 && passwordlength <= 19) {
        passwordStrength = 'Medium';
      } else if (passwordlength >= 20 && passwordlength <= 30) {
        passwordStrength = 'Strong';
      }

      setPasswordStrength(passwordStrength);
    } catch (error) {
      console.error('Error fetching password:', error);
      setError('Error fetching password. Please try again later.');
    }
    setLoading(false);
  };

  const handlePasswordLengthChange = (e) => {
    const selectedLength = parseInt(e.target.value);
    setValue(selectedLength);
    setPasswordLength(selectedLength);
  };

  const handlePasswordTypeChange = (e) => {
    const type = e.target.name;
    const isChecked = e.target.checked;
    setPasswordType((prevTypes) => {
      if (isChecked) {
        return [...prevTypes, type];
      } else {
        return prevTypes.filter((t) => t !== type);
      }
    });
  };

  return (
    <>
      <div>
        <div className="container">
          <div className="title">Password Generator</div>
          <div className="password-block">
            <div id="password">{password}</div>
            <i className="material-icons" style={{ cursor: 'pointer' }}><MdOutlineContentCopy />
            </i>
          </div>
          <div className="cont">
            <div className="opp">
              <div className="password-length-header-block">
                <label>Character Length</label>
                <span id="progress-value" className="password-length">{value}</span>
              </div>
              <div className="password-length-slider">
                <input type="range" min="0" max="20" value={value} onChange={handlePasswordLengthChange} />
              </div>
            </div>
            <div className="option-block">
              <input id="uppercase" type="checkbox" name="uppercase" onChange={handlePasswordTypeChange} />
              <label>Include Uppercase letters</label>
            </div>
            <div className="option-block">
              <input id="lowercase" type="checkbox" name="lowercase" onChange={handlePasswordTypeChange} />
              <label>Include Lowercase letters</label>
            </div>
            <div className="option-block">
              <input id="number" type="checkbox" name="numeric" onChange={handlePasswordTypeChange} />
              <label>Include Numbers</label>
            </div>
            <div className="option-block">
              <input id="symbols" type="checkbox" name="symbols" onChange={handlePasswordTypeChange} />
              <label>Include Symbols</label>
            </div>
          </div>
          <div id="button-container" onClick={fetchPassword}>
            GENERATE
          </div>
        </div>
      </div>
    </>
  );
}

export default Generate;
