import React, { ChangeEvent, FormEvent, useState } from 'react';
import './../../../App.scss';
import InputComponent from '../../form/InputComponent/InputComponent';
import Button from '../../form/button/Button';
import CustomModal from '../../ui/Modal/Modal';
import sideImage from './../Assets/Images/registration Image.jpg';
import api from '../../../utils/Api';
import { Link } from 'react-router-dom';
import OtpVerification from '../OtpVerification/OtpVerification';


const Register = () => {
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [formErrors, setFormErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const validateName = (name: string) => {
        return /^[a-zA-Z]+(\s[a-zA-Z]+)?$/.test(name);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        switch (name) {
            case "name":
                setFormErrors({
                    ...formErrors,
                    [name]: !value
                        ? `Name field is required`
                        : !validateName(value)
                            ? `Name must be at least 3 characters long and contain only letters`
                            : "",
                });
                break;
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
            case "confirmPassword":
                setFormErrors({
                    ...formErrors,
                    [name]: !value
                        ? "Confirm password field is required"
                        : value !== formData.password
                            ? `Passwords don't match`
                            : "",
                });
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = formData;
        if (!name || !email || !password || !confirmPassword) {
            setFormErrors({
                name: name ? "" : "Name field is required",
                email: email ? "" : "Email field is required",
                password: password ? "" : "Password field is required",
                confirmPassword: confirmPassword
                    ? ""
                    : "Confirm password field is required",
            });
            return;
        }
        for (const key in formErrors as any) {
            if ((formErrors as any)[key]) {
                return;
            }
        }
        if (password !== confirmPassword) {
            setFormErrors({
                ...formErrors,
                confirmPassword: `Passwords don't match`,
            });
            return;
        }
        const userData = {
            name: name,
            email: email,
            password: password,
        };
        if (userData) {
            setShowModal(true);
            console.log(userData)
            const response = await api.post('/register', userData)

            if (response.status === 200 || response.status === 201) {
                console.log('registered');
            } else {
                console.log('error')
            }
        }
    };

    return (
        <div className="registration-area sky-gradient">
            <div className="card registration text-start">
                <div className="row">
                    <div className="col-xl-8 pe-0 side-image">
                        <img src={sideImage} />
                    </div>
                    <div className="col-xl-4 p-0 form-area px-2">
                        <div className="card-header mt-2">
                            <h1>HR Registration</h1>
                            <p className='mb-0'>Please fill up the below form to get registered</p>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <InputComponent
                                    name='name'
                                    type='text'
                                    Label='Name'
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeHolder='Please enter your name'
                                    error={formErrors.name}
                                />
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
                                <InputComponent
                                    name='confirmPassword'
                                    type='password'
                                    Label='Confirm Password'
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeHolder='Please re-enter your password'
                                    error={formErrors.confirmPassword}
                                />
                                <Button Type='submit' class='btn btn-primary btn-register' buttonName='Register' />
                            </form>
                            <p className='link-to-page'>
                                Already have an account? <Link to={'/login'}>Login</Link>
                            </p>
                        </div>
                    </div>
                </div>
                <CustomModal Title='Otp Verification' show={showModal} onClose={handleCloseModal}>
                    <OtpVerification onClose={handleCloseModal} email={formData.email} />
                </CustomModal>
            </div>
        </div>
    );
};

export default Register;