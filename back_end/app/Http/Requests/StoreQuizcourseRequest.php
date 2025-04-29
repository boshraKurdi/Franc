<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreQuizcourseRequest extends FormRequest
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
            'question' => "required|string|max:256",
            'answer_1' => "required|string|max:256",
            'answer_2' => "required|string|max:256",
            'answer_3' => "required|string|max:256",
            'answer_4' => "required|string|max:256",
            'answer_right' => "required|string|max:256",
            'course_id' => "required|exists:courses,id"
        ];
    }
}
