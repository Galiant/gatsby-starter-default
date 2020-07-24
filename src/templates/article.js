import React from "react"

import Layout from "../components/layout"

export default ({ data }) => {
  const article = data.markdownRemark
  return (
    <Layout>
      <div>
        <h2>{article.frontmatter.title}</h2>
        <p>by {article.frontmatter.author}</p>
        <p>
          Published{" "}
          {new Date(article.frontmatter.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <hr />
      </div>
    </Layout>
  )
}

export default Post

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        author
        date
        title
      }
    }
  }
`
