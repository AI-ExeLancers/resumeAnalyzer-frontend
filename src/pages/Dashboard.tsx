import React, { useState } from 'react'
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputComponent from '../components/form/InputComponent/InputComponent';
import Button from '../components/form/button/Button';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../components/ui/Modal/Modal';
import GenerateByAi from '../components/AddJobDescription/GenerateByAi';

const Dashboard = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const [jobDesc, setJobDesc] = useState({
        title: '',
        description: ''
    })

    const [jobDescError, setJobDescError] = useState({
        title: '',
        description: ''
    })

    const handleLogout = () => {
        navigate('/login');
    }

    const handleInputChange = () => {

    }
    return (
        <>
            <nav className="navbar bg-dark border-bottom text-white px-2" data-bs-theme="dark">
                <div className='d-flex gap-3'>
                    <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                        <FontAwesomeIcon className='sidebar-toggle' icon={faBars} color='white' />
                    </button>
                    <h1>HR DASHBOARD</h1>
                </div>
                <div>
                    <Button
                        Type='submit'
                        class='btn btn-danger'
                        buttonName='Logout'
                        OnClick={handleLogout}
                    />
                </div>
            </nav>
            <div>
                <div className="offcanvas offcanvas-start bg-dark text-white" data-bs-scroll="true" tabIndex={-1} id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">COGNIHIRE</h5>
                        <button type="button" className="close-sidebar" data-bs-dismiss="offcanvas" aria-label="Close">
                            <FontAwesomeIcon className='sidebar-toggle' icon={faX} color='white' />
                        </button>
                    </div>
                    <div className="offcanvas-body d-flex flex-column justify-content-between">
                        <div className="pages">
                            <p>Analyse</p>
                            <p>Show Job Descriptions</p>
                            <p>Previous Analysis</p>
                            <p>Show Recording</p>
                        </div>
                        <div className="profile">
                            <p>Reset Password</p>
                        </div>
                    </div>
                </div>
                <div className="dashboard-area py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-3 col-lg-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h2 className="card-title text-start">Total Analyzed</h2>
                                        <p className='text-start'>It shows the total number of resumes analyzed</p>
                                        <h1>{300}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h2 className="card-title text-start">Accepted</h2>
                                        <p className='text-start'>It shows the total number of resumes accepted after analysis</p>
                                        <h1>{300}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h2 className="card-title text-start">Rejected</h2>
                                        <p className='text-start'>It shows the total number of resumes rejected after analysis</p>
                                        <h1>{300}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h2 className="card-title text-start">On Hold</h2>
                                        <p className='text-start'>It shows the total number of resumes on hold after analysis</p>
                                        <h1>{300}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5 d-flex justify-content-center align-items-center gap-5 ">
                            <div className="col-xl-6 previous-analysis ">
                                <h3>Hello world</h3>
                                <h3>Hello world</h3>
                                <h3>Hello world</h3>
                                <h3>Hello world</h3>
                                <h3>Hello world</h3>
                            </div>
                            <div className="col-xl-5 add-job-desc text-start">
                                <form >
                                    <h3>Add Job Description</h3>
                                    <InputComponent
                                        name='title'
                                        type='text'
                                        value={jobDesc.title}
                                        onChange={handleInputChange}
                                        placeHolder="Enter job title"
                                        error={jobDescError.title}
                                    />
                                    <div className="form-floating">
                                        <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: '250px' }}></textarea>
                                        <label htmlFor="floatingTextarea2">Description</label>
                                    </div>
                                    <Button
                                        Type='submit'
                                        class='btn btn-success mt-3'
                                        buttonName='Add'
                                    />
                                    <Button
                                        Type='button'
                                        class='btn btn-info btn-generate-by-ai mt-3'
                                        buttonName='Generate by AI'
                                        OnClick={handleShowModal}
                                    />
                                </form>
                                <CustomModal Title='Generate Job Description with AI' show={showModal} onClose={handleCloseModal}>
                                    <GenerateByAi />
                                </CustomModal>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
