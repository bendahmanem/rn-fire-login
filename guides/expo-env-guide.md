# les secrets EAS en production et variables d'environnement en développement

## 1. Configuration des variables d'environnement pour le développement

### Créez un fichier `.env` à la racine de votre projet

```
EXPO_PUBLIC_FIREBASE_API_KEY=votre_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=votre_app.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=votre_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=votre_app.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### Ajoutez le fichier `.env` à votre `.gitignore`

```
# .gitignore
node_modules/
.expo/
dist/
npm-debug.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision
*.orig.*
web-build/
.env
```

## 2. Configuration des secrets EAS pour la production

### Installez et configurez EAS CLI

```bash
npm install -g eas-cli
eas login
```

### Créez des secrets pour votre projet

```bash
eas secret:create --scope project --name FIREBASE_API_KEY --value "votre_api_key"
eas secret:create --scope project --name FIREBASE_AUTH_DOMAIN --value "votre_app.firebaseapp.com"
eas secret:create --scope project --name FIREBASE_PROJECT_ID --value "votre_project_id"
eas secret:create --scope project --name FIREBASE_STORAGE_BUCKET --value "votre_app.appspot.com"
eas secret:create --scope project --name FIREBASE_MESSAGING_SENDER_ID --value "123456789"
eas secret:create --scope project --name FIREBASE_APP_ID --value "1:123456789:web:abcdef123456"
```

## 3. Modification de votre configuration Firebase

### Installez la dépendance requise

```bash
npx expo install expo-constants
```

### Mettez à jour votre fichier de configuration Firebase

Créez ou modifiez votre fichier (par exemple `firebase.js` ou `firebaseConfig.js`):

```javascript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";

// Détection de l'environnement EAS Build
const isEasBuild = process.env.EAS_BUILD_PLATFORM !== undefined;

// Configuration Firebase
const firebaseConfig = {
  // En production (EAS Build), utilise les secrets EAS
  // En développement, utilise les variables d'environnement locales
  apiKey: isEasBuild
    ? process.env.FIREBASE_API_KEY
    : process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: isEasBuild
    ? process.env.FIREBASE_AUTH_DOMAIN
    : process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: isEasBuild
    ? process.env.FIREBASE_PROJECT_ID
    : process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: isEasBuild
    ? process.env.FIREBASE_STORAGE_BUCKET
    : process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: isEasBuild
    ? process.env.FIREBASE_MESSAGING_SENDER_ID
    : process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: isEasBuild
    ? process.env.FIREBASE_APP_ID
    : process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
```

## 4. Configuration du build EAS

### Créez un fichier `eas.json` à la racine de votre projet

```json
{
  "cli": {
    "version": ">= 3.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {}
  }
}
```

## 5. Construction de l'APK en mode preview

Lancez la commande pour construire l'APK en mode preview:

```bash
eas build --profile preview --platform android
```

## 6. Tester votre configuration

### Pour le développement local:

- Lancez votre application avec `npx expo start`
- Vérifiez que l'application utilise correctement les variables d'environnement locales

### Pour vérifier le build de production:

- Téléchargez l'APK généré par EAS Build
- Installez-le sur un appareil Android
- Vérifiez que l'application fonctionne avec les secrets EAS

## Remarques importantes

1. **Sécurité**: Même si cette approche est plus sécurisée que d'utiliser uniquement des variables EXPO*PUBLIC*, gardez à l'esprit que tout code JavaScript peut potentiellement être désassemblé. Pour une sécurité maximale, considérez d'implémenter un backend intermédiaire.

2. **Debug**: Si vous rencontrez des problèmes, utilisez `console.log` pour afficher les valeurs des variables d'environnement en développement, et ajoutez des logs dans votre application pour vérifier quelles variables sont utilisées.

3. **Environnements multiples**: Pour gérer plusieurs environnements (dev, staging, prod), vous pouvez créer différents profils dans votre fichier `eas.json` avec des secrets différents pour chaque environnement.
