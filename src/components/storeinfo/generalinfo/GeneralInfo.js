import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";
import UpgradeIcon from '@mui/icons-material/Upgrade';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import RedditIcon from '@mui/icons-material/Reddit';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import './GeneralInfo.css'
import Alert from '@mui/material/Alert';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase-setup/firebase';
import { updateDoc, doc } from "firebase/firestore";
import db from '../../../firebase-setup/firebase';

// material ui
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const GeneralInfo = ({ userInfoData, setSave, save }) => {
    const [user] = useAuthState(auth);

    // general info states
    const [name, setName] = useState('')
    const [tagline, setTagline] = useState('')
    const [email, setEmail] = useState('')
    const [phonenum, setPhoneNumber] = useState('')
    const [profileImageUrl, setProfileImageUrl] = useState('')
    const [socialLinksAll, setSocialLinksAll] = useState('')
    const [socialTitle, setSocialTitle] = useState('')
    const [socialLink, setSocialLink] = useState('')
    const [activeChip, setActiveChip] = useState('new')
    const [socialLinkpdateIndex, setSocialLinkpdateIndex] = useState(0)
    const [socialIcon, setSocialIcon] = useState('FacebookIcon');

    const AllIcons = [
        { iconValue: 'FacebookIcon', icon: <FacebookIcon /> },
        { iconValue: 'InstagramIcon', icon: <InstagramIcon /> },
        { iconValue: 'TwitterIcon', icon: <TwitterIcon /> },
        { iconValue: 'youtubeicon', icon: <YouTubeIcon /> },
        { iconValue: 'linkedinicon', icon: <LinkedInIcon /> },
        { iconValue: 'PinterestIcon', icon: <PinterestIcon /> },
        { iconValue: 'RedditIcon', icon: <RedditIcon /> },
    ]
    // add user logged in details
    async function addDetails() {
        if (user) {
            const userEmail = user.email;
            // user-details
            try {
                // Add a new document in collection "cities"
                await updateDoc(doc(db, "user-details", userEmail), {
                    'GeneralInfoDetails': {
                        'generalarray': {
                            name,
                            tagline,
                            email,
                            phonenum,
                            profileImageUrl,
                            socialLinks: socialLinksAll
                        },
                        sectionType: 'general'
                    }
                });
                setSave(true)
            } catch (e) {
                console.log(e)
            }
            setTimeout(() => {
                setSave(false)
            }, 2000)
        }
    }

    useEffect(() => {
        if (userInfoData) {
            const generalDetailsFirebase = userInfoData?.GeneralInfoDetails?.generalarray
            setName(generalDetailsFirebase?.name || '')
            setTagline(generalDetailsFirebase?.tagline || '')
            setEmail(generalDetailsFirebase?.email || '')
            setPhoneNumber(generalDetailsFirebase?.phonenum || '')
            setProfileImageUrl(generalDetailsFirebase?.profileImageUrl || '')
            setSocialLinksAll(generalDetailsFirebase?.socialLinks || '')
        }
    }, [userInfoData])

    useEffect(() => {

    }, [])

    // delete link chip
    const deletechip = (chipIndex) => {
        setSocialLinksAll(socialLinksAll.filter((item, i) => i !== chipIndex))
        setSocialLink('')
        setSocialTitle('')
        setSocialIcon('FacebookIcon')
        setActiveChip('new')
        return;
    }

    // update social links
    const updateSocailLinks = () => {
        let tempList = socialLinksAll
        tempList[socialLinkpdateIndex] = { stitle: socialTitle, slink: socialLink, sicon: socialIcon }
        setSocialLinksAll(tempList)
    }

    // add social links as chips
    const addSocailLinks = async () => {
        if (socialTitle && socialLink) {
            setSocialLinksAll(oldArray => [...oldArray, { stitle: socialTitle, slink: socialLink, sicon: socialIcon }])
        }
        setSocialLink('')
        setSocialTitle('')
        setSocialIcon('FacebookIcon')
    }
    const handleChange = (e) => {
        setSocialIcon(e.target.value);
    };

    // display chip
    const handlechipdisplay = (chiptitle, chiplink, chipicon) => {
        setSocialTitle(chiptitle)
        setSocialLink(chiplink)
        setSocialIcon(chipicon)
    }

    return (
        <div className="bottom">
            {save && <Alert severity="success" color="info" className="savealert">
                saved successfully!
            </Alert>}
            {/* bottom left column */}
            <div className="bottom-left data">
                {/* name */}
                <span>
                    <label htmlFor="name">NAME<sup>*</sup> : </label>
                    <input type="text" id="name" placeholder="Name"
                        value={name} onChange={(e) => setName(e.target.value)} />
                </span>
                {/* tagline */}
                <span>
                    <label htmlFor="tagline">TAGLINE<sup>*</sup> : </label>
                    <input type="text" id="tagline" placeholder="Tagline"
                        value={tagline} onChange={(e) => setTagline(e.target.value)} />
                </span>


                {/* address */}
                <span>
                    <label htmlFor="email">EMAIL<sup>*</sup> : </label>
                    <input type="email" id="email" placeholder="Email"
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                </span>

                {/* phone number */}
                <span>
                    <label htmlFor="phno">PHONE NUMBER : </label>
                    <input type="text" id="phno" placeholder="Phone Number"
                        value={phonenum} onChange={(e) => setPhoneNumber(e.target.value)} />
                </span>
                {/* Social link */}
                <span className="social-title">
                    <label htmlFor="social">SOCIAL LINKS : </label>
                    <span>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">icon</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={socialIcon}
                                    label="Age"
                                    onChange={handleChange}
                                >
                                    {AllIcons.map((icon, i) => (
                                        <MenuItem key={i} value={icon.iconValue}>{icon.icon}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <input type="text" id="socail" placeholder="Title"
                            value={socialTitle} onChange={(e) => setSocialTitle(e.target.value)} />
                        <input type="text" placeholder="Link" value={socialLink} onChange={(e) => setSocialLink(e.target.value)} />
                        {activeChip !== 'new' ? <IconButton onClick={updateSocailLinks}><UpgradeIcon color="success" /></IconButton> :
                            <IconButton onClick={addSocailLinks}><AddIcon color="success" /></IconButton>}

                    </span>
                    {socialLinksAll.length > 0 &&
                        <div className="chipsAll links">
                            <div className={`new-chip ${activeChip === 'new' ? 'chipactive' : ''}`} onClick={() => {
                                setSocialLink(''); setActiveChip('new');
                                setSocialTitle(''); setSocialIcon('FacebookIcon')
                            }}>NEW</div>
                            {socialLinksAll.map((chip, i) =>
                                <div key={`chip${i}`} value={i}
                                    className={`chips ${activeChip === i ? 'chipactive' : ''}`}>
                                    <span onClick={() => {
                                        setActiveChip(i);
                                        setSocialLinkpdateIndex(i)
                                        handlechipdisplay(chip.stitle, chip.slink, chip.sicon, i)
                                    }}>{AllIcons.filter(icon => icon.iconValue === chip.sicon).map(filteredIcon => filteredIcon.icon)}{chip.stitle}</span>
                                    <CloseIcon onClick={() => { deletechip(i); }} />
                                </div>)}
                        </div>}
                </span>
            </div>

            {/* right */}
            <div className="bottom-right data">

                {/* profile picture */}
                <span>
                    <label htmlFor="link">PROFILE PICTURE : </label>
                    <span>
                        <input type="text" name="link" placeholder="Link of the picture"
                            value={profileImageUrl} onChange={(e) => setProfileImageUrl(e.target.value)} />
                        <span>or,</span>
                        <label htmlFor="pfp" className="pfptext">UPLOAD HERE<span></span></label>
                        <input type="file" id="pfp" style={{ width: '90%' }} />
                    </span>
                </span>

                {profileImageUrl ? <span className='displaypfp'>
                    <img src={profileImageUrl} alt={user.displayName} />
                </span> : <span className='displaypfp'>
                    <img src="https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg"
                        alt="images" />
                </span>}

                {/* button to add */}
                <button className="simpleButton" onClick={addDetails}>SAVE</button>
                <span></span> {/* empty span for a gap in mobile view  */}
            </div>
        </div>
    )
}

export default GeneralInfo;
