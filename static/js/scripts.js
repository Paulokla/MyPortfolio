// Fetch data from the Flask backend
fetch("/api/data")
  .then((response) => response.json())
  .then((data) => {
    // Display projects
    const projectsList = document.getElementById("projects-list");
    data.projects.forEach((project) => {
      const projectCard = document.createElement("div");
      projectCard.classList.add("project-card");
      projectCard.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            `;
      projectsList.appendChild(projectCard);
    });

    // Display skills
    const skillsList = document.getElementById("skills-list");
    data.skills.forEach((skill) => {
      const skillCard = document.createElement("div");
      skillCard.classList.add("skill-card");
      skillCard.textContent = skill;
      skillsList.appendChild(skillCard);
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

const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-theme");
  body.classList.toggle("light-theme");
  localStorage.setItem(
    "theme",
    body.classList.contains("dark-theme") ? "dark" : "light"
  );
});

// Check saved theme preference
const savedTheme = localStorage.getItem("theme") || "dark";
body.classList.add(savedTheme + "-theme");
