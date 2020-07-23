import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Post from "../components/post"
import SEO from "../components/seo"

const BlogPage = ({ data }) => (
  <Layout>
    <SEO title="Blog" />
    <h1>Blog</h1>
    <p>Here you can find my posts.</p>
    <hr />
    <main>
      <article>
        {data.posts.nodes.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </article>
    </main>
  </Layout>
)

export default BlogPage

export const query = graphql`
  {
    posts: allPost(sort: { fields: id, order: ASC }) {
      nodes {
        body
        title
        id
      }
    }
  }
`
