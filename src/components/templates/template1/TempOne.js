import { useEffect, useState } from "react";
import "./TempOne.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import RedditIcon from '@mui/icons-material/Reddit';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

// section icons
import SchoolIcon from '@mui/icons-material/School';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

const TempOne = ({ data, dref }) => {

  const [generalData, setGeneralData] = useState([])
  const [educationData, setEducationData] = useState([])
  const [projectData, setProjectData] = useState([])

  const AllIcons = [
    { iconValue: 'FacebookIcon', icon: <FacebookIcon /> },
    { iconValue: 'InstagramIcon', icon: <InstagramIcon /> },
    { iconValue: 'TwitterIcon', icon: <TwitterIcon /> },
    { iconValue: 'youtubeicon', icon: <YouTubeIcon /> },
    { iconValue: 'linkedinicon', icon: <LinkedInIcon /> },
    { iconValue: 'PinterestIcon', icon: <PinterestIcon /> },
    { iconValue: 'RedditIcon', icon: <RedditIcon /> },
  ]

  useEffect(() => {
    if (data) {
      setGeneralData([data?.GeneralInfoDetails.generalarray])
      setEducationData([data?.EducationInfoDetails.educationarray?.sort((a, b) => b.eYearPass - a.eYearPass)])
      setProjectData([data?.ProjectInfoDetails.projectarray])
    }
  }, [data])


  return (
    <div className="template1" ref={dref}>
      {/* general details */}
      <div className="s">
        {generalData.map((d, i) => (
          <div className="general" key={i}>
            <h3>{d.name}</h3>
            <span>
              {d.socialLinks.map((link, i) => (
                <div key={i} className="subhead">
                  <p>
                    <a href={link.slink} target="_blank">{AllIcons.filter(icon => icon.iconValue === link.sicon).map(filteredIcon => filteredIcon.icon)}
                      {link.slink}</a>
                  </p>

                  <p>
                    <a href={`mailto: ${d.email}`}><EmailIcon />{d.email}</a>
                  </p>
                  <p><a href={`tel: ${d.phonenum}`}><LocalPhoneIcon />{d.phonenum}</a></p>
                </div>
              ))}
            </span>
            <div className="belowdata">
              {/* education details */}
              {educationData && <div className="education">
                <div className="top">
                  <SchoolIcon />
                  <h3>EDUCATION</h3>
                </div>
                {educationData?.map((edu) => edu.map((d, j) => (
                  <div className="contentdata" key={j}>
                    <div className="pdesc">
                      <h5>{d.etitle}</h5>
                      <ul className="plink" style={{listStyleType: 'none'}}>
                        <li>{d.eYearPass}</li>
                        <span>|</span>
                        <li>{d.eCity}, {d.eState}, {d.eCountry}</li>
                      </ul>
                      <p>{d.eSchool}</p>
                      <p>{d.eScoreType} scored {d.eScoreType === 'percent' ?  `${d.eScore}%` : d.eScore }.</p>
                      
                    </div>
                  </div>
                )))}
              </div>}

              {/* project details */}
              <div className="projects">
                <div className="top">
                  <AccountTreeIcon />
                  <h3>PROJECTS</h3>
                </div>
                {projectData?.map((edu) => edu.map((d, j) => (
                  <div className="contentdata" key={j}>
                    <div className="pdesc">
                      <h5>{d.ptitle}</h5>
                      <h6>{d.pdesc}</h6>
                      <ul className="plink">
                        <a href={d.plive}>live</a>
                        <span>|</span>
                        <a href={d.psrc}>code</a>
                      </ul>
                    </div>
                  </div>
                )))}

              </div>

              {/* project details */}
              <div className="projects">
                <div className="top">
                  <WorkspacePremiumIcon />
                  <h3>WORK EXPERIENCE</h3>
                </div>

                <div className="contentdata">
                  <div className="pdesc">
                    <h5>VERKA DAIRY PLANT</h5>
                    <h6>In verka plant in production/contol section. Worked as a HR there.</h6>
                    <ul className="plink">
                      <a href="#">2020</a>
                      <span>-</span>
                      <a href="#">2022</a>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TempOne;

