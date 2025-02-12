<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('questions', function (Blueprint $table) {
//            if (Schema::hasColumn('questions', 'quest_id')) {
//                $foreignKeys = DB::select("SELECT CONSTRAINT_NAME
//                                           FROM information_schema.KEY_COLUMN_USAGE
//                                           WHERE TABLE_NAME = 'questions'
//                                           AND TABLE_SCHEMA = DATABASE()
//                                           AND COLUMN_NAME = 'quest_id'");
//
//                foreach ($foreignKeys as $key) {
//                    Schema::table('questions', function (Blueprint $table) use ($key) {
//                        $table->dropForeign($key->CONSTRAINT_NAME);
//                    });
//                }
//            }
//
//            $table->foreign('quest_id')->references('id')->on('quests')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('questions', function (Blueprint $table) {
//            $table->dropForeign(['quest_id']);
//            $table->foreign('quest_id')->references('id')->on('questions'); // Повертаємо попередній стан
        });
    }
};
