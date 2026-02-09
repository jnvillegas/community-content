<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // Usually the event_id is in the route: /events/{event}/register
            // If so, we might not need body validation.
            // But if the user wants "event_id required, exists", maybe they intend to send it in body?
            // "Validación simple para inscripción (event_id required, exists)"
            // I'll add it as optional if it's in body, but if it's in route, this rule might be redundant or for a different endpoint.
            // Given the route `Route::post('/events/{event}/register'...)`, the event is in URL.
            // But I will enable body validation just in case.
            'event_id' => ['sometimes', 'required', 'exists:events,id'],
        ];
    }
}
