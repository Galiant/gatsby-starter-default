import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import style from "../styles/mainnav.module.css"

const MainNav = ({ siteMenuLinks }) => {
  return (
    <nav className={style.nav}>
      {siteMenuLinks.map(props => (
        <li key={props.name}>
          <Link to={props.link}>{props.name}</Link>
        </li>
      ))}
    </nav>
  )
}

MainNav.propTypes = {
  siteMenuLinks: PropTypes.string,
}

export default MainNav
