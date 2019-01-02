function _createAjax() {
    var xmlhttp = {};
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xmlhttp;
}

export function fetchAdapter(url, options) {
    options = Object.assign({}, options);
    try {
        //weex client ajax
        if (weex) {
            return new Promise((resolve, reject) => {
                var stream = weex.requireModule('stream');
                options.url = url;
                stream.fetch(options, (res) => {
                    if (res.ok) {
                        if (typeof res.data == "string") {
                            res.data = JSON.parse(res.data);
                        }
                        resolve(res.data, res.status, res.statusText);
                    } else {
                        reject(res.status, res.statusText);
                    }
                });
            });
        }
    } catch (ex) {
        // web client ajax
        return new Promise((resolve, reject) => {
            let xhr = _createAjax();
            let method = options.method || "GET";
            xhr.open(method, url);
            if (options.headers) {
                for (let key in options.headers) {
                    xhr.setRequestHeader(key, options.headers[key]);
                }
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState != 4) {
                    return;
                }
                if (xhr.status == 200) {
                    let response = JSON.parse(xhr.response);
                    resolve(response);
                } else {
                    reject(new Error(xhr.response));
                }
            }
            if (options.body) {
                xhr.send(options.body);
            } else {
                xhr.send();
            }
        });
    }
}

export function uploadAdapter(url, options, fileObj) {
    options = Object.assign({}, options);
    try {
        //weex client upload
        if (weex) {
            return new Promise((resolve, reject) => {
                //用weex的方式上传文件
                let fileTransfer = weex.requireModule("FileTransferModule");
                fileTransfer.upload(fileObj, url, {
                    headers: options.headers,
                    method: "PUT"
                }, null, result => {
                    resolve();
                }, err => {
                    reject(err);
                });
            });
        }
    } catch (ex) {
        try {
            //bingotouch
            if (Cordova) {
                return new Promise((resolve, reject) => {
                    let fileTransfer = new FileTransfer();
                    options.headers ={
                        "Content-Type":"application/octet-stream"
                    };
                    fileTransfer.upload(fileObj, encodeURI(url), res => {
                        resolve();
                    }, err => {
                        reject(err);
                    }, options, true);
                });
            }
        } catch (e) {
            //web client upload
            return new Promise((resolve, reject) => {
                let xhr = _createAjax();
                let method = options.method || "PUT";
                xhr.open(method, url, true);
                if (options.headers) {
                    for (let key in options.headers) {
                        xhr.setRequestHeader(key, options.headers[key]);
                    }
                }
                xhr.onreadystatechange = function () {
                    if (xhr.readyState != 4) {
                        return;
                    }
                    if (xhr.status == 200) {
                        resolve();
                    } else {
                        reject(new Error(xhr.response));
                    }
                }
                xhr.send(fileObj);
            });
        }
    }
}