
import socialShare from '../../dist/es6/index';

socialShare.setShareButton('.js-social-share');

// スクリプトから動かす
const btn: HTMLButtonElement = document.querySelector('.js-test') as HTMLButtonElement;

btn.addEventListener('click', (ev: Event) => {
  socialShare.openShareWindow(socialShare.SERVICES.TWITTER);
});
