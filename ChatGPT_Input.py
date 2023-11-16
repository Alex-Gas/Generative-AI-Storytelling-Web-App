import os
import sys

import Constants
from langchain.document_loaders import TextLoader
from langchain.document_loaders import DirectoryLoader
from langchain.indexes import vectorstore
from langchain.llms import openai
from langchain.chat_models import ChatOpenAI

os.environ["OPENAI_API_KEY"] = Constants.APIKEY

query = sys.argv[1]

loader = TextLoader("data.txt")
#loader = DirectoryLoader(".", glob="*.txt")
index = vectorstore().from_loaders([loader])

print(index.query, llm=ChatOpenAI)