import { Link, routes } from '@redwoodjs/router'

const BlogPost = ({ post }) => {
  return (
    <article key={post.id}>
      <header>
        <Link to={routes.blogPost({ id: post.id })}>
          <h2 className="text-2xl">{post.title}</h2>
        </Link>
      </header>
      <p>{post.body}</p>
      <div>
        Posted at: <time>{post.createdAt}</time>
      </div>
    </article>
  )
}

export default BlogPost
