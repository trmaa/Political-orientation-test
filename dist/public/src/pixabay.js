export async function pixabay_getImg(title) {
    let API_KEY = '42418904-7d853210b63cef25443e25d4b';
    let URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(title);
    
    return new Promise((resolve, reject) => {
        $.getJSON(URL, function(data) {
            if (parseInt(data.totalHits) > 0) {
                resolve(data.hits[0].webformatURL);
            } else {
                resolve(null);
            }
        }).fail((jqxhr, textStatus, error) => {
            reject(new Error('Error al obtener la imagen de Pixabay: ' + error));
        });
    });
}

export async function verify(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        if (response.ok) {
            const contentType = response.headers.get('Content-Type');
            if (contentType && !contentType.startsWith('text/html') && !contentType.startsWith('application/octet-stream')) {
                return true; 
            }
        }
        return false;
    } catch (error) {
        console.error('Error al verificar la URL:', error);
        return false;
    }
}