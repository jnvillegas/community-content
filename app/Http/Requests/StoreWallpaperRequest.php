<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreWallpaperRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check(); // Solo usuarios autenticados pueden crear wallpapers
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:wallpapers,slug',
            'alt' => 'nullable|string',
            'src' => 'required|string',
            'is_locked' => 'boolean',
            'lock_text' => 'nullable|string|max:255',
            'lock_subtitle' => 'nullable|string|max:255',
            'category' => 'required|in:mobile,desktop,both',
            'resolution' => 'nullable|string|max:50',
            'file_size' => 'nullable|string|max:50',
            'is_featured' => 'boolean',
            'status' => 'required|in:draft,published,archived',
            'published_at' => 'nullable|date',
        ];
    }
}
