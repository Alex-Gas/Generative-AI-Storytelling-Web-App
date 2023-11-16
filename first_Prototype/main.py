from flask import Flask, request, jsonify
from flask_cors import CORS

# from openai import OpenAI
from langchain.llms.openai import OpenAI
from langchain.chains import ConversationChain 
from langchain.schema.language_model import BaseLanguageModel
from langchain.chains.conversation.memory import (ConversationBufferMemory, 
                                                  ConversationSummaryMemory, 
                                                  ConversationBufferWindowMemory,
                                                  ConversationKGMemory)


app = Flask(__name__)

CORS(app)

# client = OpenAI(
#     # defaults to os.environ.get("OPENAI_API_KEY")
#     api_key="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",
# )



llm = OpenAI(model_name="gpt-3.5-turbo", temperature=0.0, api_key="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",)

conversation = ConversationChain(
    llm=llm
)

print("CONVO: "+conversation.prompt.template)

conversation_buf = ConversationChain(
    llm=llm,
    memory= ConversationBufferMemory()
)

print(conversation_buf.memory)
conversation_buf("good morning all!")

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
