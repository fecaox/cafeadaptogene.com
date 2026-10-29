<?php

declare(strict_types=1);

namespace CafeAdaptogene\Mcp;

use Mcp\Server\Transport\Http\Middleware\CorsMiddleware;
use Mcp\Server\Transport\Http\Middleware\DnsRebindingProtectionMiddleware;
use Psr\Http\Server\MiddlewareInterface;

final class HttpMiddleware
{
    /** @return list<MiddlewareInterface> */
    public static function production(): array
    {
        return self::forHosts(['cafeadaptogene.com']);
    }

    /** @return list<MiddlewareInterface> */
    public static function local(): array
    {
        return self::forHosts(['localhost', '127.0.0.1', '[::1]']);
    }

    /** @param list<string> $hosts
     *  @return list<MiddlewareInterface>
     */
    private static function forHosts(array $hosts): array
    {
        return [
            new CorsMiddleware(),
            new DnsRebindingProtectionMiddleware(
                allowedHosts: $hosts,
                allowedOrigins: ['https://cafeadaptogene.com'],
            ),
        ];
    }
}
