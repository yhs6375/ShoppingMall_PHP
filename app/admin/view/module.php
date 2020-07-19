<?php
function head_start()
{
?>
<!DOCTYPE html>
<html>
<script>
(function() {
    var HS = {};
    HS.extend = function() {
        var options = arguments[0],
            name, src, copy, copyIsArray, clone, target = this,
            i = 0,
            deep = false;
        for (name in options) {
            target[name] = options[name]
        }
        return target;
    }

    function LoadScript(src, cb, async) {
        var s, r, t;
        r = false;
        s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = async;
        s.src = src;
        s.onload = s.onreadystatechange = function() {
            if (!r && (!this.readyState || this.readyState == 'complete')) {
                r = true;
                if (cb) cb();
            }
        };
        t = document.getElementsByTagName('script')[0];
        t.parentNode.insertBefore(s, t);
    }
    HS.extend({
        LoadScript: function(src, cb, id, async) {
            if (!(typeof cb === "function")) {
                async = id;
                id = cb;
                cb = undefined;
            }
            if (id) {
                if (!HS.scriptContainer) {
                    HS.scriptContainer = [];
                }
                if (HS.scriptContainer.indexOf(id) === -1) {
                    HS.scriptContainer.push(id);
                    LoadScript(src, cb, async);
                } else {
                    if (cb) cb();
                    return false;
                }
            } else {
                LoadScript(src, cb);
            }
            return true;
        }
    })
    window.HSWeb ? window.HSWeb.extend(HS) : window.HSWeb = HS;
})();
</script>

<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta name="viewport"
        content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0 width=device-width" />
    <meta content="" name="description" />
    <meta content="" name="author" />
    <script type="text/javascript">
    WebFontConfig = {
        google: {
            families: ["Poppins:400,500,700", "Material Icons", "Material Icons Outlined"]
        },
        custom: {
            families: ['NanumSquare'],
            urls: ['https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@1.0/nanumsquare.css']
        }
    };
    (function() {
        var wf = document.createElement('script');
        wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
    })();
    </script>
    <!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous"> -->
    <link href="/assets/css/main.css" rel="stylesheet" type="text/css" />
    <link href="/assets/css/main-960.css" rel="stylesheet" type="text/css" />
    <link href="/assets/css/main-1280.css" rel="stylesheet" type="text/css" />
    <link href="/assets/css/color.css" rel="stylesheet" type="text/css" />
    <link href="/assets/css/hs-lib.css" rel="stylesheet" type="text/css" />
    <?php
}
function head_end()
{
    ?>
</head>
<?php
}
function load_script_from_end()
{
?>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="/assets/js/hosung.js"></script>
<script src="/assets/js/hs.js"></script>
<script src="/assets/js/main.js" defer></script>
<script src="/assets/js/jquery_hs_plugin.js" defer></script>
<script src="/assets/js/HSeditor/HSedit-config.js" async></script>
<script src="/assets/js/HSeditor/HSedit-with.js" async></script>

<script>
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent)) {
    $("#sidebar-wrapper").removeClass("toggled");
    NavSideW = 0;
}
</script>
<?php
}
function admin_page_body_start()
{
?>

<body class="default">
    <app>
        <div id="container" class="vertical-layout hidden">
            <?php
        }
        function body_end()
        {
            ?>
        </div>
    </app>
</body>

</html>
<?php
        }
        function toolbarHTML()
        {
?>
<toolbar>
    <div class="flex-toolbox flex-row flex-left">
        <button id="sidebar-button" class="navbar-button button-ripple circle">
            <div class="navbar-button-wrapper">
                <mat-icon>menu</mat-icon>
            </div>
            <ripple></ripple>
        </button>
        <div class="toolbar-separator"></div>
        <div class="px-8 px-md-16">
            dasklodwqkdok
            <shortcuts>
                <div id="shortcuts">
                    <div class="shortcuts">

                    </div>
                </div>
            </shortcuts>
        </div>
    </div>
    <div class="flex-toolbox flex-row flex-right">
        <button class="navbar-button button-ripple">
            <div class="navbar-button-wrapper">
                <div class="flex-layout-row">
                    <img class="avatar" src="/assets/img/me.png" />
                    <span class="mr-12">Yoon Ho Sung</span>
                </div>
            </div>
            <ripple></ripple>
        </button>
        <div class="toolbar-separator"></div>
        <button class="navbar-button button-ripple circle">
            <div class="navbar-button-wrapper">
                <mat-icon>search</mat-icon>
            </div>
            <ripple></ripple>
        </button>
    </div>
</toolbar>
<?php
        }
        function sidebarHTML($selected = "")
        {
?>
<sidebar class="folded close closed">
    <div class="sidebar-top-container navy-900">
        <div class="sidebar-top">
            <div class="sidebar-logo-container">
                <div class="sidebar-logo">
                    <object style="display:block;width:44px;" data="/assets/img/hs_logo2.svg"
                        type="image/svg+xml"></object>
                </div>
                <span class="sidebar-logo-text">Hosung Portfolio</span>
            </div>
            <button id="sidebar-fold" class="navbar-button button-ripple circle">
                <div class="navbar-button-wrapper font-grey-600">
                    <mat-icon>menu</mat-icon>
                </div>
                <ripple></ripple>
            </button>
            <button id="sidebar-close" class="navbar-button button-ripple">
                <div class="navbar-button-wrapper font-grey-600">
                    <mat-icon>arrow_back</mat-icon>
                </div>
                <div class="ripple-button-round"></div>
            </button>
        </div>
    </div>
    <div class="sidebar-content">
        <div class="sidebar-user-profile-container">
            <div id="sidebar-user-profile" class="navy-900 pb-32">
                <div class="font-nowrap pb-6">Ho Sung Yoon</div>
                <div class="secondary-text font-nowrap">yhs6375@gmail.com</div>
            </div>
            <div class="sidebar-user-photo">
                <img class="avatar" src="/assets/img/me.png" />
            </div>
        </div>
        <div class="sidebar-vertical-group">
            <div class="group-title">
                <div class="group-title-text semi-title-text">Applications</div>
            </div>
            <div class="group-items">
                <div class="group-item-container">
                    <div class="group-item-title">
                        <mat-icon>bar_chart</mat-icon>
                        <span class="folded-invisible flex-size1">대쉬보드</span>
                        <mat-icon class="folded-invisible collapsable-arrow">keyboard_arrow_down</mat-icon>
                    </div>
                    <div class="group-item">
                        <div class="item<?php if ($selected == "analytics") { ?> selected<?php } ?>"
                            category="analytics">
                            <div class="font-white">통계</div>
                        </div>
                    </div>
                </div>
                <div class="group-item-container">
                    <div class="group-item-title">
                        <mat-icon>local_grocery_store</mat-icon>
                        <span class="folded-invisible flex-size1">상품관리</span>
                        <mat-icon class="folded-invisible collapsable-arrow">keyboard_arrow_down</mat-icon>
                    </div>
                    <div class="group-item">
                        <div class="item<?php if ($selected == "products") { ?> selected<?php } ?>" category="products">
                            <div class="font-white">상품</div>
                        </div>
                        <div class="item<?php if ($selected == "category") { ?> selected<?php } ?>" category="category">
                            <div class="font-white">카테고리</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</sidebar>
<?php
        }
        function textForm()
        {
            $headLabel = func_get_args()[0];
            $placeholder = func_get_args()[1];
            if (func_num_args() == 3) $style = func_get_args()[2];
?>
<div class="base-form-text" <?php if ($style) echo "style=\"" . $style . "\"" ?>>
    <div class="outline">
        <div class="outline-left"></div>
        <div class="outline-mid"><span class="field-label-wrapper"><?php echo $headLabel; ?></span></div>
        <div class="outline-right"></div>
    </div>
    <div class="label">
        <input class="text-input" type="text" placeholder="<?php echo $placeholder ?>" />
    </div>
</div>
<?php
        }
?>