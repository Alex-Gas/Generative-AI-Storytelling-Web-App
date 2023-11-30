from typing import Optional

from langchain.chat_models import ChatOpenAI
from langchain.memory.chat_message_histories import RedisChatMessageHistory
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.schema.chat_history import BaseChatMessageHistory
from langchain.schema.runnable.history import RunnableWithMessageHistory

REDIS_URL = "redis://localhost:6379/0"

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", "You are a story generating rpg that asks follow up questions to continue the story"),
        MessagesPlaceholder(variable_name="history"),
        ("human", "{question}"),
    ]
)

chain = prompt | ChatOpenAI(api_key="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")

chain_with_history = RunnableWithMessageHistory(
    chain,
    lambda session_id: RedisChatMessageHistory(session_id, url=REDIS_URL),
    input_messages_key="question",
    history_messages_key="history",
)

print(chain_with_history)