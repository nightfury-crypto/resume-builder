import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import './AchievementsInfo.css';
import { IconButton } from '@mui/material';

const AchievementsInfo = () => {
  const [projectTitle, setProjectTitle] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [projectLiveLink, setProjectLiveLink] = useState('')
  const [projectSourceLink, setProjectSourceLink] = useState('')
  const [educationActiveChip, setEducationActiveChip] = useState('new')
  const [socialLinkpdateIndex, setSocialLinkpdateIndex] = useState('0')
  const [AchievementsInfoAll, setAchievementsInfoAll] = useState([
    {
      atitle: 'HACKTOBERFEST 2022', adescription: 'Made 4 pull request and successfully completed the Hacktoberfest 2022.',
    },
    {
      atitle: 'Github student hub', adescription: 'Made 4 pull request and successfully completed the Hacktoberfest 2022.',
    },

  ])

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
      <div className="bottom-left data">
        {/* TITLE */}
        <span>
          <label htmlFor="achievetitle">ACHIEVEMENT TITLE<sup>*</sup> : </label>
          <input type="text" id="achievetitle" placeholder="Title"
            value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} />
        </span>
        {/* ACHIEVEMENT NAME */}
        <span>
          <label htmlFor="achievedescription">ACHIEVEMENT DESCRIPTION<sup>*</sup> : </label>
          <textarea type="text" id="achievedescription" placeholder="Achievement description"
            value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} />
        </span>
        {AchievementsInfoAll.length > 0 &&
          <div className="previewEducationInfo AchievementsInfo">
            <div className={`new-chip ${educationActiveChip === 'new' ? 'active' : ''}`}
              onClick={() => {
                setProjectTitle(''); setProjectDescription('');
                setProjectLiveLink(''); setProjectSourceLink('');
                setEducationActiveChip('new');
              }}>NEW</div>

            {AchievementsInfoAll.map((preview, i) =>
              <div key={`preview${i}`} value={i} className={`chips ${educationActiveChip === preview.atitle ? 'active' : ''}`}>
                <span onClick={() => {
                  setEducationActiveChip(preview.atitle);
                  setSocialLinkpdateIndex(i)
                  handlechipdisplay(preview.atitle, preview.adescription, i)
                }}>
                  <span >{`Title : ${preview.atitle}`}</span>
                  <span>{`Description : ${preview.adescription}`}</span>
                </span>
                <CloseIcon onClick={() => { deleteEducationchip(i); }} />
              </div>)}
          </div>}
        <div style={{ paddingBottom: '30px' }}></div>
      </div>
      <div className="bottom-right data">
        {/* skills */}
        <span className="social-title">
          <label htmlFor="Skill">SKILL : </label>
          <span>
            <input type="text" placeholder="Skill"
              value={projectLiveLink} onChange={(e) => setProjectLiveLink(e.target.value)} />
            <IconButton>
              <AddIcon />
            </IconButton>
          </span>
        </span>

        {/* button to add */}
        <button className="simpleButton">SAVE</button>
        <span></span> {/* empty span for a gap in mobile view  */}
      </div>
    </div>
  )
}

export default AchievementsInfo;
