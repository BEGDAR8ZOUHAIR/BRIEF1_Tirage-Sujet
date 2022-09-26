let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let nameDiv = document.querySelector(".names");
let randoDiv = document.querySelector(".form1");

let resultRandom = document.getElementById("resultRandom");


// empty array to store names
let arryOfNames = [];
let arryResOfRandomNames = [];
let sujetDeville = ['html', 'css', 'javascript', 'php', 'laravel', 'react', 'vuejs', 'node js', 'mongo db', 'expressjs', 'symphony', 'nuxtjs', 'nestjs', 'django', 'phyton', 'claud', 'firebase', 'bootstrap', 'tailwindcss', 'doker', 'redux',
    'uml', 'testunitaire', 'internetof', 'ptotocols','serverside','clientside'];



// check if this name in locale storege
if (localStorage.getItem("names"))
{
    arryOfNames = JSON.parse(localStorage.getItem("names"));
}

if (localStorage.getItem("result"))
{
    arryResOfRandomNames = JSON.parse(localStorage.getItem("result"));
}

getDataFromLocleStorege();

// Add a Name
submit.onclick = function ()
{
    if (input.value !== "")
    {
        addNameToArray(input.value); //add name to arry of names
        input.value = ""; //clear input
    } else
    {
        // aler bootstrap  alert
        alert("Please Enter a Name");
    }
}

// Trigger Button Click on Enter
input.addEventListener("keypress", function (event)
{
    if (event.key === 'Enter')
    {
        event.preventDefault();
        document.getElementById("mybtn").click();
    }
});
// CLICK ON NAME ELEMENT
nameDiv.addEventListener("click", (e) =>
{
    // delete button
    if (e.target.classList.contains("del"))
    {
        // remove from local storege
        deletData(e.target.parentElement.getAttribute("data-id"));
        // remove element from page
        e.target.parentElement.remove();

    }
})

function addNameToArray(nametext)
{
    // Name data
    const name = {
        id: Date.now(),
        title: nametext,

    };
    //push name to arry of names
    arryOfNames.push(name);
    // add name to page
    // add name to local storage
    addLocalestorege(arryOfNames);
    // addElementsToPage(arryOfNames);
    getDataFromLocleStorege()

}

function addElementsToPage(arryOfNames)
{
    // empty Name Div
    nameDiv.innerHTML = "";
    // lop on arry of name
    arryOfNames.forEach((name) =>
    {
        nameDiv.innerHTML += `
            <div class="name" data-id="${name.id}">
                
                ${name.title}
                <span class="del">Delete</span>
            </div>
        `;
    });
}

function addLocalestorege(arryOfNames)
{
    window.localStorage.setItem("names", JSON.stringify(arryOfNames));
}
function getDataFromLocleStorege()
{
    let data = window.localStorage.getItem("names");
    let result = window.localStorage.getItem("result");
    if (data)
    {
        let names = JSON.parse(data);
        addElementsToPage(names);
    }

    if (result)
    {
        let resultNames = JSON.parse(result);
        addResulElementsToPage(resultNames);
    }
}

// Result 
function addResToLocalestorege(arryOfNames)
{
    window.localStorage.setItem("result", JSON.stringify(arryOfNames));
}

// show result data


function addResulElementsToPage(arryResOfRandomNames)
{
    // empty Name Div
    resultRandom.innerHTML = "";
    // lop on arry of name
    arryResOfRandomNames.forEach((name, id) =>
    {
        resultRandom.innerHTML += `
            
            <div class="name" data-id="${name.id}">
            <span>${id + 1}</span>
            <div>${name.title}</div>
            <div>${name.sujet}</div>
            <div> ${name.date}</div>
              
            </div>
        `;
    });
}


//  delete data from local storege
function deletData(id)
{
    arryOfNames = arryOfNames.filter((name) =>
    {
        return name.id != id;
    });
    addLocalestorege(arryOfNames);
}
// random names
let randomName = document.getElementById("randomName");
let result = document.getElementById("result");

let sujetId = 0;
let ind = 1;
//random 
randomName.addEventListener("click", () =>
{

    var date = document.getElementById("date").value;

    console.log("date ", date);

    sujetId++

   
    let random = Math.floor(Math.random()*arryOfNames.length)
    result.innerHTML = arryOfNames[random].title;

    // add sujetDeville[sujetId] to arryOfNames[random]
    arryOfNames[random].sujet = sujetDeville[sujetId]
    arryOfNames[random].date = datee(date, ind++)

    

    arryResOfRandomNames.push(arryOfNames[random])

    addResToLocalestorege(arryResOfRandomNames)

    // splice name from arry
    arryOfNames.splice(random, 1);

    addLocalestorege(arryOfNames);
    // addElementsToPage(arryOfNames);
    getDataFromLocleStorege()
    

})

let remove_data = document.getElementById("remove_data");

// remove all local storege data en reload page
remove_data.addEventListener("click", () =>
{
    localStorage.clear();
    // getDataFromLocleStorege();
    location.reload();
})



    




// date 
const datee = (date, days) =>
{

    var d = moment(new Date(date)).add(Math.floor(days / 5) * 7, 'd');
    var remaining = days % 5;
    while (remaining)
    {
        d.add(1, 'd');
        if (d.day() !== 0 && d.day() !== 6)
            remaining--;
    }
    return d.format('YYYY-MM-DD');
};
























