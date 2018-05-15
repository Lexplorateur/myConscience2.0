# myConscience2.0
## Your consciousness materialized in an application

### Application créée en Ionic3 & JAVA

Les ajouts :

* #### ionic cordova platform add android <br>
  - ajout de la plateform android pour la compatibilité <br>
  
* #### ionic cordova plugin add cordova-plugin-inappbrowser <br>
  - pour pouvoir utiliser l’authentification OAuth <br>
  - Pour ensuite, demander un ID de client OAuth 2.0 pour application web dans l’onglet des identifiants <br>

* #### npm install firebase angularfire2 --save <br>
  - créer un projet sur console.firebase.google puis clic sur "Ajouter Firebase à votre application Web" <br>
  - créer une constante comme dans mon fichier app/firebase.credencials.ts et copier le code fourni par firebase <br>
  - installation d'une dépendance pour utiliser firebase <br>
  - ne pas oublier les imports dans app.module AngularFireModule & "la constante firebase" & AngularFireDatabaseModule
  


