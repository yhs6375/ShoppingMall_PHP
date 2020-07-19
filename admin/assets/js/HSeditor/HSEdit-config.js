var HSset = {};
window.HSset = {
    assetsPath: {
        image: "/assets/img/editor/",
        mainStyle: "/assets/css/editor/hseditor-main.css",
        frameStyle: "/assets/css/editor/hseditor-frame.css",
    },
    //image setting
    image: {
        //max image count
        count: 30,
        maxSize: 50 * 1024 * 1024, //type of size is byte
        maxImageWidth: 3000,
        maxImageHeight: 2560,
        uploadURL: "/upload/img",
    },
    //video setting
    video: {
        match: null,
        videoReg: [/(youtube.com)|(youtu.be)/],
        matchReg: [
            /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/,
        ],
        notIncludePass: false,
    },
    //color palette setting
    color: {
        //base pick color
        base: [
            "#FFF",
            "#eee",
            "#ccc",
            "#aaa",
            "#777",
            "#555",
            "#333",
            "#000",
            "#FF9088",
            "#FFAD76",
            "#FFF48A",
            "#BAD375",
            "#6AA1D3",
            "#9E6BB2",
            "#FFFF00",
            "#00FF00",
            "#FF0000",
            "#FF6700",
            "#FFCE00",
            "#83D600",
            "#009B6B",
            "#006635",
            "#FF00FF",
            "#00F9FF",
            "#850FB7",
            "#5917C1",
            "#1C1CA0",
            "#0044DB",
            "#0092CC",
            "#00C2CC",
            "#FFAE00",
        ],
    },
};
