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

//        // Insert 1 million tasks in chunks for memory efficiency
//        $total = 1000000;
//        $batchSize = 1000;
//
//        for ($i = 0; $i < $total / $batchSize; $i++) {
//            Task::factory()->count($batchSize)->create();
//            $this->command->info("Inserted " . (($i + 1) * $batchSize) . " tasks...");
//        }

//        // Sample Tasks
//        $tasks = [
//            [
//                'name' => 'First Solar',
//                'image' => null,
//            ],
//            [
//                'name' => 'LONGi Solar',
//                'image' => null,
//            ],
//            [
//                'name' => 'JA Solar',
//                'image' => null,
//            ],
//            [
//                'name' => 'Trina Solar',
//                'image' => null,
//            ],
//            [
//                'name' => 'Canadian Solar',
//                'image' => null,
//            ],
//            [
//                'name' => 'Q CELLS',
//                'image' => null,
//            ],
//            [
//                'name' => 'Risen Energy',
//                'image' => null,
//            ],
//            [
//                'name' => 'REC Group',
//                'image' => null,
//            ],
//            [
//                'name' => 'SunPower',
//                'image' => null,
//            ],
//            [
//                'name' => 'Sungrow Power Supply',
//                'image' => null,
//            ],
//            [
//                'name' => 'GCL-Poly Energy',
//                'image' => null,
//            ],
//            [
//                'name' => 'Hanwha Q CELLS',
//                'image' => null,
//            ],
//            [
//                'name' => 'Sharp Solar',
//                'image' => null,
//            ],
//            [
//                'name' => 'Panasonic',
//                'image' => null,
//            ],
//            [
//                'name' => 'JinkoSolar',
//                'image' => null,
//            ],
//            [
//                'name' => 'LONGi Green Energy',
//                'image' => null,
//            ],
//            [
//                'name' => 'Yingli Solar',
//                'image' => null,
//            ],
//            [
//                'name' => 'Silfab Solar',
//                'image' => null,
//            ],
//            [
//                'name' => 'GoodWe',
//                'image' => null,
//            ],
//            [
//                'name' => 'Zhongtai International',
//                'image' => null,
//            ]
//        ];
//
//        // Insert into database
//        foreach ($tasks as $task) {
//            Task::create([
//                'name' => $task['name'],
//                'image' => $task['image'],
//            ]);
//
//        }
    }
}
