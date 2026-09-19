<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('customer_name');
            $table->string('phone');
            $table->string('email')->nullable();
            $table->string('license_plate')->nullable();
            $table->string('car_model')->nullable();
            $table->foreignId('service_id')->nullable()->constrained('services')->nullOnDelete();
            $table->string('service_name')->nullable();
            $table->date('booking_date');
            $table->string('booking_time')->default('08:30 AM');
            $table->text('note')->nullable();
            $table->string('status')->default('pending'); // pending, confirmed, completed, cancelled
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
