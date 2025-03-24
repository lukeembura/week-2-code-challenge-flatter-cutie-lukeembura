document.addEventListener("DOMContentLoaded", () => {
    const characterBar = document.getElementById("character-bar");
    const detailedInfo = document.getElementById("detailed-info");
    const votesForm = document.getElementById("votes-form");
    const resetVotesButton = document.getElementById("reset-votes");
    const characterForm = document.getElementById("character-form");
    const baseUrl = "http://localhost:3000/characters";
  
    // Fetch characters and populate the character bar
    fetch(baseUrl)
      .then((response) => response.json())
      .then((characters) => {
        characters.forEach((character) => {
          const span = document.createElement("span");
          span.textContent = character.name;
  
          // Add click event listener to display character details
          span.addEventListener("click", () => displayCharacterDetails(character));
  
          characterBar.appendChild(span);
        });
      })
      .catch((error) => console.error("Error fetching characters:", error));
  
    // Function to display character details
    function displayCharacterDetails(character) {
      detailedInfo.innerHTML = `
        <h2>${character.name}</h2>
        <img src="${character.image}" alt="${character.name}">
        <p>Votes: <span id="vote-count">${character.votes}</span></p>
      `;
      detailedInfo.dataset.characterId = character.id; // Store character ID for later use
    }
  
    // Handle votes form submission
    votesForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const votesInput = document.getElementById("votes");
      const additionalVotes = parseInt(votesInput.value, 10) || 0;
      const voteCount = document.getElementById("vote-count");
      const currentVotes = parseInt(voteCount.textContent, 10);
      const newVotes = currentVotes + additionalVotes;
  
      voteCount.textContent = newVotes;
      votesInput.value = "";
    });
  
    // Handle reset votes button click
    resetVotesButton.addEventListener("click", () => {
      const voteCount = document.getElementById("vote-count");
      voteCount.textContent = 0;
    });
  
    // Handle new character form submission
    characterForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const nameInput = document.getElementById("name");
      const imageInput = document.getElementById("image-url");
  
      const newCharacter = {
        name: nameInput.value,
        image: imageInput.value,
        votes: 0,
      };
  
      // Add new character to the character bar
      const span = document.createElement("span");
      span.textContent = newCharacter.name;
      span.addEventListener("click", () => displayCharacterDetails(newCharacter));
      characterBar.appendChild(span);
  
      // Display new character details
      displayCharacterDetails(newCharacter);
  
      // Save new character to the server
      fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCharacter),
      });
  
      // Clear form inputs
      nameInput.value = "";
      imageInput.value = "";
    });
  });