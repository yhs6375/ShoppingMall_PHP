<?php
/*TokenManager 클래스
    JWT 토큰 기반 인증 방식을 간단하게 사용 할 수 있도록 만든 클래스
*/

namespace Util\Token;

use Util\Token\TokenException;
use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Signer\Key;
use Lcobucci\JWT\Signer\Hmac\Sha256;

class TokenManager
{
    private $builder;
    private $signatureKey = null;
    public function __construct($TokenData = null)
    {
        $this->builder = new Builder();
        if (!is_object($TokenData)) {
            return;
        }
    }
    // set iss claim
    // 토큰을 발급한 발급자(issuer)
    public function setIssure($iss)
    {
        if (!is_string($iss)) {
            throw new TokenException("Token issure must be string");
        }
        $this->builder->issuedBy($iss);
        return $this;
    }
    // set aud claim
    // 토큰을 사용할 수신자(Audience)
    public function setPermittedTarget($permittedTarget)
    {
        if (!is_string($permittedTarget)) {
            throw new TokenException("Permitted target must be string");
        }
        $this->builder->permittedFor($permittedTarget);
        return $this;
    }
    // set iat claim
    // 만들어진 시간(issued Time)
    public function setIssuedTime($time)
    {
        if (!is_numeric($time)) {
            throw new TokenException("Token issued time must be numeric");
        }
        $this->builder->issuedAt($time);
        return $this;
    }
    // set nbf claim
    // 이 시간 전에는 토큰 사용을 거부해야한다.
    public function setCanBeUsedTime($time)
    {
        if (!is_numeric($time)) {
            throw new TokenException("Token nbf time must be numeric");
        }
        $this->builder->canOnlyBeUsedAfter($time);
        return $this;
    }
    // set exp claim
    // 만료시간(Expiration Time)
    public function setExpTime($exp)
    {
        if (!is_numeric($exp)) {
            throw new TokenException("Token expiration time must be numeric");
        }
        $this->builder->expiresAt($exp);
        return $this;
    }
    public function setSignatureKey($key)
    {
        if (!is_string($key)) {
            throw new TokenException("Token signature key must be string");
        }
        $this->signatureKey = $key;
        return $this;
    }
    public function getToken()
    {
        $signer = new Sha256();
        if ($this->signatureKey == null) {
            throw new TokenException("Token signature key is null");
        }
        return $this->builder->getToken($signer, new Key($this->signatureKey));
        //return $this->builder->getToken();
    }
    //토큰이 유효한지 검증
    static public function verify($token, $signatureKey)
    {
        $signer = new Sha256();
        if ($signatureKey == null) {
            throw new TokenException("Token signature key is null");
        }
        return $token->verify($signer, $signatureKey);
    }
}