import { json_read } from "./json.js";

let variable = 0;
const questions = await json_read("./src/questions.json");

export function feedback_completion() {
    variable++;
    let barra = document.getElementById("barra");
    barra.style.width = (variable*100/questions.length) + "vw";
}