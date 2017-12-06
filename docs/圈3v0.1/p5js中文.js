function 角度() {
	return DEGREES;
}

function 中心() {
	return CENTER;
}

// 基本属性
function 帧序号() {
	return frameCount;
};

function 宽度() {
	return width;
}

// 初始化相关
function setup() {
	构图();
}

function 构图() {};

function draw() {
	绘制();
}

function 绘制() {};

// 二维基本元素
function 长方形(x位置, y位置, 宽, 高) {
	rect(x位置, y位置, 宽, 高);
}

function 三角形(x1, y1, x2, y2, x3, y3) {
	triangle(x1, y1, x2, y2, x3, y3);
}

function 椭圆(中心x位置, 中心y位置, 宽, 高) {
	ellipse(中心x位置, 中心y位置, 宽, 高);
}

// 三维相关

function 平面(宽, 高) {
	plane(宽, 高);
}

function 立方体(宽, 高, 深) {
	box(宽, 高, 深);
}

function 圆柱(半径, 高) {
	cylinder(半径, 高);
}

function 圆锥(半径, 高) {
	cone(半径, 高);
}

function 环体(环半径, 体半径) {
	torus(环半径, 体半径);
}

function 球体(半径) {
	sphere(半径);
}

// 颜色设置
function 背景色(灰度) {
	background(灰度);
}

function 填色(色值) {
	fill(色值);
}

function 填色(r, g, b, alpha) {
	fill(r, g, b, alpha);
}

function 笔宽(宽) {
	strokeWeight(宽);
}

function 笔色(r, g, b) {
	stroke(r, g, b);
}

function 笔色(r, g, b, 透明度) {
	stroke(r, g, b, 透明度);
}

function 笔色(颜色, 透明度) {
	stroke(颜色, 透明度);
}

function 笔宽(像素数) {
	strokeWeight(像素数);
}

function 无边界() {
	noStroke();
}

function 旋转(角度) {
	rotate(角度);
}

function x轴旋转(角度) {
	rotateX(角度);
}

function y轴旋转(角度) {
	rotateY(角度);
}

function z轴旋转(角度) {
	rotateZ(角度);
}

function 不填充() {
	noFill();
}

function 保存帧(文件名, 扩展名, 时间跨度, 帧速, 回调函数) {
	saveFrames(文件名, 扩展名, 时间跨度, 帧速, 回调函数);
}

function 保存状态() {
	push();
}

function 恢复状态() {
	pop();
}

function 偏移(x, y) {
	translate(x, y);
}

// z只用于webgl
function 偏移(x, y, z) {
  translate(x, y, z);
}

// 模式为CORNER(默认), CORNERS, CENTER, RADIUS
function 方形模式(模式) {
	rectMode(模式);
}

// 三角相关

// 模式为RADIANS(默认)或者DEGREES
function 角度模式(模式) {
  angleMode(模式);
}

// 计算相关
function 按比例放缩(值, 原始下限, 原始上限, 新下限, 新上限) {
  return map(值, 原始下限, 原始上限, 新下限, 新上限)
}

// 质地相关
function 普通质地() {
	normalMaterial();
}

// 事件相关

function mousePressed() {
	鼠标被按();
}

function 鼠标被按() {}

// 其他

function 新画布(宽, 高) {
	createCanvas(宽, 高);
}

// 模式为P2D或者WEBGL
function 新画布(宽, 高, 模式) {
	createCanvas(宽, 高, 模式);
}