<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::get('sitemap.xml', function () {
    $urls = [route('home')];

    foreach (['treino', 'alimentacao', 'oracao', 'habilidade', 'flexoes'] as $goal) {
        $urls[] = route('objetivos.show', $goal);
    }

    $xml = '<?xml version="1.0" encoding="UTF-8"?>'."\n";
    $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'."\n";

    foreach ($urls as $index => $url) {
        $priority = $index === 0 ? '1.0' : '0.6';
        $xml .= '  <url><loc>'.e($url).'</loc><changefreq>weekly</changefreq><priority>'.$priority.'</priority></url>'."\n";
    }

    $xml .= '</urlset>'."\n";

    return response($xml, 200, ['Content-Type' => 'application/xml; charset=UTF-8']);
})->name('sitemap');

Route::redirect('objetivos', '/objetivos/treino')->name('objetivos');

Route::get('objetivos/{goal}', function (string $goal) {
    $keys = ['treino', 'alimentacao', 'oracao', 'habilidade', 'flexoes'];

    if (! in_array($goal, $keys, true)) {
        abort(404);
    }

    return Inertia::render('Objetivos', [
        'goal' => $goal,
    ]);
})->name('objetivos.show');

Route::get('dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
