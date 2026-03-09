<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\SearchableAndPaginate;

class Task extends Model
{
    use HasFactory, SearchableAndPaginate;

    protected $fillable = [
        'name',
        'image',
    ];

    protected $hidden = [
      'created_at',
      'updated_at',
    ];

}
