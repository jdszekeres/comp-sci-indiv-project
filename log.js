const items = JSON.parse(localStorage.getItem("food")??'[]').reverse()
function getImage(category) {
    switch (category) {
        case "vegetable":
            return "https://plus.unsplash.com/premium_photo-1661281266225-6a03f48cda57?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmVnZXRhYmxlfGVufDB8MnwwfHx8MA%3D%3D"
        case "fruit":
            return "https://images.unsplash.com/photo-1584559582213-787a2953dcbe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZnJ1aXR8ZW58MHwyfDB8fHww"
        case "grain":
            return "https://images.unsplash.com/photo-1415381850596-1d29bce989f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3JhaW58ZW58MHwyfDB8fHww"
        case 'dairy':
            return "https://images.unsplash.com/photo-1523473827533-2a64d0d36748?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFpcnl8ZW58MHwyfDB8fHww"
        case "protein":
            return "https://images.unsplash.com/photo-1708615017161-2eff302d0389?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVhdHxlbnwwfDJ8MHx8fDA%3D"
        case "sugar":
            return "https://plus.unsplash.com/premium_photo-1683121823310-121e5fe5a06d?q=80&w=1422&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        default:
            return "https://plus.unsplash.com/premium_photo-1670963025556-c2d4dc880a45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNvb2tpbmd8ZW58MHwyfDB8fHww"
    }
}
function remove_log(epoch) {
    var prev_items = structuredClone(items);
    var new_items = prev_items.filter((data)=>data.date != epoch);
    localStorage.setItem("food",JSON.stringify(new_items.reverse()));
    location.reload()
}
function createElementFromHTML(htmlString) {
    // https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
  
    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
  }
if (items.length === 0) {
    document.getElementById("items").innerHTML="<span style='font-size: xx-large'>No entries logged</span>"
}
for (var i = 0; i < items.length; i++) {
    const item = items[i]
    const div = document.createElement("div")
    div.className = "log"
    const image = document.createElement("img")
    image.src = getImage(item.category)
    div.appendChild(image)
    const subdiv = document.createElement("div")
    const header = document.createElement("h1")
    header.className = "log-title"
    header.appendChild(document.createTextNode(item.name))
    subdiv.appendChild(header)
    const subheader = document.createElement("h2")
    subheader.className = "log-subtitle"
    const text_string = `${item.calories} cal • ${new Date(item.date).toLocaleString()}`
    subheader.appendChild(document.createTextNode(text_string))
    subdiv.appendChild(subheader)
    div.appendChild(subdiv)
    const delete_icon = `<img src="/trash-solid.svg" class="delete-icon" role="button" onclick="remove_log(${item.date})" />`
    // document.createElement("img")
    // delete_icon.className = "delete-icon"
    // delete_icon.src = '/trash-solid.svg'
    // delete_icon.role = "button";
    // delete_icon.onclick = function() {
    //     console.log("click"+item.name)
    //     remove_log(item.date)
    // };
    div.appendChild(createElementFromHTML(delete_icon)) //special usage for onclick

    document.getElementById("items").appendChild(div)
}

if (items.length % 3 !== 0) {
    document.getElementById("items").innerHTML += '<div class="log invis"></div>'.repeat(3 - items.length%3);
}
