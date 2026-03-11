(function() {
    // 1. Criar e configurar a tag <link> para o CSS
    const bootstrapCSS = document.createElement('link');
    bootstrapCSS.rel = 'stylesheet';
    bootstrapCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'; 
    // Dica: Se você baixou o bootstrap, use o caminho local: '../css/bootstrap.min.css'

    // 2. Criar e configurar a tag <script> para o JS do Bootstrap
    const bootstrapJS = document.createElement('script');
    bootstrapJS.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js';
    bootstrapJS.defer = true;

    // 3. Injetar no HTML
    document.head.appendChild(bootstrapCSS);
    document.body.appendChild(bootstrapJS);

    console.log("Bootstrap injetado via automação com sucesso!");
})();