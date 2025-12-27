const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

export interface StrapiResponse<T> {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface Professeur {
  id: number;
  documentId: string;
  nom: string;
  prenom: string;
  biographie?: string;
  specialites?: string[];
  photo?: {
    data: {
      attributes: {
        url: string;
        alternativeText?: string;
      };
    };
  };
  email?: string;
  telephone?: string;
}

export interface Stage {
  id: number;
  documentId: string;
  titre: string;
  description: string;
  date_debut: string;
  date_fin: string;
  lieu: string;
  prix: number;
  professeurs?: {
    data: Professeur[];
  };
  image?: {
    data: {
      attributes: {
        url: string;
        alternativeText?: string;
      };
    };
  };
  programme?: string;
  niveau: 'debutant' | 'intermediaire' | 'avance' | 'tous_niveaux';
}

export interface Seance {
  id: number;
  documentId: string;
  titre: string;
  description: string;
  danse?: {
    data: {
      name: string;
    };
  };
  niveau: 'debutant' | 'intermediaire' | 'avance';
  horaire: string;
  lieu: string;
  prix_mensuel: number;
  professeur?: {
    data: Professeur;
  };
  description_longue?: string;
}

export interface Page {
  id: number;
  attributes: {
    titre: string;
    slug: string;
    contenu: string;
    meta_description?: string;
    meta_title?: string;
    image_hero?: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    type_page: 'accueil' | 'stages' | 'cours' | 'contact' | 'inscription' | 'tarifs' | 'faq' | 'akto';
  };
}

export interface Page {
  id: number;
  documentId: string;
  titre: string;
  slug: string;
  contenu: string;
  meta_title?: string;
  meta_description?: string;
  categorie: string;
}

export interface Article {
  id: number;
  attributes: {
    titre: string;
    slug: string;
    contenu: string;
    resume?: string;
    image?: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    date_publication: string;
    a_la_une: boolean;
  };
}

class StrapiClient {
  private baseURL: string;
  private token?: string;

  constructor() {
    this.baseURL = STRAPI_URL;
    this.token = STRAPI_TOKEN;
  }

  private async request<T>(endpoint: string, method: string = 'GET'): Promise<StrapiResponse<T>> {
    const headers: Record<string, string> = {};

    // Only set Content-Type for non-GET requests
    if (method !== 'GET') {
      headers['Content-Type'] = 'application/json';
    }

    // Send Authorization header if we have a token
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const url = `${this.baseURL}/api${endpoint}`;

    const response = await fetch(url, {
      method,
      headers,
    });

    if (!response.ok) {
      console.error(`Strapi API error for ${url}:`, response.status, response.statusText);
      // Return empty data instead of throwing to prevent crashes
      return { data: [] as T[], meta: undefined };
    }

    return response.json();
  }

  async getProfesseurs(): Promise<StrapiResponse<Professeur>> {
    return this.request<Professeur>('/professeurs?populate=*');
  }

  async getStages(): Promise<StrapiResponse<Stage>> {
    return this.request<Stage>('/stages?populate=*');
  }

  async getStage(id: string): Promise<StrapiResponse<Stage>> {
    return this.request<Stage>(`/stages/${id}?populate=*`);
  }

  async getSeances(): Promise<StrapiResponse<Seance>> {
    return this.request<Seance>('/seances?populate=*');
  }

  async getSeance(id: number): Promise<StrapiResponse<Seance>> {
    return this.request<Seance>(`/seances/${id}?populate=*`);
  }

  async getPageBySlug(slug: string): Promise<StrapiResponse<Page>> {
    return this.request<Page>(`/pages?filters[slug][$eq]=${slug}&populate=*`);
  }

  async getPageByType(typePage: string): Promise<StrapiResponse<Page>> {
    return this.request<Page>(`/pages?filters[type_page][$eq]=${typePage}&populate=*`);
  }

  async getArticles(): Promise<StrapiResponse<Article>> {
    return this.request<Article>('/articles?populate=*&sort=date_publication:desc');
  }

  async getArticle(slug: string): Promise<StrapiResponse<Article>> {
    return this.request<Article>(`/articles?filters[slug][$eq]=${slug}&populate=*`);
  }

  async getArticlesEnUne(): Promise<StrapiResponse<Article>> {
    return this.request<Article>('/articles?filters[a_la_une][$eq]=true&populate=*&sort=date_publication:desc');
  }

  async getPages(): Promise<StrapiResponse<Page>> {
    return this.request<Page>('/pages');
  }

  async getPage(slug: string): Promise<Page | null> {
    try {
      const response = await this.request<Page>('/pages?filters[slug][$eq]=' + slug);
      return response.data[0] || null;
    } catch (error) {
      return null;
    }
  }
}

export const strapiClient = new StrapiClient();