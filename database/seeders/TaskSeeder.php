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
        // Prevent Laravel from keeping queries in memory
        DB::disableQueryLog();

        $total = 1_000_000;

        // 5000 is too big for many local setups (Windows/128MB)
        $chunkSize = 500; // try 500 first (you can increase later)

        $now = now();

        for ($start = 1; $start <= $total; $start += $chunkSize) {

            $data = [];

            $end = min($start + $chunkSize - 1, $total);

            for ($i = $start; $i <= $end; $i++) {
                $data[] = [
                    'name'       => "Task{$i}",
                    'image'      => 'https://png.pngtree.com/thumb_back/fh260/background/20240522/pngtree-abstract-cloudy-background-beautiful-natural-streaks-of-sky-and-clouds-red-image_15684333.jpg',
                    'created_at' => $now,
                    'updated_at' => $now,
                ];
            }

            DB::table('tasks')->insert($data);

            // optional: print progress sometimes (not every batch)
            if ($start % (50_000) === 1) {
                echo "Inserted up to {$end}\n";
            }

            // free memory immediately
            unset($data);
        }

        echo "Done: Inserted {$total} records\n";
    }
}
