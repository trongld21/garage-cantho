<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('category')->default('phụ tùng');
            $table->string('brand')->nullable();
            $table->decimal('price', 12, 0)->default(0);
            $table->decimal('sale_price', 12, 0)->nullable();
            $table->integer('stock')->default(10);
            $table->text('summary')->nullable();
            $table->longText('description')->nullable();
            $table->string('image')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
