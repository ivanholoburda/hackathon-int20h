<?php

namespace App\Http\Requests\Review;

use Illuminate\Foundation\Http\FormRequest;

class CreateReviewRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'quest_id' => ['required', 'exists:quests,id'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'text' => ['required', 'string'],
        ];
    }
}
