import property1 from '../assets/images/property1.jpg';
import property2 from '../assets/images/property2.jpg';
import property3 from '../assets/images/property3.jpg';
import property4 from '../assets/images/property4.jpg';
import property5 from '../assets/images/property5.jpg';
import property6 from '../assets/images/property6.jpg';
import exterior from '../assets/images/exterior.png'
import interior from '../assets/images/interior.png'
import heroVideo from '../assets/videos/property-hero.mp4';

const properties = [
  {
    id: 'signia-pearl',
    title: 'Signia Pearl',
    location: 'Bandra, Mumbai',
    image: property1,
    tagline: 'Perched above the Arabian Sea, this penthouse redefines coastal luxury.',
    configurationTags: ['4 BHK Penthouse', 'Sea Facing', 'Mansion'],
    bedrooms: 4,
    builtUpArea: '22,000 sq.ft',
    landArea: '1 Acre',
    price: 75,
    region: 'mumbai',
    reraVerified: true,
    media: {
   heroVideo: heroVideo,
     gallery: {
    exterior: [exterior],  // ✅ wrapped in array
    interior: [interior]   // ✅ wrapped in array
  },
      vrTour: '/vr/tour-1'
    },
    highlights: [
      { icon: 'area-chart', text: '22,000 Sq ft Built Up' },
      { icon: 'bed', text: '4 Bedrooms' },
      { icon: 'ruler', text: 'Sea Facing' }
    ],
    provenance: {
      architect: 'Prem Nath',
      interiorDesigner: 'Rohit Bal for Fendi Casa',
      developer: 'Sunteck Realty'
    },
    legal: {
      verifiedBy: 'Plateau Realty',
      reraNumber: 'PRRERA123456',
      stampDuty: 750000
    },
    virtualTourUrl: '/vr/tour-1'
  },
  {
    id: 'sea-villa-alibaug',
    title: 'Sea-Facing Villa',
    location: 'Alibaug',
    image: property2,
    bedrooms: 6,
    builtUpArea: '15,000 sq.ft',
    landArea: '1.5 Acres',
    price: 65,
    region: 'alibaug',
    reraVerified: true,
    virtualTourUrl: '#',
    media: {
      gallery: {
        exterior: [],
        interior: []
      }
    },
    highlights: [],
    provenance: {},
    legal: {}
  },
  {
    id: 'penthouse-mumbai',
    title: 'Penthouse',
    location: 'Mumbai',
    image: property3,
    bedrooms: 4,
    builtUpArea: '8,000 sq.ft',
    landArea: 'NA',
    price: 55,
    region: 'mumbai',
    reraVerified: true,
    virtualTourUrl: '#',
    media: {
      gallery: {
        exterior: [],
        interior: []
      }
    },
    highlights: [],
    provenance: {},
    legal: {}
  },
  {
    id: 'heritage-palace-udaipur',
    title: 'Heritage Palace',
    location: 'Udaipur',
    image: property4,
    bedrooms: 10,
    builtUpArea: '25,000 sq.ft',
    landArea: '5 Acres',
    price: 120,
    region: 'udaipur',
    reraVerified: true,
    virtualTourUrl: '#',
    media: {
      gallery: {
        exterior: [],
        interior: []
      }
    },
    highlights: [],
    provenance: {},
    legal: {}
  },
  {
    id: 'beachfront-mansion-goa',
    title: 'Beachfront Mansion',
    location: 'Goa',
    image: property5,
    bedrooms: 7,
    builtUpArea: '18,000 sq.ft',
    landArea: '3 Acres',
    price: 85,
    region: 'goa',
    reraVerified: true,
    virtualTourUrl: '#',
    media: {
      gallery: {
        exterior: [],
        interior: []
      }
    },
    highlights: [],
    provenance: {},
    legal: {}
  },
  {
    id: 'tech-magnate-estate-blr',
    title: 'Tech Magnate Estate',
    location: 'Bangalore',
    image: property6,
    bedrooms: 6,
    builtUpArea: '14,000 sq.ft',
    landArea: '2.5 Acres',
    price: 60,
    region: 'bangalore',
    reraVerified: true,
    virtualTourUrl: '#',
    media: {
      gallery: {
        exterior: [],
        interior: []
      }
    },
    highlights: [],
    provenance: {},
    legal: {}
  }
];

export default properties;
