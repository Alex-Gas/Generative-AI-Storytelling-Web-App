import os
import sys

import Constants
from langchain.document_loaders import TextLoader
from langchain.document_loaders import DirectoryLoader
from langchain.indexes import VectorstoreIndexCreator
from langchain.llms import OpenAI
from langchain.chat_models import ChatOpenAI

os.environ["OPENAI_API_KEY"] = Constants.APIKEY

query = sys.argv[1]

loader = TextLoader("./rescources/spiderman.json")
#loader = DirectoryLoader(".", glob="*.txt")
index = VectorstoreIndexCreator().from_loaders([loader])

# print(index.query(query))
print(index.query(query, llm=ChatOpenAI()) )