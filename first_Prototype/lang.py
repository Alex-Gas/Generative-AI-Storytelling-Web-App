from langchain.memory import ConversationBufferMemory
from langchain.chat_models import ChatOpenAI


from langchain.chains import LLMChain
from langchain.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
    SystemMessagePromptTemplate,
)

# LLM
llm = ChatOpenAI(open_api_key="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")

# # Prompt
# prompt = ChatPromptTemplate(
#     messages=[
#         SystemMessagePromptTemplate.from_template(
#             "You are a nice chatbot having a conversation with a human."
#         ),
#         # The `variable_name` here is what must align with memory
#         MessagesPlaceholder(variable_name="chat_history"),
#         HumanMessagePromptTemplate.from_template("{question}"),
#     ]
# )

# # Notice that we `return_messages=True` to fit into the MessagesPlaceholder
# # Notice that `"chat_history"` aligns with the MessagesPlaceholder name
# memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
# conversation = LLMChain(llm=llm, prompt=prompt, verbose=True, memory=memory)

# # Notice that we just pass in the `question` variables - `chat_history` gets populated by memory
# conversation({"question": "hi"})

# print(memory)