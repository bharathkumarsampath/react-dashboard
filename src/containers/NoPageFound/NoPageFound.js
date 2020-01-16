import React from 'react';
import NoPage404 from '../../assets/images/img-404.svg'
import './NoPageFound.css'
import Toolbar from '../../components/Toolbar/Toolbar'
import { useHistory } from "react-router-dom"

const NoPageFound = () => {
  let history = useHistory();
  function backToHomePage() {
    history.push('/dashboard');
  }
  return (
    <div>
      <Toolbar />
      <div style={{ backgroundColor: 'rgb(245,247,251)' }}>
        <img src={NoPage404} alt='No Page Found' style={{ marginTop: '144px' }} />
        <p className='OopsPageNotFound' style={{ marginLeft: '466px' }}>Oops! Page Not Found</p>
        <p className='WeAreSorry' style={{ marginLeft: '300px' }}>We are sorry but the page you are looking for doesn't exist or has been moved</p>
        <p className='BackToHomepage' style={{ marginLeft: '586px', paddingBottom: '95px', cursor: 'pointer' }} onClick={backToHomePage}>Back to HomePage</p>
      </div>
    </div >

  );
}

export default NoPageFound;
