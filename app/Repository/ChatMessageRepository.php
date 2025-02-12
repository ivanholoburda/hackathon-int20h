<?php

namespace App\Repository;

use App\Models\ChatMessage;

class ChatMessageRepository extends AbstractRepository
{
    public function model(): string
    {
        return ChatMessage::class;
    }
}
