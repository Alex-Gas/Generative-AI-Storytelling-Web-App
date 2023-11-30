from flask import Flask, request, jsonify
from flask_cors import CORS

from openai import OpenAI
app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:5501/"}})


client = OpenAI(api_key="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")


# get question response from open ai
def askGpt(question):

    response = client.chat.completions.create(
    model="gpt-4",
    messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": question},
    ]
    )
    answer = {
        "prompt": question,
        "response": response.choices[0].message.content,
    }
    return answer

print(askGpt("create an svg image of an apple"))


# connection to front end
@app.route('/askgpt', methods=['POST'])
def receive_json():
    if request.is_json:
        data = request.get_json()
        answer = askGpt(data["question"])
        print(answer)
        return jsonify(answer)
    else:
        return "Request is not in JSON format"

if __name__ == '__main__':
    app.run(debug=True)