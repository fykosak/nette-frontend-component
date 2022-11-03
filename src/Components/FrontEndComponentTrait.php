<?php

declare(strict_types=1);

namespace Fykosak\NetteFrontendComponent\Components;

use Fykosak\Utils\Logging\{MemoryLogger, Message};
use Nette\Application\BadRequestException;
use Nette\Forms\Controls\BaseControl;
use Nette\Utils\Html;

trait FrontEndComponentTrait
{
    private string $frontendId;

    protected function registerFrontend(string $frontendId): void
    {
        $this->frontendId = $frontendId;
    }

    /**
     * @throws BadRequestException
     */
    protected function appendProperty(): void
    {
        if (!$this instanceof BaseControl) {
            throw new BadRequestException('method appendProperty can be used only with BaseControl');
        }
        $this->appendPropertyTo($this->control);
    }

    protected function appendPropertyTo(Html $html): void
    {
        $html->setAttribute('data-frontend-root', true);
        $html->setAttribute('data-frontend-id', $this->frontendId);
        foreach ($this->getResponseData() as $key => $value) {
            $html->setAttribute('data-' . $key, json_encode($value));
        }
    }

    protected function getLogger(): MemoryLogger
    {
        static $logger;
        if (!isset($logger)) {
            $logger = new MemoryLogger();
        }
        return $logger;
    }

    protected function getData(): mixed
    {
        return null;
    }

    protected function configure(): void
    {
    }

    /**
     * @return string[]
     */
    protected function getResponseData(): array
    {
        $this->configure();
        $data = [
            'messages' => array_map(
                fn(Message $value): array => $value->__toArray(),
                $this->getLogger()->getMessages()
            ),
            'data' => $this->getData(),
        ];
        $this->getLogger()->clear();
        return $data;
    }
}
