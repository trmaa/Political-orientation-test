import { json_read, json_download, html_read } from "./json.js";
import { pixabay_getImg } from "./pixabay.js";
import { sound_asign } from "./style.js";
import { feedback_completion } from "./loadingBar.js";

let Fascist = 0;
let Sovietic = 0;
let Comunist = 0;
let Liberal = 0;

async function calc(){
    let datos = {Fascist:Fascist,Sovietic:Sovietic,Comunist:Comunist,Liberal:Liberal};
    let valores = Object.values(datos);
    let maximo = Math.max.apply(null, valores);
    let idMaximo = Object.keys(datos).find(key => datos[key] === maximo);

    const questions = await json_read("./src/questions.json");

    return `
        You are: ${idMaximo}<br></br>
        Fascist: ${datos.Fascist*100/questions.length}%<br>
        Sovietic: ${datos.Sovietic*100/questions.length}%<br>
        Comunist: ${datos.Comunist*100/questions.length}%<br>
        Liberal: ${datos.Liberal*100/questions.length}%<br>
    `;
}

async function load()
{
    const questions = await json_read("./src/questions.json");
    const questionsDiv = document.getElementById("questions");

    for(const q of questions){
        const questionElement = document.createElement("div");
        const img = await pixabay_getImg(q.question);

        questionElement.innerHTML = `
            <h2>${q.question}</h2>
            <div class="cont">
                <div class="options">
                    <p class="f">a) ${q.f}</p>
                    <p class="s">b) ${q.s}</p>
                    <p class="c">c) ${q.c}</p>
                    <p class="l">d) ${q.l}</p>
                </div>
                <div class="foto">
                    <img src="${img}" style="width:100%;"></img>
                </div>
            </div>
        `;
        questionsDiv.appendChild(questionElement);

        const options = questionElement.querySelectorAll('.options p');
        options.forEach(option => {
            option.addEventListener("click", () => {
                const optionId = option.id;
                const optionClass = option.classList[0];
                switch (optionClass) {
                    case 'f':
                        Fascist++;
                        break;
                    case 's':
                        Sovietic++;
                        break;
                    case 'c':
                        Comunist++;
                        break;
                    case 'l':
                        Liberal++;
                        break;
                    default:
                        break;
                }
                questionElement.remove();
                feedback_completion();
            });
        });
    }

    sound_asign(document);
} await load();


let intervalId = setInterval(() => {
    if (document.getElementById("questions").innerHTML === "") {
        (async () => {
            let data = await calc();
            let content = await html_read("./components/result.html");
            document.write(content);
            document.querySelector("#calc").innerHTML = data;
            clearInterval(intervalId);
        })();
    }
}, 100);