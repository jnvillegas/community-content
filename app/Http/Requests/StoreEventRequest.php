<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Event;
use Illuminate\Validation\Rule;

class StoreEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Auth middleware handles login check
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'event_type' => [
                'required',
                Rule::in([
                    Event::TYPE_WORKSHOP,
                    Event::TYPE_MEETUP,
                    Event::TYPE_WEBINAR,
                    Event::TYPE_TRIP
                ])
            ],
            'start_date' => ['required', 'date', 'after:now'],
            'end_date' => ['required', 'date', 'after:start_date'],
            'registration_deadline' => ['nullable', 'date', 'before:start_date'],
            'max_participants' => ['nullable', 'integer', 'min:1'],
            'requires_subscription' => ['boolean'],
            'categories' => ['nullable', 'array'],
            'categories.*' => ['exists:event_categories,id'],
            'cover_image' => ['nullable', 'image', 'max:5120'], // 5MB
            'location' => ['nullable', 'string'],
            'location_url' => ['nullable', 'url'],
            'virtual_url' => ['nullable', 'url'],
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation()
    {
        // Optional: cast types or sanitization
        if ($this->has('requires_subscription')) {
            $this->merge([
                'requires_subscription' => $this->boolean('requires_subscription'),
            ]);
        }
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'title.required' => 'El título es obligatorio.',
            'event_type.required' => 'El tipo de evento es obligatorio.',
            'event_type.in' => 'El tipo de evento seleccionado no es válido.',
            'start_date.after' => 'La fecha de inicio debe ser futura.',
            'end_date.after' => 'La fecha de fin debe ser posterior a la de inicio.',
            'registration_deadline.before' => 'La fecha límite de registro debe ser antes del evento.',
            'cover_image.max' => 'La imagen no debe pesar más de 5MB.',
        ];
    }
}
