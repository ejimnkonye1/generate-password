import React, { useState, useEffect } from 'react'
import './test.css'


import axios from "axios";

function Test() {
    const [password, setPassword] = useState()
    const [passwordlength, setPasswordLength] = useState()
    const [passwordtype, setPasswordtype] = useState()
    const [error, setError] = useState()
    const [passwordStrength, setPasswordStrength] = useState("");
    const [passwordType, setPasswordType] = useState('default');
    const [loading, setLoading] = useState(false);
const [value, setValue] = useState(20)
// const handleChange = (e) => {
//     setValue(parseInt(e.target.value));
//   };
  useEffect(() => {
    updateLabelValue();
  }, [value]);

  const updateLabelValue = () => {
    const progressValue = document.getElementById('progress-value');

    progressValue.innerHTML = value;
  };
 
  const fetchPassword = async ()  => {
    setLoading(true);
    const finalPasswordType = passwordType ? `/${passwordType}` : '';
    axios.get(`http://localhost:5000/password_length/${passwordlength}/${finalPasswordType}`)
        .then(response =>{
            
            setPassword(response.data.password)
            setPasswordLength(response.data.length)
            console.log(password)
            console.log(passwordlength)
            let passwordStrength;

        if (passwordlength >= 3 && passwordlength <= 10) {
          passwordStrength = "Weak";
        } else if (passwordlength >= 8 && passwordlength <= 19) {
          passwordStrength = "Medium";
        } else if (passwordlength >= 20 && passwordlength <= 30) {
          passwordStrength = "Strong";
        }
        
        setPasswordStrength(passwordStrength);
        })
        .catch(error => {
            console.error("Error fetching password:", error);
            setError("Error fetching password. Please try again later.");
        })
        
        setLoading(false)
    
    }

    const handlePasswordLengthChange = (e) => {
        const selectedLength = parseInt(e.target.value);
        setValue(selectedLength);
        setPasswordLength(selectedLength);
      };
      
      const handlePasswordTypeChange = (e) => {
        setPasswordType(e.target.checked ? e.target.name : '');
        fetchPassword();
      };
    
  return (
    <>
    <div >
    <div class="container">
        
        <div class="title">Password Generator</div>
        
        <div class="password-block">
    <div id="password">{password}</div>
    {/* <img src="../assets/copy.svg" alt="copy image" id="copy-image" /> */}
    <i class="material-icons"  style={{ cursor: 'pointer' }}>content_copy</i>

</div>
<div className='cont'>
<div className='opp'>
<div className="password-length-header-block">
        <label>Character Length</label>
      
        <span id="progress-value" className='password-length'>{value}</span>
      </div>
      <div className="password-length-slider">
        <input
          type="range"
          min="0"
          max="20"
         onChange={handlePasswordLengthChange}
         
        />
       

      </div>


</div>

<div class="option-block">
<input
                id="uppercase"
                type="checkbox"
                name="uppercase"
                defaultValue={passwordType === 'uppercase'}
                onChange={handlePasswordTypeChange}
              />
    <label >Include Uppercase letters</label>
</div>
<div class="option-block">
    <input id="lowercase" type="checkbox" name="lowercase" class="lowercase"
    defaultValue={passwordType === 'lowercase'}
    onChange={handlePasswordTypeChange}  />
    <label >Include Lowercase letters</label>
</div>
<div class="option-block">
<input
id="number"
type="checkbox"
name="number"
defaultValue={passwordType === 'numbers'}
                onChange={handlePasswordTypeChange}

/>

    <label >Include Numbers</label>
</div>
<div class="option-block">
    <input id="symbols" type="checkbox" name="symbols" />
    <label >Include Symbols</label>
</div>
</div>
<div id="button-container"  onClick={fetchPassword}>
    GENERATE 
</div>
    </div>
   
    </div>
     
    </>
  )
}

export default Test
