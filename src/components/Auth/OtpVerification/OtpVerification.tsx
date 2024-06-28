import React, { useState } from 'react'
import InputComponent from '../../form/InputComponent/InputComponent';
import Button from '../../form/button/Button';
import api from '../../../utils/Api';
import { useNavigate } from 'react-router-dom';

interface IOtpProps {
  email: string;
  onClose?: () => void; // Define onClose function prop
}

const OtpVerification: React.FC<IOtpProps> = (props) => {
  const navigate = useNavigate();
  const [otpData, setOtpData] = useState({
    otp: '',
    otpError: ''
  });

  const handleOtpChange = (value: string) => {
    setOtpData({
      otp: value,
      otpError: !value ? 'OTP field is required' : !/^\d+$/.test(value) ? 'OTP must only be numbers' : !/^\d{4}$/.test(value) ? 'OTP must be 4 digits' : ''
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!otpData.otp) {
      setOtpData({
        ...otpData,
        otpError: 'OTP field is required'
      });
      return;
    }
    if (!otpData.otpError) {
      const dataToVerify = {
        email: props.email,
        otp: otpData.otp
      }
      const response = await api.post('email-verify', dataToVerify);
      if (response.status === 200 || response.status === 201) {
        console.log('success');
        if (props.onClose) { // Check if onClose prop exists
          props.onClose(); // Call onClose function if it exists
          navigate('/login');
        }
      } else {
        console.log('error');
      }
    }
  };

  return (
    <div>
      <p>Please enter the otp received on <strong>{props.email}</strong> </p>
      <form onSubmit={handleSubmit}>
        <InputComponent
          name='otp'
          type='text'
          Label='OTP'
          value={otpData.otp}
          onChange={(event) => handleOtpChange(event.target.value)}
          placeHolder='Please enter the otp'
          error={otpData.otpError}
          maxLength={4}
        />
        <Button
          Type='submit'
          class='btn btn-success'
          buttonName='Verify'
        />
      </form>
    </div>
  )
}

export default OtpVerification
