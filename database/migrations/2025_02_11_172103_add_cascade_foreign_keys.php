<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('questions', function (Blueprint $table) {
            $table->dropForeign(['quest_id']);
            $table->foreign('quest_id')->references('id')->on('quests')->onDelete('cascade');
        });

        Schema::table('room_participants', function (Blueprint $table) {
            $table->dropForeign(['room_id']);
            $table->dropForeign(['user_id']);
            $table->dropForeign(['question_id']);
            $table->foreign('room_id')->references('id')->on('rooms')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('question_id')->references('id')->on('questions')->onDelete('cascade');
        });

        Schema::table('quests', function (Blueprint $table) {
            $table->dropForeign(['owner_id']);
            $table->foreign('owner_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::table('rooms', function (Blueprint $table) {
            $table->dropForeign(['owner_id']);
            $table->dropForeign(['quest_id']);
            $table->foreign('owner_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('quest_id')->references('id')->on('quests')->onDelete('cascade');
        });

        Schema::table('user_games_history', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['quest_id']);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('quest_id')->references('id')->on('quests')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
