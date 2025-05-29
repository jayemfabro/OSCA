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
        Schema::table('senior_citizens', function (Blueprint $table) {
            $table->string('place_of_birth')->nullable()->after('birth_date');
            $table->string('nationality')->nullable()->after('gender')->default('Filipino');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('senior_citizens', function (Blueprint $table) {
            $table->dropColumn(['place_of_birth', 'nationality']);
        });
    }
};
