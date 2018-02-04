var 学生 = /** @class */ (function () {
    function 学生(姓, 名) {
        this.姓 = 姓;
        this.名 = 名;
        this.全名 = 姓 + 名;
    }
    return 学生;
}());
function 问好(那谁) {
    return "吃了么, " + 那谁.姓 + 那谁.名;
}
var 路人 = new 学生("大", "黄");
document.body.innerHTML = 问好(路人);
