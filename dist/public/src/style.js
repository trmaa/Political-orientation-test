export function playSound(src) {
    const sound = new Audio(src);
    sound.volume = 0.2;
    sound.play();
}

export function asignSounds(doc) 
{
    const buttonsAndLinks = doc.querySelectorAll("p");

    buttonsAndLinks.forEach(element => {
        element.addEventListener("mouseenter", ()=>{playSound('./storage/hover.mp3')});
        element.addEventListener("click", ()=>{playSound('./storage/click.mp3')});
    });

    const iframes = doc.querySelectorAll("iframe");

    for(const iframe of iframes){
        try {
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            asignSounds(iframeDocument);
        } catch (error) {
            console.error("Error al acceder al contenido del iframe:", error);
        }
    }
}

asignSounds(document);