import { Equalizer, People, Settings, Storage } from '@material-ui/icons';

export const appContent = {
  tabs: {
    results: {
      title: 'Résultats',
      description: 'Consulter les résultats des équipes',
      icon: <Equalizer />,
      redirectTo: '/admin/results'
    },
    teams: {
      title: 'Équipes',
      description: "Ajout, modification et suppression d'équipe",
      icon: <People />,
      redirectTo: '/admin/teams'
    },
    settings: {
      title: 'Paramètres',
      description: 'Longueur de piscine, temps de session',
      icon: <Settings />,
      redirectTo: '/admin/settings'
    },
    logs: {
      title: 'Logs',
      description: 'Consulter les actions des jurys',
      icon: <Storage />,
      redirectTo: '/admin/logs'
    }
  }
}