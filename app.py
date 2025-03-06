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
        "skills": ["Python", "Flask", "HTML", "CSS", "Java"],
        "projects": [
            {
                "title": "Project 1",
                "description": "This is a description of Project 1. It showcases my skills in Python and Flask."
            },
            {
                "title": "Project 2",
                "description": "This is a description of Project 2. It demonstrates my expertise in frontend development."
            },
            {
                "title": "Project 3",
                "description": "This is a description of Project 3. It highlights my ability to work with databases and APIs."
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