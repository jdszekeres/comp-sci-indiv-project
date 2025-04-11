var calories_today = 0;
var daily_calories = parseInt(localStorage.getItem("goal")??'2000');
function update() {
    calories_today = JSON.parse(localStorage.getItem("food")??'[]').filter((element) => new Date(element.date).setHours(0,0,0,0) == new Date().setHours(0,0,0,0)).reduce((prev,cur)=>prev+cur.calories,0)
    document.getElementById("goal").innerText = daily_calories.toString()
    document.getElementById("today_count").innerText = calories_today.toString()
    const percent = calories_today/daily_calories * 100;
    document.getElementById("completion-circle").style.background=`conic-gradient(green 0%, green ${percent}%, white ${percent+0.01}%, white 100%)`
    if (calories_today > daily_calories) {
        document.getElementById("completion-circle").classList.add("flash");
    }
}
function logMeal(name, calories, category) {
    const date = new Date().getTime()
    const prev_data = JSON.parse(localStorage.getItem("food")??'[]')
    prev_data.push({
        name, calories, category, date
    })
    localStorage.setItem("food", JSON.stringify(prev_data))

    update()
}
update()

document.getElementById("submit_button").addEventListener("click", (e) => {
    const name = document.getElementById("item_name").value;
    const calories = parseInt(document.getElementById("item_calories").value);
    const category = document.getElementById("item_category").value;

    if (name == " " || isNaN(calories) || category === "reject") {
        alert("Please fill out all text boxes")
        return false;
    }
    logMeal(name, calories, category)
    document.getElementById("item_name").value = ""
    document.getElementById("item_calories").value = ""
    document.getElementById("item_category").value="reject"
    return false;
})
