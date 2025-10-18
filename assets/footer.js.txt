// footer.js - Footer Professionnel Épuré
// À placer dans le dossier assets/

document.addEventListener('DOMContentLoaded', function() {
  // Créer le footer professionnel épuré
  const footerHTML = `
    <footer class="footer-professional">
      <div class="footer-container">
        <div class="footer-main">
          
          <!-- Contact -->
          <div class="footer-contact">
            <h3 class="footer-section-title">Contact</h3>
            <div class="contact-info">
              <div class="contact-item">
                <strong>Gwendal ROUAULT</strong><br>
                <small>Apprenti Ingénieur Chargé d'Affaires</small>
              </div>
              <div class="contact-item">
                <a href="tel:0770217062">07 70 21 70 62</a>
              </div>
              <div class="contact-item">
                <a href="mailto:g.rouault@colza.fr">g.rouault@colza.fr</a>
              </div>
            </div>
          </div>

          <!-- Entreprise -->
          <div class="footer-company">
            <h3 class="footer-section-title">Entreprise</h3>
            <div class="company-logos">
              <div class="logo-badge">COLZA Normandie</div>
            </div>
            <p style="margin: 0; opacity: 0.9; line-height: 1.5;">
              Diagnostic de structures par Intelligence Artificielle
            </p>
          </div>

          <!-- Adresse -->
          <div class="footer-address">
            <h3 class="footer-section-title">Adresse</h3>
            <div style="opacity: 0.9; line-height: 1.6;">
              2 impasse des renards, lot A2<br>
              76190 Sainte-Marie-des-Champs
            </div>
          </div>

          <!-- Légal -->
          <div class="footer-legal">
            <h3 class="footer-section-title">Informations</h3>
            <ul>
              <li><a href="#mentions">Mentions légales</a></li>
              <li><a href="#confidentialite">Confidentialité</a></li>
              <li><a href="#cgv">CGV</a></li>
            </ul>
          </div>

        </div>

        <!-- Footer Bottom -->
        <div class="footer-bottom">
          <div class="footer-bottom-content">
            <div>
              <span class="footer-year">© 2024 COLZA Ingénierie Normandie</span>
            </div>
            <div>
              <small>Développé avec passion pour l'innovation technique</small>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `;

  // Remplacer l'ancien footer par le nouveau
  const oldFooter = document.querySelector('.footer');
  if (oldFooter) {
    oldFooter.outerHTML = footerHTML;
  } else {
    // Si pas d'ancien footer, l'ajouter à la fin du body
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }
});