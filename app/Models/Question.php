<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use App\Enums\QuestionType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property string $title
 * @property string $description
 * @property QuestionType $type
 * @property string $image
 * @property string $single_answer
 * @property array $questions
 * @property array $coordinates
 */
class Question extends Model
{
    use CrudTrait;
    protected $fillable = [
        'title',
        'description',
        'type',
        'image',
        'single_answer',
        'questions',
        'coordinates',
        'quest_id',
        'seconds_left',
    ];

    protected $casts = [
        'questions' => 'array',
        'coordinates' => 'array',
        'type' => QuestionType::class,
    ];

    public function quest(): BelongsTo
    {
        return $this->belongsTo(Quest::class);
    }
}
