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
            shader = gl.createShader(gl.VERTEX_SHADER);
            shaderScript = document.getElementById("shader-vsh").textContent;
        } else if (type == "fsh") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
            shaderScript = document.getElementById("shader-fsh").textContent;
        }
    } catch (e) {
        alert("Create Shader Error1");
        return null;
    }
    if (str == null) {
        alert("Create Shader Error2");
        return null;
    }
    gl.shaderSource(shader, shaderScript);
    gl.compileShader(shader);
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) == 0)
        alert("Create Shader Error3 : " + gl.getShaderInfoLog(shader));
    return shader;
}

function wheelHandler(ev){
    var offset = ((ev.detail || ev.wheelDelta) > 0) ? 0.1 : -0.1;
    ev.preventDefault();

    draw(gl, mvMatLoc, prMatLoc, c_w, c_h, transl, 0, xRot, 0, yRot, 0, zRot, 0);
    transl += offset;
}

var isMouseDown = false;
function mouseDown(ev){
    isMouseDown = true;
}

var mx = 0, my = 0;
function mouseUpev(){
    isMouseDown = false;
    mx = ev.clientX;
    my = ev.clientY;
}

function mousemove(ev) {
    var xoffset, yoffset, zoffset;
    if(isMouseDown == false) return ;
    if (ev.shiftKey) {
        zoffset = Math.abs(ev.clientX - mx) > Math.abs(ev.clientY - my) ? ev.clientX - mx : ev.clientY - my;
    } else {
        xoffset = ev.clientX - mx;
        yoffset = ev.clientY - my;
    }
    draw(gl, mvMatLoc, prMatLoc, c_w, c_h, transl, 0, xRot, xoffset, yRot, yoffset, zRot, zoffset);
    xRot += xoffset, yRot += yoffset, zRot += zoffset;
}