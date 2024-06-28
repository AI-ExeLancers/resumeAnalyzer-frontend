import React from "react";
import { Link } from 'react-router-dom'
import bgImage from './../components/Auth/Assets/Images/bg-reg.png';
import './Home.scss';
const Home = () => {

    return (
        <>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <Link to={'/'} className="navbar-brand"><h3>Resume Analyzer</h3></Link>
                    <div>
                        <Link className="btn btn-info" to="/register">Register/Login</Link>
                    </div>
                </div>
            </nav>
            <div className="h-100">
                <section className="ezy__about13_7yAnfJiZ" id="ezy__about13_7yAnfJiZ">
                    <div className="container">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-lg-5 col-xs-12  mb-5 mb-lg-0">
                                <div>
                                    <h1 className="ezy__about13_7yAnfJiZ-heading">ABOUT US</h1>
                                    <hr className="ezy__about13_7yAnfJiZ-divider my-4" />
                                    <p className="ezy__about13_7yAnfJiZ-sub-heading mb-2">
                                        Completely network collaborative web services via user-centric
                                        initiatives. Quickly promote sticky testing procedures before
                                        unique process improvements. Distinctively engineer innovative
                                        information whereas revolutionary process improvements. Lorem
                                        ipsum dolor sit amet, consectetur adipisicing elit. Quia enim
                                        omnis saepe dolor voluptatum. Natus soluta maxime ipsum nam
                                        sapiente dignissimos voluptatum totam. Ratione atque dolorum
                                        nostrum a est voluptatibus.
                                    </p>
                                    <p className="ezy__about13_7yAnfJiZ-sub-heading mb-0">
                                        Distinctively engineer innovative information whereas
                                        revolutionary process improvements. Lorem ipsum dolor sit amet,
                                        consectetur adipisicing elit. Quia enim omnis saepe dolor
                                        voluptatum. Natus soluta maxime ipsum nam sapiente dignissimos
                                        voluptatum totam.
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-5 col-xs-12">
                                <div className="ezy__about13_7yAnfJiZ-bg-holder" />
                                <div className="position-relative">
                                    <img
                                        src="https://cdn.easyfrontend.com/pictures/about/about13_1.jpg"
                                        alt=""
                                        className="img-fluid"
                                    />
                                    <img
                                        src="https://cdn.easyfrontend.com/pictures/about/about13_2.jpg"
                                        alt=""
                                        className="img-fluid ezy__about13_7yAnfJiZ-img2"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Home;
