<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLessonRequest extends FormRequest
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
            'title' => "required|string|max:256",
            'title_ar' => "required|string|max:256",
            "content" => "required|string",
            "content_ar" => "required|string",
            "objective" => "required|string",
            "objective_ar" => "required|string",
            "video_url" => "required|string",
            'unit_id' => "required|exists:units,id"
        ];
    }
}
