<?php

declare(strict_types=1);

use CafeAdaptogene\Mcp\HttpMiddleware;
use Http\Discovery\Psr17Factory;
use Mcp\Server\Transport\Http\MiddlewareRequestHandler;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

require_once dirname(__DIR__).'/vendor/autoload.php';

function expectHttp(bool $condition, string $message): void
{
    if (!$condition) {
        throw new RuntimeException($message);
    }
}

$factory = new Psr17Factory();
$passthrough = static fn (ServerRequestInterface $request): ResponseInterface => $factory->createResponse(200);
$handle = static fn (ServerRequestInterface $request): ResponseInterface => (new MiddlewareRequestHandler(
    HttpMiddleware::production(),
    $passthrough,
))->handle($request);

$allowed = $factory->createServerRequest('POST', 'https://cafeadaptogene.com/mcp')
    ->withHeader('Host', 'cafeadaptogene.com');
expectHttp(200 === $handle($allowed)->getStatusCode(), 'Le domaine public doit être autorisé.');

$rebound = $allowed->withHeader('Host', 'cafeadaptogene.com.evil.example');
expectHttp(403 === $handle($rebound)->getStatusCode(), 'Un hôte de rebinding doit rester interdit.');

fwrite(STDOUT, "HTTP middleware tests passed.\n");
