/**
 * initGL.
 * @param canvas : The canvas_object of html document.
 * @return gl : WebGL_Object.
 */
function initGL(canvas) {
    var gl = null;
    if (!window.WebGLRenderingContext) {
        alert("Your browser does not support WebGL. See http://get.webgl.org");
        return null;
    }
    try {
        gl = canvas.getContext("experimental-webgl") || canvas.getContext("webgl") || canvas.getContext("webgl2");
    } catch (e) { alert("Can't get WebGL"); }
    if (!gl) { alert("Can't get WebGL"); }
    return gl;
}

/**
 * add event listener for canvas
 */
function addEventHandler(canvas){
    canvas.addEventListener('DOMMouseScroll',   wheelHandler, false);   //add wheel event for FireFox
    canvas.addEventListener('wheel',            wheelHandler, false);   //add wheel event for others
    canvas.addEventListener('mousedown',        mouseDown,    false);   //add mouse l&&r down event
    canvas.addEventListener('mouseup',          mouseUp,      false);   //add mouse l&&r up event
    canvas.addEventListener('mousemove',        mousemove,    false);   //add mouse l&&r move event
}

/**
 * getShader use code in file.
 * @param filename : the file name of code src.
 * @param type : vsh or fsh.
 * @return shader : the object of shader.
 */
function getShader(gl, type) {
    var shader = null, shaderScript = null;
    try {
        if (type == "vsh") {
            shader = gl.createShader(gl.VERTEX_SHADER);                         //create vertex_shader
            shaderScript = document.getElementById("shader-vsh").textContent;   //get vsh source
        } else if (type == "fsh") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);                       //create vertex_shader
            shaderScript = document.getElementById("shader-fsh").textContent;   //get fsh source
        }
    } catch (e) {
        alert("Create Shader Error1");
        return null;
    }
    gl.shaderSource(shader, shaderScript);                                      //source code bind shader
    gl.compileShader(shader);                                                   //compileShader
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) == 0)                  //getErrorState
        alert("Create Shader Error3 : " + gl.getShaderInfoLog(shader));
    return shader;
}

function wheelHandler(ev){
    var offset = ((ev.detail || ev.wheelDelta) > 0) ? 0.1 : -0.1;
    ev.preventDefault();

    draw(gl, mvMatLoc, prMatLoc, c_w, c_h, transl, 0, xRot, 0, yRot, 0, zRot, 0);
    transl += offset;
}

var mx = 0, my = 0;
var isMouseDown = false;
function mouseDown(ev){
    isMouseDown = true;                                                         //flag for mouseDownState
    mx = ev.clientX;
    my = ev.clientY;
}

function mouseUp(ev){
    isMouseDown = false;
}

function mousemove(ev) {
    var xoffset = 0, yoffset = 0, zoffset = 0;
    if(isMouseDown == false) return ;
    if (ev.shiftKey) {                                                          //true when you press 'shift' key during your mosemove 
        zoffset = Math.abs(ev.clientX - mx) > Math.abs(ev.clientY - my) ? ev.clientX - mx : ev.clientY - my;
        zoffset = zoffset * 0.1;    
    } else {
        yoffset = (ev.clientX - mx) * 0.1;
        xoffset = (ev.clientY - my) * 0.1;
    }
    draw(gl, mvMatLoc, prMatLoc, c_w, c_h, transl, 0, xRot, xoffset, yRot, yoffset, zRot, zoffset);
    xRot += xoffset, yRot += yoffset, zRot += zoffset;
    mx = ev.clientX;
    my = ev.clientY;
}