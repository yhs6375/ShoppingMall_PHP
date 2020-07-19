<?php

namespace Server\DB;

use Server\DB\DBError;

class DB
{
	public function shoppingAdminLogin($databaseName)
	{
		return $this->dbLogin("localhost", "3306", "shopping_admin", "a644260", $databaseName);
	}
	public function memberAuthLogin($databaseName)
	{
		return $this->dbLogin("localhost", "3306", "shopping_member", "a1234", $databaseName);
	}
	public function memberAdminLogin($databaseName)
	{
		return $this->dbLogin("localhost", "3306", "admin_member", "a1234", $databaseName);
	}
	public function AdminPageAdminLogin()
	{
		return $this->dbLogin("localhost", "3306", "admin_admin", "a644260", "shopping_admin");
	}
	public function dbaLogin($databaseName)
	{
		return $this->dbLogin("localhost", "3306", "root", "a644260", $databaseName);
	}
	public function dbLogin($host, $port, $user, $pass, $dbname)
	{
		try {
			$dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8";
			$dbConnection = new \PDO($dsn, $user, $pass);
			$dbConnection->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
			return $dbConnection;
		} catch (\PDOException $e) {
			return false;
		} catch (\Exception $e) {
			return false;
		}
	}
}