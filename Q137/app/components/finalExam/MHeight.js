function MHeight(Obj, Item) {
    let answerLength = 1;
    if (Obj.indexOf("\n") != -1) {
        answerLength = (Obj.split("\n")).length;
    }
    if (answerLength == 1) {
        let Cobj = getByteLen(Obj);
        return Math.ceil(Cobj.len / Item);
    } else {
        let Nobj = Obj.split("\n");
        let MoreLen = 0;
        Nobj.map((value, key) => {
            let Cobj = getByteLen(value);
            if (Math.ceil(Cobj.len / Item) > 1) {
                MoreLen = MoreLen + Math.floor(Cobj.len / Item);
            }
        })
        return MoreLen + Number(Nobj.length);
        // if(Math.ceil(Cobj.len/50)<answerLength){
        //     return answerLength;
        // }
        // else{
        //     return Math.ceil(Cobj.len/50)
        // }
    }
}
function getByteLen(val) {
    var obj = {
        len: 0,
        Chinaese: {
            index: 0,
            num: 0
        },
        NoChinaese: {
            index: 0,
            num: 0
        }
    }
    for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null) {
            obj.len += 2;
            obj.Chinaese.num++;
        } else {
            obj.len += 1;
            obj.NoChinaese.num++;
            if (i < 11) {
                obj.NoChinaese.index++;
            }

        }
    }
    return obj;
}
module.exports = MHeight;