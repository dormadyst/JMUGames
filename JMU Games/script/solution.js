// function for crossword button
document.getElementById('return-crossword').addEventListener('click', () => {

	// blob to crossword page
	window.location.href = "crossword.html";
});

// function for wordle button
document.getElementById('return-wordle').addEventListener('click', () => {

	// blob to wordle page
	window.location.href = "wordle.html";
});


function updateButtonText() {
	const exportSol = document.getElementById("export-solution");
	const returnCross = document.getElementById("return-crossword");
	const returnWordle = document.getElementById("return-wordle");
	if (window.innerWidth <= 500) {
		exportSol.textContent = "Solution";
		returnCross.textContent = "Return";
		returnWordle.textContent = "Return";
	} else {
		exportSol.textContent = "Git Solution";
		returnCross.textContent = "Return to Crossword";
		returnWordle.textContent = "Return to Wordle";
	}
}

// Initial check when the page loads
updateButtonText();

// Update text on window resize
window.addEventListener("resize", updateButtonText);

