<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $total = 1_000_000;
        $chunkSize = 5000; // Adjust based on your memory

        $data = [];

        for ($i = 1; $i <= $total; $i++) {
            $data[] = [
                'name' => 'Task ' . $i,
                'image' => null,
            ];

            // When we reach chunk size, insert and reset
            if ($i % $chunkSize === 0) {
                DB::table('tasks')->insert($data);
                $data = [];
                echo "Inserted $i records\n";
            }
        }

        // Insert any remaining records
        if (!empty($data)) {
            DB::table('tasks')->insert($data);
            echo "Inserted final chunk\n";
        }

    }
}
