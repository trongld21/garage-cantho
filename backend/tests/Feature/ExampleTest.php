<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_the_application_returns_a_successful_response(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_api_health_endpoint_is_available_under_api_prefix(): void
    {
        $this->getJson('/api/up')
            ->assertOk()
            ->assertJson(['status' => 'ok']);
    }
}
