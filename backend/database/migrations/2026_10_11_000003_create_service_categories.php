<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('service_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->timestamps();
        });
        $names = array_unique(array_merge(['Màn hình', 'Đèn ô tô', 'Âm thanh', 'Camera & an toàn', 'Nội thất', 'Ngoại thất'], DB::table('services')->whereNotNull('category')->distinct()->pluck('category')->all()));
        foreach ($names as $name) {
            if ($name !== '') DB::table('service_categories')->insert(['name' => $name, 'created_at' => now(), 'updated_at' => now()]);
        }
    }
    public function down(): void { Schema::dropIfExists('service_categories'); }
};
