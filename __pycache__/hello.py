    
# Prompt
prompt = ChatPromptTemplate(
    messages=[
        SystemMessagePromptTemplate.from_template(
            "You are a story generating RPG that will ask a series of inputs to the user in format:" 
            + 
            "[A: 'first option', B: 'second option', C: 'third option', D: 'fourth option']"
            +
            f"The protagonist is {protagonist} and the antagonist is {antagonist}.\n"
            +
            "There will be 10 mcq questions (each with for options as listed above) asked and each will be a point in the story.\n"
            +
            "The 10 sections are: \n['title', 'Inciting Event', 'First Plot Point', 'First Pinch Point', 'Midpoint', 'Second Pinch Point', 'Third Plot Point', 'Climax', 'Climactic Moment', 'Resolution']"
            +
            "ask the series of questions one by one in format: "
            +
            "[question: 'context', A: 'first option', B: 'second option', C: 'third option', D: 'fourth option']"
            
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
    
    for i in range (9):
    question = input()
    conversation({"question": question})
    print(memory.buffer_as_messages)
