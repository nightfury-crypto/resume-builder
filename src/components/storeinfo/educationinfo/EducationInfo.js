import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './EducationInfo.css';

const EducationInfo = () => {
    const [educationTitle, setEducationTitle] = useState('')
    const [educationSchool, setEducationSchool] = useState('')
    const [educationMarks, setEducationMarks] = useState('')
    const [educationMarkstype, setEducationMarkstype] = useState('')
    const [educationyear, setEducationYear] = useState('')
    const [educationActiveChip, setEducationActiveChip] = useState('new')
    const [socialLinkpdateIndex, setSocialLinkpdateIndex] = useState('0')
    const [educationInfoAll, setEducationInfoAll] = useState([
        { etitle: '10th class', eSchool: 'KENDRIYA VIDYALAYA NO.1 JALANDHAR CANTT', eScore: 96, eYearPass: 2016 },
        { etitle: '12th class', eSchool: 'KENDRIYA VIDYALAYA NO.1 JALANDHAR CANTT', eScore: 81, eYearPass: 2018 },
    ])


    // handle display of education details
    const handlechipdisplay = (chipTitle, chipSchool, chipIndex) => {
        console.log(chipTitle)
    }
    // delete chip from list
    const deleteEducationchip = (chipIndex) => {
        console.log("I'm here to delete.")
    }

    // drop down cgpa and %
    const handleChange = (e) => {
        setEducationMarkstype(e.target.value);
    };

    return (
        <div className="bottom">
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

                {/* PERCENTAGE / CGPA */}
                <span>
                    <label htmlFor="marksScored">PERCENTAGE / CGPA<sup>*</sup> </label>
                    <span className="marksinp">
                        <select name="" id="" onChange={handleChange}>
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
                    <input type="year" id="yearofpass" placeholder="Percentage or CGPA"
                        value={educationyear} onChange={(e) => setEducationYear(e.target.value)} />
                </span>

                {/* button to add */}
                <button className="simpleButton">ADD</button>
                <span></span> {/* empty span for a gap in mobile view  */}
            </div>
            <div className="bottom-right">
                {educationInfoAll.length > 0 &&
                    <div className="previewEducationInfo">
                        <div className={`new-chip ${educationActiveChip === 'new' ? 'active' : ''}`}
                            onClick={() => {
                                setEducationTitle(''); setEducationSchool('');
                                setEducationMarks(''); setEducationYear('');
                                setEducationActiveChip('new');
                            }}>NEW</div>

                        {educationInfoAll.map((preview, i) =>
                            <div key={`preview${i}`} value={i} className={`chips ${educationActiveChip === preview.etitle ? 'active' : ''}`}>
                                <span onClick={() => {
                                    setEducationActiveChip(preview.etitle);
                                    setSocialLinkpdateIndex(i)
                                    handlechipdisplay(preview.etitle, preview.eSchool, i)
                                }}>
                                    <span >{`Title : ${preview.etitle}`}</span>
                                    <span>{`School : ${preview.eSchool}`}</span>
                                    <span>{`Score : ${preview.eScore}`}</span>
                                    <span>{`Year : ${preview.eYearPass}`}</span>
                                </span>
                                <CloseIcon onClick={() => { deleteEducationchip(i); }} />
                            </div>)}
                    </div>}
                    <div style={{paddingBottom: '30px'}}></div>
            </div>
        </div>
    )
}

export default EducationInfo;
