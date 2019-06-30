import MessageService from "./message-service.js";

let currentUser = "kavyamuppalla";
const messageService = new MessageService();

window.addEventListener("load", function () {
    document.getElementById("greeting").innerHTML = `Welcome ${currentUser}!`;
    messageService.getAllMessages().then(successCallback, errorCallback);
    
    function successCallback(response) {
        // This data comes from the resolve method
        populateMessages(response);
    }

    function errorCallback(response) {
        // This data comes from the reject method
        console.log(response);
    }

    createFormListener();
    
});

function populateMessages(messages) {
    messages.forEach(message => {
        addMessageToThread(message);
    });
}
function createFormListener() {
    const form = document.getElementById("new-message-form");

    form.onsubmit = function (event) {
        //console.log("Submit called");
        // stop the regular form submission
        event.preventDefault();

        const data = {
            fromid: currentUser,
            message: form.message.value
        };

        messageService.createNewMessage(data)
            .then(successCallback, errorCallback);

        function successCallback(response) {
            // This data comes from the resolve method
            addMessageToThread(response);
        }

        function errorCallback(response) {
            // This data comes from the reject method
            console.log(response);
        }
    }

}



function addMessageToThread(message) {
    const messageListItem = document.createElement("LI");
    const userIdHeading = document.createElement("h3");
    const messageParagraph = document.createElement("p");
    const messageContent = document.createTextNode(message.message);
    const userIdContent = document.createTextNode(message.fromid);
    userIdHeading.appendChild(userIdContent);
    messageParagraph.appendChild(messageContent);
    messageListItem.appendChild(userIdHeading);
    messageListItem.appendChild(messageParagraph);
    document.getElementById("message-list").appendChild(messageListItem);
}



