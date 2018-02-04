function 问好(那谁) {
    return "吃了么, " + 那谁.姓 + 那谁.名;
}
var 路人 = { 姓: "大", 名: "黄" };
document.body.innerHTML = 问好(路人);
