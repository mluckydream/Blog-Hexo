//  浏览器搞笑标题 
 var OriginTitle = document.title;
 var titleTime;
 document.addEventListener('visibilitychange', function () {
     if (document.hidden) {
         $('[rel="icon"]').attr('href', "/img/algolia.svg");
         document.title = '离开我会变丑！😠';
         clearTimeout(titleTime);
     }
     else {
         $('[rel="icon"]').attr('href', "/img/algolia.svg");
         document.title = '拥抱我会变帅！😄 ' + OriginTitle;
         titleTime = setTimeout(function () {
             document.title = OriginTitle;
         }, 2000);
     }
 });