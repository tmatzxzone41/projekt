// Extract file IDs and construct single URLs
const fileData = window.viewer_data.api_response.files;
const singleUrls = fileData.map(file => `https://pixeldrain.com/u/${file.id}`);

// Construct log message
const logMessage = ["Single URLs:"];
singleUrls.forEach(url => logMessage.push(url));

// Create a Blob containing the log message
const blob = new Blob([logMessage.join("\n")], { type: "text/plain" });

// Create a link element to trigger the download
const link = document.createElement("a");
link.download = "single_urls.txt";
link.href = URL.createObjectURL(blob);
link.click();
