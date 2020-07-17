import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const GatsbyImage = () => {
  const data = useStaticQuery(graphql`
    query {
      gatsbyImage: file(relativePath: { eq: "great_gatsby.png" }) {
        childImageSharp {
          fluid(maxWidth: 275, grayscale: true) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Img fluid={data.gatsbyImage.childImageSharp.fluid} alt="Great Gatsby" />
  )
}

export default GatsbyImage
