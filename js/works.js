document.addEventListener('DOMContentLoaded', function () {

    //ハンバーガーメニュー用
    const menuButton = document.querySelector('.c-menuButton');
    const globalMenu = document.querySelector('.c-globalMenu');
    const menuLinks = globalMenu.querySelectorAll('a');
    const overlay = document.querySelector('.c-overlay');


    function setMenuState(isOpen) {
        menuButton.classList.toggle('is-active', isOpen);
        globalMenu.classList.toggle('is-active', isOpen);

        overlay.classList.toggle('is-active', isOpen);

        menuButton.setAttribute('aria-expanded', String(isOpen));
        menuButton.setAttribute(
        'aria-label',
        isOpen ? 'メニューを閉じる' : 'メニューを開く'
        );
        globalMenu.setAttribute('aria-hidden', String(!isOpen));
        overlay.tabIndex = isOpen ? 0 : -1;
    }

    menuButton.addEventListener('click', function () {
        const isOpen = menuButton.getAttribute('aria-expanded') !== 'true';
        setMenuState(isOpen);
    });

    overlay.addEventListener('click', function () {
        setMenuState(false);
    });

    menuLinks.forEach(function (link) {
        link.addEventListener('click', function () {
        setMenuState(false);
        });
    });
});


// 1. ボタンと監視対象（button-flg）を取得
const scrollTopBtn = document.querySelector('.top-botton');
const btnflg = document.querySelector('.button-flg');

// 2. 交差したときの処理
const handleIntersect = (entries) => {
  entries.forEach(entry => {
    // button-flgが画面内に入っている、または画面より「上」に通り過ぎている場合
    if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
      scrollTopBtn.classList.add('is-show');
    } else {
      // h1が画面より「下」にある場合（トップ付近に戻ったとき）
      scrollTopBtn.classList.remove('is-show');
    }
  });
};

// 3. Observerの作成と監視の開始
const observer = new IntersectionObserver(handleIntersect, {
  root: null,
  rootMargin: '0px',
  threshold: 0 // 少しでも画面に入ったら判定
});

if (btnflg) {
  observer.observe(btnflg);
}

$(function(){
  /*=================================================
  スクロール時の画像フェード表示
  ===================================================*/
  // スクロール時のイベント
  $(window).scroll(function() {
    // fadeinクラスに対して順に処理を行う
    $('.fadein').each(function() {
      // スクロールした距離
      let scroll = $(window).scrollTop();
      // fadeinクラスの要素までの距離
      let target = $(this).offset().top;
      // 画面の高さ
      let windowHeight = $(window).height();
      // fadeinクラスの要素が画面下にきてから200px通過した
      // したタイミングで要素を表示
      if (scroll > target - windowHeight + 200) {
        $(this).css('opacity','1');
        $(this).css('transform','translateY(0)');
      }
    });
  });
});