import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './SkillsInfo.css';

const SkillsInfo = () => {
    const [skillTitle, setSkillTitle] = useState('')
    const [projectDescription, setProjectDescription] = useState('')
    const [projectLiveLink, setProjectLiveLink] = useState('')
    const [projectSourceLink, setProjectSourceLink] = useState('')
    const [educationActiveChip, setEducationActiveChip] = useState('new')
    const [socialLinkpdateIndex, setSocialLinkpdateIndex] = useState('0')
    const [SkillsInfoAll, setSkillsInfoAll] = useState([
        { ptitle: 'Ecommerce Website', pdescription: 'Ecomerce web app using ReactJs and redux with lit design.', 
        pLiveLink: 'https://www.google.com', pSourceCode: 'https://www.github.com/nightfury-crypto' },
        { ptitle: 'Chat app', pdescription: 'Chat web app using ReactJs and redux with lit design.', 
        pLiveLink: 'https://www.google.com', pSourceCode: 'https://www.github.com/nightfury-crypto' },
        
    ])

    // handle display of education details
    const handlechipdisplay = (chipTitle, chipSchool, chipIndex) => {
        console.log(chipTitle, chipSchool, chipIndex    )
    }
    // delete chip from list
    const deleteEducationchip = (chipIndex) => {
        console.log("I'm here to delete.")
    }

    return (
        <div className="bottom">
            <div className="bottom-left data">
                {/* TITLE */}
                <span>
                    <label htmlFor="educationtitle">PROJECT TITLE<sup>*</sup> : </label>
                    <input type="text" id="educationtitle" placeholder="Title"
                        value={skillTitle} onChange={(e) => setSkillTitle(e.target.value)} />
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
                <button className="simpleButton">SAVE</button>
                <span></span> {/* empty span for a gap in mobile view  */}
            </div>
            <div className="bottom-right">
                {SkillsInfoAll.length > 0 &&
                    <div className="previewEducationInfo SkillsInfo">
                        <div className={`new-chip ${educationActiveChip === 'new' ? 'active' : ''}`}
                            onClick={() => {
                                setSkillTitle(''); setProjectDescription('');
                                setProjectLiveLink(''); setProjectSourceLink('');
                                setEducationActiveChip('new');
                            }}>NEW</div>

                        {SkillsInfoAll.map((preview, i) =>
                            <div key={`preview${i}`} value={i} className={`chips ${educationActiveChip === preview.ptitle ? 'active' : ''}`}>
                                <span onClick={() => {
                                    setEducationActiveChip(preview.ptitle);
                                    setSocialLinkpdateIndex(i)
                                    handlechipdisplay(preview.ptitle, preview.pdescription, i)
                                }}>
                                    <span >{`Title : ${preview.ptitle}`}</span>
                                    <span>{`Description : ${preview.pdescription}`}</span>
                                    <span>{`Live : `}<a href={preview.pLiveLink} target="_blank" rel="noreferrer">{preview.pLiveLink}</a></span>
                                    <span>{`Code src : `}<a href={preview.pSourceCode} target="_blank" rel="noreferrer">{preview.pSourceCode}</a></span>
                                </span>
                                <CloseIcon onClick={() => { deleteEducationchip(i); }} />
                            </div>)}
                    </div>}
                <div style={{ paddingBottom: '30px' }}></div>
            </div>
        </div>
    )
}

export default SkillsInfo;

