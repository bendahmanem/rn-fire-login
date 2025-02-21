# Firebase pour React Native avec Expo

## Une solution complète de backend as a service

---

# Introduction à Firebase

## Qu'est-ce que Firebase?

- Plateforme de développement d'applications mobiles et web créée par Google
- Backend as a Service (BaaS) complet
- Écosystème d'outils et services intégrés
- Solution serverless (pas de backend à gérer)
- Mise à l'échelle automatique

---

## Historique de Firebase

- Créé en 2011 en tant que startup indépendante
- Acquis par Google en 2014
- Évolution constante avec de nouvelles fonctionnalités
- Intégré à la Google Cloud Platform
- Plus de 3 millions d'applications utilisent Firebase

---

## Architecture et Fonctionnement

![Architecture Firebase](https://i.imgur.com/opW2M1c.png)

- Architecture cloud distribuée
- Synchronisation en temps réel
- Services exécutés sur l'infrastructure Google
- SDK côté client pour différentes plateformes
- APIs REST pour les intégrations personnalisées

---

## Services Firebase Principaux

- **Authentication**: Système d'authentification multi-méthodes
- **Firestore**: Base de données NoSQL en temps réel
- **Storage**: Stockage de fichiers sécurisé et évolutif
- **Cloud Functions**: Fonctions serverless
- **Hosting**: Hébergement web rapide et sécurisé
- **Analytics**: Analyse de l'utilisation des applications
- **Crashlytics**: Rapports de crash en temps réel

---

# Firebase Authentication

## Vue d'ensemble

- Système d'authentification prêt à l'emploi
- Sécurité basée sur des décennies d'expérience Google
- Conforme aux normes de l'industrie (OAuth 2.0, OpenID Connect)
- Interface utilisateur personnalisable (Firebase UI)
- Fonctionnement hors ligne avec synchronisation

---

## Méthodes d'authentification

- **Email/Password**: Classique et personnalisable
- **Fournisseurs OAuth**: Google, Facebook, Apple, Twitter, GitHub, Microsoft
- **Téléphone**: Vérification par SMS
- **Anonyme**: Pour démarrer rapidement et convertir ultérieurement
- **Custom**: Système d'authentification personnalisé avec tokens JWT

```typescript
// Exemple d'authentification par email/mot de passe
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Utilisateur connecté
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
```

---

## Fonctionnalités Auth avancées

- **Multi-facteur**: SMS, email, TOTP
- **Email verification**: Liens sécurisés automatiques
- **Password reset**: Flux de réinitialisation géré
- **Account linking**: Fusion de comptes via différentes méthodes
- **Security rules**: Contrôle d'accès fin
- **Session management**: Détection multi-appareils
- **Blocage automatique**: Protection contre attaques brute force

---

## Documentation Auth

[Documentation Firebase Authentication](https://firebase.google.com/docs/auth)

Points clés de la documentation:

- Guides par plateforme (Web, iOS, Android)
- Exemples de code pour chaque cas d'utilisation
- Meilleures pratiques de sécurité
- Dépannage et FAQ
- Limites et quotas

---

# Cloud Firestore

## Base de données moderne pour applications

- Base de données NoSQL flexible et évolutive
- Synchronisation en temps réel
- Requêtes puissantes et indexation automatique
- Support hors ligne
- Conçue pour les applications mobiles et web
- Multiplateforme (same API everywhere)

---

## Structure des données Firestore

```
collection (users) → document (user1) → collection (posts) → document (post1)
```

- **Collections**: Conteneurs de documents (ex: users, posts)
- **Documents**: Objets JSON avec ID unique
- **Sous-collections**: Collections imbriquées dans des documents
- **Références**: Pointeurs vers d'autres documents

---

## Types de données supportés

- String, Number, Boolean, Map, Array
- Null, Timestamp, Geopoint
- Reference (pour lier des documents)
- Bytes (pour données binaires)

```typescript
// Structure d'un document Firestore
{
  name: "John Doe",               // String
  age: 30,                        // Number
  isActive: true,                 // Boolean
  location: new GeoPoint(37, -122), // Geopoint
  tags: ["dev", "mobile"],        // Array
  metadata: {                     // Map
    createdAt: Timestamp.now(),   // Timestamp
    updatedBy: doc(db, "users/admin") // Reference
  }
}
```

---

## CRUD avec Firestore

```typescript
// Création
const docRef = await addDoc(collection(db, "users"), {
  name: "Ada Lovelace",
  born: 1815,
});

// Lecture
const docSnap = await getDoc(doc(db, "users", "alovelace"));

// Mise à jour
await updateDoc(doc(db, "users", "alovelace"), {
  occupation: "mathematician",
});

// Suppression
await deleteDoc(doc(db, "users", "alovelace"));
```

---

## Requêtes Firestore

- Support de filtres multiples
- Tri sur plusieurs champs
- Pagination avec curseurs
- Limites et sauts
- Requêtes composées

```typescript
const q = query(
  collection(db, "users"),
  where("state", "==", "CA"),
  where("age", ">=", 21),
  orderBy("age"),
  limit(20)
);

const querySnapshot = await getDocs(q);
```

---

## Temps réel avec Firestore

```typescript
// Écoute des changements en temps réel
const unsubscribe = onSnapshot(
  doc(db, "users", "alovelace"),
  (doc) => {
    console.log("Current data:", doc.data());
  },
  (error) => {
    console.error("Error listening:", error);
  }
);

// Pour arrêter l'écoute
unsubscribe();
```

---

## Règles de sécurité Firestore

```
service cloud.firestore {
  match /databases/{database}/documents {
    // Authentification requise pour tout
    match /{document=**} {
      allow read, write: if request.auth != null;
    }

    // Règles spécifiques par collection
    match /users/{userId} {
      // Utilisateurs peuvent lire/écrire leurs propres données
      allow read, update, delete: if request.auth.uid == userId;
      // N'importe qui peut créer un compte
      allow create: if request.auth != null;
    }
  }
}
```

---

## Optimisations et performances

- **Indexation**: Automatique et manuelle
- **Dénormalisation**: Pour requêtes efficaces
- **Transactions**: Opérations atomiques
- **Batched writes**: Mise à jour en masse
- **Sharding**: Pour les compteurs à haute fréquence
- **Query cursors**: Pagination efficace
- **Field masks**: Lecture partielle de documents

---

## Documentation Firestore

[Documentation Cloud Firestore](https://firebase.google.com/docs/firestore)

Sections essentielles:

- Structure des données
- Modèles de données
- Requêtes et filtres
- Transactions et opérations par lot
- Sécurité et règles
- Limites et quotas

---

# Firebase Storage

## Stockage de fichiers pour applications

- Stockage sécurisé pour contenu généré par les utilisateurs
- Téléchargement/téléversement robuste
- Reprise automatique après interruption
- Mise à l'échelle mondiale
- Intégration avec Firebase Auth et Security Rules
- Support multiplateforme

---

## Fonctionnalités Storage

- **Upload/Download**: Gestion des transferts
- **Métadonnées**: MIME type, taille, date, custom
- **Gestion des erreurs**: Reprise après échec
- **Compression et resize**: Automatique avec Cloud Functions
- **Sécurité granulaire**: Par fichier/dossier
- **CDN mondial**: Mise en cache automatique
- **Versioning**: Historique des fichiers (optionnel)

---

## Exemple d'utilisation Storage

```typescript
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Référence au storage
const storage = getStorage();
const storageRef = ref(storage, `images/${userId}/${filename}`);

// Upload d'un fichier
const result = await uploadBytes(storageRef, file);

// Obtenir l'URL de téléchargement
const downloadURL = await getDownloadURL(result.ref);
```

---

## Règles de sécurité Storage

```
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      // Authentification requise pour tout
      allow read, write: if request.auth != null;
    }

    match /images/{userId}/{fileName} {
      // Utilisateurs peuvent gérer leurs propres images
      allow read: if true; // Images publiques
      allow write: if request.auth.uid == userId
                   && request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

---

## Documentation Storage

[Documentation Firebase Storage](https://firebase.google.com/docs/storage)

À consulter:

- Gestion des téléchargements
- Gestion des erreurs
- Récupération des métadonnées
- Suppression et sécurité
- Intégration avec Cloud Functions
- Quotas et limites

---

# Firebase avec React Native, Expo et Expo Router

## Une combinaison puissante

---

## Pourquoi Firebase pour React Native?

- **SDK natif**: Performance optimale
- **Fonctionnement hors ligne**: Crucial pour mobile
- **API cohérente**: Web, iOS, Android
- **Solutions complètes**: Auth, DB, Storage, etc.
- **Écosystème Google**: MLKit, Analytics, etc.
- **Maintenance simplifiée**: Pas de backend custom
- **Mise à l'échelle automatique**: De 0 à millions d'utilisateurs

---

## Installation avec Expo

```bash
npx expo install firebase
npx expo install @react-native-async-storage/async-storage
npx expo install react-native-get-random-values
```

Configuration:

```typescript
// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence } from "firebase/auth/react-native";
import "react-native-get-random-values";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

export { app, auth, db, storage };
```

---

## Intégration avec Expo Router 4+

- **Architecture basée sur les fichiers**
- **Routes protégées** pour l'authentification
- **Gestion d'état partagé** entre routes
- **Paramètres de route** pour IDs Firestore
- **Deep linking** pour notifications

---

## Architecture recommandée

```
app/
├── _layout.tsx          # Firebase init + AuthProvider
├── (auth)/
│   ├── login.tsx        # Firebase Auth UI
│   ├── register.tsx     # Création de compte
│   └── _layout.tsx      # Layout auth
├── (app)/
│   ├── _layout.tsx      # TabNavigator protégé
│   ├── index.tsx        # Feed (Firestore query)
│   ├── profile.tsx      # Profil utilisateur
│   ├── [postId].tsx     # Détail post (utilise param route)
│   └── upload/
│       ├── _layout.tsx
│       └── index.tsx    # Upload image (Firebase Storage)
└── auth.tsx             # Context provider Auth
```

---

## Contexte d'authentification

```typescript
// auth.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useRouter, useSegments } from "expo-router";

const AuthContext = createContext<{
  user: User | null;
  isLoading: boolean;
}>({
  user: null,
  isLoading: true,
});

// Hook custom pour utiliser le contexte
export const useAuth = () => useContext(AuthContext);

// Provider pour gérer l'état d'authentification
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  // Protection des routes basée sur l'état d'authentification
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (user && inAuthGroup) {
      router.replace("/(app)");
    }
  }, [user, segments, isLoading]);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
```

---

## Configuration du Router avec Auth

```typescript
// app/_layout.tsx
import { Stack } from "expo-router";
import { AuthProvider } from "../auth";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </AuthProvider>
  );
}
```

---

## Route protégée avec Firestore

```typescript
// app/(app)/index.tsx
import { View, FlatList } from "react-native";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuth } from "../../auth";
import PostCard from "../../components/PostCard";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Query pour obtenir les derniers posts
    const q = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
      limit(20)
    );

    // Abonnement temps réel
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Render du feed
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={() => setLoading(true)}
      />
    </View>
  );
}
```

---

## Upload vers Firebase Storage

```typescript
// app/(app)/upload/index.tsx
import { useState } from "react";
import { View, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../../firebaseConfig";
import { useAuth } from "../../../auth";
import { useRouter } from "expo-router";

export default function UploadScreen() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) return;
    setUploading(true);

    try {
      // 1. Convertir l'URI en blob
      const response = await fetch(image);
      const blob = await response.blob();

      // 2. Créer une référence unique
      const filename = `${user.uid}_${Date.now()}.jpg`;
      const storageRef = ref(storage, `posts/${filename}`);

      // 3. Upload vers Firebase Storage
      await uploadBytes(storageRef, blob);

      // 4. Obtenir l'URL de l'image
      const downloadURL = await getDownloadURL(storageRef);

      // 5. Créer le document dans Firestore
      await addDoc(collection(db, "posts"), {
        imageUrl: downloadURL,
        caption: "",
        userId: user.uid,
        username: user.displayName || "Anonymous",
        userAvatar: user.photoURL || null,
        createdAt: serverTimestamp(),
        likes: 0,
      });

      // 6. Redirection vers le feed
      router.replace("/(app)");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image" onPress={pickImage} />
      {image && (
        <>
          <Image
            source={{ uri: image }}
            style={{ width: 300, height: 300, marginVertical: 20 }}
          />
          <Button
            title={uploading ? "Uploading..." : "Upload to Firebase"}
            onPress={uploadImage}
            disabled={uploading}
          />
        </>
      )}
    </View>
  );
}
```

---

## Avantages de Firebase avec Expo et Expo Router

- **Développement rapide**: Backend prêt à l'emploi
- **TypeScript intégré**: Types Firebase complets
- **Performance mobile**: SDK optimisé
- **Mises à jour OTA**: Compatible avec EAS Update
- **Authentification complète**: Social, email, téléphone
- **Base de données temps réel**: Idéal pour apps sociales
- **Stockage optimisé**: Pour médias d'utilisateurs
- **Écosystème complet**: Analytics, Crashlytics, etc.
- **Sécurité avancée**: Règles côté serveur

---

## Cas d'usage parfaits

- Applications sociales (Instagram-like)
- Apps de messagerie
- E-commerce mobile
- Applications collaboratives
- Apps avec contenu UGC
- MVP et prototypes rapides
- Applications événementielles
- Dashboards mobiles
- Applications IoT
- Services de livraison

---

## Limites et alternatives

**Limites:**

- Coûts à grande échelle
- Certaines contraintes de requêtes
- Écosystème fermé Google

**Alternatives à considérer:**

- Supabase (PostgreSQL, open-source)
- AppWrite (auto-hébergement possible)
- AWS Amplify (écosystème AWS)
- Parse Server (auto-hébergeable)

---

# Ressources et documentation

- [Documentation Firebase](https://firebase.google.com/docs)
- [Firebase React Native](https://firebase.google.com/docs/react-native/setup)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Native Firebase](https://rnfirebase.io/) (alternative native)
- [GitHub Firebase JS SDK](https://github.com/firebase/firebase-js-sdk)
- [Firebase Extensions](https://firebase.google.com/products/extensions)
- [Firebase YouTube Channel](https://www.youtube.com/c/firebase)

---
