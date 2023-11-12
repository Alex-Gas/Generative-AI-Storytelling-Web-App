const apiUrl = 'http://127.0.0.1:5000/'; // Replace with the actual API endpoint

const askGpt = (question) => {
    console.log("test")
    fetch(apiUrl+"askgpt", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"question": question})
    })
    .then(response => {
        if (response.ok) {
        return response.json();
        console.log(response)
        console.log("response:"+response['response'])
        // document.getElementById('answer').innerHTML = response['response'];
        }
        throw new Error('Network response was not ok.');
    })
    .then(responseData => {
        console.log('Response from server:', responseData);
        console.log("response:"+responseData['response'])
        const chat = document.getElementById('chat');
        
        // document.getElementById('answer').innerHTML = responseData['response'];
        return responseData['response'];
        // Handle the response data here
    })
    .catch(error => {
        console.error('There was a problem with the POST request:', error);
    });
    
    console.log("response:"+response['response'])
        document.getElementById('answer').innerHTML = response['response'];

    function displayAnswer(answer) {
        document.getElementById('answer').innerHTML = answer;
    }

}

var input;

// here is where the prompt is acquired
function submitPrompt(){
    input = document.getElementById("prompt").value
    const response = askGpt(input);
    if (input != null){
        addChatElement(response)
    }
}

// here a link will be used to upload a text file of the book
function submitLink(){
    link = document.getElementById("link").value
}

// example functionality
function addChatElement(response){
    // creates p element and adds it to chat div with prompt value
    var paragraph = document.createElement("p");
    paragraph.textContent = response;
    var chatDiv = document.getElementById("chat");

    chatDiv.appendChild(paragraph);
    
}

