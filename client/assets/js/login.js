(function(){
    $(document).on("click","#kakao-login-btn",function(){
        Kakao.init('7c29c65b8d88635b6e90598d4aa0b692');
        Kakao.Auth.login({
            success: function(authObj) {
                alert(JSON.stringify(authObj));
            },
            fail: function(err) {
                alert(JSON.stringify(err));
            }
        });
        console.log("하하호호");
    })
    
})();