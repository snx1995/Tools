import Fontmin from 'fontmin';


new Fontmin()
    .src("C:/Users/11032/Downloads/hanyi.ttf")
    .dest("./dist/hanyi.ttf")
    .use(
        Fontmin.glyph({
        text: "收款合同部门客户经理排行榜"
        })
    ).run();