function saveImage(canvas, filename){
    var image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    var save_link = document.createElement('a')
    save_link.href = image
    save_link.download = filename || 'file_'+new Date().getTime()+'.png'
    save_link.click()
}

function createTaiJi(cxt, l){
    const PI = Math.PI
    cxt.clearRect(-l, -l, l, l)
    cxt.arc(0,0,l,0,2*PI,0)
    cxt.stroke()
    cxt.beginPath()
    cxt.arc(0, -l/2, l/2, -PI/2, PI/2, 0);
    cxt.arc(0, l/2, l/2, 3/2*PI, PI/2, 1);
    cxt.arc(0, 0, l, PI/2, PI*3/2, 0);
    cxt.fill();
    cxt.beginPath();
    cxt.fillStyle = '#fff';
    cxt.arc(0, -l/2, l/7, 0, PI*2, 0);
    cxt.fill();
    cxt.beginPath();
    cxt.fillStyle = '#000';
    cxt.arc(0, l/2, l/7, 0, PI*2, 0);
    cxt.fill();
}
function drawRect(cxt,cxt2, x, y, width, height){
    if(width && height){
        cxt2.clearRect(0,0,200,200)
        cxt2.putImageData(cxt.getImageData(x, y, width, height), 0,0)
    }
}
let v = document.getElementById('div')
let canvas = document.getElementById('canvas_1')
let cxt = canvas.getContext('2d')
let l = canvas.width/2
cxt.translate(l, l)
createTaiJi(cxt, l)

let canvas2 = document.getElementById('canvas_2')
let cxt2 = canvas2.getContext('2d')

document.getElementById('button_1').onclick = ()=>saveImage(canvas2, 'screen_'+new Date().getTime()+'.png')
 
document.getElementById('button_2').onclick = ()=>{
    let click = 0
    let div = null
    canvas.onclick = (e)=>{
        click ++;
        if(click%2 == 1){
            if(div){
                document.getElementById('draw').removeChild(div)
            }
            div = document.createElement('div')
            div.style.position = 'absolute'
            div.style.top = e.offsetY+'px'
            div.style.left = e.offsetX+'px'
            div.style.background = 'red'
            div.style.opacity = '0.5'
            div.style.border = '0px dashed black'
            document.getElementById('draw').appendChild(div)

            canvas.onmousemove = (event)=>{
            // console.log('client', e.clientX, e.clientY) // 相对屏幕的位置
            // console.log('layer', e.layerX, e.layerY) // 相对于元素左上角的位置
            // console.log('movement', e.movementX, e.movementY) // 鼠标相对上一次的移动
            // console.log('offset',e.offsetX, e.offsetY) // 相对元素左上角的位置
            // console.log('page', e.pageX, e.pageY) // 相对页面左上角
            // console.log('screen', e.screenX, e.screenY) // 相对屏幕左上角
            // console.log('', e.x, e.y) // 相对页面左上角
            div.style.width = Math.abs(event.offsetX - e.offsetX)+ 'px'
            div.style.height = Math.abs(event.offsetY - e.offsetY)+'px'
            drawRect(cxt,cxt2, e.offsetX,e.offsetY,Math.abs(event.offsetX - e.offsetX),Math.abs(event.offsetY - e.offsetY))
        }
        }else{
            canvas.onmousemove = ()=>{}
        }
    }
}