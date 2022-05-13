function v(t,n){return{x:t,y:n}}function vc(t,n){return t.x==n.x&&t.y==n.y}var uniqueId=0;function newId(){return uniqueId+=1}function randInt(t,n,e=Math.random()){return Math.floor(e*(n+1-t))+t}function bias(t,n){let e=Math.pow(1-n,3);return t*e/(t*e-t+1)}function falloff(t,n){let e=t+.5,r=n;return 1/(1+Math.pow(Math.E,e*r-r))}function getDistance(t,n){let e=t.x-n.x,r=t.y-n.y;return Math.sqrt(Math.pow(e,2)+Math.pow(r,2))}function getAngle(t,n){return-Math.atan2(t.x-n.x,t.y-n.y)+.5*Math.PI}function snap(t,n){return Math.floor(t/n)*n}function clamp(t,n,e){return t>e?t=e:t<n&&(t=n),t}function stopOverflow(t,n){return(t%n+n)%n}function xmur3(t){for(var n=0,e=1779033703^t.length;n<t.length;n++)e=(e=Math.imul(e^t.charCodeAt(n),3432918353))<<13|e>>>19;return function(){return e=Math.imul(e^e>>>16,2246822507),e=Math.imul(e^e>>>13,3266489909),((e^=e>>>16)>>>0)/45e8}}function seedRand(){let t=1;for(let n=0;n<arguments.length;n++){t=xmur3(`${arguments[n]}-${t}`)()}return t}function testRectCollision(t,n,e,r,o,u,a,i){return o>t&&o>t+e&&u>n&&u<n+r}function roundPoint(t,n){return t>n?1:0}function average(){let t=0;for(let n=0;n<arguments.length;n++)t+=arguments[n];return t/arguments.length}function stringToChar(t){let n=0;for(let e=0;e<t.length;e++){n+=t[e].charCodeAt()*Math.pow(2,e)}return n}function randRadius(t,n,e){let r=2*Math.PI*Math.random(),o=randInt(n,e);return v(t.x+Math.cos(r)*o,t.y+Math.sin(r)*o)}function dummySnap(t,n){return t}function rotate(t,n,e){var r=e,o=Math.cos(r),u=Math.sin(r);return{x:o*(n.x-t.x)+u*(n.y-t.y)+t.x,y:o*(n.y-t.y)-u*(n.x-t.x)+t.y}}function download(t,n){var e=document.createElement("a");e.setAttribute("href","data:text/plaincharset=utf-8,"+encodeURIComponent(n)),e.setAttribute("download",t),e.style.display="none",document.body.appendChild(e),e.click(),document.body.removeChild(e)}function seedRandomPos(t,n){return seedRand(t,n.x,n.y)}function seedRandomVar(t,n){return seedRand(t,n)}
function array2d(width, height, callback=function(){return 0}) {
    var returnArray = new Array()
    for (let x = 0; x < width; x++) {
        returnArray[x] = new Array()
        for (let y = 0; y < height; y++) {
            returnArray[x][y] = callback(x, y)
        }
    }
    return returnArray
}
function rotateCtx(ctx, pos, angle) {
    ctx.translate(pos.x, pos.y)
    ctx.rotate(angle)
    ctx.translate(-pos.x, -pos.y)
}

function getAdajcentHexes(pos) {

    var mod = (pos.y%2==1)?v(0,0):v(1,0),
        a = [
        v(pos.x+0,pos.y+1),
        v(pos.x-1,pos.y-1),
        v(pos.x+0,pos.y-1),
        v(pos.x-1,pos.y+0),
        v(pos.x-1,pos.y+1),
        v(pos.x+1,pos.y+0),
    ]
    for (let i = 0; i < a.length; i++) {
        var pos = a[i];
        if (pos.y%2==1) {
            pos.x += mod.x
            pos.y += mod.y
        }
        
        if (pos.x<0||pos.y<0) {
            a.splice(i, 1)
        }
    }

    return a
}
var pSBC=(p,c0,c1,l)=>{
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
    if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(","),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
            d=i(d.slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}