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
    } catch (e) { }
    if (!gl) { alert("Can't get WebGL"); }
    return gl;
}

/** 
 * main function, ref : http://www.ibiblio.org/e-notes/webgl/deflate/ship.html
 */
function main() {
    /** init WebGL **/
    var size = Math.min(window.innerWidth, window.innerHeight) - 10;
    var c_w = window.innerWidth - 50, c_h = window.innerHeight - 10;    //calculate w and h
    var canvas = document.getElementById("canvas");                     //get vanvas_object
    var gl = initGL(canvas);                                            //initGL

    canvas.width = c_w; canvas.height = c_h;                            //set canvas size
    gl.viewport(0, 0, c_w, c_h);                                        //set viewport
    gl.clearColor(0.1, 0.1, 1.0, 1.0);                                  //set clearColor
    gl.clear(gl.COLOR_BUFFER_BIT);                                      //run clear
    gl.enable(gl.DEPTH_TEST);                                           //open the test of depth_buffer

    /** init WebGL Program **/
    var program = gl.createProgram();                                   //create WebGL program what run at graphic device
    gl.attachShader(program, getShader(gl, "vsh"));                     //attach shader, vex_shader
    gl.attachShader(program, getShader(gl, "fsh"));                     //attach shader, fra_shader
    gl.linkProgram(program);                                            //link object_gl with program
    gl.useProgram(program);                                             //use program

    /** BingData for attribute in shader **/
    var pos = gl.getAttribLocation(prog, "aPos");                       //get the adress of attribute->aPos in vex_shader
    gl.enableVertexAttribArray(pos);                                    //enable write data when use gl.vertexAttribPointer
    var norm = gl.getAttribLocation(prog, "aNorm");                     //get the adress of attribute->aNorm in vex_shader
    gl.enableVertexAttribArray(norm);                                   //enable write data when use gl.vertexAttribPointer

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());                  //create Buffer and BingBuffer (gl.ARRAY_BUFFER)
    gl.bufferData(gl.ARRAY_BUFFER, v, gl.STATIC_DRAW);                  //input date from memory to graphic device buffer
    gl.vertexAttribPointer(pos, 3, gl.FLOAT, false, 24, 0);             //aPos data
    gl.vertexAttribPointer(norm, 3, gl.FLOAT, false, 24, 12);           //aNorm data

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());          //create Buffer and BingBuffer (gl.ELEMENT_ARRAY_BUFFER)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, f, gl.STATIC_DRAW);          //input date from memory to graphic device buffer
}

/**
 * When Window has changed, the element show resize with the change of window.
 */
function resize() {
    var size = Math.min(window.innerWidth, window.innerHeight) - 10;
    var c_w = window.innerWidth - 50, c_h = window.innerHeight - 10;
    var canvas = document.getElementById("canvas");
    var gl = initGL(canvas);
    canvas.width = c_w; canvas.height = c_h;
    gl.viewport(0, 0, c_w, c_h);
}