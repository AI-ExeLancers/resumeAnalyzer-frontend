import React, { ChangeEvent, FormEvent, useState } from 'react';
import InputComponent from '../form/InputComponent/InputComponent';
import Button from '../form/button/Button';
import api from '../../utils/Api';
import loadingGif from './Assets/Ripple@1x-1.0s-200px-200px.gif';

const GenerateByAi = () => {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        experience: '',
        profile: '',
        perk: ''
    });

    const [formDataErrors, setFormDataErrors] = useState({
        title: '',
        experience: '',
        profile: '',
        perk: ''
    });

    const [generateJd, setGeneratedJd] = useState({
        overview: '',
        summary: '',
        requirements: '',
        responsibilities: '',
        final_thought: '',
        perks: ''
    });

    const [jobDesc, setJobDesc] = useState({
        title: '',
        error: '',
        description:''
    });


    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;

        if (name === 'jdTitle') {
            setJobDesc((prevState) => ({
                ...prevState,
                title: value,
                error: !value ? "Job Description Title field is required" : "",
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));

            switch (name) {
                case "title":
                    setFormDataErrors({
                        ...formDataErrors,
                        [name]: !value ? "Title field is required" : "",
                    });
                    break;
                case "experience":
                    setFormDataErrors({
                        ...formDataErrors,
                        [name]: !value ? "Experience field is required" : "",
                    });
                    break;
                case "profile":
                    setFormDataErrors({
                        ...formDataErrors,
                        [name]: !value ? "Company profile field is required" : "",
                    });
                    break;
                case "perk":
                    setFormDataErrors({
                        ...formDataErrors,
                        [name]: !value ? "Perks field is required" : "",
                    });
                    break;
                default:
                    break;
            }
        }
    };

    const handleSave = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const jdToAdd = {
            title: jobDesc.title,
            description: jobDesc.description
        };

        if (jdToAdd) {
            console.log(jdToAdd);
            const response = await api.post('/resume-analyze/add-jobDescription',jdToAdd);
            if(response.status === 200 || response.status === 201){
                console.log('JD ADDED!!!!!!!')
            }
        }
    };


    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const { title, experience, profile, perk } = formData;

        if (!title || !experience || !profile || !perk) {
            setFormDataErrors({
                title: title ? "" : "Title field is required",
                experience: experience ? "" : "Experience field is required",
                profile: profile ? "" : "Company profile field is required",
                perk: perk ? "" : "Perks field is required",
            });
            return;
        }

        for (const key in formDataErrors as any) {
            if ((formDataErrors as any)[key]) {
                return;
            }
        }

        setLoading(true); 

        const jdData = {
            title: title,
            experience: experience,
            profile: profile,
            perk: perk
        };

        if (jdData) {
            const response = await api.post('/resume-analyze/generate-jobDescription', jdData);
            if (response.status === 200 || response.status === 201) {
                console.log('success');
                console.log(response.data.msg);
                setGeneratedJd({
                    overview: response.data.msg.Company_Overview,
                    summary: response.data.msg.Job_Summary,
                    requirements: response.data.msg.Job_Requirements,
                    responsibilities: response.data.msg.Job_Responsibilities,
                    final_thought: response.data.msg.Final_Thought,
                    perks: response.data.msg.Perks
                });
                setJobDesc((prevState) => ({
                    ...prevState,
                    description:response.data.msg
                }));
            }
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {loading && (
                    <div className='d-flex justify-content-center align-items-center'>
                        <img src={loadingGif} alt="loading" />
                    </div>
                )}
                {!loading && !generateJd.overview && (

                    <div className={`jd-generation-form ${generateJd.overview ? 'd-none' : ''}`}>
                        <InputComponent
                            name='title'
                            type='text'
                            Label='Job Title'
                            value={formData.title}
                            onChange={handleInputChange}
                            placeHolder='Please enter job title'
                            error={formDataErrors.title}
                        />
                        <InputComponent
                            name='experience'
                            type='text'
                            Label='Experience'
                            value={formData.experience}
                            onChange={handleInputChange}
                            placeHolder='Please enter experience in years'
                            error={formDataErrors.experience}
                        />

                        <label className='fs-5'>Company Profile</label>
                        <div className="form-floating">
                            <textarea className="form-control" name='profile' value={formData.profile} onChange={handleInputChange} id="floatingTextarea2" style={{ height: '100px' }}></textarea>
                            <label htmlFor="floatingTextarea2">Company profile</label>
                        </div>

                        <label className='fs-5 mt-3'>Perks/Benefits</label>
                        <div className="form-floating">
                            <textarea className="form-control" name='perk' value={formData.perk} onChange={handleInputChange} id="floatingTextarea2" style={{ height: '100px' }}></textarea>
                            <label htmlFor="floatingTextarea2">Perks/Benefits</label>
                        </div>
                        <Button
                            Type='submit'
                            class='btn btn-primary mt-2'
                            buttonName='Generate'
                        />
                    </div>
                )}

                {!loading && generateJd.overview && (
                    <div className={`generated-jd ${generateJd.overview ? '' : 'd-none'}`} >
                        <InputComponent
                            name='jdTitle'
                            type='text'
                            Label='Job Description Title'
                            value={jobDesc.title}
                            onChange={handleInputChange}
                            placeHolder='Please enter job description title'
                            error={jobDesc.error}
                        />
                        <div>
                            <h3>Generated Job Description</h3>
                            <p><strong>Company Overview:</strong> {generateJd.overview}</p>
                            <p><strong>Job Summary:</strong> {generateJd.summary}</p>
                            <p><strong>Job Responsibilities:</strong> {generateJd.responsibilities}</p>
                            <p> <strong>Job Requirements:</strong> {generateJd.requirements}</p>
                            <p><strong>Perks: </strong>{generateJd.perks}</p>
                            <p><strong>Final Thought:</strong> {generateJd.final_thought}</p>
                        </div>
                        <Button
                            Type='submit'
                            class='btn btn-success mt-2'
                            buttonName='Save'
                            OnClick={handleSave}
                        />
                    </div>
                )}
            </form>
        </div>
    );
};

export default GenerateByAi;

