// OpenAPI 3.0 description of the static blog JSON API written by prerender.mjs.
export function buildOpenApiSpec({ siteUrl, title, description }) {
  return {
    openapi: "3.0.3",
    info: {
      title: `${title} API`,
      version: "1.0.0",
      description: `${description}\n\nRead-only JSON generated at build time from the markdown posts in \`src/content/blog\`.`,
    },
    servers: [{ url: siteUrl }],
    // Public, unauthenticated endpoints.
    security: [],
    tags: [{ name: "Blog", description: "Blog posts" }],
    paths: {
      "/api/blogs.json": {
        get: {
          tags: ["Blog"],
          operationId: "listBlogPosts",
          summary: "List published blog posts",
          description: "All published posts, newest first.",
          responses: {
            200: {
              description: "Published posts",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/BlogPostList" },
                },
              },
            },
          },
        },
      },
      "/api/blogs/{slug}.json": {
        get: {
          tags: ["Blog"],
          operationId: "getBlogPost",
          summary: "Get a blog post",
          description: "A single post including its markdown body and table of contents.",
          parameters: [
            {
              name: "slug",
              in: "path",
              required: true,
              description: "URL slug of the post (the markdown file name).",
              schema: { type: "string", pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" },
              example: "google-sign-in-nodejs-passport",
            },
          ],
          responses: {
            200: {
              description: "The post",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/BlogPost" },
                },
              },
            },
            404: { description: "No post with this slug" },
          },
        },
      },
    },
    components: {
      schemas: {
        Author: {
          type: "object",
          required: ["id", "name", "url"],
          properties: {
            id: { type: "string", example: "aman-adhikari" },
            name: { type: "string", example: "Aman Adhikari" },
            url: { type: "string", format: "uri" },
          },
        },
        Heading: {
          type: "object",
          required: ["id", "text", "depth"],
          properties: {
            id: { type: "string", description: "Anchor id of the heading on the post page." },
            text: { type: "string" },
            depth: { type: "integer", enum: [2, 3] },
          },
        },
        BlogPostSummary: {
          type: "object",
          required: [
            "slug",
            "title",
            "description",
            "category",
            "tags",
            "publishedAt",
            "updatedAt",
            "readingTime",
            "wordCount",
            "url",
            "author",
          ],
          properties: {
            slug: { type: "string" },
            title: { type: "string" },
            description: { type: "string" },
            category: { type: "string" },
            tags: { type: "array", items: { type: "string" } },
            publishedAt: { type: "string", format: "date" },
            updatedAt: { type: "string", format: "date" },
            readingTime: { type: "integer", description: "Estimated minutes to read." },
            wordCount: { type: "integer" },
            url: { type: "string", format: "uri", description: "Canonical page URL." },
            coverImage: {
              type: "object",
              nullable: true,
              required: ["src", "alt"],
              properties: {
                src: { type: "string", format: "uri" },
                alt: { type: "string" },
              },
            },
            author: { $ref: "#/components/schemas/Author" },
          },
        },
        BlogPost: {
          allOf: [
            { $ref: "#/components/schemas/BlogPostSummary" },
            {
              type: "object",
              required: ["headings", "contentFormat", "content"],
              properties: {
                headings: { type: "array", items: { $ref: "#/components/schemas/Heading" } },
                contentFormat: { type: "string", enum: ["markdown"] },
                content: { type: "string", description: "Post body (GitHub-flavored markdown)." },
              },
            },
          ],
        },
        BlogPostList: {
          type: "object",
          required: ["data", "total"],
          properties: {
            data: { type: "array", items: { $ref: "#/components/schemas/BlogPostSummary" } },
            total: { type: "integer" },
          },
        },
      },
    },
  };
}
