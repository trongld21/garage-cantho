<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class ServiceCategoryController extends Controller
{
    public function index()
    {
        return response()->json(['data' => DB::table('service_categories')->select('service_categories.*')->selectSub(
            DB::table('services')->selectRaw('count(*)')->whereColumn('services.category', 'service_categories.name'),
            'services_count'
        )->orderBy('id')->get()]);
    }

    private function name(Request $request, $id = null): string
    {
        $request->merge(['name' => is_string($request->input('name')) ? trim($request->input('name')) : $request->input('name')]);
        return $request->validate(['name' => ['required', 'string', 'max:255', Rule::unique('service_categories', 'name')->ignore($id)]])['name'];
    }

    public function store(Request $request)
    {
        $name = $this->name($request);
        $id = DB::table('service_categories')->insertGetId(['name' => $name, 'created_at' => now(), 'updated_at' => now()]);
        return response()->json(['data' => DB::table('service_categories')->find($id)], 201);
    }

    public function update(Request $request, $id)
    {
        $name = $this->name($request, $id);
        $category = DB::transaction(function () use ($id, $name) {
            $old = DB::table('service_categories')->where('id', $id)->lockForUpdate()->first();
            abort_unless($old, 404);
            DB::table('services')->where('category', $old->name)->update(['category' => $name, 'updated_at' => now()]);
            DB::table('service_categories')->where('id', $id)->update(['name' => $name, 'updated_at' => now()]);
            return DB::table('service_categories')->find($id);
        });
        return response()->json(['data' => $category]);
    }

    public function destroy($id)
    {
        DB::transaction(function () use ($id) {
            $category = DB::table('service_categories')->where('id', $id)->lockForUpdate()->first();
            abort_unless($category, 404);
            if (DB::table('services')->where('category', $category->name)->exists()) {
                throw ValidationException::withMessages(['category' => 'Danh mục đang có dịch vụ. Hãy chuyển các dịch vụ sang danh mục khác trước khi xóa.']);
            }
            DB::table('service_categories')->where('id', $id)->delete();
        });
        return response()->noContent();
    }
}
