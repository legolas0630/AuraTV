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

  // Master List of ALL countries requested, mapped with native ISO alpha indicators
  const countries = useMemo(() => [
    { name: 'Afghanistan', code: 'AF', flag: '🇦🇫', sample: ['RTA Pashto', 'Ariana Television', 'Tolo TV'] },
    { name: 'Aland', code: 'AX', flag: '🇦🇽', sample: ['Aland TV Channel'] },
    { name: 'Albania', code: 'AL', flag: '🇦🇱', sample: ['RTSH 1 HD', 'Top Channel', 'Klan TV'] },
    { name: 'Algeria', code: 'DZ', flag: '🇩🇿', sample: ['ENTV Algeria', 'Echourouk TV', 'El Bilad'] },
    { name: 'American Samoa', code: 'AS', flag: '🇦🇸', sample: ['KVZK TV Feeds'] },
    { name: 'Andorra', code: 'AD', flag: '🇦🇩', sample: ['RTVA Andorra'] },
    { name: 'Angola', code: 'AO', flag: '🇦🇴', sample: ['TPA 1', 'ZAP Viva', 'TV Zimbo'] },
    { name: 'Anguilla', code: 'AI', flag: '🇦🇮', sample: ['ATV Local Broadcast'] },
    { name: 'Antigua and Barbuda', code: 'AG', flag: '🇦🇬', sample: ['ABS TV Antigua'] },
    { name: 'Argentina', code: 'AR', flag: '🇦🇷', sample: ['Telefe Federal', 'El Trece HD', 'Todo Noticias (TN)'] },
    { name: 'Armenia', code: 'AM', flag: '🇦🇲', sample: ['Armenia TV Public', 'Shant TV', 'Yerkir Media'] },
    { name: 'Aruba', code: 'AW', flag: '🇦🇼', sample: ['Telearuba 13'] },
    { name: 'Australia', code: 'AU', flag: '🇦🇺', sample: ['ABC News AU', 'SBS Food', '7NEWS Sydney', '9News'] },
    { name: 'Austria', code: 'AT', flag: '🇦🇹', sample: ['ORF 1 HD', 'Servus TV', 'Puls 24'] },
    { name: 'Azerbaijan', code: 'AZ', flag: '🇦🇿', sample: ['AZTV Live', 'Ictimai TV', 'CBC Sport HD'] },
    { name: 'Bahamas', code: 'BS', flag: '🇧🇸', sample: ['ZNS Bahamas'] },
    { name: 'Bahrain', code: 'BH', flag: '🇧🇭', sample: ['Bahrain TV HD', 'Bahrain Sports'] },
    { name: 'Bangladesh', code: 'BD', flag: '🇧🇩', sample: ['Somoy TV', 'Jamuna TV', 'Channel i'] },
    { name: 'Barbados', code: 'BB', flag: '🇧🇧', sample: ['CBC TV 8'] },
    { name: 'Belarus', code: 'BY', flag: '🇧🇾', sample: ['Belarus 1', 'ONT Belarus', 'STV News'] },
    { name: 'Belgium', code: 'BE', flag: '🇧🇪', sample: ['VRT 1 HD', 'RTL Play', 'Tipik'] },
    { name: 'Belize', code: 'BZ', flag: '🇧🇿', sample: ['Great Belize Television'] },
    { name: 'Benin', code: 'BJ', flag: '🇧🇯', sample: ['ORTB Benin'] },
    { name: 'Bermuda', code: 'BM', flag: '🇧🇲', sample: ['ZBM TV 9'] },
    { name: 'Bhutan', code: 'BT', flag: '🇧🇹', sample: ['BBS TV Bhutan'] },
    { name: 'Bolivia', code: 'BO', flag: '🇧🇴', sample: ['Bolivision', 'Red Uno', 'Unitel HD'] },
    { name: 'Bonaire', code: 'BQ', flag: '🇧🇶', sample: ['Nos TV Bonaire'] },
    { name: 'Bosnia and Herzegovina', code: 'BA', flag: '🇧🇦', sample: ['BHT 1', 'Hayat TV', 'Face TV'] },
    { name: 'Botswana', code: 'BW', flag: '🇧🇼', sample: ['BTV Botswana'] },
    { name: 'Brazil', code: 'BR', flag: '🇧🇷', sample: ['TV Globo Premium', 'SporTV Ultra', 'RecordTV', 'Band HD'] },
    { name: 'British Virgin Islands', code: 'VG', flag: '🇻🇬', sample: ['CBN Virgin Islands'] },
    { name: 'Brunei', code: 'BN', flag: '🇧🇳', sample: ['RTB Sukmaindera'] },
    { name: 'Bulgaria', code: 'BG', flag: '🇧🇬', sample: ['BNT 1 HD', 'bTV Bulgaria', 'Nova TV'] },
    { name: 'Burkina Faso', code: 'BF', flag: '🇧🇫', sample: ['RTB Burkina'] },
    { name: 'Burundi', code: 'BI', flag: '🇧🇮', sample: ['RTNB Burundi'] },
    { name: 'Cambodia', code: 'KH', flag: '🇰🇭', sample: ['CTN Cambodia', 'Hang Meas HDTV', 'Bayon TV'] },
    { name: 'Cameroon', code: 'CM', flag: '🇨🇲', sample: ['CRTV Cameroon', 'Canal 2 International'] },
    { name: 'Canada', code: 'CA', flag: '🇨🇦', sample: ['CBC News Network', 'CTV HD', 'Global News Live', 'ICI Radio-Canada'] },
    { name: 'Cape Verde', code: 'CV', flag: '🇨🇻', sample: ['TCV Cape Verde'] },
    { name: 'Cayman Islands', code: 'KY', flag: '🇰🇾', sample: ['Cayman 27 Broadcast'] },
    { name: 'Central African Republic', code: 'CF', flag: '🇨🇫', sample: ['TV Centrafrique'] },
    { name: 'Chad', code: 'TD', flag: '🇹🇩', sample: ['Tele Tchad'] },
    { name: 'Chile', code: 'CL', flag: '🇨🇱', sample: ['TVN Chile', 'Mega HD', 'Chilevision'] },
    { name: 'China', code: 'CN', flag: '🇨🇳', sample: ['CCTV 1 Mandarin', 'CCTV News Info', 'Hunan TV'] },
    { name: 'Colombia', code: 'CO', flag: '🇨🇴', sample: ['Caracol TV Internacional', 'RCN Nuestra Tele', 'Señal Colombia'] },
    { name: 'Comoros', code: 'KM', flag: '🇰🇲', sample: ['ORTC Comoros'] },
    { name: 'Cook Islands', code: 'CK', flag: '🇨🇰', sample: ['CITV Cook Islands'] },
    { name: 'Costa Rica', code: 'CR', flag: '🇨🇷', sample: ['Teletica Canal 7', 'Repretel Canal 6', 'Multimedios CR'] },
    { name: 'Croatia', code: 'HR', flag: '🇭🇷', sample: ['HRT 1 HD', 'Nova TV Croatia', 'RTL Croatia'] },
    { name: 'Cuba', code: 'CU', flag: '🇨🇺', sample: ['Cubavision International', 'Tele Rebelde', 'Canal Caribe'] },
    { name: 'Curacao', code: 'CW', flag: '🇨🇼', sample: ['TeleCuraçao'] },
    { name: 'Cyprus', code: 'CY', flag: '🇨🇾', sample: ['RIK 1 HD', 'Sigma TV', 'Omega Cyprus'] },
    { name: 'Czech Republic', code: 'CZ', flag: '🇨🇿', sample: ['ČT1 HD', 'Nova TV Czech', 'Prima HD'] },
    { name: 'Democratic Republic of the Congo', code: 'CD', flag: '🇨🇩', sample: ['RTNC Congo', 'Digital Congo'] },
    { name: 'Denmark', code: 'DK', flag: '🇩🇰', sample: ['DR1 HD', 'TV 2 Danmark', 'DR News'] },
    { name: 'Djibouti', code: 'DJ', flag: '🇩🇯', sample: ['RTD Djibouti'] },
    { name: 'Dominica', code: 'DM', flag: '🇩🇲', sample: ['Marpin Telecom Feeds'] },
    { name: 'Dominican Republic', code: 'DO', flag: '🇩🇴', sample: ['Telemicro HD', 'Telesistema 11', 'Color Visión'] },
    { name: 'East Timor', code: 'TL', flag: '🇹🇱', sample: ['RTTL East Timor'] },
    { name: 'Ecuador', code: 'EC', flag: '🇪🇨', sample: ['Ecuavisa HD', 'Teleamazonas', 'TC Televisión'] },
    { name: 'Egypt', code: 'EG', flag: '🇪🇬', sample: ['Al Ahly TV', 'ON E HD', 'DMC Egypt'] },
    { name: 'El Salvador', code: 'SV', flag: '🇸🇻', sample: ['TCS Canal 2 HD', 'Canal 4 Deportes', 'Canal 21 Telenoticias'] },
    { name: 'Equatorial Guinea', code: 'GQ', flag: '🇬🇶', sample: ['TVGE Equatorial Guinea'] },
    { name: 'Eritrea', code: 'ER', flag: '🇪🇷', sample: ['ERISAT Live'] },
    { name: 'Estonia', code: 'EE', flag: '🇪🇪', sample: ['ERR ETV HD', 'Reporter TV'] },
    { name: 'Ethiopia', code: 'ET', flag: '🇪🇹', sample: ['EBC Ethiopia', 'Fana TV', 'Amhara TV'] },
    { name: 'Falkland Islands', code: 'FK', flag: '🇫🇰', sample: ['FITV Falklands'] },
    { name: 'Faroe Islands', code: 'FO', flag: '🇫🇴', sample: ['KVF Faroe Network'] },
    { name: 'Fiji', code: 'FJ', flag: '🇫🇯', sample: ['Fiji One Live'] },
    { name: 'Finland', code: 'FI', flag: '🇫🇮', sample: ['Yle TV1 HD', 'MTV3 Finland', 'Nelonen'] },
    { name: 'France', code: 'FR', flag: '🇫🇷', sample: ['Canal+ France', 'TF1 Full HD', 'France 24 Info', 'M6 Live'] },
    { name: 'French Guiana', code: 'GF', flag: '🇬🇫', sample: ['Guyane La 1ere'] },
    { name: 'French Polynesia', code: 'PF', flag: '🇵🇫', sample: ['Polynésie La 1ere'] },
    { name: 'Gabon', code: 'GA', flag: '🇬🇦', sample: ['Gabon Television'] },
    { name: 'Gambia', code: 'GM', flag: '🇬🇲', sample: ['GRTS Gambia'] },
    { name: 'Georgia', code: 'GE', flag: '🇬🇪', sample: ['1TV Georgia', 'Rustavi 2', 'Imedi TV'] },
    { name: 'Germany', code: 'DE', flag: '🇩🇪', sample: ['ZDF HD', 'Das Erste HD', 'RTL Deutschland', 'WELT News'] },
    { name: 'Ghana', code: 'GH', flag: '🇬🇭', sample: ['GTV Ghana', 'UTV Ghana', 'Adom TV'] },
    { name: 'Gibraltar', code: 'GI', flag: '🇬🇮', sample: ['GBC Television'] },
    { name: 'Greece', code: 'GR', flag: '🇬🇷', sample: ['ERT 1 HD', 'Mega Channel Greece', 'Alpha TV'] },
    { name: 'Greenland', code: 'GL', flag: '🇬🇱', sample: ['KNR TV Greenland'] },
    { name: 'Grenada', code: 'GD', flag: '🇬🇩', sample: ['GBN Grenada'] },
    { name: 'Guadeloupe', code: 'GP', flag: '🇬🇵', sample: ['Guadeloupe La 1ere'] },
    { name: 'Guam', code: 'GU', flag: '🇬🇺', sample: ['KUAM News'] },
    { name: 'Guatemala', code: 'GT', flag: '🇬🇹', sample: ['Canal 3 GT', 'Noti7 Guatemala', 'Guatevision'] },
    { name: 'Guinea', code: 'GN', flag: '🇬🇳', sample: ['RTG Guinea'] },
    { name: 'Guinea-Bissau', code: 'GW', flag: '🇬🇼', sample: ['TGB Guinea-Bissau'] },
    { name: 'Guyana', code: 'GY', flag: '🇬🇾', sample: ['HJTV Guyana'] },
    { name: 'Haiti', code: 'HT', flag: '🇭🇹', sample: ['RTNH Haiti'] },
    { name: 'Honduras', code: 'HN', flag: '🇭🇳', sample: ['HCH Live', 'Televicentro HN', 'Canal 11'] },
    { name: 'Hong Kong', code: 'HK', flag: '🇭🇰', sample: ['TVB Jade', 'ViuTV HD', 'RTHK TV 31'] },
    { name: 'Hungary', code: 'HU', flag: '🇭🇺', sample: ['M1 HD Info', 'RTL Hungary', 'TV2 Hungary'] },
    { name: 'Iceland', code: 'IS', flag: '🇮🇸', sample: ['RÚV HD Iceland'] },
    { name: 'India', code: 'IN', flag: '🇮🇳', sample: ['Sony TEN 1 HD', 'Star Sports India', 'Aaj Tak', 'DD National'] },
    { name: 'Indonesia', code: 'ID', flag: '🇮🇩', sample: ['RCTI Live', 'Metro TV', 'Trans TV', 'Kompas TV'] },
    { name: 'Iran', code: 'IR', flag: '🇮🇷', sample: ['IRIB TV1', 'IRINN News', 'Varzesh TV'] },
    { name: 'Iraq', code: 'IQ', flag: '🇮🇶', sample: ['Al Iraqiya', 'Kurdistan24', 'Al Sumaria'] },
    { name: 'Ireland', code: 'IE', flag: '🇮🇪', sample: ['RTÉ One HD', 'Virgin Media One', 'TG4'] },
    { name: 'Israel', code: 'IL', flag: '🇮🇱', sample: ['Kan 11 HD', 'Keshet 12', 'Reshet 13'] },
    { name: 'Italy', code: 'IT', flag: '🇮🇹', sample: ['Rai 1 HD', 'Canale 5 Italy', 'Sky TG24'] },
    { name: 'Ivory Coast', code: 'CI', flag: '🇨🇮', sample: ['RTI 1 Live'] },
    { name: 'Jamaica', code: 'JM', flag: '🇯🇲', sample: ['TVJ Jamaica'] },
    { name: 'Japan', code: 'JP', flag: '🇯🇵', sample: ['NHK World Tokyo', 'Fuji TV', 'Tokyo MX', 'TBS Japan'] },
    { name: 'Jordan', code: 'JO', flag: '🇯🇴', sample: ['Jordan TV HD', 'Roya TV'] },
    { name: 'Kazakhstan', code: 'KZ', flag: '🇰🇿', sample: ['Qazaqstan TV', 'Khabar 24'] },
    { name: 'Kenya', code: 'KE', flag: '🇰🇪', sample: ['Citizen TV Kenya', 'KTN News', 'KBC Channel 1'] },
    { name: 'Kiribati', code: 'KI', flag: '🇰🇮', sample: ['Kiribati Broadcast Feeds'] },
    { name: 'Kosovo', code: 'XK', flag: '🇽🇰', sample: ['RTK 1 Kosovo', 'Kohavision'] },
    { name: 'Kuwait', code: 'KW', flag: '🇰🇼', sample: ['Kuwait TV 1', 'Kuwait Sports'] },
    { name: 'Kyrgyzstan', code: 'KG', flag: '🇰🇬', sample: ['Ala-Too 24'] },
    { name: 'Laos', code: 'LA', flag: '🇱🇦', sample: ['LNTV Laos'] },
    { name: 'Latvia', code: 'LV', flag: '🇱🇻', sample: ['LTV1 HD Latvia'] },
    { name: 'Lebanon', code: 'LB', flag: '🇱🇧', sample: ['LBCI Lebanon', 'MTV Lebanon'] },
    { name: 'Lesotho', code: 'LS', flag: '🇱🇸', sample: ['LNBS Lesotho'] },
    { name: 'Liberia', code: 'LR', flag: '🇱🇷', sample: ['LNTV Liberia'] },
    { name: 'Libya', code: 'LY', flag: '🇱🇾', sample: ['Libya Al Ahrar'] },
    { name: 'Liechtenstein', code: 'LI', flag: '🇱🇮', sample: ['1FLTV Liechtenstein'] },
    { name: 'Lithuania', code: 'LT', flag: '🇱🇹', sample: ['LRT Televizija HD'] },
    { name: 'Luxembourg', code: 'LU', flag: '🇱🇺', sample: ['RTL Télé Lëtzebuerg'] },
    { name: 'Macao', code: 'MO', flag: '🇲🇴', sample: ['TDM Macao'] },
    { name: 'Madagascar', code: 'MG', flag: '🇲🇬', sample: ['TVM Madagascar'] },
    { name: 'Malawi', code: 'MW', flag: '🇲🇼', sample: ['MBC TV Malawi'] },
    { name: 'Malaysia', code: 'MY', flag: '🇲🇾', sample: ['Astro Awani', 'TV3 Malaysia', 'RTM TV2'] },
    { name: 'Maldives', code: 'MV', flag: '🇲🇻', sample: ['PSM TV Maldives'] },
    { name: 'Mali', code: 'ML', flag: '🇲🇱', sample: ['ORTM Mali'] },
    { name: 'Malta', code: 'MT', flag: '🇲🇹', sample: ['TVM Malta HD'] },
    { name: 'Martinique', code: 'MQ', flag: '🇲🇶', sample: ['Martinique La 1ere'] },
    { name: 'Mauritania', code: 'MR', flag: '🇲🇷', sample: ['El Mouritaniya'] },
    { name: 'Mauritius', code: 'MU', flag: '🇲🇺', sample: ['MBC Digital 1'] },
    { name: 'Mayotte', code: 'YT', flag: '🇾🇹', sample: ['Mayotte La 1ere'] },
    { name: 'Mexico', code: 'MX', flag: '🇲🇽', sample: ['TUDN Premium', 'Las Estrellas HD', 'Azteca Siete', 'Canal 5'] },
    { name: 'Micronesia', code: 'FM', flag: '🇫🇲', sample: ['FSM Local Node'] },
    { name: 'Moldova', code: 'MD', flag: '🇲🇩', sample: ['Moldova 1 HD'] },
    { name: 'Monaco', code: 'MC', flag: '🇲🇨', sample: ['Monaco Info'] },
    { name: 'Mongolia', code: 'MN', flag: '🇲🇳', sample: ['MNB Mongolia'] },
    { name: 'Montenegro', code: 'ME', flag: '🇲🇪', sample: ['RTCG 1 HD'] },
    { name: 'Montserrat', code: 'MS', flag: '🇲🇸', sample: ['ZJB Montserrat Radio/TV'] },
    { name: 'Morocco', code: 'MA', flag: '🇲🇦', sample: ['Al Aoula HD', '2M Monde'] },
    { name: 'Mozambique', code: 'MZ', flag: '🇲🇿', sample: ['TVM Moçambique'] },
    { name: 'Myanmar', code: 'MM', flag: '🇲🇲', sample: ['MRTV Live'] },
    { name: 'Namibia', code: 'NA', flag: '🇳🇦', sample: ['NBC Namibia'] },
    { name: 'Nauru', code: 'NR', flag: '🇳🇷', sample: ['Nauru Television'] },
    { name: 'Nepal', code: 'NP', flag: '🇳🇵', sample: ['Kantipur TV HD'] },
    { name: 'Netherlands', code: 'NL', flag: '🇳🇱', sample: ['NPO 1 HD', 'RTL 4 Network', 'Ziggo Sport'] },
    { name: 'New Caledonia', code: 'NC', flag: '🇳🇨', sample: ['Nouvelle-Calédonie La 1ere'] },
    { name: 'New Zealand', code: 'NZ', flag: '🇳🇿', sample: ['TVNZ 1 HD', 'Three NZ', 'Sky Sport NZ'] },
    { name: 'Nicaragua', code: 'NI', flag: '🇳🇮', sample: ['Canal 10 NI', 'Viva Nicaragua 13'] },
    { name: 'Niger', code: 'NE', flag: '🇳🇪', sample: ['Télé Sahel'] },
    { name: 'Nigeria', code: 'NG', flag: '🇳🇬', sample: ['Channels TV', 'NTA News 24', 'TVC News'] },
    { name: 'Niue', code: 'NU', flag: '🇳🇺', sample: ['BCN Niue Terminal'] },
    { name: 'North Korea', code: 'KP', flag: '🇰🇵', sample: ['KCTV Korean Central'] },
    { name: 'North Macedonia', code: 'MK', flag: '🇲🇰', sample: ['MRT 1 HD'] },
    { name: 'Northern Mariana Islands', code: 'MP', flag: '🇲🇵', sample: ['KSPN 2 News'] },
    { name: 'Norway', code: 'NO', flag: '🇳🇴', sample: ['NRK1 HD', 'TV 2 Norge', 'NRK Nyheter'] },
    { name: 'Oman', code: 'OM', flag: '🇴🇲', sample: ['Oman TV Live', 'Oman Sports'] },
    { name: 'Pakistan', code: 'PK', flag: '🇵🇰', sample: ['Geo News Live', 'ARY News', 'PTV Sports'] },
    { name: 'Palau', code: 'PW', flag: '🇵🇼', sample: ['Eco TV Palau'] },
    { name: 'Palestine', code: 'PS', flag: '🇵🇸', sample: ['Palestine Live HD'] },
    { name: 'Panama', code: 'PA', flag: '🇵🇦', sample: ['Telemetro Reporta', 'TVN Panamá'] },
    { name: 'Papua New Guinea', code: 'PG', flag: '🇵🇬', sample: ['EMTV PNG'] },
    { name: 'Paraguay', code: 'PY', flag: '🇵🇾', sample: ['SNT Paraguay', 'Telefuturo'] },
    { name: 'Peru', code: 'PE', flag: '🇵🇪', sample: ['Latina Televisión', 'América TV', 'ATV Perú'] },
    { name: 'Philippines', code: 'PH', flag: '🇵🇭', sample: ['GMA Network', 'ABS-CBN Kapamilya Channel', 'GMA News TV'] },
    { name: 'Poland', code: 'PL', flag: '🇵🇵', sample: ['TVP 1 HD', 'TVN24 Poland', 'Polsat HD'] },
    { name: 'Portugal', code: 'PT', flag: '🇵🇹', sample: ['RTP 1 HD', 'SIC Portugal', 'TVI Live'] },
    { name: 'Puerto Rico', code: 'PR', flag: '🇵🇷', sample: ['WAPA TV HD', 'Telemundo PR'] },
    { name: 'Qatar', code: 'QA', flag: '🇶🇦', sample: ['beIN Sports Premium', 'Al Kass Sports'] },
    { name: 'Republic of the Congo', code: 'CG', flag: '🇨🇬', sample: ['Télé Congo'] },
    { name: 'Romania', code: 'RO', flag: '🇷🇴', sample: ['Pro TV Romania', 'Digi24', 'Antena 1'] },
    { name: 'Russia', code: 'RU', flag: '🇷🇺', sample: ['Match TV HD', 'Russia 1', 'NTV News'] },
    { name: 'Rwanda', code: 'RW', flag: '🇷🇼', sample: ['RBA Rwanda TV'] },
    { name: 'Reunion', code: 'RE', flag: '🇷🇪', sample: ['Réunion La 1ere'] },
    { name: 'Saint Helena', code: 'SH', flag: '🇸🇭', sample: ['SAMS Radio TV Feed'] },
    { name: 'Saint Kitts and Nevis', code: 'KN', flag: '🇰🇳', sample: ['ZIZ Television'] },
    { name: 'Saint Lucia', code: 'LC', flag: '🇱🇨', sample: ['HTS Saint Lucia'] },
    { name: 'Saint Pierre and Miquelon', code: 'PM', flag: '🇵🇲', sample: ['Saint-Pierre et Miquelon La 1ere'] },
    { name: 'Saint Vincent and the Grenadines', code: 'VC', flag: '🇻🇨', sample: ['SVG TV Portal'] },
    { name: 'Samoa', code: 'WS', flag: '🇼🇸', sample: ['TV3 Samoa'] },
    { name: 'San Marino', code: 'SM', flag: '🇸🇲', sample: ['San Marino RTV'] },
    { name: 'Saudi Arabia', code: 'SA', flag: '🇸🇦', sample: ['SSC Sports HD', 'Al Arabiya Live', 'Saudi TV 1'] },
    { name: 'Senegal', code: 'SN', flag: '🇸🇳', sample: ['RTS 1 Senegal', '2sTV'] },
    { name: 'Serbia', code: 'RS', flag: '🇷🇸', sample: ['RTS 1 HD Serbia', 'Pink TV'] },
    { name: 'Seychelles', code: 'SC', flag: '🇸🇨', sample: ['SBC Seychelles'] },
    { name: 'Sierra Leone', code: 'SL', flag: '🇸🇱', sample: ['SLBC Sierra Leone'] },
    { name: 'Singapore', code: 'SG', flag: '🇸🇬', sample: ['CNA News Asia', 'Channel 5 HD'] },
    { name: 'Sint Maarten', code: 'SX', flag: '🇸🇽', sample: ['SXMTV Node'] },
    { name: 'Slovakia', code: 'SK', flag: '🇸🇰', sample: ['RTVS Jednotka HD'] },
    { name: 'Slovenia', code: 'SI', flag: '🇸🇮', sample: ['RTVSLO 1 HD'] },
    { name: 'Solomon Islands', code: 'SB', flag: '🇸🇧', sample: ['SIBC Solomon'] },
    { name: 'Somalia', code: 'SO', flag: '🇸🇴', sample: ['SNTV Somalia'] },
    { name: 'South Africa', code: 'ZA', flag: '🇿🇦', sample: ['SuperSport Grandstand', 'SABC News', 'eNCA'] },
    { name: 'South Korea', code: 'KR', flag: '🇰🇷', sample: ['KBS1 HD', 'MBC Korea', 'SBS HD', 'YTN News'] },
    { name: 'South Sudan', code: 'SS', flag: '🇸🇸', sample: ['SSBC South Sudan'] },
    { name: 'Spain', code: 'ES', flag: '🇪🇸', sample: ['La 1 HD RTVE', 'Movistar+ LaLiga', 'Antena 3'] },
    { name: 'Sri Lanka', code: 'LK', flag: '🇱🇰', sample: ['Derana TV', 'Hirustv'] },
    { name: 'Sudan', code: 'SD', flag: '🇸🇩', sample: ['Sudan TV'] },
    { name: 'Suriname', code: 'SR', flag: '🇸🇷', sample: ['STVS Suriname'] },
    { name: 'Swaziland', code: 'SZ', flag: '🇸🇿', sample: ['Swazi TV'] },
    { name: 'Sweden', code: 'SE', flag: '🇸🇪', sample: ['SVT1 HD', 'TV4 Sverige', 'SVT Nyheter'] },
    { name: 'Switzerland', code: 'CH', flag: '🇨🇭', sample: ['SRF 1 HD', 'RTS Un HD'] },
    { name: 'Syria', code: 'SY', flag: '🇸🇾', sample: ['Syrian TV Live'] },
    { name: 'Sao Tome and Principe', code: 'ST', flag: '🇸🇹', sample: ['TVS São Tomé'] },
    { name: 'Taiwan', code: 'TW', flag: '🇹🇼', sample: ['TVBS News', 'FTV HD', 'SET News'] },
    { name: 'Tajikistan', code: 'TJ', flag: '🇹🇯', sample: ['Televisiooni Tojikiston'] },
    { name: 'Tanzania', code: 'TZ', flag: '🇹🇿', sample: ['ITV Tanzania', 'TBC 1'] },
    { name: 'Thailand', code: 'TH', flag: '🇹🇭', sample: ['Thairath TV 32', 'CH7 HD Thailand'] },
    { name: 'Togo', code: 'TG', flag: '🇹🇬', sample: ['TVT Togo'] },
    { name: 'Tonga', code: 'TO', flag: '🇹🇴', sample: ['Tonga Broadcasting'] },
    { name: 'Trinidad and Tobago', code: 'TT', flag: '🇹🇹', sample: ['CNC3 Trinidad'] },
    { name: 'Tunisia', code: 'TN', flag: '🇹🇳', sample: ['Wataniya 1'] },
    { name: 'Turkiye', code: 'TR', flag: '🇹🇷', sample: ['TRT Spor HD', 'ATV Türkiye', 'A Haber'] },
    { name: 'Turkmenistan', code: 'TM', flag: '🇹🇲', sample: ['Turkmenistan TV'] },
    { name: 'Turks and Caicos Islands', code: 'TC', flag: '🇹🇨', sample: ['Pinnacle TV'] },
    { name: 'Tuvalu', code: 'TV', flag: '🇹🇻', sample: ['Tuvalu Media Feeds'] },
    { name: 'U.S. Virgin Islands', code: 'VI', flag: '🇻🇮', sample: ['WTJX Virgin Islands'] },
    { name: 'Uganda', code: 'UG', flag: '🇺🇬', sample: ['NTV Uganda', 'NBS TV'] },
    { name: 'Ukraine', code: 'UA', flag: '🇺🇦', sample: ['1+1 Marathon Live', 'ICTv Ukraine'] },
    { name: 'United Arab Emirates', code: 'AE', flag: '🇦🇪', sample: ['AD Sports 1', 'Dubai TV HD'] },
    { name: 'United Kingdom', code: 'GB', flag: '🇬🇧', sample: ['Sky Sports Event', 'BBC One London', 'Sky News UK'] },
    { name: 'United States', code: 'US', flag: '🇺🇸', sample: ['ESPN Ultra HD', 'HBO Premium East', 'Discovery Channel HD'] },
    { name: 'Uruguay', code: 'UY', flag: '🇺🇾', sample: ['Canal 10 Uruguay', 'Teledoce'] },
    { name: 'Uzbekistan', code: 'UZ', flag: '🇺🇿', sample: ['UzReport TV'] },
    { name: 'Vanuatu', code: 'VU', flag: '🇻🇺', sample: ['VBTC Vanuatu'] },
    { name: 'Vatican City', code: 'VA', flag: '🇻🇦', sample: ['Vatican Media Live'] },
    { name: 'Venezuela', code: 'VE', flag: '🇻🇪', sample: ['Telesur Live', 'Venevisión'] },
    { name: 'Vietnam', code: 'VN', flag: '🇻🇳', sample: ['VTV1 Vietnam', 'VTV3 HD'] },
    { name: 'Wallis and Futuna', code: 'WF', flag: '🇼🇫', sample: ['Wallis & Futuna La 1ere'] },
    { name: 'Western Sahara', code: 'EH', flag: '🇪🇭', sample: ['RASD TV Broadcast'] },
    { name: 'Yemen', code: 'YE', flag: '🇾🇪', sample: ['Al Yemen TV'] },
    { name: 'Zambia', code: 'ZM', flag: '🇿🇲', sample: ['ZNBC TV 1'] },
    { name: 'Zimbabwe', code: 'ZW', flag: '🇿🇼', sample: ['ZBC TV Zimbabwe'] }
  ], []);

  // Alpha Matrix Navigation Bar Array
  const alphabet = ['ALL', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'Z'];

  // Search filter and alphabet pipeline
  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLetter = selectedLetter === 'ALL' || country.name.toUpperCase().startsWith(selectedLetter);
      return matchesSearch && matchesLetter;
    });
  }, [countries, searchQuery, selectedLetter]);

  return (
    <div className="bg-[#f4f4f7] text-[#0a0a0c] dark:bg-[#060608] dark:text-[#f4f4f7] min-h-screen transition-colors duration-300 pb-1">
      
      {/* HEADER SECTION */}
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

      {/* FILTER TOOLBAR ACCORDION CONTROLLER */}
      <section className="max-w-4xl mx-auto px-6 space-y-4">
        
        {/* Search Bar Input */}
        <div className="relative group max-w-xl mx-auto">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 text-sm">🔍</span>
          <input 
            type="text" value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setSelectedLetter('ALL'); }}
            placeholder={t.searchPlaceholder}
            className="w-full bg-white dark:bg-white/[0.01] backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-xs font-bold shadow-sm focus:outline-none focus:border-violet-500/50 text-inherit transition"
          />
        </div>

        {/* Apple Style Horizontal Sliding A-Z Character Bar */}
        <div className="w-full overflow-x-auto pb-1 flex items-center justify-start md:justify-center gap-1.5 scrollbar-none px-2 mask-image">
          {alphabet.map((letter) => (
            <button
              key={letter} onClick={() => setSelectedLetter(letter)}
              className={`px-2.5 py-1.5 text-[10px] font-black rounded-lg transition cursor-pointer shrink-0 ${
                selectedLetter === letter 
                  ? 'bg-violet-600 text-white shadow-md' 
                  : 'bg-white/40 dark:bg-white/[0.01] border border-black/5 dark:border-white/5 text-gray-400 hover:text-inherit'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>

      </section>

      {/* ACCORDION COUNTRY DROPDOWN ARRAY */}
      <section className="max-w-3xl mx-auto px-6 py-6 space-y-3">
        {filteredCountries.map((country) => {
          const isOpen = expandedCountry === country.name;
          return (
            <div key={country.name} className="bg-white dark:bg-[#0c0c10] border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden shadow-xs transition duration-200">
              
              <button
                onClick={() => setExpandedCountry(isOpen ? null : country.name)}
                className="w-full flex items-center justify-between p-4 font-black text-xs cursor-pointer text-inherit transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl p-1 bg-black/5 dark:bg-white/5 rounded-lg block">{country.flag}</span>
                  <span>{country.name}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <span className="text-[9px] bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                    {t.channelsLabel}
                  </span>
                  <span className={`text-[9px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-black/5 dark:border-white/5 p-4 bg-black/[0.005] dark:bg-black/20 space-y-3 animate-fadeIn animate-duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {country.sample.map((channel, cIdx) => (
                      <div key={cIdx} className="bg-white dark:bg-[#111116] border border-black/5 dark:border-white/5 p-3 rounded-xl flex items-center justify-between shadow-xs">
                        <span className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate pr-2">{channel}</span>
                        <span className="text-[8px] font-black bg-violet-500/10 text-violet-600 dark:text-violet-400 px-1.5 py-0.5 rounded border border-violet-500/10">1080P</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-center font-black text-gray-400 dark:text-gray-500 pt-1 tracking-tight">
                    {t.mockChannelsNotice}
                  </p>
                </div>
              )}

            </div>
          );
        })}

        {filteredCountries.length === 0 && (
          <div className="text-center py-12 text-xs font-bold text-gray-400">
            No matching global registries found inside criteria.
          </div>
        )}
      </section>

      {/* FOOTER CALL TO ACTION BANNER */}
      <section className="max-w-3xl mx-auto px-6 py-8">
        <div className="relative w-full bg-gradient-to-br from-violet-600 to-blue-600 rounded-3xl p-8 text-center text-white space-y-4 shadow-xl overflow-hidden group">
          <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
          <div className="max-w-xl mx-auto space-y-3 z-10 relative">
            <h2 className="text-xl md:text-3xl font-black tracking-tight leading-none">{t.ctaTitle}</h2>
            <p className="text-[11px] text-white/80 font-medium leading-relaxed">{t.ctaSubtitle}</p>
            <div className="pt-1">
              <Link href="/pricing" className="inline-block bg-white text-gray-900 font-black text-xs uppercase tracking-widest px-6 py-3 rounded-xl shadow-md hover:scale-105 active:scale-95 transition duration-200">
                {t.ctaBtn}
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}