export function sound_play(src) {
    const sound = new Audio(src);
    sound.volume = 0.2;
    sound.play();
}

export function sound_asign(doc) 
{
    const buttonsAndLinks = doc.querySelectorAll("p");

    buttonsAndLinks.forEach(element => {
        element.addEventListener("mouseenter", ()=>{sound_play('./storage/hover.mp3')});
        element.addEventListener("click", ()=>{sound_play('./storage/click.mp3')});
    });

    const iframes = doc.querySelectorAll("iframe");

    for(const iframe of iframes){
        try {
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            sound_asign(iframeDocument);
        } catch (error) {
            console.error("Error al acceder al contenido del iframe:", error);
        }
    }
}

sound_asign(document);