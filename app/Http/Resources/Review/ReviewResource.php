<?php

namespace App\Http\Resources\Review;
use App\Http\Resources\User\UserProfileResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user' => new UserProfileResource($this->whenLoaded('user')),
            'rating' => $this->rating,
            'text' => $this->text,
            'created_at' => $this->created_at
        ];
    }
}
