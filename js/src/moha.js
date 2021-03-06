 (function(window,document,undefined){
        var hearts = [];
        var source = ["I am angry!","还是按照香港的基本法","无可奉告","我是资瓷的","too young","我是身经百战了","比你们不知道高到哪里去了","我跟他谈笑风生","比西方记者跑得快","too simple","sometimes naive!","识得唔识得啊","作为一个长者","人生的经验","闷声大发财","这是zhui好的","你们要负责","喜欢搞个大新闻","把我批判一番","你们啊Naive","我今天算是得罪了你们一下"];
        window.requestAnimationFrame = (function(){
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback){
                    setTimeout(callback,1000/60);
                }
        })();
        init();
        function init(){
            attachEvent();
            gameloop();
        }
        function getRandomKeyword() {
            return source[Math.floor(Math.random() * source.length)];
        }
        function gameloop(){
            for(var i=0;i<hearts.length;i++){
                if(hearts[i].alpha <=0){
                    document.body.removeChild(hearts[i].el);
                    hearts.splice(i,1);
                    continue;
                }
                hearts[i].y--;
                hearts[i].scale += 0.004;
                hearts[i].alpha -= 0.013;
                css({
                    left: hearts[i].x + 'px',
                    top: hearts[i].y + 'px',
                    opacity: hearts[i].alpha,
                    transform: "scale(" + hearts[i].scale + ") translate(-50%, 0)"
                }, hearts[i].el);
            }
            requestAnimationFrame(gameloop);
        }
        function attachEvent(){
            var old = typeof window.onclick==="function" && window.onclick;
            document.onclick=function(event){
                old && old();
                createWord(event);
            }
        }
        var randomColor = function(){    

  return  '#' +    
    (function(color){    
    return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])    
      && (color.length == 6) ?  color : arguments.callee(color);    
  })('');    
} 
        function createWord(event){
            var d = document.createElement("div");
            hearts.push({
                el : d,
                x : event.clientX - 5,
                y : event.clientY - 5,
                scale : 1,
                alpha : 1,
                color : randomColor()
            });
            css({
                display: 'inline-block',
                transform: 'translate(-50%, 0)',
                position: 'fixed',
                zIndex: '99999999',
                color: 'red',
                fontSize: '16px'
            }, d);
            d.innerHTML = getRandomKeyword();
            document.body.appendChild(d);
            d.onselectstart = function() { return false; }
        }
        function css(css, node){
            for (var index in css) {
                if (css.hasOwnProperty(index)) {
                    node.style[index] = css[index];
                }
            }
        }
    })(window,document);