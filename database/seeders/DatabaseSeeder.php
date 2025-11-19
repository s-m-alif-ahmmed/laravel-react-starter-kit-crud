<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

//        User::factory()->create([
//            'name' => 'Test User',
//            'email' => 'test@example.com',
//        ]);

        // Disable foreign key checks to prevent issues with deletions
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Clear existing data
        DB::table('users')->truncate();
        DB::table('tasks')->truncate();

        // Re-enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Call seeders
        $this->call([
            UserSeeder::class,
            TaskSeeder::class,
        ]);

    }
}
