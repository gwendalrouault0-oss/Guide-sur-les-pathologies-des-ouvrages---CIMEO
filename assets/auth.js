// auth.js - Système d'authentification centralisé
// À placer dans le dossier assets/

// Gestion des utilisateurs et permissions
const AUTH_SYSTEM = {
  
  // Vérifier si l'utilisateur est connecté
  isLoggedIn() {
    return sessionStorage.getItem('currentUser') !== null;
  },

  // Récupérer les infos utilisateur actuel
  getCurrentUser() {
    const userData = sessionStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  },

  // Déconnexion
  logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'login.html';
  },

  // Vérifier les permissions
  hasPermission(requiredType) {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    const permissions = {
      'admin': ['admin'],
      'employee': ['admin', 'employee'],
      'client': ['admin', 'employee', 'client']
    };
    
    return permissions[requiredType]?.includes(user.type) || false;
  },

  // Rediriger selon le type d'utilisateur
  redirectToDashboard() {
    const user = this.getCurrentUser();
    if (!user) {
      window.location.href = 'login.html';
      return;
    }

    const dashboards = {
      'admin': 'dashboard-admin.html',
      'employee': 'dashboard-employee.html', 
      'client': 'dashboard-client.html'
    };

    window.location.href = dashboards[user.type] || 'index.html';
  },

  // Protéger une page
  protectPage(requiredType = null) {
    const user = this.getCurrentUser();
    
    if (!user) {
      window.location.href = 'login.html';
      return false;
    }

    if (requiredType && !this.hasPermission(requiredType)) {
      alert('Accès non autorisé pour votre niveau de compte');
      this.redirectToDashboard();
      return false;
    }

    return true;
  },

  // Créer la navigation adaptative
  createNavigation() {
    const user = this.getCurrentUser();
    if (!user) return '';

    const navItems = {
      'client': [
        { name: 'Accueil', url: 'index.html' },
        { name: 'Mes Diagnostics', url: 'mes-diagnostics.html' },
        { name: 'Nouvelle Analyse', url: 'desordres.html' },
        { name: 'Mon Profil', url: 'profil-client.html' }
      ],
      'employee': [
        { name: 'Accueil', url: 'index.html' },
        { name: 'Dashboard Employé', url: 'dashboard-employee.html' },
        { name: 'Diagnostics Clients', url: 'diagnostics-employe.html' },
        { name: 'Outils Techniques', url: 'outils-techniques.html' },
        { name: 'Analyses IA', url: 'desordres.html' }
      ],
      'admin': [
        { name: 'Accueil', url: 'index.html' },
        { name: 'Dashboard Admin', url: 'dashboard-admin.html' },
        { name: 'Gestion Utilisateurs', url: 'gestion-utilisateurs.html' },
        { name: 'Statistiques', url: 'statistiques.html' },
        { name: 'Configuration', url: 'configuration.html' },
        { name: 'Outils Techniques', url: 'outils-techniques.html' }
      ]
    };

    const userNavItems = navItems[user.type] || [];
    
    return `
      <nav class="user-navigation">
        <div class="nav-user-info">
          <span class="user-name">${user.name}</span>
          <span class="user-type">${this.getTypeLabel(user.type)}</span>
        </div>
        <ul class="nav-menu">
          ${userNavItems.map(item => `
            <li><a href="${item.url}">${item.name}</a></li>
          `).join('')}
          <li><a href="#" onclick="AUTH_SYSTEM.logout()" class="logout-link">Déconnexion</a></li>
        </ul>
      </nav>
    `;
  },

  // Libellés des types d'utilisateur
  getTypeLabel(type) {
    const labels = {
      'client': 'Client',
      'employee': 'Employé COLZA',
      'admin': 'Administrateur'
    };
    return labels[type] || type;
  },

  // Initialiser le système d'auth sur une page
  init(requiredType = null) {
    // Protéger la page si nécessaire
    if (!this.protectPage(requiredType)) {
      return false;
    }

    // Ajouter la navigation si l'utilisateur est connecté
    if (this.isLoggedIn()) {
      this.insertNavigation();
    }

    return true;
  },

  // Insérer la navigation dans la page
  insertNavigation() {
    const header = document.querySelector('.header');
    if (header && this.isLoggedIn()) {
      const nav = this.createNavigation();
      header.insertAdjacentHTML('afterend', nav);
    }
  }
};

// Initialisation automatique si pas sur la page de login
document.addEventListener('DOMContentLoaded', function() {
  // Ne pas initialiser sur la page de login
  if (!window.location.pathname.includes('login.html')) {
    // Vérifier si la page nécessite une authentification
    const authRequired = document.body.dataset.authRequired;
    const authType = document.body.dataset.authType;
    
    if (authRequired === 'true') {
      AUTH_SYSTEM.init(authType);
    } else if (AUTH_SYSTEM.isLoggedIn()) {
      // Ajouter seulement la navigation si connecté
      AUTH_SYSTEM.insertNavigation();
    }
  }
});