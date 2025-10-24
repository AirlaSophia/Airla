class AppSettings {
    applicationId =  "821088";
    acessKey = "43iNvYSvaulbzCwMxnZKFCa_3WRWFIiG0MVQ5d2mK_E";
    securityKey = "nMw1x1ZpVumVBtMOI5LNQcWxW_Wuj6hwWIVCDakLGqM";
    baseUrl = "https://api.unsplash.com/photos/";
}
// Array of image targets (replace URLs later with your own images)

const appSettings = new AppSettings();

const targetNumber = document.getElementById("targetNumber");
const targetImage = document.getElementById("targetImage");
const impressions = document.getElementById("impressions");

let currentTarget = null;

// Generate random target number (e.g., 8321-49)
function generateTargetNumber() {
    const part1 = Math.floor(1000 + Math.random() * 9000);
    const part2 = Math.floor(10 + Math.random() * 90);
    return `${part1}-${part2}`;
}

document.getElementById("newSession").addEventListener("click", async () => {
    // Show target number immediately
    const id = generateTargetNumber();
    targetNumber.textContent = `Target: ${id}`;
    targetImage.innerHTML = "";
    impressions.value = "";

    // Fetch a random Unsplash image in the background
    try {
        const topics = ["nature", "architecture", "animal", "object", "water", "city", "space"];
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];

        const url = appSettings.baseUrl + 'random/?client_id=' + appSettings.acessKey;
        // Unsplash redirects to a random image based on the topic
        const response = await fetch(url);
        console.log(response.body);
        //const response = await fetch(`https://source.unsplash.com/random/800x600/?${randomTopic}`);

        currentTarget = {
            id: id,
            image: response.url,
            topic: randomTopic
        };

        console.log("Fetched target:", currentTarget);
    } catch (err) {
            console.error("Error fetching Unsplash image:", err);
            targetImage.innerHTML = "<p>Error loading image. Please try again.</p>";
    }
});

document.getElementById("revealTarget").addEventListener("click", () => {
if (currentTarget) {
targetImage.innerHTML = `
<p><strong>Target Image:</strong></p>
<img src="${currentTarget.image}" width="400" alt="Target Image">
<p><em>(Category: ${currentTarget.topic})</em></p>
`;
} else {
alert("Start a session first!");
}
});