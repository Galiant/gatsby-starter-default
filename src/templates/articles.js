import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import _ from "lodash"

import Layout from "../components/layout"
import Pagination from "../components/pagination"

// Component to place a conditional wrapper around content.
const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children

const ArticleIndex = ({ data, pageContext, location }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location}>
      <section>
        <h2>Articles</h2>
        <ul>
          {posts.map(({ node }, index) => (
            <li key={index}>
              {node.frontmatter.featimg && (
                <figure>
                  <Link to={node.fields.slug}>
                    <Img
                      fixed={node.frontmatter.featimg.childImageSharp.fixed}
                      alt={node.frontmatter.title}
                    />
                  </Link>
                </figure>
              )}
              <ConditionalWrapper
                // If featured image, wrap content in <div>.
                condition={node.frontmatter.featimg}
                wrapper={children => <div>{children}</div>}
              >
                <Link to={node.fields.slug}>
                  <h1>{node.frontmatter.title}</h1>
                </Link>

                <div>
                  by {node.frontmatter.author}. Published{" "}
                  {new Date(node.frontmatter.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                </div>
                <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              </ConditionalWrapper>
            </li>
          ))}
        </ul>
      </section>
      <hr />
      <Pagination pageContext={pageContext} />
      <hr />
    </Layout>
  )
}

export default ArticleIndex

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          excerpt
          id
          frontmatter {
            title
            date
            author
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
