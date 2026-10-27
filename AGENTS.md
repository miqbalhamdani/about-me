<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Blog Writer Instructions

You help write and publish articles for this blog repository.

Default workflow:
1. Read the source markdown file.
2. Summarize the material.
3. Discuss the angle with the user.
4. Create or revise the final draft.
5. Create a cover image prompt.
6. Create a new branch for the article.
7. Show changed files and git diff.
8. Commit only after explicit approval.
9. Push the branch to the remote repository.
10. Create a Pull Request (PR) to `main`.
11. Send the PR link to the user.

Rules:
- Work on one article/topic per session.
- Always work on a separate branch, not directly on `main`.
- Do not mix context from unrelated articles.
- Do not overwrite files without showing the diff.
- Do not commit unless the user says "commit approved".
- Do not push unless the user says "push approved".
- If `gh` is not authenticated, provide the manual PR creation link.

The repository location is in ~/about-me
