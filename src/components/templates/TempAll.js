import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import db, { auth } from "../../firebase-setup/firebase";
import "./TempAll.css";
import TempOne from "./template1/TempOne";
import { useReactToPrint } from "react-to-print";
import DownloadIcon from '@mui/icons-material/Download';
import { IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";


const TempAll = ({ dref, setGenerateTemp }) => {

  const [user] = useAuthState(auth);
  const [userInfoData, setUserInfoData] = useState(null);
  const [fetchLoad, setFetchLoad] = useState(false)

  // fetch user data
  useEffect(() => {
    async function fetchData() {
      if (user) {
        setFetchLoad(true)
        const querySnapshot = doc(db, "user-details", user.email);
        if (querySnapshot.id === user.email) {
          const allData = await getDoc(querySnapshot);
          allData.data() && setUserInfoData(allData.data()); setFetchLoad(false)
        }
      }
    }
    fetchData();
  }, [user])


  const handleprint = useReactToPrint({
    content: () => dref?.current,
  });

  if (fetchLoad) {
    return <div className="templateall">
      <h6>loading...</h6>
    </div>
  }

  return (
    <div className="templateall">
      <div className="temptop">

        <IconButton onClick={() => setGenerateTemp(false)}>
          <ArrowBack />
        </IconButton>
        <IconButton onClick={handleprint}>
          <DownloadIcon />
        </IconButton>
      </div>
      <div className="tempall__content">
        <TempOne data={userInfoData} dref={dref} />
      </div>
    </div>
  )
}

export default TempAll;