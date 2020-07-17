import React from "react"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
// import styled from "styled-components"
import GatsbyImage from "../components/gatsbyImage"

// const NewWrapper = styled.div`
//   border-radius: 1rem;
//   background: #ffffff;
//   box-shadow: 1rem 1rem 3rem hsla(0, 0%, 100%, 0.2), -1rem -1rem 3rem #ffffff;
// `

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    {/* <NewWrapper> */}
    <GatsbyImage />
    <h1>I am learning Gatsby</h1>
    <p>Welcome on my first Gatsby site. Let's go to build it together.</p>
    {/* </NewWrapper> */}
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
  </Layout>
)

export default IndexPage
