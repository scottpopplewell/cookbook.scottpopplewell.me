import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.contentfulRecipe
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.title}
        description={post.description}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.title}</h1>
          <p>{post.createdAt}</p>
          <p>{post.size}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.body.childMarkdownRemark.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={"/recipes/" + previous.id} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={"/recipes/" + next.id} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query RecipeBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulRecipe(id: {eq: $id}) {
      id
      size
      title
      createdAt
      description
      body {
        childMarkdownRemark {
          html
        }
      }
    }
    previous: contentfulRecipe(id: {eq: $previousPostId}) {
      id
      size
      title
      createdAt
      description
      body {
        childMarkdownRemark {
          html
        }
      }
    }
    next: contentfulRecipe(id: {eq: $nextPostId}) {
      id
      size
      title
      createdAt
      description
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`