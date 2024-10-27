<?php

declare(strict_types=1);

namespace Fykosak\NetteFrontendComponent\Components;

use Fykosak\Utils\Components\DIComponent;
use Nette\DI\Container;
use Nette\Utils\Html;

abstract class FrontEndComponent extends DIComponent
{
    use FrontEndComponentTrait;

    public function __construct(Container $container, string $frontendId)
    {
        parent::__construct($container);
        $this->registerFrontend($frontendId);
    }

    final public function render(): void
    {
        $html = Html::el('div');
        $this->appendPropertyTo($html);
        $this->template->html = $html;
        $this->template->render(__DIR__ . DIRECTORY_SEPARATOR . 'layout.latte');
    }
}
