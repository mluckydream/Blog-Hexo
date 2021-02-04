//  浏览器搞笑标题 
 var OriginTitle = document.title;
 var titleTime;
 document.addEventListener('visibilitychange', function () {
     if (document.hidden) {
         $('[rel="icon"]').attr('href', "/img/algolia.svg.png");
         document.title = 'ヽ(●-`Д´-)ノ你走就承认你丑！';
         clearTimeout(titleTime);
     }
     else {
         $('[rel="icon"]').attr('href', "/img/algolia.svg.png");
         document.title = 'ヾ(Ő∀Ő3)ノ你回来就承认你帅！' + OriginTitle;
         titleTime = setTimeout(function () {
             document.title = OriginTitle;
         }, 2000);
     }
 });