// Replace with your repository details
const owner = "fhackit";
const repo = "fhackit.github.io";

// Helper function to calculate relative time
function timeSince(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    const intervals = [
        { label: "year", seconds: 31536000 },
        { label: "month", seconds: 2592000 },
        { label: "week", seconds: 604800 },
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "minute", seconds: 60 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
        }
    }

    return "just now";
}

// Helper function to format the full date with timezone
function formatDateWithTimezone(date) {
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
    }).format(date);
}

// Fetch the latest commit that modified the file
async function fetchLastModified(filePath) {
    const url = `https://api.github.com/repos/${owner}/${repo}/commits?path=${filePath}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.length > 0) {
            const lastCommit = data[0];
            const lastModifiedDate = new Date(lastCommit.commit.author.date);
            const relativeTime = timeSince(lastModifiedDate);
            const fullDate = formatDateWithTimezone(lastModifiedDate);

            // Update the element with relative time and tooltip
            const element = document.getElementById("last-modified");
            element.innerText = relativeTime;
            element.title = fullDate; // Tooltip with the full date and timezone
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
