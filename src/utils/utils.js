// -------------工具js文件---------------- //
// 获取中国时区的时间
export let getChinaTime = (utctime) => {
    let date = new Date(utctime);
    return date.getFullYear() + '-' + (date.getMonth()+1)+ '-'+ date.getDate() +' ' + date.getHours() +':'+ date.getMinutes() + ':' + date.getSeconds();
}