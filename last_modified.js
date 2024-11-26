// Replace with your repository details
const owner = "fhackit";
const repo = "fhackit.github.io";

// Fetch the latest commit that modified the file
async function fetchLastModified(filePath) {
    const url = `https://api.github.com/repos/${owner}/${repo}/commits?path=${filePath}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.length > 0) {
            const lastCommit = data[0];
            const lastModified = new Date(lastCommit.commit.author.date).toLocaleString();
            document.getElementById("last-modified").innerText = lastModified;
        } else {
            console.warn("No commit data found for the specified file.");
        }
    } catch (error) {
        console.error("Error fetching last modified date:", error);
    }
}

// Call the function on page load with the current page path
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname.replace(/^\//, ""); // Get current path without leading slash
    fetchLastModified(currentPath);
});
