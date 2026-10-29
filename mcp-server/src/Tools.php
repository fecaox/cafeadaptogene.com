<?php

declare(strict_types=1);

namespace CafeAdaptogene\Mcp;

final class Tools
{
    public function __construct(private readonly KnowledgeBase $knowledge)
    {
    }

    /** @return array{results: list<array{id: string, title: string, url: string}>} */
    public function search(string $query): array
    {
        return ['results' => $this->knowledge->search($query)];
    }

    /** @return array<string, mixed> */
    public function fetch(string $id): array
    {
        return $this->knowledge->fetch($id);
    }

    /** @param list<string> $ids
     *  @return array{products: list<array<string, mixed>>, missingIds: list<string>}
     */
    public function compareProducts(array $ids): array
    {
        return $this->knowledge->compareProducts($ids);
    }

    /** @return array{sources: list<array<string, mixed>>, missingDocument?: string} */
    public function getSources(?string $id = null): array
    {
        return $this->knowledge->getSources($id);
    }
}
