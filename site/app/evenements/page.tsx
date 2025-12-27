'use client';

import { useState } from 'react';

export default function EvenementsPage() {
  const [filters, setFilters] = useState({
    region: '',
    dance: '',
    date: '',
    price: ''
  });

  const regions = [
    { code: '14', name: 'Calvados' },
    { code: '27', name: 'Eure' },
    { code: '50', name: 'Manche' },
    { code: '61', name: 'Orne' },
    { code: '76', name: 'Seine-Maritime' },
    // Départements limitrophes
    { code: '02', name: 'Aisne' },
    { code: '10', name: 'Aube' },
    { code: '28', name: 'Eure-et-Loir' },
    { code: '45', name: 'Loiret' },
    { code: '51', name: 'Marne' },
    { code: '52', name: 'Haute-Marne' },
    { code: '53', name: 'Mayenne' },
    { code: '72', name: 'Sarthe' },
    { code: '78', name: 'Yvelines' },
    { code: '91', name: 'Essonne' },
    { code: '95', name: 'Val-d\'Oise' }
  ];

  const dances = [
    'Rock',
    'Salsa',
    'Tango',
    'Valse',
    'Cha-cha-cha',
    'Rumba'
  ];

  // Mock data pour démonstration
  const mockEvents = [
    {
      id: '1',
      title: 'Soirée Rock\'n\'Roll - Rouen',
      description: 'Venez découvrir l\'énergie du rock avec nos professeurs expérimentés',
      date: '2025-03-15T21:00:00',
      location: {
        address: 'Salle des fêtes de Rouen',
        city: 'Rouen',
        department: '76'
      },
      organizer: 'Association Rock\'n\'Roll Rouen',
      dances: ['Rock'],
      price: 10,
      url: '#',
      source: 'Mock Data'
    },
    {
      id: '2',
      title: 'Atelier Salsa - Caen',
      description: 'Apprenez les bases de la salsa cubaine dans une ambiance conviviale',
      date: '2025-03-16T14:00:00',
      location: {
        address: 'Studio Danse Passion',
        city: 'Caen',
        department: '14'
      },
      organizer: 'Professeur Maria Lopez',
      dances: ['Salsa'],
      price: 0,
      url: '#',
      source: 'Mock Data'
    }
  ];

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🎭 Événements de Danse
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Découvrez tous les événements de danse en Normandie et régions limitrophes
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="text-6xl mb-2">🚧</div>
          </div>
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Fonctionnalité en développement
          </h3>
          <p className="text-blue-800">
            Le système de collecte automatique d'événements sera bientôt disponible !
            En attendant, voici un aperçu de ce qui vous attend.
          </p>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">🔍 Filtres</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Région
            </label>
            <select
              value={filters.region}
              onChange={(e) => setFilters({...filters, region: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Toutes les régions</option>
              {regions.map(region => (
                <option key={region.code} value={region.code}>
                  {region.name} ({region.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Danse
            </label>
            <select
              value={filters.dance}
              onChange={(e) => setFilters({...filters, dance: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Toutes les danses</option>
              {dances.map(dance => (
                <option key={dance} value={dance}>{dance}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={filters.date}
              onChange={(e) => setFilters({...filters, date: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prix
            </label>
            <select
              value={filters.price}
              onChange={(e) => setFilters({...filters, price: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tous les prix</option>
              <option value="free">Gratuit</option>
              <option value="paid">Payant</option>
            </select>
          </div>
        </div>
      </div>

      {/* Événements (mock data) */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">📅 Événements à venir</h2>

        {mockEvents.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 bg-gradient-to-br from-blue-500 to-purple-600 p-6 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-4xl mb-2">💃</div>
                  <div className="text-lg font-semibold">
                    {event.dances.join(', ')}
                  </div>
                </div>
              </div>

              <div className="md:w-2/3 p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {event.title}
                  </h3>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {event.location.department}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">
                  {event.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">📅</span>
                    <span>{new Date(event.date).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">📍</span>
                    <span>{event.location.address}, {event.location.city}</span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">👥</span>
                    <span>{event.organizer}</span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">
                      {event.price === 0 ? '🎁' : '💰'}
                    </span>
                    <span>{event.price === 0 ? 'Gratuit' : `${event.price}€`}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Source: {event.source}
                  </span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Voir l'événement
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section développement */}
      <div className="mt-12 bg-gray-50 rounded-lg p-8">
        <h3 className="text-2xl font-semibold mb-4">🚀 Développement en cours</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h4 className="font-semibold mb-2">Collecte automatique</h4>
            <p className="text-sm text-gray-600">
              Intégration Eventbrite, Meetup et scraping éthique
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🗺️</div>
            <h4 className="font-semibold mb-2">Carte interactive</h4>
            <p className="text-sm text-gray-600">
              Géolocalisation de tous les événements normands
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">📱</div>
            <h4 className="font-semibold mb-2">Notifications</h4>
            <p className="text-sm text-gray-600">
              Alertes pour les nouveaux événements danse
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}