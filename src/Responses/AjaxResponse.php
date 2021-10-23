<?php

declare(strict_types=1);

namespace Fykosak\NetteFrontendComponent\Responses;

use Nette\Http\{IResponse, IRequest};
use Nette\Application\Response;
use Nette\SmartObject;

final class AjaxResponse implements Response
{
    use SmartObject;

    private array $content = [];
    private int $code = IResponse::S200_OK;

    final public function getContentType(): string
    {
        return 'application/json';
    }

    public function setCode(int $code): void
    {
        $this->code = $code;
    }

    public function setContent(array $content): void
    {
        $this->content = $content;
    }

    public function send(IRequest $httpRequest, IResponse $httpResponse): void
    {
        $httpResponse->setCode($this->code);
        $httpResponse->setContentType($this->getContentType());
        $httpResponse->setExpiration(null);
        echo json_encode($this->content);
    }
}
