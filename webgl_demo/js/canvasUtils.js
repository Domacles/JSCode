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
