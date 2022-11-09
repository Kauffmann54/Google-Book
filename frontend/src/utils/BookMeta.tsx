import React, { useEffect } from 'react'

interface MetaProps {
    type: any; 
    props: { 
        children: string; 
        name: string; 
        content: string; 
        rel: string;
        href: string; 
        type: string;
    }; 
}

interface BookMetaProps {
  children?: MetaProps[] | MetaProps;
}

export default function BookMeta(props: BookMetaProps) {

  useEffect(() => {
    const addCanonicalUrl = (metaTag: MetaProps) => {
        const canonicalUrl = document.querySelector('link[rel="canonical"]');
        if (!canonicalUrl) {
            var link = document.createElement('link');
            link.setAttribute('rel', 'canonical');
            link.setAttribute('href', metaTag.props.content);
            document.head.appendChild(link);
        } else {
            canonicalUrl.setAttribute('href', metaTag.props.content);
        }
    };

    const addDefaultShareMeta = (metaTag: MetaProps) => {
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDescription = document.querySelector('meta[property="og:description"]');
        const ogImage = document.querySelector('meta[property="og:image"]');
        const ogUrl = document.querySelector('meta[property="og:url"]');
        const ogType = document.querySelector('meta[property="og:type"]');
        const ogSiteName = document.querySelector('meta[property="og:site_name"]');
        const ogLocale = document.querySelector('meta[property="og:locale"]');
        const twitterCard = document.querySelector('meta[name="twitter:card"]');
        const twitterSite = document.querySelector('meta[name="twitter:site"]');
        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        const twitterDescription = document.querySelector('meta[name="twitter:description"]');
        const twitterImage = document.querySelector('meta[name="twitter:image"]');
        
        if (metaTag.type === 'meta') {
            if (metaTag.props.name === process.env.REACT_APP_META_BOOK_TRACKING_TITLE) {
                if (!ogTitle) {
                    var meta = document.createElement('meta');
                    meta.setAttribute('property', 'og:title');
                    meta.setAttribute('content', metaTag.props.content);
                    document.head.appendChild(meta);
                } else {
                    ogTitle.setAttribute('content', metaTag.props.content);
                }

                // Twitter Title
                if (!twitterTitle) {
                    // eslint-disable-next-line @typescript-eslint/no-redeclare
                    var meta = document.createElement('meta');
                    meta.setAttribute('name', 'twitter:title');
                    meta.setAttribute('content', metaTag.props.content);
                    document.head.appendChild(meta);
                } else {
                    twitterTitle.setAttribute('content', metaTag.props.content);
                }
            } else if (metaTag.props.name === 'description') {
                if (!ogDescription) {
                    // eslint-disable-next-line @typescript-eslint/no-redeclare
                    var meta = document.createElement('meta');
                    meta.setAttribute('property', 'og:description');
                    meta.setAttribute('content', metaTag.props.content);
                    document.head.appendChild(meta);
                } else {
                    ogDescription.setAttribute('content', metaTag.props.content);
                }

                // Twitter Description
                if (!twitterDescription) {
                    // eslint-disable-next-line @typescript-eslint/no-redeclare
                    var meta = document.createElement('meta');
                    meta.setAttribute('name', 'twitter:description');
                    meta.setAttribute('content', metaTag.props.content);
                    document.head.appendChild(meta);
                } else {
                    twitterDescription.setAttribute('content', metaTag.props.content);
                }
            } else if (metaTag.props.name === process.env.REACT_APP_META_BOOK_TRACKING_URL) {
                if (!ogUrl) {
                    // eslint-disable-next-line @typescript-eslint/no-redeclare
                    var meta = document.createElement('meta');
                    meta.setAttribute('property', 'og:url');
                    meta.setAttribute('content', metaTag.props.content);
                    document.head.appendChild(meta);
                } else {
                    ogUrl.setAttribute('content', metaTag.props.content);
                }

                // Twitter Site
                if (!twitterSite) {
                    // eslint-disable-next-line @typescript-eslint/no-redeclare
                    var meta = document.createElement('meta');
                    meta.setAttribute('name', 'twitter:site');
                    meta.setAttribute('content', metaTag.props.content);
                    document.head.appendChild(meta);
                } else {
                    twitterSite.setAttribute('content', metaTag.props.content);
                }
            } 
        }

        // Image
        if (!ogImage) {
            // eslint-disable-next-line @typescript-eslint/no-redeclare
            // Height
            var metaHeight = document.createElement('meta');
            metaHeight.setAttribute('property', 'og:image:height');
            metaHeight.setAttribute('content', '2500');
            document.head.appendChild(metaHeight);

            // Width
            var metaWidth = document.createElement('meta');
            metaWidth.setAttribute('property', 'og:image:width');
            metaWidth.setAttribute('content', '1330');
            document.head.appendChild(metaWidth);
        }

        // Type
        if (!ogType) {
            // eslint-disable-next-line @typescript-eslint/no-redeclare
            var meta = document.createElement('meta');
            meta.setAttribute('property', 'og:type');
            meta.setAttribute('content', 'website');
            document.head.appendChild(meta);
        }

        // Site Name
        if (!ogSiteName) {
            // eslint-disable-next-line @typescript-eslint/no-redeclare
            var meta = document.createElement('meta');
            meta.setAttribute('property', 'og:site_name');
            meta.setAttribute('content', 'Google Book');
            document.head.appendChild(meta);
        }

        // Locale
        if (!ogLocale) {
            // eslint-disable-next-line @typescript-eslint/no-redeclare
            var meta = document.createElement('meta');
            meta.setAttribute('property', 'og:locale');
            meta.setAttribute('content', 'pt_BR');
            document.head.appendChild(meta);
        }

        // Twitter Card
        if (!twitterCard) {
            // eslint-disable-next-line @typescript-eslint/no-redeclare
            var meta = document.createElement('meta');
            meta.setAttribute('name', 'twitter:card');
            meta.setAttribute('content', 'summary_large_image');
            document.head.appendChild(meta);
        }
    };

    const addShareMeta = (metaTag: MetaProps) => {
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDescription = document.querySelector('meta[property="og:description"]');
        const ogImage = document.querySelector('meta[property="og:image"]');
        const ogImageHeight = document.querySelector('meta[property="og:image:height"]');
        const ogImageWidth = document.querySelector('meta[property="og:image:width"]');
        const ogUrl = document.querySelector('meta[property="og:url"]');
        const ogType = document.querySelector('meta[property="og:type"]');
        const ogSiteName = document.querySelector('meta[property="og:site_name"]');
        const ogLocale = document.querySelector('meta[property="og:locale"]');
        const ogLocaleAlternate = document.querySelector('meta[property="og:locale:alternate"]');
        const twitterCard = document.querySelector('meta[name="twitter:card"]');
        const twitterSite = document.querySelector('meta[name="twitter:site"]');
        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        const twitterDescription = document.querySelector('meta[name="twitter:description"]');
        const twitterImage = document.querySelector('meta[name="twitter:image"]');
        
        if (metaTag.type === 'meta') {
            if (metaTag.props.name === process.env.REACT_APP_META_BOOK_TRACKING_TITLE) {
                if (!ogTitle) {
                    var meta = document.createElement('meta');
                    meta.setAttribute('property', 'og:title');
                    meta.setAttribute('content', metaTag.props.content);
                    document.head.appendChild(meta);
                } else {
                    ogTitle.setAttribute('content', metaTag.props.content);
                }

                // Twitter Title
                if (!twitterTitle) {
                    // eslint-disable-next-line @typescript-eslint/no-redeclare
                    var meta = document.createElement('meta');
                    meta.setAttribute('name', 'twitter:title');
                    meta.setAttribute('content', metaTag.props.content);
                    document.head.appendChild(meta);
                } else {
                    twitterTitle.setAttribute('content', metaTag.props.content);
                }
            } else if (metaTag.props.name === 'description') {
                if (!ogDescription) {
                    // eslint-disable-next-line @typescript-eslint/no-redeclare
                    var meta = document.createElement('meta');
                    meta.setAttribute('property', 'og:description');
                    meta.setAttribute('content', metaTag.props.content);
                    document.head.appendChild(meta);
                } else {
                    ogDescription.setAttribute('content', metaTag.props.content);
                }

                // Twitter Description
                if (!twitterDescription) {
                    // eslint-disable-next-line @typescript-eslint/no-redeclare
                    var meta = document.createElement('meta');
                    meta.setAttribute('name', 'twitter:description');
                    meta.setAttribute('content', metaTag.props.content);
                    document.head.appendChild(meta);
                } else {
                    twitterDescription.setAttribute('content', metaTag.props.content);
                }
            } else if (metaTag.props.name === 'image') {
                if (!ogImage) {
                    // eslint-disable-next-line @typescript-eslint/no-redeclare
                    var meta = document.createElement('meta');
                    meta.setAttribute('property', 'og:image');
                    meta.setAttribute('content', metaTag.props.content);
                    document.head.appendChild(meta);
                } else {
                    ogImage.setAttribute('content', metaTag.props.content);
                }

                if (!ogImageHeight) {
                    var metaHeigth = document.createElement('meta');
                    metaHeigth.setAttribute('property', 'og:image:height');
                    metaHeigth.setAttribute('content', '2500');
                    document.head.appendChild(metaHeigth);
                } else {
                    ogImageHeight.setAttribute('content', '2500');
                }

                if (!ogImageWidth) {
                    var metaWidth = document.createElement('meta');
                    metaWidth.setAttribute('property', 'og:image:width');
                    metaWidth.setAttribute('content', '1330');
                    document.head.appendChild(metaWidth);
                } else {
                    ogImageWidth.setAttribute('content', '1330');
                }

                // Twitter Image
                if (!twitterImage) {
                    // eslint-disable-next-line @typescript-eslint/no-redeclare
                    var meta = document.createElement('meta');
                    meta.setAttribute('name', 'twitter:image');
                    meta.setAttribute('content', metaTag.props.content);
                    document.head.appendChild(meta);
                } else {
                    twitterImage.setAttribute('content', metaTag.props.content);
                }
            } else if (metaTag.props.name === process.env.REACT_APP_META_BOOK_TRACKING_URL) {
                if (!ogUrl) {
                    // eslint-disable-next-line @typescript-eslint/no-redeclare
                    var meta = document.createElement('meta');
                    meta.setAttribute('property', 'og:url');
                    meta.setAttribute('content', metaTag.props.content);
                    document.head.appendChild(meta);
                } else {
                    ogUrl.setAttribute('content', metaTag.props.content);
                }

                // Twitter Site
                if (!twitterSite) {
                    // eslint-disable-next-line @typescript-eslint/no-redeclare
                    var meta = document.createElement('meta');
                    meta.setAttribute('name', 'twitter:site');
                    meta.setAttribute('content', metaTag.props.content);
                    document.head.appendChild(meta);
                } else {
                    twitterSite.setAttribute('content', metaTag.props.content);
                }
            } else if (metaTag.props.name === 'url') {
                if (!ogUrl) {
                    // eslint-disable-next-line @typescript-eslint/no-redeclare
                    var meta = document.createElement('meta');
                    meta.setAttribute('property', 'og:url');
                    meta.setAttribute('content', metaTag.props.content);
                    document.head.appendChild(meta);
                } else {
                    ogUrl.setAttribute('content', metaTag.props.content);
                }

                // Twitter Url
                if (!twitterSite) {
                    // eslint-disable-next-line @typescript-eslint/no-redeclare
                    var meta = document.createElement('meta');
                    meta.setAttribute('name', 'twitter:site');
                    meta.setAttribute('content', metaTag.props.content);
                    document.head.appendChild(meta);
                } else {
                    twitterSite.setAttribute('content', metaTag.props.content);
                }
            } else if (metaTag.props.name === 'type') {
                if (!ogType) {
                    // eslint-disable-next-line @typescript-eslint/no-redeclare
                    var meta = document.createElement('meta');
                    meta.setAttribute('property', 'og:type');
                    meta.setAttribute('content', metaTag.props.content);
                    document.head.appendChild(meta);
                } else {
                    ogType.setAttribute('content', metaTag.props.content);
                }
            } else if (metaTag.props.name === 'site_name') {
                if (!ogSiteName) {
                    // eslint-disable-next-line @typescript-eslint/no-redeclare
                    var meta = document.createElement('meta');
                    meta.setAttribute('property', 'og:site_name');
                    meta.setAttribute('content', metaTag.props.content);
                    document.head.appendChild(meta);
                } else {
                    ogSiteName.setAttribute('content', metaTag.props.content);
                }
            } else if (metaTag.props.name === 'locale') {
                if (!ogLocale) {
                    // eslint-disable-next-line @typescript-eslint/no-redeclare
                    var meta = document.createElement('meta');
                    meta.setAttribute('property', 'og:locale');
                    meta.setAttribute('content', metaTag.props.content);
                    document.head.appendChild(meta);
                } else {
                    ogLocale.setAttribute('content', metaTag.props.content);
                }
            } else if (metaTag.props.name === 'locale:alternate') {
                if (!ogLocaleAlternate) {
                    // eslint-disable-next-line @typescript-eslint/no-redeclare
                    var meta = document.createElement('meta');
                    meta.setAttribute('property', 'og:locale:alternate');
                    meta.setAttribute('content', metaTag.props.content);
                    document.head.appendChild(meta);
                } else {
                    ogLocaleAlternate.setAttribute('content', metaTag.props.content);
                }
            }
        }

        // Twitter Card
        if (!twitterCard) {
            // eslint-disable-next-line @typescript-eslint/no-redeclare
            var meta = document.createElement('meta');
            meta.setAttribute('name', 'twitter:card');
            meta.setAttribute('content', 'summary_large_image');
            document.head.appendChild(meta);
        } else {
            twitterCard.setAttribute('content', 'summary_large_image');
        }
    };

    if (props.children) {
        const metaTags = Array.isArray(props.children) ? props.children : [props.children];
        metaTags.forEach((metaTag) => {
            switch (metaTag.type) {
                case 'title':
                    document.title = metaTag.props.children;
                    break;

                case 'meta':
                    const metaDocument = document.querySelector(`meta[name="${metaTag.props.name}"]`);
                    if (metaDocument) {
                        metaDocument.setAttribute('content', metaTag.props.content);
                    } else {
                        var meta = document.createElement('meta');
                        meta.setAttribute('name', metaTag.props.name);
                        meta.setAttribute('content', metaTag.props.content);
                        document.head.appendChild(meta);
                    }

                    if (metaTag.props.name === process.env.REACT_APP_META_BOOK_TRACKING_URL) {
                        addCanonicalUrl(metaTag);
                    }
                    addDefaultShareMeta(metaTag);
                    addShareMeta(metaTag);
                    
                    break;

                case 'link':
                    const linkDocument = document.querySelector(`link[rel="${metaTag.props.rel}"]`);
                    if (linkDocument) {
                        linkDocument.setAttribute('href', metaTag.props.href);
                    } else {
                        var link = document.createElement('link');
                        link.setAttribute('rel', metaTag.props.rel);
                        link.setAttribute('href', metaTag.props.href);
                        document.head.appendChild(link);
                    }
                    break;

                case 'script':
                    const scriptDocument = document.querySelector(`script[type="${metaTag.props.type}"]`);
                    if (scriptDocument) {
                        scriptDocument.setAttribute('type', metaTag.props.type);
                        scriptDocument.innerHTML = metaTag.props.children;
                    } else {
                        var script = document.createElement('script');
                        script.setAttribute('type', metaTag.props.type);
                        script.innerHTML = metaTag.props.children;
                        document.head.appendChild(script);
                    }
                    break;

                default:
                    break;
            }
        });
    }
  }, [props]);

  return (
    <>
    </>
  )
}