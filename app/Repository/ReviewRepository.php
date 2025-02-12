<?php

namespace App\Repository;

use App\Models\Review;

class ReviewRepository extends AbstractRepository
{
    public function model(): string
    {
        return Review::class;
    }
}
