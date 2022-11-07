import { IconButton, Skeleton } from '@mui/material'
import React from 'react';
import "../storeinfo/generalinfo/GeneralInfo.css"

const GeneralInfoSkeleton = () => {
    return (
        <div className="bottom">
            {/* bottom left column */}
            <div className="bottom-left data">
                {/* name */}
                <span>
                <label><Skeleton variant="text" width={80} height={30} /></label>
                    <Skeleton variant="rounded" height={40} />
                </span>
                {/* tagline */}
                <span>
                <label><Skeleton variant="text" width={80} height={30} /></label>
                    <Skeleton variant="rounded" height={40} />
                </span>


                {/* address */}
                <span>
                <label><Skeleton variant="text" width={80} height={30} /></label>
                    <Skeleton variant="rounded" height={40} />
                </span>

                {/* phone number */}
                <span>
                <label><Skeleton variant="text" width={80} height={30} /></label>
                    <Skeleton variant="rounded" height={40} />
                </span>
                {/* Social link */}
                <span className="social-title">
                <label><Skeleton variant="text" width={80} height={30} /></label>

                    <span>
                        <Skeleton variant="rounded" width={60} height={40} />
                        <div style={{ width: '100%' }}>
                            <Skeleton variant="rounded" height={40} />
                        </div>
                        <div><Skeleton variant="rounded" width={40} height={40} /></div>


                    </span>
                </span>
            </div>

            {/* right */}
            <div className="bottom-right data">

                {/* profile picture */}
                <span>
                <label><Skeleton variant="text" width={80} height={30} /></label>
                    <Skeleton variant="rounded" height={40} />
                </span>

                <span className='displaypfp'>
                    <Skeleton variant="rounded" width={200} height={200} />
                </span>

                {/* button to add */}
                <button className="simpleButton"><Skeleton variant="rounded" height={40} /></button>
                <span></span> {/* empty span for a gap in mobile view  */}
            </div>
        </div>
    )
}

export default GeneralInfoSkeleton;
