import React from 'react'
import githubLogo from '../assets/github-mark.svg'
import linkedInLogo from '../assets/iconmonstr-linkedin-3.svg'
import kofiLogo from '../assets/Logo_white_stroke@2x.png'
import './Footer.css'

const Footer = () => {
  return (
    <div id='Footer'>
      <div id='socialIcons'>
        <a href='https://github.com/dhenry827' target='_blank' ><img src={githubLogo} height='20px'/></a>
        <a href='https://www.linkedin.com/in/dujuanye-henry-796577142/' target='_blank' ><img src={linkedInLogo} height='20px' /></a>
        <a href='https://ko-fi.com/dujuanyehenry' target='_blank' ><img src={kofiLogo} height='20px' /></a>
      </div>
    </div>
  )
}

export default Footer