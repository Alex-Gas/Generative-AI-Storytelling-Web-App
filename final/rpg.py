import os
from dotenv import load_dotenv  

from flask import Flask, request, jsonify
from langchain.memory import ConversationBufferMemory
from langchain.chat_models import ChatOpenAI


from langchain.chains import LLMChain
from langchain.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
    SystemMessagePromptTemplate,
)

app = Flask(__name__)

# get api key from environment variable
load_dotenv()
API_KEY = os.getenv("API_KEY")

# LLM
llm = ChatOpenAI(api_key=API_KEY, model="gpt-4")


prompt = None
quAsked = 0
conversation = None

def initialize(pro, ant, cont):
    global quAsked, prompt, conversation, memory


    # reset questions asked to zero
    quAsked = 0
    context = "introduction: "+cont

    # Prompt
    prompt = ChatPromptTemplate(
    messages=[
        SystemMessagePromptTemplate.from_template(
            "You are a story generating RPG that will ask a series of inputs to the user in format:" 
            + 
            "[A: 'first option', B: 'second option', C: 'third option', D: 'fourth option']"
            +
            f"The protagonist is {pro} and the antagonist is {ant}.\n"
            +
            "There will be 10 mcq questions (each with for options as listed above) asked and each will be a point in the story.\n"
            +
            "The 10 sections are: \n['introduction', 'Inciting Event', 'First Plot Point', 'First Pinch Point', 'Midpoint', 'Second Pinch Point', 'Third Plot Point', 'Climax', 'Climactic Moment', 'Resolution']"
            +
            "ask the series of questions one by one in format: "
            +
            "[question: 'context', A: 'first option', B: 'second option', C: 'third option', D: 'fourth option']"
            +
            " AGAIN REMEMBER TO ASK THE 10 SECTIONS ONE BY ONE AND NOT ALL IN ONE RESPONSE"
        ),
        # The `variable_name` here is what must align with memory
        MessagesPlaceholder(variable_name="chat_history"),
        HumanMessagePromptTemplate.from_template("{question}"),
    ]
    )

    # initialise chat memory and llm chain
    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
    conversation = LLMChain(llm=llm, prompt=prompt, verbose=True, memory=memory)
    
    # get first question based of user context input
    firstQu = conversation({"question": context})
    print(memory)
    quAsked+=1
    return(firstQu['text'])


def invoke(option, quRecieved):
    global quAsked, prompt, conversation, memory

    if quAsked != quRecieved:
        # throw ImportError
        print("error")
    
    # get first question based of user context input
    nextQu = conversation({"question": option})
    print(memory)
    return(nextQu['text'])




# connection to front end
@app.route('/create', methods=['POST'])
def create_story():
    if request.is_json:
        data = request.get_json()
        protagonist = data['protagonist']
        antagonist = data['antagonist']
        context = data['context']
        answer = initialize(protagonist, antagonist, context)
        return jsonify({'response': answer})
    else:
        return "Request is not in JSON format"

@app.route('/invoke', methods=['POST'])
def continue_story():
    if request.is_json:
        data = request.get_json()
        option = data['option']
        questionNum = data['questionNum']
        answer = invoke(option, questionNum)
        return jsonify({'response': answer})
    else:
        return "Request is not in JSON format"

if __name__ == '__main__':
    app.run(debug=True)

# print(initialize("Marwan", "Sami", "trip to america"))

