from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Home route
@app.route('/')
def home():
    return render_template('index.html')

# Example API route
@app.route('/api/data', methods=['GET'])
def get_data():
    data = {
        "name": "Okanlawon Paul Feyisayo",
        "skills": ["Python", "Flask", "HTML", "CSS"],
        "projects": ["Project 1", "Project 2", "Project 3"]
    }
    return jsonify(data)


@app.route('/contact', methods=['POST'])
def contact():
    data = request.get_json()
    print(f"Message from {data['name']} ({data['email']}): {data['message']}")
    return jsonify({"status": "success", "message": "Message received!"})



if __name__ == '__main__':
    app.run(debug=True)