@php
    $siteName = 'Team Pedro Barros';
    $isGoalPage = request()->routeIs('objetivos.show');
    $indexable = request()->routeIs('home') || $isGoalPage;

    $pageTitle = $isGoalPage
        ? 'Objetivos e regras do Desafio de Verão'
        : 'Desafio de Verão: 30 dias de treino e dieta';
    $shareTitle = $pageTitle.' - '.$siteName;
    $shareDescription = $isGoalPage
        ? 'Conheça as regras e metas do Desafio de Verão Team Pedro Barros: treino, alimentação, oração, habilidade e flexões durante 30 dias.'
        : '30 dias de treino, dieta com nutricionista e bioimpedância para chegar ao verão mais leve e saudável. De 01/11 a 05/12, apenas R$ 60,00. Garanta sua vaga!';
    $canonicalUrl = url()->current();
    $shareImage = url('/images/og-image.jpg').'?v=1';

    $schema = [
        '@context' => 'https://schema.org',
        '@graph' => [
            [
                '@type' => 'WebSite',
                '@id' => url('/').'#website',
                'url' => url('/'),
                'name' => $siteName,
                'description' => 'Desafio de Verão Team Pedro Barros',
                'inLanguage' => 'pt-BR',
                'publisher' => ['@id' => url('/').'#organization'],
            ],
            [
                '@type' => 'Organization',
                '@id' => url('/').'#organization',
                'name' => $siteName,
                'url' => url('/'),
                'logo' => url('/images/logo-desafio.png'),
                'image' => $shareImage,
                'founder' => ['@id' => url('/').'#pedro'],
                'sameAs' => ['https://www.instagram.com/pedrobarrosof'],
                'contactPoint' => [
                    '@type' => 'ContactPoint',
                    'telephone' => '+55-61-99840-1811',
                    'contactType' => 'customer service',
                    'areaServed' => 'BR',
                    'availableLanguage' => 'pt-BR',
                ],
            ],
            [
                '@type' => 'Person',
                '@id' => url('/').'#pedro',
                'name' => 'Pedro Barros',
                'jobTitle' => 'Coach e personal trainer',
                'image' => url('/images/pedro.jpg'),
                'sameAs' => ['https://www.instagram.com/pedrobarrosof'],
            ],
            [
                '@type' => 'Person',
                '@id' => url('/').'#thais',
                'name' => 'Thaís Moraes',
                'jobTitle' => 'Nutricionista',
                'image' => url('/images/thais.png'),
                'sameAs' => ['https://www.instagram.com/thaismoraesnutri'],
            ],
        ],
    ];
@endphp
<!DOCTYPE html>
<html lang="pt-BR" class="dark">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#050708">
        <meta name="google-site-verification" content="qh_gOHIaSDl7zr7DMPwOXEzhCDHNNAADYxfxhYNBaMQ" />

        <title inertia>{{ $shareTitle }}</title>
        <meta name="description" content="{{ $shareDescription }}">
        <meta name="robots" content="{{ $indexable ? 'index, follow, max-image-preview:large' : 'noindex, nofollow' }}">
        <meta name="author" content="Pedro Barros">
        @if ($indexable)
            <link rel="canonical" href="{{ $canonicalUrl }}">
        @endif

        <link rel="icon" href="/favicon.ico?v=2" sizes="any">
        <link rel="icon" href="/favicon.png?v=2" type="image/png">
        <link rel="apple-touch-icon" href="/favicon.png?v=2">

        <meta property="og:type" content="website">
        <meta property="og:site_name" content="{{ $siteName }}">
        <meta property="og:locale" content="pt_BR">
        <meta property="og:title" content="{{ $shareTitle }}">
        <meta property="og:description" content="{{ $shareDescription }}">
        <meta property="og:url" content="{{ $canonicalUrl }}">
        <meta property="og:image" content="{{ $shareImage }}">
        <meta property="og:image:type" content="image/jpeg">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:image:alt" content="Desafio de Verão — Team Pedro Barros">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="{{ $shareTitle }}">
        <meta name="twitter:description" content="{{ $shareDescription }}">
        <meta name="twitter:image" content="{{ $shareImage }}">

        @if ($indexable)
            <script type="application/ld+json">{!! json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG) !!}</script>
        @endif

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Knewave&family=Barlow+Condensed:ital,wght@0,500;0,600;0,700;0,800;1,700;1,800&display=swap" rel="stylesheet">

        @routes
        @vite(['resources/js/app.ts'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
