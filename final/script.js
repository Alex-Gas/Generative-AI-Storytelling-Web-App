const apiUrl = 'http://127.0.0.1:5000/'; // Replace with the actual API endpoint

let questionNum = 0

// performs http post request to server which uses openai library 
const initialise = async (protagonist, antagonist, context) => {
    try {
        const response = await fetch(apiUrl + "create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'protagonist': protagonist, 'antagonist': antagonist, 'context': context })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const responseData = await response.json();
        console.log('Response from server:', responseData);
        questionNum = 1;
        return responseData['response'];
    } catch (error) {
        console.error('There was a problem with the POST request:', error);
    }
    // fetch(apiUrl+"create", {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({'protagonist': protagonist, 'antagonist': antagonist,'context': context})
    // })
    // .then(response => {
    //     if (response.ok) {
    //     return response.json();
    //     console.log(response)
    //     console.log("response:"+response['response'])
    //     // document.getElementById('answer').innerHTML = response['response'];
    //     }
    //     throw new Error('Network response was not ok.');
    // })
    // .then(responseData => {
    //     console.log('Response from server:', responseData);
    //     console.log("response:"+responseData['response'])
    //     return responseData['response']
    //     const chat = document.getElementById('chat');

    //     // update chat log
    //     addChatElement(responseData["response"]);
    // })
    // .catch(error => {
    //     console.error('There was a problem with the POST request:', error);
    // });

    // function displayAnswer(answer) {
    //     document.getElementById('answer').innerHTML = answer;
    // }

}

const invoke = async (option) => {
    try {
        const response = await fetch(apiUrl + "invoke", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'option': option, 'questionNum': questionNum })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const responseData = await response.json();
        console.log('Response from server:', responseData);
        questionNum += 1;
        return responseData['response'];
    } catch (error) {
        console.error('There was a problem with the POST request:', error);
    }
}

var input;

// here is where the prompt is acquired
async function submitPrompt(){
    lockInput()
    input = document.getElementById("prompt").value;
    displayUserPrompt(input); // new way to display what the user has written
    try {
        // uploadSettings' is assumed to be an async function that fetches the first question/response
        let qu = await invoke(input);
        console.log(qu);

        // Now call 'addChatElement' with the awaited 'firstQu'
        await displayAIAnswer(qu);
        unlockInput();
    }
     catch (error) {
        console.error('Error:', error);
    displayAIAnswer("error") // EXAMPLE of displaying AI answer, remove it when not needed
    // const answ = askGpt(input);
    } finally {
        unlockInput();
    }
}

// here a link will be used to upload a text file of the book
function submitLink(){
    link = document.getElementById("link").value;
}



// !!!!!!!!!!!!!!!!!
// OBSOLETE FUNCTION, USE displayUserPrompt() and displayAIAnswer()
async function addChatElement(outputString){
    
    // creates p element and adds it to chat div with prompt value
    var paragraph = document.createElement("p");
    console.log("outputString: "+outputString)
    paragraph.textContent = outputString;
    var chatDiv = document.getElementById("chat");
    chatDiv.appendChild(paragraph);
    
}



async function submitSettings(){

    lockSettings(); // Lock settings during processing

    try {
        // 'uploadSettings' is assumed to be an async function that fetches the first question/response
        let firstQu = await uploadSettings();
        console.log(firstQu);

        showChat(); // Show the chat UI

        // Now call 'addChatElement' with the awaited 'firstQu'
        await displayAIAnswer(firstQu);
    } catch (error) {
        console.error('Error:', error);
        // Handle the error appropriately
    }
}


// here the settings get sent to chatgpt
async function uploadSettings(){

    let genre = document.getElementById("genre-select").value;
    let world = document.getElementById("world-input").value;
    let protagonist = document.getElementById("protagonist-input").value;
    let antagonist = document.getElementById("antagonist-input").value;
    const response = await initialise(protagonist, antagonist, world);
    return response
    console.log(genre)
    console.log(world)
    console.log(protagonist)
    console.log(antagonist)
    // compile the settings and send it to Chat-GPT 
    // place here all functionality related to the first prompt which applies settings of the ChatGPT
}

// calling this function displays what the user prompts in the chat 
function displayUserPrompt(text){
    if (text != null){
        let box = document.createElement("div");
        box.classList.add("chat-prompt-display");
        spawnChatBox(text, box);
    }
    else {
        console.log("User input is null")
    }
}

// calling this function display what the AI answeres in the chat
// function displayAIAnswer(text){
//     if (text != null){
//         let box = document.createElement("div");
//         box.classList.add("chat-answer-display");
//         spawnChatBox(formatResponseForHTML(text), box);
//     }
//     else {
//         console.log("AI answer is null")
//     }
// }


// calling this function display what the AI answers in the chat
function displayAIAnswer(text){
    if (text != null){
        let box = document.createElement("div");
        box.classList.add("chat-answer-display");
        let pre = document.createElement("pre");
        pre.innerHTML = formatResponseForHTML(text); // Use innerHTML to interpret <br> tags
        box.appendChild(pre);
        appendMessageToChat(box);
    }
    else {
        console.log("AI answer is null")
    }
}

// Function to append the message box to the chat container
function appendMessageToChat(box) {
    let chatDiv = document.getElementById("chat");
    chatDiv.appendChild(box);
    chatDiv.scrollTop = chatDiv.scrollHeight; // Auto-scroll to the latest message
}

// this just constructs html structure
// its for UI only, ignore it
function spawnChatBox(text, box){
    let paragraph = document.createElement("p");
    paragraph.textContent = text;

    box.appendChild(paragraph);
    let chatDiv = document.getElementById("chat");

    chatDiv.appendChild(box);
}

// this function is a safety mechanism that disables all input boxes during the wait time between clicking the button and getting an answer from chatgpt
// its for UI only, ignore it
function lockSettings(){
    // all setting boxes will be turned off so no input can be changed
    let list = document.getElementsByClassName("setting");
    for (let i = 0; i < list.length; i++){
        list[i].disabled = true;
    }
}

function lockInput(){
    let button = document.getElementById("btnSubmit");
    button.disabled = true;
}

function unlockInput(){
    let button = document.getElementById("btnSubmit");
    button.disabled = false;
}

// show chat and hide settings
// its for UI only, ignore it
function showChat(){
    document.getElementById("settings-window").style.display = "none";
    document.getElementById("chat-window").style.display = "block";
}

// show settings and hide chat
// its for UI only, ignore it
function showSettings(){
    document.getElementById("chat-window").style.display = "none";
    document.getElementById("settings-window").style.display = "block";
}

function formatResponseForHTML(response) {
    return response.replace(/\n/g, '<br>');
}
