// Fetch data from the Flask backend
fetch("/api/data")
  .then((response) => response.json())
  .then((data) => {
    const projectsList = document.getElementById("projects-list");
    data.projects.forEach((project) => {
      const projectCard = document.createElement("div");
      projectCard.classList.add("project-card");
      projectCard.innerHTML = `
                <h3>${project}</h3>
                <p>Description of ${project}.</p>
            `;
      projectsList.appendChild(projectCard);
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Message sent successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to send message.");
      });
  });
