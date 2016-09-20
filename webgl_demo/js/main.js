/**
 * global variable ：
 */
var gl, mvMatLoc, prMatLoc;
var transl = -3, c_w, c_h;
var xRot = 0, yRot = 0, zRot = 0;
/** 
 * main function, ref : http://www.ibiblio.org/e-notes/webgl/deflate/ship.html
 */
function main() {
    /** init WebGL **/
    var size = Math.min(window.innerWidth, window.innerHeight) - 10;
    var canvas = document.getElementById("canvas");                     //get vanvas_object
    gl = initGL(canvas);                                                //initGL
    addEventHandler(canvas);                                            //add listener for canvas
    c_w = window.innerWidth - 50, c_h = window.innerHeight - 10;        //calculate w and h
    canvas.width = c_w; canvas.height = c_h;                            //set canvas size
    gl.viewport(0, 0, c_w, c_h);                                        //set viewport
    gl.clearColor(0.1, 0.1, 1.0, 1.0);                                  //set clearColor
    gl.clear(gl.COLOR_BUFFER_BIT);                                      //run clear
    gl.enable(gl.DEPTH_TEST);                                           //open the test of depth_buffer
    gl.depthFunc(gl.LEQUAL);
    gl.clearDepth(1.0);

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

    /** Create mvp for model transform **/
    mvMatLoc = gl.getUniformLocation(prog, "mvMatrix");                 //get address object of mvMatrix
    prMatLoc = gl.getUniformLocation(prog, "prMatrix");                 //get address object of prMatrix

    /** draw model **/
    draw(gl, mvMatLoc, prMatLoc, c_w, c_h, transl, 0, xRot, 0, yRot, 0, zRot, 0);
}

/**
 * When Window has changed, the element show resize with the change of window.
 */
function resize() {
    var size = Math.min(window.innerWidth, window.innerHeight) - 10;
    var canvas = document.getElementById("canvas");

    c_w = window.innerWidth - 50, c_h = window.innerHeight - 10;
    canvas.width = c_w; canvas.height = c_h;
    gl.viewport(0, 0, c_w, c_h);
    draw(gl, mvMatLoc, prMatLoc, c_w, c_h, transl, 0, xRot, 0, yRot, 0, zRot, 0);
}

/**
 * This function is used for draw model.
 */
function draw(gl, mvMatLoc, prMatLoc, c_w, c_h, trans1, t_offset, xRot, xR_offset, yRot, yR_offset, zRot, zR_offset) {
    var prMatrix = new CanvasMatrix4();
    var mvMatrix = new CanvasMatrix4();
    var rotMatrix = new CanvasMatrix4();
    prMatrix.makeIdentity();
    rotMatrix.makeIdentity();
    mvMatrix.makeIdentity();
    
    prMatrix.perspective(45, c_w / c_h, .1, 100);

    rotMat.rotate(xRot + xR_offset, 1, 0, 0);
    rotMat.rotate(yRot + yR_offset, 0, 1, 0);
    rotMat.rotate(zRot + zR_offset, 0, 0, 1);
    
    mvMatrix.translate(0, 0, 0);
    mvMatrix.multRight(rotMatrix);
    mvMatrix.translate(0, 0, trans1 + t_offset);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniformMatrix4fv(mvMatLoc, false, new Float32Array(mvMatrix.getAsArray()));
    
    mvMatrix.multRight(prMatrix);
    gl.uniformMatrix4fv(prMatLoc, false, new Float32Array(mvMatrix.getAsArray()));
    
    gl.drawElements(gl.TRIANGLES, fl, gl.UNSIGNED_SHORT, 0);

    gl.flush();
}