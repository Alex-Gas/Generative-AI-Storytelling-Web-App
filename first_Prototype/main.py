from flask import Flask, request, jsonify
from flask_cors import CORS

from openai import OpenAI

app = Flask(__name__)

CORS(app)

client = OpenAI(
    # defaults to os.environ.get("OPENAI_API_KEY")
    api_key="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"
)

# chat_completion = client.chat.completions.create(
#     messages=[
#         {
#             "role": "user",
#             "content": "Say this is a test",
#         }
#     ],
#     model="gpt-3.5-turbo",
# )


# get question response from open ai
def askGpt(question):
    response = client.chat.completions.create(
    messages=[
            {"role": "system", "content": "You are a story generating rpg that asks follow up questions to continue the story"},
            {"role": "user", "content": question["question"]},
    ],
    model="gpt-3.5-turbo",
)

    answer = {
        "prompt": question,
        "response": response.choices[0].message.content,
    }
    print(answer)
    return answer


# connection to front end
@app.route('/askgpt', methods=['POST'])
def receive_json():
    if request.is_json:
        data = request.get_json()
        answer = askGpt(data)
        print(answer)
        return jsonify(answer)
    else:
        return "Request is not in JSON format"

if __name__ == '__main__':
    app.run(debug=True)
