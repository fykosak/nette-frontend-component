<?php

declare(strict_types=1);

namespace Fykosak\NetteFrontendComponent\Components;

use Fykosak\NetteFrontendComponent\NetteActions\NetteActions;
use Fykosak\NetteFrontendComponent\Responses\AjaxResponse;
use Nette\Application\AbortException;
use Nette\Application\UI\InvalidLinkException;
use Nette\DI\Container;
use Nette\Http\{IRequest, IResponse};

abstract class AjaxComponent extends FrontEndComponent
{

    private IRequest $request;
    protected NetteActions $actions;

    public function __construct(Container $container, string $frontendId)
    {
        parent::__construct($container, $frontendId);
        $this->actions = new NetteActions($this);
    }

    final public function injectRequest(IRequest $request): void
    {
        $this->request = $request;
    }

    /**
     * @throws InvalidLinkException
     */
    final public function addAction(string $key, string $destination, array $params = []): void
    {
        $this->actions->addAction($key, $destination, $params);
    }

    /**
     * @throws AbortException
     */
    final protected function sendAjaxResponse(int $code = IResponse::S200_OK): void
    {
        $response = new AjaxResponse();
        $response->setCode($code);
        $response->setContent($this->getResponseData());
        $this->getPresenter()->sendResponse($response);
    }

    final protected function getHttpRequest(): IRequest
    {
        return $this->request;
    }

    protected function getResponseData(): array
    {
        $data = parent::getResponseData();
        $data['actions'] = $this->actions->getActions();
        return $data;
    }
}
