<?php

namespace Util\String;

class ValidCheck
{
    static public function strip_html_tags($e)
    {
        $r = preg_replace("/<textarea(.*?)<\/textarea>/i", "", $e);
        $r = preg_replace("/<script(.*?)<\/script>/i", "", $r);
        $r = preg_replace("/<form(.*?)<\/form>/i", "", $r);
        $r = preg_replace("/<style(.*?)<\/style>/i", "", $r);
        $r = preg_replace("/<a(.*?)<\/a>/i", "", $r);
        $r = preg_replace("/<body(.*?)<\/body>/i", "", $r);
        $r = preg_replace("/<head(.*?)<\/head>/i", "", $r);
        $r = preg_replace("/<html(.*?)<\/html>/i", "", $r);
        $r = preg_replace("/<select(.*?)<\/select>/i", "", $r);

        $r = preg_replace("/<textarea(.*?)>/i", "", $r);
        $r = preg_replace("/<script(.*?)>/i", "", $r);
        $r = preg_replace("/<form(.*?)>/i", "", $r);
        $r = preg_replace("/<style(.*?)>/i", "", $r);
        $r = preg_replace("/<a(.*?)>/i", "", $r);
        $r = preg_replace("/<body(.*?)>/i", "", $r);
        $r = preg_replace("/<\/body(.*?)>/i", "", $r);
        $r = preg_replace("/<\/html(.*?)>/i", "", $r);
        $r = preg_replace("/<html(.*?)>/i", "", $r);
        $r = preg_replace("/<head(.*?)>/i", "", $r);
        $r = preg_replace("/<\/head(.*?)>/i", "", $r);
        $r = preg_replace("/<meta(.*?)>/i", "", $r);
        $r = preg_replace("/<input(.*?)>/i", "", $r);
        $r = preg_replace("/<select(.*?)>/i", "", $r);

        while (preg_match("/(<[^>]+) (onclick|onfocus|ondblclick|class|id|onmousedown|onmouseout|onmouseover|onmouseup|onmouseleave|onkeydown|onkeypress|onkeyup|onblur|onchange|onreset|onselect|onsubmit|onload|onresize|onunload|ondragdrop|onselect|onerror|onabort|oncopy|onactivate|onafterprint|onafterupdate|onbeforeactivate|onbeforecopy|onbeforecut|onbeforedeactivate|onbeforeeditfocus|onbeforepaste|onbeforeprint|onbeforeunload|onbeforeupdate|onbounce|oncellchange|oncontextmenu|oncontrolselect|oncut|ondataavailable|ondatasetchanged|ondatasetcomplete|ondeactivate|ondrag|ondragend|ondragenter|ondragleave|ondragover|ondragstart|ondrop|onerrorupdate|onfilterchange|onfinish|onfocusin|onfocusout|onhelp|onlayoutcomplete|onlosecapture|onmousemove|onmousewheel|onmove|onmoveend|onmovestart|onpaste|onpropertychange|onreadystatechange|onreset|onresize|onresizeend|onresizestart|onrowenter|onrowexit|onrowsdelete|onrowsinserted|onscroll|onselect|onselectionchange|onselectstart|onstart|onstop|style)=(\"|\')?([^\"\']+)(\"|\')?/i", $r)) {
            $r = preg_replace("/(<[^>]+) (onclick|onfocus|ondblclick|class|id|onmousedown|onmouseout|onmouseover|onmouseup|onmouseleave|onkeydown|onkeypress|onkeyup|onblur|onchange|onreset|onselect|onsubmit|onload|onresize|onunload|ondragdrop|onselect|onerror|onabort|oncopy|onactivate|onafterprint|onafterupdate|onbeforeactivate|onbeforecopy|onbeforecut|onbeforedeactivate|onbeforeeditfocus|onbeforepaste|onbeforeprint|onbeforeunload|onbeforeupdate|onbounce|oncellchange|oncontextmenu|oncontrolselect|oncut|ondataavailable|ondatasetchanged|ondatasetcomplete|ondeactivate|ondrag|ondragend|ondragenter|ondragleave|ondragover|ondragstart|ondrop|onerrorupdate|onfilterchange|onfinish|onfocusin|onfocusout|onhelp|onlayoutcomplete|onlosecapture|onmousemove|onmousewheel|onmove|onmoveend|onmovestart|onpaste|onpropertychange|onreadystatechange|onreset|onresize|onresizeend|onresizestart|onrowenter|onrowexit|onrowsdelete|onrowsinserted|onscroll|onselect|onselectionchange|onselectstart|onstart|onstop|style)=(\"|\')?([^\"\']+)(\"|\')?/i", "$1", $r);
        }
        $r = preg_replace('/\r\n|\r|\n/', '', $r);
        return $r;
    }
    static public function name_check($e)
    {
        $e = trim($e);
        if (preg_match("/[a-z]/i", $e) && preg_match("/[가-횧]/", $e)) {
            return false;
        } else if (preg_match("/[가-횧]/", $e)) {
            $e_len = strlen($e) / 2;
        } else {
            $e_len = strlen($e);
        }
        if (preg_match("/[^가-횧a-z]/i", $e) || $e_len < 2 || $e_len > 10) {
            return false;
        }
        return true;
    }
    static public function id_check($e)
    {
        if (strlen($e) < 6 || strlen($e) > 20) return false;
        return !preg_match("/[^a-z0-9-_]/i", $e);
    }
    static public function password_check($e)
    {
        if (strlen($e) < 8 || strlen($e) > 20 || preg_match("/[^a-z!@#$%^&*()\-_=+\\|\'\"\[\]\{\}`~\/?;:,.<>\d]/i", $e))
            return false;
        return true;
    }
    static public function password_check_and_compare($e, $f)
    {
        if (ValidCheck::password_check($e) || $e !== $f)
            return false;
        return true;
    }
    static public function login_password_check($e)
    {
        if (strlen($e) < 8 || strlen($e) > 20 || preg_match("/[^a-z!@#$%^&*()\-_=+\\|\'\"\[\]\{\}`~\/?;:,.<>\d]/i", $e))
            return false;
        return true;
    }
    static public function email_check($e)
    {
        $e = trim($e);
        if (strlen($e) > 50 || !preg_match("/^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/i", $e)) return false;
        return true;
    }
    static public function phone_check($e)
    {
        if (!preg_match("/^(01)[016789][0-9]{7,8}/", $e)) return false;
        return true;
    }
    static public function compare_str($e, $f)
    {
        return preg_match('/(' . $f . ')/', $e);
    }
    static public function getIPAddr($ip = null)
    {
        if ($ip === null) {
            if (isset($_SERVER['HTTP_CLIENT_IP']) && getenv('HTTP_CLIENT_IP')) {
                $result = $_SERVER['HTTP_CLIENT_IP'];
            } elseif (isset($_SERVER['HTTP_X_FORWARDED_FOR']) && getenv('HTTP_X_FORWARDED_FOR')) {
                $result = $_SERVER['HTTP_X_FORWARDED_FOR'];
            } elseif (isset($_SERVER['REMOTE_HOST']) && getenv('REMOTE_HOST')) {
                $result = $_SERVER['REMOTE_HOST'];
            } elseif (isset($_SERVER['REMOTE_ADDR']) && getenv('REMOTE_ADDR')) {
                $result = $_SERVER['REMOTE_ADDR'];
            }
        } else {
            $result = $ip;
        }
        if (($result = ip2long($result)) == 0) {
            return false;
        }
        return $result;
    }
}