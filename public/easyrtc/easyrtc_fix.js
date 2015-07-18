this.showMessage = function(messageCode, message) {
        self.onMessage({messageCode: messageCode, messageText: message});
    };
    /** @private
     * @param errorObject
     */
    this.onMessage = function(messageObject) {
        var messageDiv = document.getElementById('easyrtcMessageDialog');
        var messageBody;
        if (!messageDiv) {
            messageDiv = document.createElement("div");
            messageDiv.id = 'easyrtcMessageDialog';
            var title = document.createElement("div");
            title.innerHTML = "Messages";
            title.className = "easyrtcMessageDialog_title";
            messageDiv.appendChild(title);
            messageBody = document.createElement("div");
            messageBody.id = "easyrtcMessageDialog_body";
            messageDiv.appendChild(messageBody);
            var clearButton = document.createElement("button");
            clearButton.appendChild(document.createTextNode("Okay"));
            clearButton.className = "easyrtcMessageDialog_okayButton";
            clearButton.onclick = function() {
                errorBody.innerHTML = ""; // remove all inner nodes
                errorDiv.style.display = "none";
            };
            messageDiv.appendChild(clearButton);
            document.body.appendChild(messageDiv);
        }

        messageBody = document.getElementById("easyrtcMessageDialog_body");
        var messageNode = document.createElement("div");
        messageNode.className = 'easyrtcMessageDialog_element';
        messageNode.appendChild(document.createTextNode(messageObject.messageText));
        messageBody.appendChild(messageNode);
        messageDiv.style.display = "block";
    };