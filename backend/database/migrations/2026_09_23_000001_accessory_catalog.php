<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
return new class extends Migration {
    public function up(): void {
        DB::table('services')->whereIn('slug', ['sua-chua-bao-duong-tong-hop', 've-sinh-khoang-dong-co', 'dong-son-phuc-hoi-than-xe'])->delete();
        DB::table('products')->whereIn('slug', ['dau-nhot-mobil-1-gold-5w30', 'loc-gio-dong-co-kn-toyota-fortuner'])->delete();
        DB::table('posts')->whereIn('slug', ['xe-cuu-ho-can-tho-247', 'rua-dong-co-o-to-co-can-thiet-khong'])->delete();
        foreach (json_decode(file_get_contents(database_path('seeders/accessory-services.json')), true) as $service) {
            if (!DB::table('services')->where('slug', $service['slug'])->exists()) {
                DB::table('services')->insert(array_merge($service, ['created_at' => now(), 'updated_at' => now()]));
            }
        }
    }
    public function down(): void { /* Content migration: do not discard subsequently edited records. */ }
};
