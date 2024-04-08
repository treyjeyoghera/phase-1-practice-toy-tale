document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".add-toy-form");
  const toyCollection = document.querySelector("#toy-collection");

  addBtn.addEventListener("click", () => {
    toggleToyFormVisibility();
  });

  toyForm.addEventListener("submit", event => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const image = event.target.elements.image.value;
    if (name.trim() && image.trim()) {
      const toyData = { name, image };
      createToy(toyData);
      event.target.reset();
    } else {
      alert("Please fill out both name and image fields.");
    }
  });

  function toggleToyFormVisibility() {
    const container = document.querySelector(".container");
    container.classList.toggle("hidden");
  }

  function createToy(toyData) {
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(toyData)
    })
      .then(response => response.json())
      .then(newToy => renderToy(newToy));
  }

  function renderToy(toy) {
    const toyCard = document.createElement("div");
    toyCard.classList.add("card");

    const toyName = document.createElement("h2");
    toyName.textContent = toy.name;

    const toyImage = document.createElement("img");
    toyImage.classList.add("toy-avatar");
    toyImage.src = toy.image;

    toyCard.append(toyName, toyImage);
    toyCollection.appendChild(toyCard);
  }

  // Fetch existing toys and render them
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(toys => toys.forEach(toy => renderToy(toy)));
});
