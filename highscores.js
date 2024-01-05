document.addEventListener("DOMContentLoaded", function() {
    const highScoreList = document.getElementById("highscores");
    const clearButton = document.getElementById("clear"); 

    function displayHighScores() {
        const highScores = JSON.parse(localStorage.getItem("highScores")) || []; 
        highScoreList.innerHTML = highScores
        .map(score => `<li>${score.initials} - ${score.score}</li>`)
        .join(""); 
    }

    clearButton.addEventListener("click", () => {
        localStorage.clear();
        displayHighScores();
    });
 
    displayHighScores(); 
});
