console.log("postmaster")
// utility function:
// 1.utility function to get dom Element from string
function getelementfromstring(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// initialize No. of parameters
let addedparamscount = 0;

// hide parameter box initially
let parametersBox = document.getElementById('parametersBox')
parametersBox.style.display = 'none';

// if the user clicks on params box hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})


// if the user clicks on json box hide the params box

let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
})

// if user clicks on + button add more parameters
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let Params = document.getElementById('Params');
    let string = `<div class="form-row my-2">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedparamscount +2}</label>
                    <div class=" col-md-4">
                      <input type="text" class="form-control" id="parameterkey${addedparamscount +2}" placeholder="Parameter ${addedparamscount +2} key">
                    </div>
                    <div class=" col-md-4">
                      <input type="text" class="form-control" id="parametervalue${addedparamscount +2}" placeholder="Parameter ${addedparamscount +2} Value">
                    </div>
                    <button class="btn btn-primary deleteParam"> - </button>
                    </div>`
    // convert Element string to DOM node
    let paramElement = getelementfromstring(string);
    Params.appendChild(paramElement);
    // add an event listner to remove the parameters on click - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }
    addedparamscount++;
})

// if the user click submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // show please wait in response box to request patience from user
    document.getElementById('responsejsonText').value = 'please wait.... Fetcheing response';

    //fetch all the values user has entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name = 'requestType']:checked").value;
    let contentType = document.querySelector("input[name = 'contentType']:checked").value;

    //log all values in console for debug
    // console.log('url is', url);
    // console.log('requestType is', requestType);
    // console.log('contentType is', contentType);

    //if user has used params option insted of json, collect all the parameters in an object
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addedparamscount + 1; i++) {
            if (document.getElementById('parameterkey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterkey' + (i + 1)).value;
                let value = document.getElementById('parametervalue' + (i + 1)).value;
                data[key] = value;
            }
            data = JSON.stringify(data); //error in stringify the the value err.. data is "{\"key\":\"value\"}"
        }

    } else {
        data = document.getElementById('requestjsonText').value;

    }
    //log all values in console for debug
    console.log('url is', url);
    console.log('requestType is', requestType);
    console.log('contentType is', contentType);
    console.log('data is', data); //err.. data is "{\"key\":\"value\"}"

    // if requestType is get ,invoke fetch api to create apost request
    if (requestType == 'GET') {
        fetch(url, {
                method: 'GET',
            })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responsejsonText').value = text;
            });
    }

    // if requestType is post ,invoke fetch api to create apost request
    else {
        fetch(url, {
                method: 'POST',
            //    body : data
                headers: {
                    "content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responsejsonText').value = text;
            });
    }
})