import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './ProjectInfo.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Alert } from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore';
import db, { auth } from '../../../firebase-setup/firebase';

const ProjectInfo = ({ setSave, save, userInfoData }) => {
    const [projectTitle, setProjectTitle] = useState('')
    const [projectDescription, setProjectDescription] = useState('')
    const [projectLiveLink, setProjectLiveLink] = useState('')
    const [projectSourceLink, setProjectSourceLink] = useState('')
    const [educationActiveChip, setEducationActiveChip] = useState('new')
    const [socialLinkpdateIndex, setSocialLinkpdateIndex] = useState('0')
    const [projectInfoAll, setprojectInfoAll] = useState([])

    const [user] = useAuthState(auth);

    useEffect(() => {
        if (userInfoData) {
            const projectDetailsFirebase = userInfoData?.ProjectInfoDetails?.projectarray
            
            setProjectTitle(projectDetailsFirebase?.ptitle || '')
            setProjectDescription(projectDetailsFirebase?.pdesc || '')
            setProjectLiveLink(projectDetailsFirebase?.plive || '')
            setProjectSourceLink(projectDetailsFirebase?.psrc || '')
            setprojectInfoAll(projectDetailsFirebase || '')
        }
    }, [userInfoData])

    // save education details in database user logged in details
    async function addDetails() {
        if (user) {
            const userEmail = user.email;
            // user-details
            try {
                // Add a new document in collection "cities"
                await updateDoc(doc(db, "user-details", userEmail), {
                    ProjectInfoDetails: {
                        projectarray: projectInfoAll,
                        sectionType: 'Project'
                    },
                });
                setSave(true)
            } catch (e) {
                console.log(e)
            }
        }
        setTimeout(() => {
            setSave(false)
        }, 2000)
    }
    // add Education Details
    const addProjectDetails = () => {
        if (projectTitle) {
            setprojectInfoAll(oldArray => [...oldArray, { ptitle: projectTitle, pdesc: projectDescription, plive: projectLiveLink, psrc: projectSourceLink }])
        }
        setProjectTitle('')
        setProjectDescription('')
        setProjectLiveLink('')
        setProjectSourceLink('')
    }

    // handle display of education details
    const handlechipdisplay = (chipTitle, chipSchool, chipIndex) => {
        console.log(chipTitle, chipSchool, chipIndex)
    }
    // delete chip from list
    const deleteEducationchip = (chipIndex) => {
        console.log("I'm here to delete.")
    }

    return (
        <div className="bottom">
            {save && <Alert severity="success" color="info" className="savealert">
                saved successfully!
            </Alert>}
            <div className="bottom-left data">
                {/* TITLE */}
                <span>
                    <label htmlFor="educationtitle">PROJECT TITLE<sup>*</sup> : </label>
                    <input type="text" id="educationtitle" placeholder="Title"
                        value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} />
                </span>
                {/* UNIVERSITY NAME */}
                <span>
                    <label htmlFor="universityname">PROJECT DESCRIPTION<sup>*</sup> : </label>
                    <textarea type="text" id="universityname" placeholder="Project description"
                        value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} />
                </span>

                {/* live link */}
                <span>
                    <label htmlFor="livelink">LIVE LINK : </label>
                    <span>
                        <input type="text" placeholder="Live link"
                            value={projectLiveLink} onChange={(e) => setProjectLiveLink(e.target.value)} />
                    </span>
                </span>

                {/* YEAR OF COMPLETION*/}
                <span>
                    <label htmlFor="sourcecode">SOURCE CODE LINK : </label>
                    <input type="text" id="sourcecode" placeholder="Source code link"
                        value={projectSourceLink} onChange={(e) => setProjectSourceLink(e.target.value)} />
                </span>

                {/* button to add */}
                <button className="simpleButton" onClick={addProjectDetails}
                    style={{ backgroundColor: 'rgba(66, 55, 123, 0.7)', color: '#fff' }}>ADD</button>

                <span></span> {/* empty span for a gap in mobile view  */}
            </div>
            <div className="bottom-right">
                {projectInfoAll.length > 0 &&
                    <div className="previewEducationInfo projectInfo">
                        <div className={`new-chip ${educationActiveChip === 'new' ? 'active' : ''}`}
                            onClick={() => {
                                setProjectTitle(''); setProjectDescription('');
                                setProjectLiveLink(''); setProjectSourceLink('');
                                setEducationActiveChip('new');
                            }}>NEW</div>

                        {projectInfoAll.map((preview, i) =>
                            <div key={`preview${i}`} value={i} className={`chips ${educationActiveChip === preview.ptitle ? 'active' : ''}`}>
                                <span onClick={() => {
                                    setEducationActiveChip(preview.ptitle);
                                    setSocialLinkpdateIndex(i)
                                    handlechipdisplay(preview.ptitle, preview.pdesc, i)
                                }}>
                                    <span >{`Title : ${preview.ptitle}`}</span>
                                    <span>{`Description : ${preview.pdesc}`}</span>
                                    <span>{`Live : `}<a href={preview.plive} target="_blank" rel="noreferrer">{preview.plive}</a></span>
                                    <span>{`Code src : `}<a href={preview.psrc} target="_blank" rel="noreferrer">{preview.psrc}</a></span>
                                </span>
                                <CloseIcon onClick={() => { deleteEducationchip(i); }} />
                            </div>)}
                            <div style={{ paddingBottom: '30px' }}></div>
                    </div>}
                
                <button className="simpleButton" onClick={addDetails}>SAVE</button>
                <div style={{ paddingBottom: '30px' }}></div>
            </div>
        </div>
    )
}

export default ProjectInfo;
