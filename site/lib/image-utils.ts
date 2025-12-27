// Enhanced image utilities for better media handling with Next.js optimization
export const getImageUrl = (imageData: any, size: 'original' | 'thumbnail' | 'small' = 'original') => {
  if (!imageData) return null;

  // Handle both old format (data.attributes) and new format (direct)
  let attributes;
  if (imageData.data?.attributes) {
    // Old format: { data: { attributes: {...} } }
    attributes = imageData.data.attributes;
  } else if (imageData.url) {
    // New format: { url: ..., formats: {...} }
    attributes = imageData;
  } else {
    return null;
  }

  // If it's a full URL (external), return it directly for Next.js Image
  if (attributes.url && attributes.url.startsWith('http')) {
    return attributes.url;
  }

  // Otherwise, construct full Strapi URL for Next.js Image
  if (size === 'thumbnail' && attributes.formats?.thumbnail) {
    return `http://localhost:1337${attributes.formats.thumbnail.url}`;
  }
  if (size === 'small' && attributes.formats?.small) {
    return `http://localhost:1337${attributes.formats.small.url}`;
  }

  return `http://localhost:1337${attributes.url}`;
};

export const getImageAlt = (imageData: any, fallback: string = 'Image') => {
  // Handle both old format (data.attributes) and new format (direct)
  if (imageData?.data?.attributes) {
    return imageData.data.attributes.alternativeText || fallback;
  } else if (imageData?.alternativeText) {
    return imageData.alternativeText || fallback;
  }
  return fallback;
};

export const getImageDimensions = (imageData: any, size: 'original' | 'thumbnail' | 'small' = 'original') => {
  if (!imageData) return { width: 400, height: 300 };

  // Handle both old format (data.attributes) and new format (direct)
  let attributes;
  if (imageData.data?.attributes) {
    attributes = imageData.data.attributes;
  } else if (imageData.url) {
    attributes = imageData;
  } else {
    return { width: 400, height: 300 };
  }

  if (size === 'thumbnail' && attributes.formats?.thumbnail) {
    return {
      width: attributes.formats.thumbnail.width,
      height: attributes.formats.thumbnail.height
    };
  }
  if (size === 'small' && attributes.formats?.small) {
    return {
      width: attributes.formats.small.width,
      height: attributes.formats.small.height
    };
  }

  return {
    width: attributes.width || 400,
    height: attributes.height || 300
  };
};

// Fallback images for when no image is available
export const FALLBACK_IMAGES = {
  professor: {
    url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iOTAiIGZpbGw9IiM2NjdlZWEiLz48dGV4dCB4PSIxMDAiIHk9IjExMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UDwvdGV4dD48L3N2Zz4=',
    alt: 'Photo de profil non disponible'
  },
  stage: {
    url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjNjc3ZWVhIi8+PHRleHQgeD0iNDAwIiB5PSIzMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkRhbnNlPC90ZXh0Pjwvc3ZnPg==',
    alt: 'Image de stage non disponible'
  },
  dance: {
    url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjZjNmNGY2Ii8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM2MzY2ZjEiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNvdXJzIGRlIGRhbmdlPC90ZXh0PjxjaXJjbGUgY3g9IjQwMCIgY3k9IjQwMCIgcj0iMzAiIGZpbGw9IiM2MzY2ZjEiLz48Y2lyY2xlIGN4PSI0MDAiIGN5PSI0MDAiIHI9IjMwIiBmaWxsPSJub25lIiBzdHJva2U9IiM2MzY2ZjEiIHN0cm9rZS13aWR0aD0iMyIvPjx0ZXh0IHg9IjQwMCIgeT0iNDUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2MzY2ZjEiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkRhbnNlIGxhIFZpZTwvdGV4dD48L3N2Zz4=',
    alt: 'Image de cours de danse non disponible'
  }
};

// Chemins vers les fichiers SVG statiques
export const DANCE_IMAGES = {
  'Rock': '/dance-images/rock-course.svg',
  'Salsa': '/dance-images/salsa-course.svg',
  'Tango': '/dance-images/tango-course.svg',
  'Valse': '/dance-images/valse-course.svg',
  'Cha-cha-cha': '/dance-images/chachacha-course.svg',
  'Rumba': '/dance-images/rumba-course.svg',
  'Bachata': '/dance-images/bachata-course.svg',
  'West Coast Swing': '/dance-images/westcoastswing-course.svg',
  'Quick Step': '/dance-images/quickstep-course.svg',
  'Paso Doble': '/dance-images/pasodoble-course.svg',
  'Samba': '/dance-images/samba-course.svg',
  'Découverte danse caraïbes': '/dance-images/decouvertecaraibes-course.svg'
};