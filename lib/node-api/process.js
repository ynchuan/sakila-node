process.on('exit', function() {
    // 设置一个延迟执行
    setTimeout(function() {
        console.log('主事件循环已停止，所以不会执行');
    }, 0);
    console.log('退出前执行');
});
console.log = function(d) {
    process.stdout.write(d + '\n\n');
};

process.stdin.on('end', function() {
    process.stdout.write('end');
});
function gets(cb){
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', function(chunk) {
        process.stdin.pause();
        cb(chunk);
    });
}

gets(function(reuslt){
    console.log("["+reuslt+"]");
});

process.env.NODE_ENV