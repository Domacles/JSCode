/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var xid = 'div1';
var width = 0; // element_width
var height = 0; // element_height
var newElement = null;

function initCode() {
    width = document.getElementById(xid).clientWidth;
    height = document.getElementById(xid).clientHeight;
}

function dealCode(){
    newElement = width.toString()+' '+height.toString();
    newElement = typeof endCode;
}

function endCode() {
    var a = [1,2,3,4];
    var b = a; 
    b.push(1);
    alert(arguments.callee);
    alert(a);
    alert(b);
//    document.getElementById(xid).appendChild();
}

function run(){
    initCode();
    dealCode();
    endCode();
}