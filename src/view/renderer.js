console.log('Estou executando no chrome!');

const versaoChrome = document.getElementById('chrome');
const versaoNode = document.getElementById('node');
const versaoElectron = document.getElementById('electron');

versaoChrome.innerText = window.versao.chrome;
versaoNode.innerText = window.versao.node;
versaoElectron.innerText = window.versao.electron;