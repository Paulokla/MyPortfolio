from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Home route
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {
        "name": "Okanlawon Paul Feyisayo",
        "skills": ["Python", "Flask", "HTML", "CSS", "Java", "GIT/GITHUB", "SQL Alchemy", "REST API"],
        "projects": [
            {
                "title": "Project 1",
                "description": "A backend web application built with Python and Flask. Features RESTful API endpoints, user authentication, and database integration.",
                "tags": ["Python", "Flask", "REST API"],
                "github": "https://github.com/Shakaaraahagency/Algorithimics_Frontend.git",   # Add your GitHub link here
                "live": "https://shakaaraahmanagementsys.shakaaraahllc.com/"
            },
            {
                "title": "Project 2",
                "description": "A full-stack project demonstrating frontend development skills alongside a JavaScript backend. Responsive UI with dynamic data rendering.",
                "tags": ["HTML", "CSS", "JavaScript"],
                "github": "https://github.com/Paulokla/PlayHouse-Website.git",
                "live": "https://theplayhouseparty.netlify.app/"
            },
            {
                "title": "Project 3",
                "description": "A data-driven application with PostgreSQL database integration, complex SQL queries, and a clean REST API layer.",
                "tags": ["Python", "PostgreSQL", "REST API"],
                "github": "https://github.com/Paulokla/SCMS.git",   # Add your GitHub link here
                "live": "https://scms-s78l.onrender.com/auth/login"      # Add your live demo link here
            }
        ]
    }
    return jsonify(data)


@app.route('/contact', methods=['POST'])
def contact():
    data = request.get_json()
    print(f"Message from {data['name']} ({data['email']}): {data['message']}")
    return jsonify({"status": "success", "message": "Message received!"})



if __name__ == '__main__':
    app.run(debug=True)