<?php

declare(strict_types=1);

use CafeAdaptogene\Mcp\KnowledgeBase;

require_once dirname(__DIR__).'/src/KnowledgeBase.php';

function expect(bool $condition, string $message): void
{
    if (!$condition) {
        throw new RuntimeException($message);
    }
}

$dataPath = dirname(__DIR__, 2).'/public/ai/mcp-data.json';
$knowledge = KnowledgeBase::fromFile($dataPath);

expect([] === $knowledge->search('   '), 'Une recherche vide doit renvoyer zéro résultat.');

$accented = $knowledge->search('café protéiné', 50);
$ascii = $knowledge->search('cafe proteine', 50);
expect(count($accented) <= 10, 'La recherche doit être limitée à dix résultats.');
expect(array_column($accented, 'id') === array_column($ascii, 'id'), 'La recherche doit ignorer les accents.');
expect(isset($accented[0]['id'], $accented[0]['title'], $accented[0]['url']), 'Le format search doit contenir id, title et url.');

$document = $knowledge->fetch('guide:torregral');
expect('guide:torregral' === $document['id'], 'fetch doit retrouver le document demandé.');
expect(isset($document['title'], $document['text'], $document['url'], $document['metadata']), 'Le format fetch doit être complet.');

$missing = $knowledge->fetch('guide:inconnu');
expect(false === $missing['metadata']['found'], 'Un identifiant inconnu doit être signalé sans erreur interne.');

$ids = array_map(static fn (int $i): string => 'product:inconnu-'.$i, range(1, 11));
$comparison = $knowledge->compareProducts($ids);
expect(10 === count($comparison['missingIds']), 'La comparaison doit traiter dix produits maximum.');

$sources = $knowledge->getSources('guide:torregral');
expect([] !== $sources['sources'], 'Les sources liées à un guide doivent être récupérables.');

fwrite(STDOUT, "KnowledgeBase tests passed.\n");
