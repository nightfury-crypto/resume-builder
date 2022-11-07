import React from 'react'
import { Skeleton } from '@mui/material'
import "../storeinfo/educationinfo/EducationInfo.css"

const EducationInfoSkeleton = () => {
    return (
        <div className="bottom">
            {/* bottom left column */}
            <div className="bottom-left data">
                {/* title */}
                <span>
                    <label><Skeleton variant="text" width={80} height={30} /></label>
                    <Skeleton variant="rounded" height={40} />
                </span>
                {/* University */}
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
                    </span>
                </span>
                {/* phone number */}
                <span>
                    <label><Skeleton variant="text" width={80} height={30} /></label>
                    <Skeleton variant="rounded" height={40} />
                </span>
            </div>

            {/* right */}
            <div className="bottom-right data">

                {/* profile picture */}
                <span>
                    <Skeleton variant="rounded" height={40} />
                </span>
            </div>
        </div>
    )
}

export default EducationInfoSkeleton
