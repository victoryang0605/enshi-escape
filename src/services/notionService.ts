// This file now acts as an API client talking to our secure Express backend.

export async function fetchArticles() {
  try {
    const response = await fetch('/api/articles');
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("Error fetching from API:", error);
    return [];
  }
}

export async function fetchArticleContent(pageId: string) {
  try {
    const response = await fetch(`/api/articles/${pageId}/content`);
    if (!response.ok) return "";
    const data = await response.json();
    return data.content || "";
  } catch (error) {
    console.error("Error fetching content from API:", error);
    return "Error loading content.";
  }
}
