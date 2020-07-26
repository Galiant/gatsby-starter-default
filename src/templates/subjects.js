import React from "react"
import { graphql, Link } from "gatsby"
import _ from "lodash"

import Layout from "../components/layout"
import Pagination from "../components/pagination"

// Component to place a conditional wrapper around content.
const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children

const ArticleIndex = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges
  const { subject } = pageContext
  console.log(pageContext)

  let pageHeader = `Articles`
  if (subject) {
    pageHeader = `Filed under ${subject}:`
  }

  return (
    <Layout>
      <section>
        <h2>{pageHeader}</h2>
        <ul>
          {posts.map(({ node }, index) => (
            <li key={index}>
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
                <div>
                  Filed under:{" "}
                  {node.frontmatter.subject.map((subject, index) => [
                    index > 0 && ", ",
                    <Link key={index} to={`/subjects/${_.kebabCase(subject)}`}>
                      {subject}
                    </Link>,
                  ])}
                </div>
                <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              </ConditionalWrapper>
            </li>
          ))}
        </ul>
      </section>
      <Pagination pageContext={pageContext} />
    </Layout>
  )
}

export default ArticleIndex

export const query = graphql`
  query($subject: String!, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: { frontmatter: { subject: { in: [$subject] } } }
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
            subject
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
