import "./Resume.css"
import { useEffect, useState } from "react";
import GeneralInfo from "../../components/storeinfo/generalinfo/GeneralInfo";
import EducationInfo from "../../components/storeinfo/educationinfo/EducationInfo";
import ProjectInfo from "../../components/storeinfo/projectinfo/ProjectInfo";
import SkillsInfo from "../../components/storeinfo/skillsinfo/SkillsInfo";
import AchievementsInfo from "../../components/storeinfo/achievements/AchievementsInfo";
import OthersInfo from "../../components/storeinfo/othersinfo/OthersInfo";
import CloseIcon from '@mui/icons-material/Close';

// firebase
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from "firebase/firestore";
import { auth } from '../../firebase-setup/firebase';
import db from "../../firebase-setup/firebase";
import { Alert } from "@mui/material";
import LoginComp from "../../components/logincomp/LoginComp";
import GeneralInfoSkeleton from "../../components/allSkeletons/GeneralInfoSkeleton";
import EducationInfoSkeleton from "../../components/allSkeletons/EducationInfoSkeleton";
import TempAll from "../../components/templates/TempAll";


const Resume = ({ signIn, fbsignin, dref }) => {
    const [activeSection, setActiveSection] = useState('general')
    const [user] = useAuthState(auth);
    const [userInfoData, setUserInfoData] = useState(null);
    const [showWarn, setShowWarn] = useState(false)
    const [save, setSave] = useState(false);
    const [fetchLoad, setFetchLoad] = useState(false)
    const [generateTemp, setGenerateTemp] = useState(false)

    // fetch user data
    useEffect(() => {
        async function fetchData() {
            if (user) {
                setFetchLoad(true)
                const querySnapshot = doc(db, "user-details", user.email);
                if (querySnapshot.id === user.email) {
                    const allData = await getDoc(querySnapshot);
                    setUserInfoData(allData.data());
                    setFetchLoad(false)
                }
            }
        }
        fetchData();
    }, [user, activeSection])


    useEffect(() => {
        if (localStorage.getItem("activeSection")) {
            setActiveSection(localStorage.getItem("activeSection"))
        } else {
            setActiveSection('general')
        }
        setShowWarn(true)
    }, [])

    const handletemp = () => {
        setGenerateTemp(true)
    }

    if (generateTemp) {
        return <TempAll dref={dref} setGenerateTemp={setGenerateTemp} />
    }
    return (
        <div className="resume">
            <div className="main">
                {(user && showWarn) && <Alert severity="warning" color="warning" className="savealert">
                    <span>Make sure to <b style={{ color: 'red' }}>save</b> before moving next. </span>
                    <CloseIcon onClick={() => setShowWarn(false)} />
                </Alert>}
                {!user ? <LoginComp signIn={signIn} fbsignin={fbsignin} /> : <>
                    <div className="top">
                        <h6 className={`${activeSection === 'general' && 'active'}`}
                            onClick={() => { setActiveSection('general'); localStorage.setItem("activeSection", "general") }}>GENERAL INFO</h6>
                        <h6 className={`${activeSection === 'education' && 'active'}`}
                            onClick={() => { setActiveSection('education'); localStorage.setItem("activeSection", "education") }}>EDUCATION</h6>
                        <h6 className={`${activeSection === 'project' && 'active'}`}
                            onClick={() => { setActiveSection('project'); localStorage.setItem("activeSection", "project") }}>PROJECTS</h6>
                        <h6 className={`${activeSection === 'achieve' && 'active'}`}
                            onClick={() => { setActiveSection('achieve'); localStorage.setItem("activeSection", "achieve") }}>EXPERIENCE & SKILLS</h6>
                        <h6 className={`${activeSection === 'others' && 'active'}`}
                            onClick={() => { setActiveSection('others'); localStorage.setItem("activeSection", "others") }}>OTHERS</h6>
                        <h6 className="active" style={{ backgroundColor: 'seagreen' }} onClick={handletemp}>Generate</h6>
                    </div>
                    {fetchLoad ? <>{activeSection === 'general' ? <GeneralInfoSkeleton /> :
                        activeSection === 'education' ? < EducationInfoSkeleton /> :
                            activeSection === 'project' ? <h6>Project</h6> :
                                activeSection === 'achieve' ? <h6>achieve</h6> :
                                    activeSection === 'others' ? <h6>others</h6> : <div></div>}</> : <>
                        {activeSection === 'general' ? <GeneralInfo userInfoData={userInfoData} save={save} setSave={setSave} /> :
                            activeSection === 'education' ? <EducationInfo userInfoData={userInfoData} save={save} setSave={setSave} /> :
                                activeSection === 'project' ? <ProjectInfo userInfoData={userInfoData} save={save} setSave={setSave} /> :
                                    activeSection === 'skills' ? <SkillsInfo /> :
                                        activeSection === 'achieve' ? <AchievementsInfo /> :
                                            activeSection === 'others' ? <OthersInfo /> : <div></div>}
                    </>}</>}
            </div>
        </div>
    )
}

export default Resume;
