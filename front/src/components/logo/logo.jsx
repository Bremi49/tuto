import { Helmet } from 'react-helmet';

const Logo = () => {
    return (
        <Helmet
        htmlAttributes={{
                lang: 'fr', // Définit la langue de la page en français
            }}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter:wght@300;400;700&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Satisfy:wght@300;400;700&display=swap" />

            <meta charset="UTF-8"/>
            <title>Restaurant L'instinct Saumur</title>
            <meta name="description" content="L'Instinct Saumur: savourez une expérience gastronomique raffinée, plats créatifs et produits locaux de qualité. Réservez maintenant! " />
            <meta property="og:linstinctSaumur" content="Restaurant L'instinct Saumur" />
            <meta property="og:description" content="L'Instinct Saumur: savourez une expérience gastronomique raffinée, plats créatifs et produits locaux de qualité. Réservez maintenant!" />
            <meta property="og:type" content="linstintsaumur.com" />
            <meta name="twitter:title" content="Restaurant L'instinct Saumur" />
            <meta name="twitter:description" content="L'Instinct Saumur: savourez une expérience gastronomique raffinée, plats créatifs et produits locaux de qualité. Réservez maintenant!" />
            <link rel="alternate" href="https://linstinctsaumur.com" hreflang="en" />
            <link rel="alternate" href="https://linstinctsaumur.com/fr" hreflang="fr" />
        </Helmet>
    );
};

export default Logo;
