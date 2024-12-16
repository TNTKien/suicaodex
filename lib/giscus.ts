export async function getTotalCmts(repo: string, term: string) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repo}/discussions`
    );
    const discussions = await response.json();
    const match = discussions.find(
      (discussion: any) => discussion.title === term
    );

    if (!match) return 0;
    return match.comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return 0;
  }
}
