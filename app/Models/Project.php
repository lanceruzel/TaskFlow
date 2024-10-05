<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'owner_id',
        'project_title',
    ];

    public function owner(){
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function members(){
        return $this->hasMany(ProjectMember::class);
    }

    public function tasks(){
        return $this->hasMany(Task::class);
    }
}
