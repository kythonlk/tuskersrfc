import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
}

export default function SEO({
    title,
    description,
    keywords,
    image,
    url,
    type = 'website'
}: SEOProps) {
    const siteTitle = 'Dubai Tuskers RFC';
    const fullTitle = title ? `${title} | ${siteTitle}` : 'Dubai Tuskers RFC - One Team. One Dream. One Family.';
    const defaultDescription = 'Join Dubai Tuskers RFC, a premier rugby club in Dubai. We welcome players of all levels for Men\'s, Women\'s, Veterans, and Touch Rugby. Sign up today!';
    const defaultKeywords = 'dubai rugby, rugby club dubai, join rugby club, dubai tuskers, mens rugby, womens rugby, touch rugby, social rugby dubai';
    const siteUrl = 'https://dubaituskers.com';
    const defaultImage = `${siteUrl}/logo.webp`; // Assuming logo.png is essentially the preview image, or we might want a specific og-image.

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{fullTitle}</title>
            <meta name='description' content={description || defaultDescription} />
            <meta name='keywords' content={keywords || defaultKeywords} />

            {/* End standard metadata tags */}

            {/* Facebook tags */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={image || defaultImage} />
            <meta property="og:url" content={url ? `${siteUrl}${url}` : siteUrl} />
            {/* End Facebook tags */}

            {/* Twitter tags */}
            <meta name="twitter:creator" content={siteTitle} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            <meta name="twitter:image" content={image || defaultImage} />
            {/* End Twitter tags */}

            <link rel="canonical" href={url ? `${siteUrl}${url}` : siteUrl} />
        </Helmet>
    );
}
