<?php

declare(strict_types=1);

namespace CafeAdaptogene\Mcp;

use RuntimeException;

final class KnowledgeBase
{
    /** @var array<string, array<string, mixed>> */
    private array $documentsById = [];

    /** @var array<string, array<string, mixed>> */
    private array $sourcesById = [];

    /**
     * @param list<array<string, mixed>> $documents
     * @param list<array<string, mixed>> $sources
     */
    public function __construct(
        private readonly array $documents,
        private readonly array $sources,
        private readonly string $siteUrl,
    ) {
        foreach ($documents as $document) {
            if (isset($document['id']) && is_string($document['id'])) {
                $this->documentsById[$document['id']] = $document;
            }
        }
        foreach ($sources as $source) {
            if (isset($source['id']) && is_string($source['id'])) {
                $this->sourcesById[$source['id']] = $source;
            }
        }
    }

    public static function fromFile(string $path): self
    {
        $json = file_get_contents($path);
        if (false === $json) {
            throw new RuntimeException('Le corpus MCP est introuvable.');
        }

        $data = json_decode($json, true, 512, JSON_THROW_ON_ERROR);
        if (!is_array($data) || !isset($data['documents'], $data['sources'], $data['site'])) {
            throw new RuntimeException('Le corpus MCP est invalide.');
        }

        return new self($data['documents'], $data['sources'], rtrim((string) $data['site'], '/'));
    }

    public static function normalizeSearchText(string $value): string
    {
        $value = strtr($value, [
            'À' => 'A', 'Â' => 'A', 'Ä' => 'A', 'Æ' => 'AE', 'Ç' => 'C',
            'É' => 'E', 'È' => 'E', 'Ê' => 'E', 'Ë' => 'E', 'Î' => 'I', 'Ï' => 'I',
            'Ô' => 'O', 'Ö' => 'O', 'Œ' => 'OE', 'Ù' => 'U', 'Û' => 'U', 'Ü' => 'U',
            'Ÿ' => 'Y', 'à' => 'a', 'â' => 'a', 'ä' => 'a', 'æ' => 'ae', 'ç' => 'c',
            'é' => 'e', 'è' => 'e', 'ê' => 'e', 'ë' => 'e', 'î' => 'i', 'ï' => 'i',
            'ô' => 'o', 'ö' => 'o', 'œ' => 'oe', 'ù' => 'u', 'û' => 'u', 'ü' => 'u', 'ÿ' => 'y',
        ]);
        $value = strtolower($value);
        $value = preg_replace('/[^a-z0-9]+/', ' ', $value) ?? '';

        return trim(preg_replace('/\s+/', ' ', $value) ?? '');
    }

    /** @return list<array{id: string, title: string, url: string}> */
    public function search(string $query, int $limit = 10): array
    {
        $normalized = self::normalizeSearchText(substr(trim($query), 0, 200));
        if ('' === $normalized) {
            return [];
        }

        $tokens = array_values(array_unique(array_filter(explode(' ', $normalized))));
        $scored = [];
        foreach ($this->documents as $document) {
            $title = self::normalizeSearchText((string) ($document['title'] ?? ''));
            $haystack = (string) ($document['searchText'] ?? self::normalizeSearchText((string) ($document['text'] ?? '')));
            $score = 0;
            if (str_contains($title, $normalized)) {
                $score += 20;
            }
            if (str_contains($haystack, $normalized)) {
                $score += 4;
            }
            foreach ($tokens as $token) {
                if (str_contains($title, $token)) {
                    $score += 5;
                }
                if (str_contains($haystack, $token)) {
                    ++$score;
                }
            }
            if ($score > 0) {
                $scored[] = ['score' => $score, 'document' => $document];
            }
        }

        usort($scored, static function (array $left, array $right): int {
            return $right['score'] <=> $left['score']
                ?: strcmp((string) $left['document']['title'], (string) $right['document']['title']);
        });

        $boundedLimit = max(1, min(10, $limit));

        return array_map(
            static fn (array $item): array => [
                'id' => (string) $item['document']['id'],
                'title' => (string) $item['document']['title'],
                'url' => (string) $item['document']['url'],
            ],
            array_slice($scored, 0, $boundedLimit),
        );
    }

    /** @return array<string, mixed> */
    public function fetch(string $id): array
    {
        $document = $this->documentsById[trim($id)] ?? null;
        if (null === $document) {
            return [
                'id' => trim($id),
                'title' => 'Document introuvable',
                'text' => 'Cet identifiant ne correspond à aucun document public du corpus Café Adaptogène.',
                'url' => $this->siteUrl.'/acces-agents-ia/',
                'metadata' => ['found' => false],
            ];
        }

        return [
            'id' => (string) $document['id'],
            'title' => (string) $document['title'],
            'text' => (string) $document['text'],
            'url' => (string) $document['url'],
            'metadata' => array_merge((array) ($document['metadata'] ?? []), [
                'found' => true,
                'type' => (string) ($document['type'] ?? ''),
                'sourceIds' => (array) ($document['sourceIds'] ?? []),
            ]),
        ];
    }

    /** @param list<string> $ids
     *  @return array{products: list<array<string, mixed>>, missingIds: list<string>}
     */
    public function compareProducts(array $ids): array
    {
        $products = [];
        $missingIds = [];
        foreach (array_slice(array_values(array_unique($ids)), 0, 10) as $requestedId) {
            $id = str_starts_with($requestedId, 'product:') ? $requestedId : 'product:'.$requestedId;
            $document = $this->documentsById[$id] ?? null;
            if (null === $document || 'product' !== ($document['type'] ?? null)) {
                $missingIds[] = $requestedId;
                continue;
            }
            $metadata = (array) ($document['metadata'] ?? []);
            $products[] = [
                'id' => $id,
                'title' => (string) $document['title'],
                'url' => (string) $document['url'],
                'brand' => $metadata['brand'] ?? null,
                'product' => $metadata['product'] ?? null,
                'category' => $metadata['category'] ?? null,
                'format' => $metadata['format'] ?? null,
                'dose' => $metadata['dose'] ?? null,
                'caffeine' => $metadata['caffeine'] ?? null,
                'pricePerServing' => $metadata['pricePerServing'] ?? null,
                'verificationLevel' => $metadata['verificationLevel'] ?? null,
                'editorialCaution' => $metadata['editorialCaution'] ?? null,
                'lastVerified' => $metadata['lastVerified'] ?? null,
            ];
        }

        return ['products' => $products, 'missingIds' => $missingIds];
    }

    /** @return array{sources: list<array<string, mixed>>, missingDocument?: string} */
    public function getSources(?string $id = null): array
    {
        if (null === $id || '' === trim($id)) {
            return ['sources' => $this->sources];
        }

        $document = $this->documentsById[trim($id)] ?? null;
        if (null === $document) {
            return ['sources' => [], 'missingDocument' => trim($id)];
        }

        $sources = [];
        foreach ((array) ($document['sourceIds'] ?? []) as $sourceId) {
            if (isset($this->sourcesById[$sourceId])) {
                $sources[] = $this->sourcesById[$sourceId];
            }
        }

        return ['sources' => $sources];
    }
}
