/**
 * getShader use code in file.
 * @param filename : the file name of code src.
 * @param type : vsh or fsh.
 * @return shader : the object of shader.
 */
function getShader(gl, filename, type) {
    var shader = null, str = null;
    try {
        if(type == "vsh"){
            shader = gl.createShader(gl.VERTEX_SHADER);
        }else if(type == "fsh"){
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        }    
    } catch (e) {
        alert("Create Shader Error1"); 
        return null;
    }
    if(str == null) { 
        alert("Create Shader Error2"); 
        return null;
    }
    gl.shaderSource(shader, str);
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
    try { gl = canvas.getContext("experimental-webgl") || canvas.getContext("webgl") || canvas.getContext("webgl2");
    } catch (e) {}
    if (!gl) { alert("Can't get WebGL"); }
    return gl;
}

/** 
 * main function, ref : http://www.ibiblio.org/e-notes/webgl/deflate/ship.html
 */
function main() {
    /** init WebGL **/
    alert(v.length);
    var size = Math.min(window.innerWidth, window.innerHeight) - 10;
    var c_w = window.innerWidth - 50,  c_h = window.innerHeight - 10;   //calculate w and h
    var canvas = document.getElementById("canvas");                     //get vanvas_object
    var gl = initGL(canvas);                                            //initGL
   
    canvas.width = c_w;   canvas.height = c_h;                          //set canvas size
    gl.viewport(0, 0, c_w, c_h);                                        //set viewport
    gl.clearColor(0.0, 0.0, 0.0, 1.0);                                  //set clearColor
    gl.clear(gl.COLOR_BUFFER_BIT);                                      //run clear

    /** init WebGL Program **/
    var program = gl.createProgram();                                   //create WebGL program what run at graphic device
    gl.attachShader(program, getShader(gl, "demo", "vsh"));             
    gl.attachShader(program, getShader(gl, "demo", "fsh"));
    gl.linkProgram(program);
    gl.useProgram(program);

   //var posLoc = gl.getAttribLocation(prog, "aPos");
   //gl.enableVertexAttribArray( posLoc );
   //var normLoc = gl.getAttribLocation(prog, "aNorm");
   //gl.enableVertexAttribArray( normLoc );
}

/**
 * When Window has changed, the element show resize with the change of window.
 */
function resize(){                       
    var size = Math.min(window.innerWidth, window.innerHeight) - 10;
    var c_w = window.innerWidth - 50,  c_h = window.innerHeight - 10;
    var canvas = document.getElementById("canvas");
    var gl = initGL(canvas); 
    canvas.width = c_w;   canvas.height = c_h;
    gl.viewport(0, 0, c_w, c_h);
}