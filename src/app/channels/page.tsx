'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function ChannelsPage() {
  const { lang } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('ALL');
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);

  const content = {
    en: {
      heroBadge: 'GLOBAL BROADCAST LOOP',
      title: 'Global Channel Registry',
      subtitle: 'Browse real-time Free-to-Air stream definitions across every recognized international region. Structured, optimized, and ready for your media client token.',
      searchPlaceholder: 'Search channels, networks, or countries...',
      ctaTitle: 'Unlock All 15,000+ Verified Live Streams',
      ctaSubtitle: 'Instantly clear region locks and route the complete master playlist straight into your personal dashboard profile.',
      ctaBtn: 'Claim Premium Access Node',
      channelsLabel: 'signals indexed',
      mockChannelsNotice: '🔒 Premium encrypted node segments hidden. Upgrade to display full network streaming links.'
    },
    es: {
      heroBadge: 'BUCLE DE TRANSMISIÓN GLOBAL',
      title: 'Registro de Canales Globales',
      subtitle: 'Explore transmisiones de señal abierta (FTA) en tiempo real de cada región internacional. Estructurado, optimizado y listo para su token.',
      searchPlaceholder: 'Buscar canales, redes o países...',
      ctaTitle: 'Desbloquee las más de 15,000 Señales Verificadas',
      ctaSubtitle: 'Elimine los bloqueos regionales al instante y enrute la lista completa de reproducción directamente a su panel.',
      ctaBtn: 'Reclamar Nodo de Acceso Premium',
      channelsLabel: 'señales indexadas',
      mockChannelsNotice: '🔒 Segmentos cifrados premium ocultos. Actualice para mostrar los enlaces de transmisión completos.'
    }
  };

  const t = content[lang as 'en' | 'es'] || content.en;

  const countries = useMemo(() => [
    { name: 'Afghanistan', code: 'af', sample: ['RTA Pashto', 'Ariana Television', 'Tolo TV'] },
    { name: 'Aland', code: 'ax', sample: ['Aland TV Channel'] },
    { name: 'Albania', code: 'al', sample: ['RTSH 1 HD', 'Top Channel', 'Klan TV'] },
    { name: 'Algeria', code: 'dz', sample: ['ENTV Algeria', 'Echourouk TV', 'El Bilad'] },
    { name: 'American Samoa', code: 'as', sample: ['KVZK TV Feeds'] },
    { name: 'Andorra', code: 'ad', sample: ['RTVA Andorra'] },
    { name: 'Angola', code: 'ao', sample: ['TPA 1', 'ZAP Viva', 'TV Zimbo'] },
    { name: 'Anguilla', code: 'ai', sample: ['ATV Local Broadcast'] },
    { name: 'Antigua and Barbuda', code: 'ag', sample: ['ABS TV Antigua'] },
    { name: 'Argentina', code: 'ar', sample: ['Telefe Federal', 'El Trece HD', 'Todo Noticias (TN)'] },
    { name: 'Armenia', code: 'am', sample: ['Armenia TV Public', 'Shant TV', 'Yerkir Media'] },
    { name: 'Aruba', code: 'aw', sample: ['Telearuba 13'] },
    { name: 'Australia', code: 'au', sample: ['ABC News AU', 'SBS Food', '7NEWS Sydney', '9News'] },
    { name: 'Austria', code: 'at', sample: ['ORF 1 HD', 'Servus TV', 'Puls 24'] },
    { name: 'Azerbaijan', code: 'az', sample: ['AZTV Live', 'Ictimai TV', 'CBC Sport HD'] },
    { name: 'Bahamas', code: 'bs', sample: ['ZNS Bahamas'] },
    { name: 'Bahrain', code: 'bh', sample: ['Bahrain TV HD', 'Bahrain Sports'] },
    { name: 'Bangladesh', code: 'bd', sample: ['Somoy TV', 'Jamuna TV', 'Channel i'] },
    { name: 'Barbados', code: 'bb', sample: ['CBC TV 8'] },
    { name: 'Belarus', code: 'by', sample: ['Belarus 1', 'ONT Belarus', 'STV News'] },
    { name: 'Belgium', code: 'be', sample: ['VRT 1 HD', 'RTL Play', 'Tipik'] },
    { name: 'Belize', code: 'bz', sample: ['Great Belize Television'] },
    { name: 'Benin', code: 'bj', sample: ['ORTB Benin'] },
    { name: 'Bermuda', code: 'bm', sample: ['ZBM TV 9'] },
    { name: 'Bhutan', code: 'bt', sample: ['BBS TV Bhutan'] },
    { name: 'Bolivia', code: 'bo', sample: ['Bolivision', 'Red Uno', 'Unitel HD'] },
    { name: 'Bonaire', code: 'bq', sample: ['Nos TV Bonaire'] },
    { name: 'Bosnia and Herzegovina', code: 'ba', sample: ['BHT 1', 'Hayat TV', 'Face TV'] },
    { name: 'Botswana', code: 'bw', sample: ['BTV Botswana'] },
    { name: 'Brazil', code: 'br', sample: ['TV Globo Premium', 'SporTV Ultra', 'RecordTV', 'Band HD'] },
    { name: 'British Virgin Islands', code: 'vg', sample: ['CBN Virgin Islands'] },
    { name: 'Brunei', code: 'bn', sample: ['RTB Sukmaindera'] },
    { name: 'Bulgaria', code: 'bg', sample: ['BNT 1 HD', 'bTV Bulgaria', 'Nova TV'] },
    { name: 'Burkina Faso', code: 'bf', sample: ['RTB Burkina'] },
    { name: 'Burundi', code: 'bi', sample: ['RTNB Burundi'] },
    { name: 'Cambodia', code: 'kh', sample: ['CTN Cambodia', 'Hang Meas HDTV', 'Bayon TV'] },
    { name: 'Cameroon', code: 'cm', sample: ['CRTV Cameroon', 'Canal 2 International'] },
    { name: 'Canada', code: 'ca', sample: ['CBC News Network', 'CTV HD', 'Global News Live', 'ICI Radio-Canada'] },
    { name: 'Cape Verde', code: 'cv', sample: ['TCV Cape Verde'] },
    { name: 'Cayman Islands', code: 'ky', sample: ['Cayman 27 Broadcast'] },
    { name: 'Central African Republic', code: 'cf', sample: ['TV Centrafrique'] },
    { name: 'Chad', code: 'td', sample: ['Tele Tchad'] },
    { name: 'Chile', code: 'cl', sample: ['TVN Chile', 'Mega HD', 'Chilevision'] },
    { name: 'China', code: 'cn', sample: ['CCTV 1 Mandarin', 'CCTV News Info', 'Hunan TV'] },
    { name: 'Colombia', code: 'co', sample: ['Caracol TV Internacional', 'RCN Nuestra Tele', 'Señal Colombia'] },
    { name: 'Comoros', code: 'km', sample: ['ORTC Comoros'] },
    { name: 'Cook Islands', code: 'ck', sample: ['CITV Cook Islands'] },
    { name: 'Costa Rica', code: 'cr', sample: ['Teletica Canal 7', 'Repretel Canal 6', 'Multimedios CR'] },
    { name: 'Croatia', code: 'hr', sample: ['HRT 1 HD', 'Nova TV Croatia', 'RTL Croatia'] },
    { name: 'Cuba', code: 'cu', sample: ['Cubavision International', 'Tele Rebelde', 'Canal Caribe'] },
    { name: 'Curacao', code: 'cw', sample: ['TeleCuraçao'] },
    { name: 'Cyprus', code: 'cy', sample: ['RIK 1 HD', 'Sigma TV', 'Omega Cyprus'] },
    { name: 'Czech Republic', code: 'cz', sample: ['ČT1 HD', 'Nova TV Czech', 'Prima HD'] },
    { name: 'Democratic Republic of the Congo', code: 'cd', sample: ['RTNC Congo', 'Digital Congo'] },
    { name: 'Denmark', code: 'dk', sample: ['DR1 HD', 'TV 2 Danmark', 'DR News'] },
    { name: 'Djibouti', code: 'dj', sample: ['RTD Djibouti'] },
    { name: 'Dominica', code: 'dm', sample: ['Marpin Telecom Feeds'] },
    { name: 'Dominican Republic', code: 'do', sample: ['Telemicro HD', 'Telesistema 11', 'Color Visión'] },
    { name: 'East Timor', code: 'tl', sample: ['RTTL East Timor'] },
    { name: 'Ecuador', code: 'ec', sample: ['Ecuavisa HD', 'Teleamazonas', 'TC Televisión'] },
    { name: 'Egypt', code: 'eg', sample: ['Al Ahly TV', 'ON E HD', 'DMC Egypt'] },
    { name: 'El Salvador', code: 'sv', sample: ['TCS Canal 2 HD', 'Canal 4 Deportes', 'Canal 21 Telenoticias'] },
    { name: 'Equatorial Guinea', code: 'gq', sample: ['TVGE Equatorial Guinea'] },
    { name: 'Eritrea', code: 'er', sample: ['ERISAT Live'] },
    { name: 'Estonia', code: 'ee', sample: ['ERR ETV HD', 'Reporter TV'] },
    { name: 'Ethiopia', code: 'et', sample: ['EBC Ethiopia', 'Fana TV', 'Amhara TV'] },
    { name: 'Falkland Islands', code: 'fk', sample: ['FITV Falklands'] },
    { name: 'Faroe Islands', code: 'fo', sample: ['KVF Faroe Network'] },
    { name: 'Fiji', code: 'fj', sample: ['Fiji One Live'] },
    { name: 'Finland', code: 'fi', sample: ['Yle TV1 HD', 'MTV3 Finland', 'Nelonen'] },
    { name: 'France', code: 'fr', sample: ['Canal+ France', 'TF1 Full HD', 'France 24 Info', 'M6 Live'] },
    { name: 'French Guiana', code: 'gf', sample: ['Guyane La 1ere'] },
    { name: 'French Polynesia', code: 'pf', sample: ['Polynésie La 1ere'] },
    { name: 'Gabon', code: 'ga', sample: ['Gabon Television'] },
    { name: 'Gambia', code: 'gm', sample: ['GRTS Gambia'] },
    { name: 'Georgia', code: 'ge', sample: ['1TV Georgia', 'Rustavi 2', 'Imedi TV'] },
    { name: 'Germany', code: 'de', sample: ['ZDF HD', 'Das Erste HD', 'RTL Deutschland', 'WELT News'] },
    { name: 'Ghana', code: 'gh', sample: ['GTV Ghana', 'UTV Ghana', 'Adom TV'] },
    { name: 'Gibraltar', code: 'gi', sample: ['GBC Television'] },
    { name: 'Greece', code: 'gr', sample: ['ERT 1 HD', 'Mega Channel Greece', 'Alpha TV'] },
    { name: 'Greenland', code: 'gl', sample: ['KNR TV Greenland'] },
    { name: 'Grenada', code: 'gd', sample: ['GBN Grenada'] },
    { name: 'Guadeloupe', code: 'gp', sample: ['Guadeloupe La 1ere'] },
    { name: 'Guam', code: 'gu', sample: ['KUAM News'] },
    { name: 'Guatemala', code: 'gt', sample: ['Canal 3 GT', 'Noti7 Guatemala', 'Guatevision'] },
    { name: 'Guinea', code: 'gn', sample: ['RTG Guinea'] },
    { name: 'Guinea-Bissau', code: 'gw', sample: ['TGB Guinea-Bissau'] },
    { name: 'Guyana', code: 'gy', sample: ['HJTV Guyana'] },
    { name: 'Haiti', code: 'ht', sample: ['RTNH Haiti'] },
    { name: 'Honduras', code: 'hn', sample: ['HCH Live', 'Televicentro HN', 'Canal 11'] },
    { name: 'Hong Kong', code: 'hk', sample: ['TVB Jade', 'ViuTV HD', 'RTHK TV 31'] },
    { name: 'Hungary', code: 'hu', sample: ['M1 HD Info', 'RTL Hungary', 'TV2 Hungary'] },
    { name: 'Iceland', code: 'is', sample: ['RÚV HD Iceland'] },
    { name: 'India', code: 'in', sample: ['Sony TEN 1 HD', 'Star Sports India', 'Aaj Tak', 'DD National'] },
    { name: 'Indonesia', code: 'id', sample: ['RCTI Live', 'Metro TV', 'Trans TV', 'Kompas TV'] },
    { name: 'Iran', code: 'ir', sample: ['IRIB TV1', 'IRINN News', 'Varzesh TV'] },
    { name: 'Iraq', code: 'iq', sample: ['Al Iraqiya', 'Kurdistan24', 'Al Sumaria'] },
    { name: 'Ireland', code: 'ie', sample: ['RTÉ One HD', 'Virgin Media One', 'TG4'] },
    { name: 'Israel', code: 'il', sample: ['Kan 11 HD', 'Keshet 12', 'Reshet 13'] },
    { name: 'Italy', code: 'it', sample: ['Rai 1 HD', 'Canale 5 Italy', 'Sky TG24'] },
    { name: 'Ivory Coast', code: 'ci', sample: ['RTI 1 Live'] },
    { name: 'Jamaica', code: 'jm', sample: ['TVJ Jamaica'] },
    { name: 'Japan', code: 'jp', sample: ['NHK World Tokyo', 'Fuji TV', 'Tokyo MX', 'TBS Japan'] },
    { name: 'Jordan', code: 'jo', sample: ['Jordan TV HD', 'Roya TV'] },
    { name: 'Kazakhstan', code: 'kz', sample: ['Qazaqstan TV', 'Khabar 24'] },
    { name: 'Kenya', code: 'ke', sample: ['Citizen TV Kenya', 'KTN News', 'KBC Channel 1'] },
    { name: 'Kiribati', code: 'ki', sample: ['Kiribati Broadcast Feeds'] },
    { name: 'Kosovo', code: 'xk', sample: ['RTK 1 Kosovo', 'Kohavision'] },
    { name: 'Kuwait', code: 'kw', sample: ['Kuwait TV 1', 'Kuwait Sports'] },
    { name: 'Kyrgyzstan', code: 'kg', sample: ['Ala-Too 24'] },
    { name: 'Laos', code: 'la', sample: ['LNTV Laos'] },
    { name: 'Latvia', code: 'lv', sample: ['LTV1 HD Latvia'] },
    { name: 'Lebanon', code: 'lb', sample: ['LBCI Lebanon', 'MTV Lebanon'] },
    { name: 'Lesotho', code: 'ls', sample: ['LNBS Lesotho'] },
    { name: 'Liberia', code: 'lr', sample: ['LNTV Liberia'] },
    { name: 'Libya', code: 'ly', sample: ['Libya Al Ahrar'] },
    { name: 'Liechtenstein', code: 'li', sample: ['1FLTV Liechtenstein'] },
    { name: 'Lithuania', code: 'lt', sample: ['LRT Televizija HD'] },
    { name: 'Luxembourg', code: 'lu', sample: ['RTL Télé Lëtzebuerg'] },
    { name: 'Macao', code: 'mo', sample: ['TDM Macao'] },
    { name: 'Madagascar', code: 'mg', sample: ['TVM Madagascar'] },
    { name: 'Malawi', code: 'mw', sample: ['MBC TV Malawi'] },
    { name: 'Malaysia', code: 'my', sample: ['Astro Awani', 'TV3 Malaysia', 'RTM TV2'] },
    { name: 'Maldives', code: 'mv', sample: ['PSM TV Maldives'] },
    { name: 'Mali', code: 'ml', sample: ['ORTM Mali'] },
    { name: 'Malta', code: 'mt', sample: ['TVM Malta HD'] },
    { name: 'Martinique', code: 'mq', sample: ['Martinique La 1ere'] },
    { name: 'Mauritania', code: 'mr', sample: ['El Mouritaniya'] },
    { name: 'Mauritius', code: 'mu', sample: ['MBC Digital 1'] },
    { name: 'Mayotte', code: 'yt', sample: ['Mayotte La 1ere'] },
    { name: 'Mexico', code: 'mx', sample: ['TUDN Premium', 'Las Estrellas HD', 'Azteca Siete', 'Canal 5'] },
    { name: 'Micronesia', code: 'fm', sample: ['FSM Local Node'] },
    { name: 'Moldova', code: 'md', sample: ['Moldova 1 HD'] },
    { name: 'Monaco', code: 'mc', sample: ['Monaco Info'] },
    { name: 'Mongolia', code: 'mn', sample: ['MNB Mongolia'] },
    { name: 'Montenegro', code: 'me', sample: ['RTCG 1 HD'] },
    { name: 'Montserrat', code: 'ms', sample: ['ZJB Montserrat Radio/TV'] },
    { name: 'Morocco', code: 'ma', sample: ['Al Aoula HD', '2M Monde'] },
    { name: 'Mozambique', code: 'mz', sample: ['TVM Moçambique'] },
    { name: 'Myanmar', code: 'mm', sample: ['MRTV Live'] },
    { name: 'Namibia', code: 'na', sample: ['NBC Namibia'] },
    { name: 'Nauru', code: 'nr', sample: ['Nauru Television'] },
    { name: 'Nepal', code: 'np', sample: ['Kantipur TV HD'] },
    { name: 'Netherlands', code: 'nl', sample: ['NPO 1 HD', 'RTL 4 Network', 'Ziggo Sport'] },
    { name: 'New Caledonia', code: 'nc', sample: ['Nouvelle-Calédonie La 1ere'] },
    { name: 'New Zealand', code: 'nz', sample: ['TVNZ 1 HD', 'Three NZ', 'Sky Sport NZ'] },
    { name: 'Nicaragua', code: 'ni', sample: ['Canal 10 NI', 'Viva Nicaragua 13'] },
    { name: 'Niger', code: 'ne', sample: ['Télé Sahel'] },
    { name: 'Nigeria', code: 'ng', sample: ['Channels TV', 'NTA News 24', 'TVC News'] },
    { name: 'Niue', code: 'nu', sample: ['BCN Niue Terminal'] },
    { name: 'North Korea', code: 'kp', sample: ['KCTV Korean Central'] },
    { name: 'North Macedonia', code: 'mk', sample: ['MRT 1 HD'] },
    { name: 'Northern Mariana Islands', code: 'mp', sample: ['KSPN 2 News'] },
    { name: 'Norway', code: 'no', sample: ['NRK1 HD', 'TV 2 Norge', 'NRK Nyheter'] },
    { name: 'Oman', code: 'om', sample: ['Oman TV Live', 'Oman Sports'] },
    { name: 'Pakistan', code: 'pk', sample: ['Geo News Live', 'ARY News', 'PTV Sports'] },
    { name: 'Palau', code: 'pw', sample: ['Eco TV Palau'] },
    { name: 'Palestine', code: 'ps', sample: ['Palestine Live HD'] },
    { name: 'Panama', code: 'pa', sample: ['Telemetro Reporta', 'TVN Panamá'] },
    { name: 'Papua New Guinea', code: 'pg', sample: ['EMTV PNG'] },
    { name: 'Paraguay', code: 'py', sample: ['SNT Paraguay', 'Telefuturo'] },
    { name: 'Peru', code: 'pe', sample: ['Latina Televisión', 'América TV', 'ATV Perú'] },
    { name: 'Philippines', code: 'ph', sample: ['GMA Network', 'ABS-CBN Kapamilya Channel', 'GMA News TV'] },
    { name: 'Poland', code: 'pl', sample: ['TVP 1 HD', 'TVN24 Poland', 'Polsat HD'] },
    { name: 'Portugal', code: 'pt', sample: ['RTP 1 HD', 'SIC Portugal', 'TVI Live'] },
    { name: 'Puerto Rico', code: 'pr', sample: ['WAPA TV HD', 'Telemundo PR'] },
    { name: 'Qatar', code: 'qa', sample: ['beIN Sports Premium', 'Al Kass Sports'] },
    { name: 'Republic of the Congo', code: 'cg', sample: ['Télé Congo'] },
    { name: 'Romania', code: 'ro', sample: ['Pro TV Romania', 'Digi24', 'Antena 1'] },
    { name: 'Russia', code: 'ru', sample: ['Match TV HD', 'Russia 1', 'NTV News'] },
    { name: 'Rwanda', code: 'rw', sample: ['RBA Rwanda TV'] },
    { name: 'Reunion', code: 're', sample: ['Réunion La 1ere'] },
    { name: 'Saint Helena', code: 'sh', sample: ['SAMS Radio TV Feed'] },
    { name: 'Saint Kitts and Nevis', code: 'kn', sample: ['ZIZ Television'] },
    { name: 'Saint Lucia', code: 'lc', sample: ['HTS Saint Lucia'] },
    { name: 'Saint Pierre and Miquelon', code: 'pm', sample: ['Saint-Pierre et Miquelon La 1ere'] },
    { name: 'Saint Vincent and the Grenadines', code: 'vc', sample: ['SVG TV Portal'] },
    { name: 'Samoa', code: 'ws', sample: ['TV3 Samoa'] },
    { name: 'San Marino', code: 'sm', sample: ['San Marino RTV'] },
    { name: 'Saudi Arabia', code: 'sa', sample: ['SSC Sports HD', 'Al Arabiya Live', 'Saudi TV 1'] },
    { name: 'Senegal', code: 'sn', sample: ['RTS 1 Senegal', '2sTV'] },
    { name: 'Serbia', code: 'rs', sample: ['RTS 1 HD Serbia', 'Pink TV'] },
    { name: 'Seychelles', code: 'sc', sample: ['SBC Seychelles'] },
    { name: 'Sierra Leone', code: 'sl', sample: ['SLBC Sierra Leone'] },
    { name: 'Singapore', code: 'sg', sample: ['CNA News Asia', 'Channel 5 HD'] },
    { name: 'Sint Maarten', code: 'sx', sample: ['SXMTV Node'] },
    { name: 'Slovakia', code: 'sk', sample: ['RTVS Jednotka HD'] },
    { name: 'Slovenia', code: 'si', sample: ['RTVSLO 1 HD'] },
    { name: 'Solomon Islands', code: 'sb', sample: ['SIBC Solomon'] },
    { name: 'Somalia', code: 'so', sample: ['SNTV Somalia'] },
    { name: 'South Africa', code: 'za', sample: ['SuperSport Grandstand', 'SABC News', 'eNCA'] },
    { name: 'South Korea', code: 'kr', sample: ['KBS1 HD', 'MBC Korea', 'SBS HD', 'YTN News'] },
    { name: 'South Sudan', code: 'ss', sample: ['SSBC South Sudan'] },
    { name: 'Spain', code: 'es', sample: ['La 1 HD RTVE', 'Movistar+ LaLiga', 'Antena 3'] },
    { name: 'Sri Lanka', code: 'lk', sample: ['Derana TV', 'Hirustv'] },
    { name: 'Sudan', code: 'sd', sample: ['Sudan TV'] },
    { name: 'Suriname', code: 'sr', sample: ['STVS Suriname'] },
    { name: 'Swaziland', code: 'sz', sample: ['Swazi TV'] },
    { name: 'Sweden', code: 'se', sample: ['SVT1 HD', 'TV4 Sverige', 'SVT Nyheter'] },
    { name: 'Switzerland', code: 'ch', sample: ['SRF 1 HD', 'RTS Un HD'] },
    { name: 'Syria', code: 'sy', sample: ['Syrian TV Live'] },
    { name: 'Sao Tome and Principe', code: 'st', sample: ['TVS São Tomé'] },
    { name: 'Taiwan', code: 'tw', sample: ['TVBS News', 'FTV HD', 'SET News'] },
    { name: 'Tajikistan', code: 'tj', sample: ['Televisiooni Tojikiston'] },
    { name: 'Tanzania', code: 'tz', sample: ['ITV Tanzania', 'TBC 1'] },
    { name: 'Thailand', code: 'th', sample: ['Thairath TV 32', 'CH7 HD Thailand'] },
    { name: 'Togo', code: 'tg', sample: ['TVT Togo'] },
    { name: 'Tonga', code: 'to', sample: ['Tonga Broadcasting'] },
    { name: 'Trinidad and Tobago', code: 'tt', sample: ['CNC3 Trinidad'] },
    { name: 'Tunisia', code: 'tn', sample: ['Wataniya 1'] },
    { name: 'Turkiye', code: 'tr', sample: ['TRT Spor HD', 'ATV Türkiye', 'A Haber'] },
    { name: 'Turkmenistan', code: 'tm', sample: ['Turkmenistan TV'] },
    { name: 'Turks and Caicos Islands', code: 'tc', sample: ['Pinnacle TV'] },
    { name: 'Tuvalu', code: 'tv', sample: ['Tuvalu Media Feeds'] },
    { name: 'U.S. Virgin Islands', code: 'vi', sample: ['WTJX Virgin Islands'] },
    { name: 'Uganda', code: 'ug', sample: ['NTV Uganda', 'NBS TV'] },
    { name: 'Ukraine', code: 'ua', sample: ['1+1 Marathon Live', 'ICTv Ukraine'] },
    { name: 'United Arab Emirates', code: 'ae', sample: ['AD Sports 1', 'Dubai TV HD'] },
    { name: 'United Kingdom', code: 'gb', sample: ['Sky Sports Event', 'BBC One London', 'Sky News UK'] },
    { name: 'United States', code: 'us', sample: ['ESPN Ultra HD', 'HBO Premium East', 'Discovery Channel HD'] },
    { name: 'Uruguay', code: 'uy', sample: ['Canal 10 Uruguay', 'Teledoce'] },
    { name: 'Uzbekistan', code: 'uz', sample: ['UzReport TV'] },
    { name: 'Vanuatu', code: 'vu', sample: ['VBTC Vanuatu'] },
    { name: 'Vatican City', code: 'va', sample: ['Vatican Media Live'] },
    { name: 'Venezuela', code: 've', sample: ['Telesur Live', 'Venevisión'] },
    { name: 'Vietnam', code: 'vn', sample: ['VTV1 Vietnam', 'VTV3 HD'] },
    { name: 'Wallis and Futuna', code: 'wf', sample: ['Wallis & Futuna La 1ere'] },
    { name: 'Western Sahara', code: 'eh', sample: ['RASD TV Broadcast'] },
    { name: 'Yemen', code: 'ye', sample: ['Al Yemen TV'] },
    { name: 'Zambia', code: 'zm', sample: ['ZNBC TV 1'] },
    { name: 'Zimbabwe', code: 'zw', sample: ['ZBC TV Zimbabwe'] }
  ], []);

  const alphabet = ['ALL', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'Z'];

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLetter = selectedLetter === 'ALL' || country.name.toUpperCase().startsWith(selectedLetter);
      return matchesSearch && matchesLetter;
    });
  }, [countries, searchQuery, selectedLetter]);

  return (
    <div className="bg-[#f4f4f7] text-[#0a0a0c] dark:bg-[#060608] dark:text-[#f4f4f7] min-h-screen transition-colors duration-300 pb-1">
      
      {/* HEADER HERO AREA */}
      <section className="relative w-full text-center px-6 pt-12 pb-8 bg-gradient-to-b from-black/5 via-transparent to-transparent dark:from-violet-950/10 dark:via-transparent">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-gradient-to-r from-violet-600/10 to-blue-600/10 rounded-full filter blur-[100px] pointer-events-none dark:opacity-60"></div>
        <div className="max-w-3xl mx-auto space-y-3 relative z-10">
          <span className="text-[10px] font-black tracking-widest uppercase bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 px-4 py-1.5 rounded-full shadow-sm">
            {t.heroBadge}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none text-gray-900 dark:text-white">
            {t.title}
          </h1>
          <p className="text-xs text-gray-400 max-w-xl mx-auto leading-relaxed font-medium">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* FIXED SCROLLING & GRID PACK FOR PILLS BLOCK */}
      <section className="max-w-4xl mx-auto px-6 space-y-4">
        <div className="relative group max-w-xl mx-auto">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 text-sm">🔍</span>
          <input 
            type="text" value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setSelectedLetter('ALL'); }}
            placeholder={t.searchPlaceholder}
            className="w-full bg-white dark:bg-white/[0.01] border border-black/10 dark:border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-xs font-bold shadow-sm focus:outline-none focus:border-violet-500/50 text-inherit transition"
          />
        </div>

        {/* 🛠️ ULTRAPREMIUM HYBRID TRACK SYSTEM (Locks horizontal on mobile, wraps centered on desktop) */}
        <div className="w-full overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 flex md:flex-wrap items-center justify-start md:justify-center gap-1.5 scrollbar-thin scrollbar-thumb-violet-600/10 px-2 touch-pan-x">
          {alphabet.map((letter) => (
            <button
              key={letter} onClick={() => setSelectedLetter(letter)}
              className={`px-3 py-2 text-[10px] font-black rounded-xl transition cursor-pointer shrink-0 min-w-[34px] text-center ${
                selectedLetter === letter 
                  ? 'bg-violet-600 text-white shadow-md' 
                  : 'bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/5 text-gray-400 hover:text-inherit'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </section>

      {/* ACCORDION CONTAINER */}
      <section className="max-w-3xl mx-auto px-6 py-6 space-y-3">
        {filteredCountries.map((country) => {
          const isOpen = expandedCountry === country.name;
          return (
            <div key={country.name} className="bg-white dark:bg-[#0c0c10] border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden shadow-xs transition duration-200">
              
              <button
                onClick={() => setExpandedCountry(isOpen ? null : country.name)}
                className="w-full flex items-center justify-between p-4 font-black text-xs cursor-pointer text-inherit transition select-none"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="w-6 h-4 block shrink-0 overflow-hidden rounded bg-black/5 shadow-xs relative">
                    <img 
                      src={`https://flagcdn.com/w40/${country.code}.png`} 
                      alt={country.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </span>
                  <span className="truncate">{country.name}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 shrink-0 ml-2">
                  <span className="text-[9px] bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider hidden sm:inline-block">
                    {t.channelsLabel}
                  </span>
                  <span className={`text-[9px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-black/5 dark:border-white/5 p-4 bg-black/[0.005] dark:bg-black/20 space-y-3 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {country.sample.map((channel, cIdx) => (
                      <div key={cIdx} className="bg-white dark:bg-[#111116] border border-black/5 dark:border-white/5 p-3 rounded-xl flex items-center justify-between shadow-xs">
                        <span className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate pr-2">{channel}</span>
                        <span className="text-[8px] font-black bg-violet-500/10 text-violet-600 dark:text-violet-400 px-1.5 py-0.5 rounded border border-violet-500/10">1080P</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-center font-black text-gray-400 dark:text-gray-500 pt-1">
                    {t.mockChannelsNotice}
                  </p>
                </div>
              )}

            </div>
          );
        })}
      </section>

      {/* CALL TO ACTION */}
      <section className="max-w-3xl mx-auto px-6 py-8">
        <div className="relative w-full bg-gradient-to-br from-violet-600 to-blue-600 rounded-3xl p-8 text-center text-white space-y-4 shadow-xl overflow-hidden group">
          <div className="max-w-xl mx-auto space-y-3 z-10 relative">
            <h2 className="text-xl md:text-3xl font-black tracking-tight leading-none">{t.ctaTitle}</h2>
            <p className="text-[11px] text-white/80 font-medium leading-relaxed">{t.ctaSubtitle}</p>
            <div className="pt-1">
              <Link href="/pricing" className="inline-block bg-white text-gray-900 font-black text-xs uppercase tracking-widest px-6 py-3 rounded-xl shadow-md hover:scale-105 transition duration-200">
                {t.ctaBtn}
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}