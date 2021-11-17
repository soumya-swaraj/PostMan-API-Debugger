let parameterbox = document.getElementById("parameterbox");
let jsonbox = document.getElementById("jsonbox");
let json = document.getElementById("json");
let reqTypeGet = document.getElementById("reqTypeGet");
let reqTypePost = document.getElementById("reqTypePost");
let responce = document.getElementById("responce");
let cuspara = document.getElementById("cuspara");
let parameterCount = 1;

document.getElementById("conType").style.display = "none";
parameterbox.style.display = "none";
jsonbox.style.display = "none";

//Utility function
function getElementFromString(str) {
    let div = document.createElement("div");
    div.innerHTML = str;
    div.className = "row g-3";
    return div;
}
reqTypePost.addEventListener("click", () => {
    document.getElementById("conType").style.display = "block";
})

reqTypeGet.addEventListener("click", () => {
    document.getElementById("conType").style.display = "none";
    parameterbox.style.display = "none";
    jsonbox.style.display = "none";
})

json.addEventListener("click", () => {
    parameterbox.style.display = "none";
    jsonbox.style.display = "block";
});

cuspara.addEventListener("click", () => {
    parameterbox.style.display = "block";
    jsonbox.style.display = "none";
});

addPara.addEventListener("click", (e) => {
    e.preventDefault();
    let str = ` <div class="col-4">
                    <input id="paraName${parameterCount}" type="text" class="mt-1 form-control" placeholder="Name">
                </div>
                <div class="col-7">
                    <input id="paraValue${parameterCount}" type="text" class="mt-1 form-control" placeholder="Value">
                </div>
                <div class="col-1">
                    <button id="paraDel${parameterCount++}"  onclick="delPara(this.id)" class="delParam mt-1 btn btn-dark">-</button>
                </div>`;
    let div = getElementFromString(str);
    parameterbox.appendChild(div);
});


function delPara(id) {
    let element = document.getElementById(id);
    element.parentElement.parentElement.remove();
}


let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    responce.innerHTML = "Please Wait , Fetching Data from server . . .";
    let url = document.getElementById("urlInput").value;
    let requestType = document.querySelector("input[name = 'request']:checked").value;


    let paramData = {};
    let Data;

    if (requestType == "GET") {

        fetch(url)
            .then(resp => resp.text())
            .then((text) => {
                responce.innerHTML = text;
                Prism.highlightAll();
            });
    }
    else if (requestType == "POST") {
        let contentType = document.querySelector("input[name = 'contenttype']:checked").value;
        if (contentType == "Custom Parameters") {
            for (let i = 0; i < parameterCount; i++) {
                let key = document.getElementById(`paraName${i}`);
                let value = document.getElementById(`paraValue${i}`);
                if (key != null || value != null) {
                    paramData[key.value] = value.value;
                }
            }
            Data = JSON.stringify(paramData);
        }
        else if (contentType == "JSON") {
            Data = document.getElementById("jsonValue").value;
        }
        fetch(url, {
            method: "POST",
            body: Data,
            headers: { "Content-type": "application/json" }
        })
            .then(resp => resp.text())
            .then((text) => {
                responce.innerHTML = text;
                Prism.highlightAll();
            });
    }
});



