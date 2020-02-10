let loadingTimeout = null;
const loadingDelay = 250;

const hiddenClass = 'hidden';

const $qrcode = document.querySelector('.js-qrcode');
const $loading = document.querySelector('.js-loading');

const qrcode = new QRCode($qrcode);

function generate(url) {
  qrcode.makeCode(url);
  toggleLoading(false);
}

function toggleLoading(state) {
  if (state) {
    $loading.classList.remove(hiddenClass);
    $qrcode.classList.add(hiddenClass);
  } else {
    $loading.classList.add(hiddenClass);
    $qrcode.classList.remove(hiddenClass);
  }
}

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  const { url } = tabs[0];

  if (!!url) {
    loadingTimeout = setTimeout(function() {
      toggleLoading(true);
      generate(url);
    }, loadingDelay);
  }
});
