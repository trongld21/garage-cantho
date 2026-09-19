<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('car_listings', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->enum('listing_type', ['sale', 'rent'])->default('sale');
            $table->decimal('price', 15, 0)->default(0);
            $table->integer('year')->nullable();
            $table->string('transmission')->default('Tự động');
            $table->string('fuel_type')->default('Xăng');
            $table->string('mileage')->nullable();
            $table->string('color')->nullable();
            $table->string('location')->default('Cần Thơ');
            $table->string('image')->nullable();
            $table->text('summary')->nullable();
            $table->longText('description')->nullable();
            $table->string('status')->default('available'); // available, sold, rented
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('car_listings');
    }
};
