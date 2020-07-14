import React from "react"
import { Link } from "gatsby"
import style from "../styles/mainnav.module.css"

const MainNav = () => {
  return (
    <nav className={style.nav}>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </nav>
  )
}

export default MainNav
