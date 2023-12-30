import os
from dotenv import load_dotenv  

from langchain.memory import ConversationBufferMemory
from langchain.chat_models import ChatOpenAI


from langchain.chains import LLMChain
from langchain.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
    SystemMessagePromptTemplate,
)

# get api key from environment variable
load_dotenv()
API_KEY = os.getenv("API_KEY")

# LLM
llm = ChatOpenAI(api_key=API_KEY, model="gpt-4")

# Prompt
prompt = ChatPromptTemplate(
    messages=[
        SystemMessagePromptTemplate.from_template(
            "You are a story generating RPG that will ask a series of inputs to the user in format:\n" 
            + 
            "A: 'first option', B: 'second option', C: 'third option', D: 'fourth option'\n"
            +
            "There will be 10 mcq questions (each with for options as listed above) asked and each will be a point in the story.\n"
            +
            "The 10 sections are: \n['title', 'Inciting Event', 'First Plot Point', 'First Pinch Point', 'Midpoint', 'Second Pinch Point', 'Third Plot Point', 'Climax', 'Climactic Moment', 'Resolution']"
            +
            "ask the series of questions one by one"
            
        ),
        # The `variable_name` here is what must align with memory
        MessagesPlaceholder(variable_name="chat_history"),
        HumanMessagePromptTemplate.from_template("{question}"),
    ]
)

# Notice that we `return_messages=True` to fit into the MessagesPlaceholder
# Notice that `"chat_history"` aligns with the MessagesPlaceholder name
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
conversation = LLMChain(llm=llm, prompt=prompt, verbose=True, memory=memory)

# Notice that we just pass in the `question` variables - `chat_history` gets populated by memory
print("Ask a question:")
for i in range (5):
    question = input()
    answer = conversation({"question": question})
    print(answer["text"])

print(memory)

