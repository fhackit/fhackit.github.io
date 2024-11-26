// Fetch the encoded CSS file
fetch('style.css')
    .then(response => response.text())
    .then(encodedCSS => {
        // Decode the Base64 content
        const decodedCSS = atob(encodedCSS.trim());
        
        // Create and append a <style> element
        const style = document.createElement('style');
        style.textContent = decodedCSS;
        document.head.appendChild(style);
    })
    .catch(error => console.error('Error loading CSS:', error));
