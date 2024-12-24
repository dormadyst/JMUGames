
// function for save button
document.getElementById('save-game').addEventListener('click', () => {

	// blob to solutions page
	window.location.href = "solutions.html";
});

function updateButtonText() {
	const button = document.getElementById("save-game");
	const open = document.getElementById("openModal");
	const view = document.getElementById("viewProgressBtn");
	if (window.innerWidth <= 500) {
		button.textContent = "Solution";
		open.textContent = "Open";
		view.textContent = "View";
	} else {
		button.textContent = "See Solution";
		open.textContent = "Add Progress";
		view.textContent = "View Saved Progress";
	}
}

// Initial check when the page loads
updateButtonText();

// Update text on window resize
window.addEventListener("resize", updateButtonText);

const toggleBtn = document.getElementById('toggle-btn');
const sidebar = document.querySelector('.sidebar');
const content = document.querySelector('.content');
    
toggleBtn.addEventListener('click', function() {
    sidebar.classList.toggle('collapsed');
});


document.getElementById("openModal").addEventListener("click", function() {
    const modal = document.getElementById("progressModal");
    modal.style.display = "flex";  // Show the modal
});

document.getElementById("close-modal").addEventListener("click", function() {
    const modal = document.getElementById("progressModal");
    modal.style.display = "none";  // Hide the modal
});

document.getElementById("save-progress").addEventListener("click", function() {
    const gameNotes = document.getElementById("game-notes").value;

    if (gameNotes.trim() === "") {
        alert("Please enter some progress before saving.");
        return;
    }

    // Save progress (e.g., store in localStorage or display)
    const progressData = {
        progressNotes: gameNotes,
        timestamp: new Date().toISOString(),
    };

    // Store the progress data (for example, in localStorage)
    let progressList = JSON.parse(localStorage.getItem("progressList")) || [];
    progressList.push(progressData);
    localStorage.setItem("progressList", JSON.stringify(progressList));

    // Hide the modal after saving
    const modal = document.getElementById("progressModal");
    modal.style.display = "none";

    // Optionally, reset the form and give feedback
    document.getElementById("game-notes").value = "";
    alert("Progress saved successfully!");
});


// Display progress when the page loads
function displayProgress() {
	const progressList = JSON.parse(localStorage.getItem('progressList')) || [];
	const progressContainer = document.getElementById('progress-container');
	
	progressContainer.innerHTML = ''; // Clear existing progress display
	
	if (progressList.length === 0) {
		progressContainer.innerHTML = '<p>No progress saved yet.</p>';
		return;
	}

	progressList.forEach((progress, index) => {
		const progressItem = document.createElement("div");
		progressItem.classList.add("progress-item");
		progressItem.innerHTML = `
			<p><strong>Progress:</strong> ${progress.progressNotes}</p>
			<p><small>Saved on: ${new Date(progress.timestamp).toLocaleString()}</small></p>
			<button onclick="editProgress(${index})">Edit</button>
			<button onclick="deleteProgress(${index})">Delete</button>
		`;
		progressContainer.appendChild(progressItem);
	});
}

// Edit progress functionality
function editProgress(index) {
	const progressList = JSON.parse(localStorage.getItem('progressList')) || [];
	const progressToEdit = progressList[index];
	
	document.getElementById("game-notes").value = progressToEdit.progressNotes;
	// Optionally open the modal to allow editing
}

// Delete progress functionality
function deleteProgress(index) {
	let progressList = JSON.parse(localStorage.getItem('progressList')) || [];
	progressList.splice(index, 1);
	localStorage.setItem('progressList', JSON.stringify(progressList));

	// Refresh the display
	displayProgress();
}

// Call the displayProgress function when the page loads
document.addEventListener('DOMContentLoaded', displayProgress);



document.getElementById("viewProgressBtn").addEventListener("click", function() {
    const viewProgressModal = document.getElementById("viewProgressModal");
    viewProgressModal.style.display = "flex";  // Show the modal
    
    // Retrieve and display the saved progress
    displayProgress();
});

document.getElementById("close-progress").addEventListener("click", function() {
    const viewProgressModal = document.getElementById("viewProgressModal");
    viewProgressModal.style.display = "none";  // Hide the modal
});


function displayProgress() {
    const progressList = JSON.parse(localStorage.getItem('progressList')) || [];
    const progressContainer = document.getElementById("progressContainer");

    progressContainer.innerHTML = ''; // Clear the container before displaying new progress

    if (progressList.length === 0) {
        progressContainer.innerHTML = '<p>No progress saved yet.</p>';
        return;
    }

    progressList.forEach((progress, index) => {
        const progressItem = document.createElement("div");
        progressItem.classList.add("progress-item");
        progressItem.innerHTML = `
            <p><strong>Progress:</strong> ${progress.progressNotes}</p>
            <button onclick="deleteProgress(${index})">Delete</button>
            <button onclick="exportProgress(${index})">Export</button>
        `;
        progressContainer.appendChild(progressItem);
    });
}


// Delete progress functionality
function deleteProgress(index) {
    let progressList = JSON.parse(localStorage.getItem('progressList')) || [];
    progressList.splice(index, 1);
    localStorage.setItem('progressList', JSON.stringify(progressList));

    // Refresh the display after deletion
    displayProgress();
}

function exportProgress(index) {
    const progressList = JSON.parse(localStorage.getItem('progressList')) || [];
    const progressToExport = progressList[index];

    if (!progressToExport) {
        alert("No progress data to export.");
        return;
    }

    // Convert the selected progress entry to JSON
    const jsonData = JSON.stringify(progressToExport, null, 2);

    // Create a Blob from the JSON data
    const blob = new Blob([jsonData], { type: "application/json" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary link to trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.download = `progress_${index + 1}.json`; // Name the file uniquely (e.g., "progress_1.json")
    link.click(); // Simulate a click to start the download

    // Revoke the URL to free up memory
    URL.revokeObjectURL(url);
}
