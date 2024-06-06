import React,{useState, useEffect} from "react";

import axios from "axios";
const MyGenerate = () => {
    const [password, setPassword] = useState()
    const [passwordlength, setPasswordLength] = useState()
    const [error, setError] = useState()
    const [passwordStrength, setPasswordStrength] = useState("");
    const fectchPassword = async ()  => {
        axios.get(`http://localhost:5000/password_length/${passwordlength}`)
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
            
          
        
        }
    
        const handlePasswordLengthChange = (event) => {
            const selectedLength = event.target.value;
            
            setPasswordLength(selectedLength);
          
          };


return  (
   

    <div className="app">
        
        <div class="container">
        <h1>Password Generator</h1>
        <form id="password-form">
            <label for="password-length">Choose Password Length:</label>
            <select id="password-length" onChange={handlePasswordLengthChange}>
            <option value="3">3</option>
  <option value="4">4</option>
  <option value="">Weak</option>
  <option value="5">5</option>
  <option value="6">6</option>
  <option value="7">7</option>
  <option value="8">8</option>
  <option value="9">9</option>
  <option value="10">10</option>
  <option value="">Medium</option>
  <option value="11">11</option>
  <option value="12">12</option>
  <option value="13">13</option>
  <option value="14">14</option>
  <option value="15">15</option>
 
  <option value="16">16</option>
  <option value="17">17</option>
  <option value="18">18</option>
  <option value="19">19</option>
  <option value="">Strong</option>
  <option value="20">20</option>
 
  <option value="21">21</option>
  <option value="22">22</option>
  <option value="23">23</option>
  <option value="24">24</option>
  <option value="25">25</option>

                
            </select>
            <button type="button" id="generate-password" onClick={fectchPassword}>Generate Password</button>
            <input type="text" id="generated-password" readonly value={password} />
            <p>{password}</p>
            <h2>OKAy:{password}</h2>
           < p>Generated Password: {password} (Strength: {passwordStrength})</p>
        </form>
    </div>
    
    </div>
)
}
export default MyGenerate;

