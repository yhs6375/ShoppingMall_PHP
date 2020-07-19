<?php
namespace HSApp\shopping;
require_once($_SERVER["MAIN_PHP"]);
require_server_safe("log/Logger.php");
require_server_safe("shopping/product/CategoryManage.php");

/*CategoryManager::AddCategory("hat3");
CategoryManager::AddCategory("cloth");
CategoryManager::AddCategory("glasses");
CategoryManager::AddCategory("socks");
CategoryManager::AddCategory("boots");
CategoryManager::AddSubCategory("hat3","abcd2");
CategoryManager::AddSubCategory("hat3","abcd5");
CategoryManager::AddSubCategory("cloth","bbr");
CategoryManager::AddSubCategory("cloth","hprp");
CategoryManager::AddSubCategory("cloth","eklow");
CategoryManager::AddSubCategory("cloth","ewlpwpww");
CategoryManager::AddSubCategory("cloth","qqqq");
CategoryManager::AddSubCategory("glasses","wwkoeokw");
CategoryManager::AddSubCategory("glasses","wqefdsdad");
CategoryManager::AddSubCategory("glasses","qwwqwq");
CategoryManager::AddSubCategory("glasses","asasas");
CategoryManager::AddSubCategory("glasses","dfdfdfd");
CategoryManager::AddSubCategory("glasses","gfgfgfg");
CategoryManager::AddSubCategory("glasses","zcxvzxc");
CategoryManager::AddSubCategory("socks","zzzzzzzzz");
CategoryManager::AddSubCategory("socks","xxxxxxxxx");
CategoryManager::AddSubCategory("socks","gfgfgfg");
CategoryManager::AddSubCategory("socks","wewwww");
CategoryManager::AddSubCategory("boots","wewwww");
CategoryManager::AddSubCategory("boots","gfgfgfg");*/
var_export(CategoryManager::GetSubCategoryList("glasses"));
//echo $ERR_MESSAGE;
?>
