<?php
try{
    require_once($_SERVER["MAIN_PHP"]);
    require_server_safe("log/Logger.php");
    $CLIENT_ID = "6bd50e92e12577a9611758ab5da0f1d5";
    $REDIRECT_URI = urlencode("http://test.hodofactory.com:8088/login/kakao_login.php");
    $KAKAO_TOKEN_REQUEST_URL = 'https://kauth.kakao.com/oauth/token';
    $code = $_GET["code"];

    $post_data = "grant_type=authorization_code";
    $post_data .= "&client_id=".$CLIENT_ID;
    $post_data .= "&redirect_uri=".$REDIRECT_URI;
    $post_data .= "&code=".$code;

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $KAKAO_TOKEN_REQUEST_URL);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $result = curl_exec ($ch);
    $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if(curl_error($ch)){
        throw new Exception("Kakao token request critical error : ".curl_error($ch));
    }
    curl_close ($ch);
    if(!$result){
        throw new Exception("Kakao token request critical error : curl excution failed.");
    }
    echo $result."<br/>";
    $result = json_decode($result);
    if($result->error){
        go_main_page();
    }
    /*
        access_token
        token_type
        refresh_token
        expires_in
        scope
        refresh_token_expires_in
    */
    echo "<br><br> accessToken : ".$result->access_token;
}catch(Exception $e){
    HS\LOG\logErr($e);
    go_main_page();
}
?>