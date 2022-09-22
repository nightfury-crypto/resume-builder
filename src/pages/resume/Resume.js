import "./Resume.css"
import { useState } from "react";
import GeneralInfo from "../../components/storeinfo/generalinfo/GeneralInfo";
import EducationInfo from "../../components/storeinfo/educationinfo/EducationInfo";
import ProjectInfo from "../../components/storeinfo/projectinfo/ProjectInfo";
import SkillsInfo from "../../components/storeinfo/skillsinfo/SkillsInfo";
import AchievementsInfo from "../../components/storeinfo/achievements/AchievementsInfo";
import OthersInfo from "../../components/storeinfo/othersinfo/OthersInfo";

const Resume = () => {
    const [activeSection, setActiveSection] = useState('general')
    return (
        <div className="resume">
            <div className="main">
                <div className="top">
                    <h6 className={`${activeSection === 'general' && 'active'}`}
                        onClick={() => setActiveSection('general')}>GENERAL INFO</h6>
                    <h6 className={`${activeSection === 'education' && 'active'}`}
                        onClick={() => setActiveSection('education')}>EDUCATION</h6>
                    <h6 className={`${activeSection === 'project' && 'active'}`}
                        onClick={() => setActiveSection('project')}>PROJECTS</h6>
                    <h6 className={`${activeSection === 'skills' && 'active'}`}
                        onClick={() => setActiveSection('skills')}>SKILLS</h6>
                    <h6 className={`${activeSection === 'achieve' && 'active'}`}
                        onClick={() => setActiveSection('achieve')}>ACHIEVEMENTS</h6>
                    <h6 className={`${activeSection === 'others' && 'active'}`}
                        onClick={() => setActiveSection('others')}>OTHERS</h6>
                </div>
                {activeSection === 'general' ? <GeneralInfo /> :
                    activeSection === 'education' ? <EducationInfo /> :
                        activeSection === 'project' ? <ProjectInfo /> :
                            activeSection === 'skills' ? <SkillsInfo /> :
                                activeSection === 'achieve' ? <AchievementsInfo /> :
                                    activeSection === 'others' ? <OthersInfo />: <div></div>}
            </div>
        </div>
    )
}

export default Resume;
