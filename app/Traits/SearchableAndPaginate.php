<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait SearchableAndPaginate
{
    /**
        * Scope a query to automatically search and paginate.
        *
        * @param Builder $query
        * @param array|string $searchableFields Fields to search in.
        * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
        */
    public function scopeSearchAndPaginate(Builder $query, $searchableFields = [])
    {
        $request = request();
        $search = $request->string('search');
        $perPage = $request->integer('per_page', 10);

        if ($search && !empty($searchableFields)) {
            $fields = (array) $searchableFields;
            
            $query->where(function ($q) use ($fields, $search) {
                foreach ($fields as $index => $field) {
                    if ($index === 0) {
                        $q->where($field, 'like', "%{$search}%");
                    } else {
                        $q->orWhere($field, 'like', "%{$search}%");
                    }
                }
            });
        }

        return $query->paginate($perPage)->appends($request->query());
    }
}
