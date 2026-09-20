import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import ChatWidget from '../components/ChatWidget'
import { SUPPORT } from '../lib/support.config'

export default function App({ Component, pageProps }: AppProps) {
  return       <><Head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="NeighborhoodGuide" />
        <meta property="og:description" content="Given a neighborhood and who's moving there, get a lifestyle-focused description for listings, relocation packets, or your site." />
        <meta property="og:url" content="https://neighborhoodguide.lxsaihub.com/" />
        <meta property="og:image" content="https://neighborhoodguide.lxsaihub.com/og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NeighborhoodGuide" />
        <meta name="twitter:description" content="Given a neighborhood and who's moving there, get a lifestyle-focused description for listings, relocation packets, or your site." />
        <meta name="twitter:image" content="https://neighborhoodguide.lxsaihub.com/og.png" />
                                        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"SoftwareApplication","name":"NeighborhoodGuide","url":"https://neighborhoodguide.lxsaihub.com/","description":"Given a neighborhood and who\'s moving there, get a lifestyle-focused description for listings, relocation packets, or your site.","applicationCategory":"BusinessApplication","operatingSystem":"Web","offers":{"@type":"Offer","priceCurrency":"USD","price":"0","availability":"https://schema.org/OnlineOnly"}}' }} />
      </Head>
      <Component {...pageProps} />
      <ChatWidget productName={SUPPORT.productName} brandColor={SUPPORT.brandColor} sessionKeyPrefix={SUPPORT.productSlug} /></>
}
