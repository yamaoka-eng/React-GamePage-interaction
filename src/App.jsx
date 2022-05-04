import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"

import Cars from "./components/Cars"
import { getImage } from "./utils"

import "./App.scss"

const date = [
  {id: 1, date: 'January'},
  {id: 2, date: 'February'},
  {id: 3, date: 'March'},
  {id: 4, date: 'April'},
  {id: 5, date: 'May'},
  {id: 6, date: 'June'},
  {id: 7, date: 'July'},
  {id: 8, date: 'August'},
  {id: 9, date: 'Seotember'},
  {id: 10, date: 'October'},
  {id: 11, date: 'November'},
  {id: 12, date: 'December'}
]

const NavData = [
  {id: 1, name: 'NEWS'},
  {id: 2, name: 'PREVIEWS'},
  {id: 3, name: 'PEVIEWS'},
  {id: 4, name: 'FEATURES'},
  {id: 5, name: 'VIDEOS'}
]

const Nav = () => {

  const [navActive, setNavActive] = useState(false)

  return (
    <div className={`nav ${navActive && 'navActive'}`} >
      <div className="mini-nav-icon" onClick={()=>setNavActive(!navActive)}>
        <p className={`fist br ${navActive && 'rotate'}`}></p>
        <p className={`last br ${navActive && 'rotate'}`}></p>
      </div>
      <div className="logo">
        <img src={getImage("logo.png")} alt="" />
      </div>
      <ul className="nav-bar">{NavData.map(item=><li key={item.id}><span>{item.name}</span></li>)}</ul>
    </div>
  )
}

const Date = () => {
  return (
    <div className="date">
      <div className="date-list">
        <ul>{date.map(item => (<li key={item.id}><a href=""><h3>{item.date}</h3></a></li>))}</ul>
      </div>
    </div>
  )
}

const App = () => {

  const el = useRef()
  const q = gsap.utils.selector(el)

  useEffect(()=>{
    gsap.fromTo(q('.logo'), { y: -60, opacity: 0 },{ y: 0, opacity: 1, skewX: '-10deg', duration: 1.5 })
    gsap.fromTo(q('.nav-bar'), { x: 60, opacity: 0 },{ x: 0, opacity: 1, duration: 1.5 })
    gsap.fromTo(q('.date'), { y: 60, opacity: 0 },{ y: 0, opacity: 1, duration: 1.5 })
    gsap.fromTo(q('.release'), { y: -60, opacity: 0 },{ y: 0, opacity: 1, duration: 1.5 })
  },[])

  return (
    <div className="wrap" ref={el}>
      <Nav/>
      <div className="container">
        <div className="left">
          <Date />
          <div className="release">
            <h3>
              Release<br />Date
            </h3>
          </div>
        </div>
        <div className="right">
          <Cars/>
        </div>
      </div>
    </div>
  )
}

export default App
