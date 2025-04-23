<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Sample Tasks
        $tasks = [
            [
                'name' => 'First Solar',
                'image' => null,
            ],
            [
                'name' => 'LONGi Solar',
                'image' => null,
            ],
            [
                'name' => 'JA Solar',
                'image' => null,
            ],
            [
                'name' => 'Trina Solar',
                'image' => null,
            ],
            [
                'name' => 'Canadian Solar',
                'image' => null,
            ],
            [
                'name' => 'Q CELLS',
                'image' => null,
            ],
            [
                'name' => 'Risen Energy',
                'image' => null,
            ],
            [
                'name' => 'REC Group',
                'image' => null,
            ],
            [
                'name' => 'SunPower',
                'image' => null,
            ],
            [
                'name' => 'Sungrow Power Supply',
                'image' => null,
            ],
            [
                'name' => 'GCL-Poly Energy',
                'image' => null,
            ],
            [
                'name' => 'Hanwha Q CELLS',
                'image' => null,
            ],
            [
                'name' => 'Sharp Solar',
                'image' => null,
            ],
            [
                'name' => 'Panasonic',
                'image' => null,
            ],
            [
                'name' => 'JinkoSolar',
                'image' => null,
            ],
            [
                'name' => 'LONGi Green Energy',
                'image' => null,
            ],
            [
                'name' => 'Yingli Solar',
                'image' => null,
            ],
            [
                'name' => 'Silfab Solar',
                'image' => null,
            ],
            [
                'name' => 'GoodWe',
                'image' => null,
            ],
            [
                'name' => 'Zhongtai International',
                'image' => null,
            ]
        ];

        // Insert into database
        foreach ($tasks as $task) {
            Task::create([
                'name' => $task['name'],
                'image' => $task['image'],
            ]);

        }
    }
}
