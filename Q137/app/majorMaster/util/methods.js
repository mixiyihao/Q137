
/**
 * 排序
 * @param {*} arr 
 */
function unique(arr) {
    let result = [];
    for(let i=0, len = arr.length; i < len; i++){
        if(result.indexOf(arr[i]) === -1){
            result.push(arr[i])
        }
    }
    return result;
}

/**
 * 获取课时名字
 * @param {*} lessons 课时数据数组
 * @param {*} lessonID 课时ID
 */
export function getLessonName(lessons,lessonID) {
    let lessonName = '';
    for (let i = 0, len = lessons.length; i < len; i++) {
        if (lessons[i].id == lessonID) {
            lessonName = lessons[i].name;
            break;
        }
    }
    return lessonName;
}

/**
 * 获取阶段
 * @param {*} lessons 课时数据数组
 * @param {*} lessonID 课时ID
 */
export function getStageIndex(lessons,lessonID) {
    let stage = 1;
    for (let i = 0, len = lessons.length; i < len; i++) {
        if (lessons[i].id == lessonID) {
            stage = lessons[i].stage_ordernum;
            break;
        }
    }
    return stage;
}

/**
 * 阶段转化为汉字
 * @param {*} stageIndex 阶段ID
 */
export function _showStage(stageIndex) {
    let str = '';
    switch (stageIndex) {
        case 1:
            str = '第一阶段';
            break;
        case 2:
            str = '第二阶段';
            break;
        case 3:
            str = '第三阶段';
            break;
        case 4:
            str = '第四阶段';
            break;
        case 5:
            str = '第五阶段';
            break;
    }
    return str;
}