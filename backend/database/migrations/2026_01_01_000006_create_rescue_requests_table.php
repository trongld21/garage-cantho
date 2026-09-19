<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rescue_requests', function (Blueprint $table) {
            $table->id();
            $table->string('customer_name');
            $table->string('phone');
            $table->string('location');
            $table->string('car_model')->nullable();
            $table->text('issue_description')->nullable();
            $table->string('status')->default('pending'); // pending, dispatched, resolved, cancelled
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rescue_requests');
    }
};
