/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const _ = require(`lodash`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { paginate } = require("gatsby-awesome-pagination")

/**
 * Articles
 */

// Markdown items: Create slug and collection nodes based on folder
exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `content` })

    actions.createNodeField({
      node,
      name: `slug`,
      value: `/article${slug}`,
    })
  }
}

// Generate pages for each article
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  //Query all the data
  const queryResult = await graphql(`
    {
      postQuery: allMarkdownRemark(
        sort: { order: ASC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
      taxonomyQuery: allMarkdownRemark {
        group(field: frontmatter___subject) {
          nodes {
            id
          }
          fieldValue
        }
      }
    }
  `)
  if (queryResult.errors) {
    reporter.panic("error loading events", queryResult.errors)
    return
  }

  // Generate single post pages
  const posts = queryResult.data.postQuery.edges
  posts.forEach(post => {
    createPage({
      path: post.node.fields.slug,
      component: path.resolve(`./src/templates/article.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQl variables.
        slug: post.node.fields.slug,
      },
    })
  })

  // Create your paginated pages
  paginate({
    createPage, // The Gatsby `createPage` function
    items: posts, // An array of objects
    itemsPerPage: 2, // How many items you want per page
    pathPrefix: "/articles", // Creates pages like `/blog`, `/blog/2`, etc
    component: path.resolve(`./src/templates/articles.js`), // Just like `createPage()`
  })

  const taxonomies = queryResult.data.taxonomyQuery.group
  taxonomies.map(({ nodes: nodes, fieldValue: fieldValue }) => {
    paginate({
      createPage, // The Gatsby `createPage` function
      items: nodes, // An array of objects
      itemsPerPage: 2, // How many items you want per page
      pathPrefix: `/subjects/${_.kebabCase(fieldValue)}`, // Creates pages like `/blog`, `/blog/2`, etc
      component: path.resolve(`./src/templates/subjects.js`), // Just like `createPage()`
      context: { subject: fieldValue },
    })
  })
}
