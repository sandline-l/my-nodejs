var inp = document.getElementById('inputfile');
var img = document.getElementsByClassName('img')[0];
var progress = document.getElementsByClassName('progress')[0];
var text = document.getElementsByClassName('text')[0];
var stop = document.getElementsByClassName('stop')[0];
// var reader = new FileReader();
var reader;
//选择文件之后,开始读取
inp.onchange = function(e){
    //上传文件改变时, 重置进度条
    progress.style.width = '0px'
    // reader.readAsDataURL(inp.files[0])
    //第一个参数是要加载的文件, 第二个参数是加载的文件类型, 第三个参数是事件对象,
    reader = new PartFileReader(inp.files[0], 'readAsDataURL', {
        loadStart:function(e){
            // console.log('start',e)
        },
        progress : function(e, loaded, total){
            // console.log('progress',e)
            var persent =  loaded / total *100;
            var width = Math.ceil( 300 * persent / 100) 
            progress.style.width = width + 'px'
            text.innerText = Math.ceil(persent) +'%' 
        },
        onload : function(e){
            // console.log('load',e)
        },
        loadend : function(e){
            // console.log('loadend',e)
        },
        //中断时触发
        abort : function(){
            console.log('abort',e)
        }
    })
   
}
stop.onclick = function(e){
    console.log('stop')
    console.log(reader)
    reader.abort();
}



// reader.onloadstart = function(e){
//     console.log('start',e)
// }

//读取文件的进度条
// reader.onprogress = function(e){
//     console.log('progress',e)
//     var persent =  e.loaded / e.total *100;
//     var width = Math.round( 300 * persent / 100) 
//     progress.style.width = width + 'px'
//     text.innerText = Math.round(persent) +'%' 
//     console.log(persent)
// }
// reader.onload = function(e){
//     console.log('load',e)
// }
// reader.onloadend = function(e){
//     console.log('loadend',e)
// }


//分割文件读取
function PartFileReader(files, type, event){
    this.files = files;
    this.type = type;
    this.event = event;
    //创建文件加载对象
    this.reader = new FileReader();
    this.loaded = 0;        //以加载大小
    this.total = files.size;    //总文件大小
    this.step = 1024 * 1024;    //拆分的大小
    this.abort = this.reader.abort; //终止上传
    this.readPartFile(0);
    this.bindEvent()
}
// PartFileReader.prototype.abort = function(){
//     this.reader.abort
// }
//分段读取文件
PartFileReader.prototype.readPartFile = function(start){
    if(this.files.slice){
        var file = this.files.slice(start, start + this.step);
        switch(this.type){
            case 'readAsDataURL':
                this.reader.readAsDataURL(file);
                break;
            case 'readAsBinaryString':
                this.reader.readAsBinaryString(file);
                break;
            case 'readAsText':
                this.reader.readAsText(file);
                break;
            case 'readAsArrayBuffer':
                this.reader.readAsArrayBuffer(file);
                break;
            default:
                break;
        }
    }
}
PartFileReader.prototype.bindEvent = function(){
    var self = this;
    this.reader.onloadstart = function(e){
        // console.log('start')
        self.event.loadStart && self.event.loadStart.call(this,e);
    }
    this.reader.onprogress = function(e, loaded, total){
        // console.log("progress")
        self.event.progress && self.event.progress.call(this,e, self.loaded, self.total);
    }
    this.reader.onload = function(e){
        // console.log('load')
        self.loaded += e.loaded;
        self.event.load && self.event.load.call(this,e);
        // if(self.loaded> self.total/2){
        //     self.abort()
        // }
        //如果加载的大小 小于 总大小, 那么就再次调用切割加载函数
        if(self.loaded < self.total){
            //参数是当前以加载的大小, 从这里开始
            self.readPartFile(self.loaded);
        }
    }
    this.reader.onloadend = function(e){
        // console.log('end')
        self.event.loadend && self.event.loadend.call(this,e);
    }
    this.reader.onabort = function(e){
        // console.log('中断了')
        self.event.abort && self.event.abort.call(this,e);
    }
}

























