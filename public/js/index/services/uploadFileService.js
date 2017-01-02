/**
 * Created by מרדכי on 09 יולי 2016.
 */

app.service('uploadFileService', function () {
    this.uploadFile = function(url, fileData, onProgressCallBack) {
        $.ajax({
            url: url,
            type: 'POST',
            data: fileData,
            processData: false,
            contentType: false,
            xhr: function () {
                var xhr = new XMLHttpRequest();
                xhr.upload.addEventListener('progress', onProgressCallBack, false);
                return xhr;
            }
        });
    };
});