<?php

namespace App\Enums;

enum QuestionType: string
{
    case SINGLE_ANSWER = 'single_answer';
    case QUESTIONS = 'questions';
    case IMAGE = 'image';

    public static function getLists(): array
    {
        return [
            self::SINGLE_ANSWER->value => 'Текстова відповідь',
            self::QUESTIONS->value => 'Тестові питання',
            self::IMAGE->value => 'Пошук на зображенні',
        ];
    }
}
