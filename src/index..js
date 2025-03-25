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
      <form id="votes-form">
        <input type="text" placeholder="Enter Votes" id="votes" name="votes" />
        <input type="submit" value="Add Votes" />
      </form>
      <button id="reset-votes">Reset Votes</button>
    `;
    detailedInfo.dataset.characterId = character.id; // Store character ID for later use

    // Attach event listeners to the dynamically added form and button
    attachVoteFormListener(character.id);
    attachResetButtonListener(character.id);
  }

  // Function to handle votes form submission
  function attachVoteFormListener(characterId) {
    const votesForm = document.getElementById("votes-form");
    votesForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent page refresh
      const votesInput = document.getElementById("votes");
      const additionalVotes = parseInt(votesInput.value, 10) || 0;
      const voteCount = document.getElementById("vote-count");
      const currentVotes = parseInt(voteCount.textContent, 10);
      const newVotes = currentVotes + additionalVotes;

      // Update the vote count in the UI
      voteCount.textContent = newVotes;
      votesInput.value = ""; // Clear the input field

      // Update the votes on the server
      fetch(`${baseUrl}/${characterId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ votes: newVotes }),
      })
        .then((response) => response.json())
        .then((updatedCharacter) => {
          console.log("Votes updated on the server:", updatedCharacter);
        })
        .catch((error) => console.error("Error updating votes:", error));
    });
  }

  // Function to handle reset votes button click
  function attachResetButtonListener(characterId) {
    const resetVotesButton = document.getElementById("reset-votes");
    resetVotesButton.addEventListener("click", () => {
      const voteCount = document.getElementById("vote-count");
      voteCount.textContent = 0;

      // Reset votes on the server
      fetch(`${baseUrl}/${characterId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ votes: 0 }),
      })
        .then((response) => response.json())
        .then((updatedCharacter) => {
          console.log("Votes reset on the server:", updatedCharacter);
        })
        .catch((error) => console.error("Error resetting votes:", error));
    });
  }

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
    })
      .then((response) => response.json())
      .then((savedCharacter) => {
        console.log("New character saved to the server:", savedCharacter);
      })
      .catch((error) => console.error("Error saving new character:", error));

    // Clear form inputs
    nameInput.value = "";
    imageInput.value = "";
  });
});