
let fields = {
    "name": "",
    "email": "",
    "message": ""
};
var data_js = {
    "access_token": "2zmvg2shw97ln4gqg9ovtdfg" // sent after you sign up
};

try {
    const btn = document.querySelector('#sendMail');

    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const messageInput = document.querySelector('#message');

    const loader = document.querySelector('#sendMessageLoader');

    nameInput.addEventListener('input', () => {
        fields.name = nameInput.value;
    })

    emailInput.addEventListener('input', () => {
        fields.email = emailInput.value;
    })

    messageInput.addEventListener('input', () => {
        fields.message = messageInput.value;
    })

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }

    function js_onSuccess() {
        window.location = window.location.pathname + "?message=Email+Successfully+Sent%21&isError=0";
    }

    function js_onError(error) {
        window.location = window.location.pathname + "?message=Email+could+not+be+sent.&isError=1";
    }

    function isValid() {
        if (btn.disabled) {
            return false;
        }

        if (fields.name.length == 0) {
            alert("Write your name, please!");
            return false;
        }

        let re = new RegExp('[0-9a-zA-Z._]+@[0-9a-zA-Z._]+', 'g');
        let emailValid = re.test(fields.email);
        if (!emailValid) {
            alert("Correct you e-mail address, please!");
            return false;
        }

        if (fields.message.length == 0) {
            alert("Your message is empty! Write something, please");
            return false;
        }

        return true;
    }

    function sendMail() {

        console.log('sending...');
        loader.classList.remove('hidden');
        btn.value = "Sending...";

        if (isValid()) {

            btn.disabled = true;
            console.log('message valid');

            let request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    js_onSuccess();
                } else
                    if (request.readyState == 4) {
                        js_onError(request.response);
                    }
            };

            data_js['subject'] = `Message from ${fields.name} (${fields.email})`;
            data_js['text'] = fields.message;
            var params = toParams(data_js);

            request.open("POST", "https://postmail.invotes.com/send", true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.send(params);

            sleep(5000);

            loader.classList.add('hidden');

            alert("Thank you for your message!");
            btn.value = "Send";
            btn.disabled = false;
        }
    };

    function toParams(data_js) {
        var form_data = [];
        for (var key in data_js) {
            form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
        }

        return form_data.join("&");
    }


    btn.addEventListener('click', sendMail);
} catch (error) {

}

