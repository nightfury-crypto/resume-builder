import React, { useState } from 'react';
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

// material ui
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const GeneralInfo = () => {
    // general info states
    const [name, setName] = useState('')
    const [tagline, setTagline] = useState('')
    const [socialTitle, setSocialTitle] = useState('')
    const [socialLink, setSocialLink] = useState('')
    const [activeChip, setActiveChip] = useState('new')
    const [socialLinksAll, setSocialLinksAll] = useState([])
    const [socialLinkpdateIndex, setSocialLinkpdateIndex] = useState(0)
    const [socialIcon, setSocialIcon] = useState('FacebookIcon');

    const AllIcons = [
        {iconValue: 'FacebookIcon', icon: <FacebookIcon />},
        {iconValue: 'InstagramIcon', icon: <InstagramIcon />},
        {iconValue: 'TwitterIcon', icon: <TwitterIcon />},
        {iconValue: 'youtubeicon', icon: <YouTubeIcon />},
        {iconValue: 'linkedinicon', icon: <LinkedInIcon />},
        {iconValue: 'PinterestIcon', icon: <PinterestIcon />},
        {iconValue: 'RedditIcon', icon: <RedditIcon />},
]

    // delete link chip
    const deletechip = (chipIndex) => {
        setSocialLinksAll(socialLinksAll.filter((item, i) => i !== chipIndex))
        setSocialLink('')
        setSocialTitle('')
        setActiveChip('new')
        return;
    }

    // update social links
    const updateSocailLinks = () => {
        let tempList = socialLinksAll
        tempList[socialLinkpdateIndex] = { stitle: socialTitle, slink: socialLink }
        setSocialLinksAll(tempList)
    }

    // add social links as chips
    const addSocailLinks = () => {
        if (socialTitle && socialLink) {
            setSocialLinksAll(oldArray => [...oldArray, { stitle: socialTitle, slink: socialLink }])
        }
        setSocialLink('')   
        setSocialTitle('')
    }
    const handleChange = (e) => {
        setSocialIcon(e.target.value);
    };
    // display chip
    const handlechipdisplay = (chiptitle, chiplink) => {
        setSocialTitle(chiptitle)
        setSocialLink(chiplink)
    }

    return (
        <div className="bottom">
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
                    <input type="email" id="email" placeholder="Email" />
                </span>

                {/* phone number */}
                <span>
                    <label htmlFor="phno">PHONE NUMBER : </label>
                    <input type="number" id="phno" placeholder="Phone Number" />
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
                                    {AllIcons.map((icon,i) => (
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
                                setSocialTitle('');
                            }}>NEW</div>
                            {socialLinksAll.map((chip, i) =>
                                <div key={`chip${i}`} value={i} className={`chips ${activeChip === chip.stitle ? 'chipactive' : ''}`}>
                                    <span onClick={() => {
                                        setActiveChip(chip.stitle);
                                        setSocialLinkpdateIndex(i)
                                        handlechipdisplay(chip.stitle, chip.slink, i)
                                    }}>{chip.stitle}</span>
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
                        <input type="text" name="link" placeholder="Link of the picture" />
                        <span>or,</span>
                        <label htmlFor="pfp" className="pfptext">UPLOAD HERE<span></span></label>
                        <input type="file" id="pfp" style={{ width: '90%' }} />
                    </span>
                </span>

                {/* button to add */}
                <button className="simpleButton">ADD</button>
                <span></span> {/* empty span for a gap in mobile view  */}
            </div>
        </div>
    )
}

export default GeneralInfo
