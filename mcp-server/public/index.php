<?php

declare(strict_types=1);

use CafeAdaptogene\Mcp\KnowledgeBase;
use CafeAdaptogene\Mcp\Tools;
use Http\Discovery\Psr17Factory;
use Laminas\HttpHandlerRunner\Emitter\SapiEmitter;
use Mcp\Schema\ToolAnnotations;
use Mcp\Server;
use Mcp\Server\Transport\StreamableHttpTransport;
use Psr\Log\NullLogger;

$runtimeRoot = is_file(__DIR__.'/vendor/autoload.php') ? __DIR__ : dirname(__DIR__);
require_once $runtimeRoot.'/vendor/autoload.php';

$dataPath = is_file(__DIR__.'/data/mcp-data.json')
    ? __DIR__.'/data/mcp-data.json'
    : dirname(__DIR__, 2).'/public/ai/mcp-data.json';

$logger = new NullLogger();
$tools = new Tools(KnowledgeBase::fromFile($dataPath));
$readOnly = new ToolAnnotations(
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
);

$server = Server::builder()
    ->setServerInfo(
        'cafeadaptogene-public-knowledge',
        '1.0.0',
        'Corpus public et sourcé sur les cafés adaptogènes et fonctionnels.',
        websiteUrl: 'https://cafeadaptogene.com/acces-agents-ia/',
        title: 'Café Adaptogène — connaissances publiques',
    )
    ->setLogger($logger)
    ->setInstructions('Utiliser search puis fetch. Citer les URLs publiques retournées. Ne jamais transformer une estimation, une déclaration de marque ou une donnée non publiée en fait mesuré.')
    ->addTool(
        [$tools, 'search'],
        name: 'search',
        title: 'Rechercher le corpus Café Adaptogène',
        description: 'Recherche des guides et produits publics. Renvoie au plus dix résultats avec id, titre et URL absolue.',
        annotations: $readOnly,
        inputSchema: [
            'type' => 'object',
            'properties' => ['query' => ['type' => 'string', 'maxLength' => 200]],
            'required' => ['query'],
            'additionalProperties' => false,
        ],
        outputSchema: [
            'type' => 'object',
            'properties' => [
                'results' => [
                    'type' => 'array',
                    'maxItems' => 10,
                    'items' => [
                        'type' => 'object',
                        'properties' => [
                            'id' => ['type' => 'string'],
                            'title' => ['type' => 'string'],
                            'url' => ['type' => 'string'],
                        ],
                        'required' => ['id', 'title', 'url'],
                    ],
                ],
            ],
            'required' => ['results'],
        ],
    )
    ->addTool(
        [$tools, 'fetch'],
        name: 'fetch',
        title: 'Lire un document public',
        description: 'Récupère le texte complet et les métadonnées d’un document trouvé par search.',
        annotations: $readOnly,
        inputSchema: [
            'type' => 'object',
            'properties' => ['id' => ['type' => 'string', 'maxLength' => 200]],
            'required' => ['id'],
            'additionalProperties' => false,
        ],
    )
    ->addTool(
        [$tools, 'compareProducts'],
        name: 'compare_products',
        title: 'Comparer des produits documentés',
        description: 'Compare jusqu’à dix produits sur leurs données publiées, sans classement commercial automatique.',
        annotations: $readOnly,
        inputSchema: [
            'type' => 'object',
            'properties' => [
                'ids' => ['type' => 'array', 'maxItems' => 10, 'items' => ['type' => 'string']],
            ],
            'required' => ['ids'],
            'additionalProperties' => false,
        ],
    )
    ->addTool(
        [$tools, 'getSources'],
        name: 'get_sources',
        title: 'Lister les sources publiques',
        description: 'Renvoie les sources liées à un document, ou toutes les sources dédupliquées si aucun id n’est fourni.',
        annotations: $readOnly,
        inputSchema: [
            'type' => 'object',
            'properties' => ['id' => ['type' => ['string', 'null'], 'maxLength' => 200]],
            'additionalProperties' => false,
        ],
    )
    ->build();

$request = (new Psr17Factory())->createServerRequestFromGlobals();
$transport = new StreamableHttpTransport($request, logger: $logger);
$response = $server->run($transport);

if (is_int($response)) {
    exit($response);
}

$response = $response
    ->withHeader('X-Content-Type-Options', 'nosniff')
    ->withHeader('X-Robots-Tag', 'noindex, nofollow');

(new SapiEmitter())->emit($response);
