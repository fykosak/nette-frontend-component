<?php

declare(strict_types=1);

namespace Fykosak\NetteFrontendComponent\NetteActions;

use Nette\Application\UI\{Component, InvalidLinkException};
use Nette\SmartObject;

class NetteActions
{
    use SmartObject;

    private array $actions = [];
    private Component $component;

    public function __construct(Component $component)
    {
        $this->component = $component;
    }

    /**
     * @throws InvalidLinkException
     */
    public function addAction(string $key, string $destination, array $params = []): void
    {
        $this->actions[$key] = $this->component->link($destination, $params);
    }
    /**
     * @throws InvalidLinkException
     */
    public function addPresenterLink(string $key, string $destination, array $params = []): void
    {
        $this->actions[$key] = $this->component->getPresenter()->link($destination, $params);
    }

    public function removeAction(string $key): void
    {
        unset($this->actions[$key]);
    }

    public function hasAction(string $key): bool
    {
        return isset($this->actions[$key]);
    }

    public function getActions(): array
    {
        return $this->actions;
    }
}
