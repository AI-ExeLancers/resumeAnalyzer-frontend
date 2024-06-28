import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import InputComponent from '../../form/InputComponent/InputComponent'
import Button from '../../form/button/Button'
import { Link, useNavigate } from 'react-router-dom'
import CustomModal from '../../ui/Modal/Modal'
import loginImage from './../Assets/Images/login.jpg';
import api from '../../../utils/Api';


const Login = () => {
    const navigate = useNavigate();

    const [authToken, setAuthToken] = useState('');

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const { email, password } = formData;

        if (!email || !password) {
            setFormErrors({
                email: email ? "" : "Email field is required",
                password: password ? "" : "Password field is required",
            });
            return;
        }

        for (const key in formErrors as any) {
            if ((formErrors as any)[key]) {
                return;
            }
        }

        const loginData = {
            email: email,
            password: password
        }

        if (loginData) {
            console.log(loginData)
            const response = await api.post('/login', loginData)

            if (response.status === 200 || response.status === 201) {
                console.log('Logged in');
                navigate('/dashboard');
            } else {
                console.log('error');
            }
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        switch (name) {
            case "email":
                setFormErrors({
                    ...formErrors,
                    [name]: !value
                        ? "Email field is required"
                        : !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
                            ? "Please enter a valid email address"
                            : "",
                });
                break;
            case "password":
                setFormErrors({
                    ...formErrors,
                    [name]: !value
                        ? "Password field is required"
                        : !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+|~\-={}[\]:;"'<>,.?/]).{9,}$/.test(
                            value
                        )
                            ? 'Password must be 9 characters long and follow pattern: "Jp@152000"'
                            : "",
                });
                break;
            default:
                break;
        }

    }
    return (
        <div className="registration-area login-area">
            <div className="card registration text-start">
                <div className="row">
                    <div className="col-xl-8 pe-0 side-image">
                        <img src={loginImage} />
                    </div>
                    <div className="col-xl-4 p-0 form-area px-2">
                        <div className="card-header mt-2">
                            <h1>HR Login</h1>
                            <p className='mb-0'>Please enter your login credentials</p>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <InputComponent
                                    name='email'
                                    type='email'
                                    Label='Email'
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeHolder='Please enter your email'
                                    error={formErrors.email}
                                />
                                <InputComponent
                                    name='password'
                                    type='password'
                                    Label='Password'
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeHolder='Please enter your password'
                                    error={formErrors.password}
                                />

                                <Button Type='submit' class='btn btn-primary btn-register' buttonName='Login' />
                            </form>
                            <p className='link-to-page mb-4'>
                                Don't have an account? <Link to={'/register'}>Register</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
