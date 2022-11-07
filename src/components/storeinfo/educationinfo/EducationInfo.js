import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './EducationInfo.css';
import Alert from '@mui/material/Alert';
import UpgradeIcon from '@mui/icons-material/Upgrade';

// firebase
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase-setup/firebase';
import { updateDoc, doc } from "firebase/firestore";
import db from '../../../firebase-setup/firebase';

const EducationInfo = ({ userInfoData, save, setSave }) => {
    const [educationTitle, setEducationTitle] = useState('')
    const [educationSchool, setEducationSchool] = useState('')
    const [educationCity, setEducationCity] = useState('')
    const [educationState, setEducationState] = useState('')
    const [educationCountry, setEducationCountry] = useState('')
    const [educationMarks, setEducationMarks] = useState('')
    const [educationMarkstype, setEducationMarkstype] = useState('')
    const [educationyear, setEducationYear] = useState('')
    const [educationActiveChip, setEducationActiveChip] = useState('new')
    const [educationupdateIndex, setEducationupdateIndex] = useState(0)
    const [educationInfoAll, setEducationInfoAll] = useState('')

    const [user] = useAuthState(auth);

    // save education details in database user logged in details
    async function addDetails() {
        if (user) {
            const userEmail = user.email;
            // user-details
            try {
                // Add a new document in collection "cities"
                await updateDoc(doc(db, "user-details", userEmail), {
                    EducationInfoDetails: {
                        educationarray: educationInfoAll,
                        sectionType: 'Education'
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

    useEffect(() => {
        if (userInfoData) {
            const educationDetailsFirebase = userInfoData?.EducationInfoDetails?.educationarray
            setEducationTitle(educationDetailsFirebase?.etitle || '')
            setEducationMarks(educationDetailsFirebase?.eScore || '')
            setEducationYear(educationDetailsFirebase?.eYearPass || '')
            setEducationMarkstype(educationDetailsFirebase?.eScoreType || '')
            setEducationSchool(educationDetailsFirebase?.eSchool || '')
            setEducationInfoAll(userInfoData.EducationInfoDetails?.educationarray || '')
        }
    }, [userInfoData])
    // add Education Details
    const addEducationDetails = () => {
        if (educationTitle) {
            setEducationInfoAll(oldArray => [...oldArray,
            {
                etitle: educationTitle, eSchool: educationSchool, eScore: parseInt(educationMarks),
                eYearPass: parseInt(educationyear), eScoreType: educationMarkstype, eCity: educationCity, eState: educationState, eCountry: educationCountry
            }])
        }
        setEducationTitle('')
        setEducationMarks('')
        setEducationSchool('')
        setEducationYear('')
        setEducationMarkstype('cgpa')
    }

    // handle display of education details
    const handlechipdisplay = (chipTitle, chipSchool, chipMarks, chipYear, chipMarksType, chipIndex) => {
        setEducationTitle(chipTitle)
        setEducationMarks(chipMarks)
        setEducationSchool(chipSchool)
        setEducationYear(chipYear)
        setEducationMarkstype(chipMarksType)
    }
    // delete chip from list
    const deleteEducationchip = (chipIndex) => {
        setEducationInfoAll(educationInfoAll.filter((item, i) => i !== chipIndex))
        setEducationTitle('')
        setEducationMarks('')
        setEducationSchool('')
        setEducationYear('')
        setEducationMarkstype('cgpa')
        setEducationActiveChip('new')
    }

    // drop down cgpa and %
    const handleChange = (e) => {
        setEducationMarkstype(e.target.value);
    };
    // update social links
    const updateEducation = () => {
        let tempList = educationInfoAll
        tempList[educationupdateIndex] = { etitle: educationTitle, eSchool: educationSchool, eScore: parseInt(educationMarks),
            eYearPass: parseInt(educationyear), eScoreType: educationMarkstype, eCity: educationCity, eState: educationState, eCountry: educationCountry }
        setEducationInfoAll(tempList)
        addDetails()
    }
    return (
        <div className="bottom">
            {save && <Alert severity="success" color="info" className="savealert">
                saved successfully!
            </Alert>}
            <div className="bottom-left data">
                {/* TITLE */}
                <span>
                    <label htmlFor="educationtitle">TITLE<sup>*</sup> : </label>
                    <input type="text" id="educationtitle" placeholder="Title"
                        value={educationTitle} onChange={(e) => setEducationTitle(e.target.value)} />
                </span>
                {/* UNIVERSITY NAME */}
                <span>
                    <label htmlFor="universityname">UNIVERSITY / COLLEGE / SCHOOL / INSTITUTE<sup>*</sup> : </label>
                    <input type="text" id="universityname" placeholder="Enter school/college"
                        value={educationSchool} onChange={(e) => setEducationSchool(e.target.value)} />
                </span>

                {/* UNIVERSITY Address */}
                <span>
                    <label htmlFor="marksScored">ADDRESS<sup>*</sup> </label>
                    <span className="marksinp">
                        <input type="text" id="marksScored" placeholder="CITY/TOWN"
                            value={educationCity} onChange={(e) => setEducationCity(e.target.value)} />

                        <input type="text" id="marksScored" placeholder="STATE"
                            value={educationState} onChange={(e) => setEducationState(e.target.value)} />
                        <input type="text" id="marksScored" placeholder="COUNTRY"
                            value={educationCountry} onChange={(e) => setEducationCountry(e.target.value)} />

                    </span>
                </span>

                {/* PERCENTAGE / CGPA */}
                <span>
                    <label htmlFor="marksScored">PERCENTAGE / CGPA<sup>*</sup> </label>
                    <span className="marksinp">
                        <select name="" id="" onChange={handleChange} value={educationMarkstype}>
                            <option value="cgpa">CGPA</option>
                            <option value="percent">PERCENT</option>
                        </select>
                        <input type="text" id="marksScored" placeholder="Percentage or CGPA"
                            value={educationMarks} onChange={(e) => setEducationMarks(e.target.value)} />

                    </span>
                </span>

                {/* YEAR OF COMPLETION*/}
                <span>
                    <label htmlFor="yearofpass">PASSED / YEAR OF COMPLETION<sup>*</sup> </label>
                    <input type="year" id="yearofpass" placeholder="Year of completion"
                        value={educationyear} onChange={(e) => setEducationYear(e.target.value)} />
                </span>

                {/* button to add */}
                {educationActiveChip !== "new" ? <button className="simpleButton" onClick={updateEducation}
                    style={{ backgroundColor: 'rgba(66, 55, 123, 0.7)', color: '#fff' }}><UpgradeIcon /> UPDATE</button> :
                    <button className="simpleButton" onClick={addEducationDetails}
                        style={{ backgroundColor: 'rgba(66, 55, 123, 0.7)', color: '#fff' }}>ADD</button>}

                <span></span> {/* empty span for a gap in mobile view  */}
            </div>
            <div className="bottom-right">
                {educationInfoAll.length > 0 &&
                    <div className="previewEducationInfo">
                        <div className={`new-chip ${educationActiveChip === 'new' ? 'active' : ''}`}
                            onClick={() => {
                                setEducationTitle(''); setEducationSchool('');
                                setEducationMarks(''); setEducationYear('');
                                setEducationMarkstype('cgpa');
                                setEducationActiveChip('new');
                            }}>NEW</div>

                        {educationInfoAll.map((preview, i) =>
                            <div key={`preview${i}`} value={i} className={`chips ${educationActiveChip === i ? 'active' : ''}`}>
                                <span onClick={() => {
                                    setEducationActiveChip(i);
                                    setEducationupdateIndex(i);
                                    handlechipdisplay(preview.etitle, preview.eSchool, preview.eScore, preview.eYearPass, preview.eScoreType, i)
                                }}>
                                    <span >{`Title : ${preview.etitle}`}</span>
                                    <span>{`School : ${preview.eSchool}`}</span>
                                    <span>{`Address : ${preview.eCity}, ${preview.eState}, ${preview.eCountry}`}</span>
                                    <span>{`Score : ${preview.eScore}`}</span>
                                    <span>{`Year : ${preview.eYearPass}`}</span>
                                </span>
                                <CloseIcon onClick={() => { deleteEducationchip(i); }} />
                            </div>)}
                    </div>}
                <div style={{ paddingBottom: '30px' }}></div>
                {/* button to save */}
                <button className="simpleButton" onClick={addDetails}>SAVE</button>
                <div style={{ paddingBottom: '30px' }}></div>
            </div>
        </div>
    )
}

export default EducationInfo;
