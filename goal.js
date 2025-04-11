const goal = parseInt(localStorage.getItem("goal")??"2000")
document.getElementById("goal").value=goal;

document.getElementById("submit_button").addEventListener("click", () => {
    const new_goal = document.getElementById("goal").value;
    localStorage.setItem("goal",new_goal)
    location.pathname="/"
})