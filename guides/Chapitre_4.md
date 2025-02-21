# Navigation avec Expo Router (v4+)

## Introduction

### Concepts Clés

- File-system based routing
- Navigation déclarative
- Routes typées
- Navigation universelle (web/mobile)
- Performance optimisée

## Structure des Fichiers

### Organisation de base

```
app/
├── _layout.tsx      # Layout racine
├── index.tsx        # Page d'accueil
├── (tabs)/          # Group de navigation par tabs
│   ├── _layout.tsx  # Configuration des tabs
│   ├── home.tsx     # Tab home
│   ├── profile.tsx  # Tab profile
│   └── settings/    # Tab settings avec sous-routes
│       ├── _layout.tsx
│       └── index.tsx
├── modal.tsx        # Modal (hors navigation tabs)
└── +not-found.tsx   # Page 404
```

## Layouts

### Root Layout

```tsx
// app/_layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
```

### Tabs Layout

```tsx
// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

## Routes

### Route Statique

```tsx
// app/(tabs)/home.tsx
import { View, Text } from "react-native";

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Accueil</Text>
    </View>
  );
}
```

### Route Dynamique

```tsx
// app/(tabs)/profile/[id].tsx
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Profile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View>
      <Text>Profil {id}</Text>
    </View>
  );
}
```

## Navigation

### Link Component

```tsx
import { Link } from 'expo-router';

// Navigation simple
<Link href="/profile">Voir profil</Link>

// Navigation avec paramètres
<Link href="/profile/123">Profil #123</Link>

// Navigation avec params de recherche
<Link href="/search?query=test">Recherche</Link>
```

### Navigation Programmatique

```tsx
import { useRouter } from "expo-router";

export default function Navigation() {
  const router = useRouter();

  return (
    <Button onPress={() => router.push("/profile/123")} title="Voir profil" />
  );
}
```

## Modals

### Configuration Modal

```tsx
// app/modal.tsx
import { View } from "react-native";
import { Stack } from "expo-router";

export default function Modal() {
  return (
    <>
      <Stack.Screen
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <View>{/* Contenu modal */}</View>
    </>
  );
}
```

## Authentification

### Protection des Routes

```tsx
// app/_layout.tsx
import { useSession } from "./auth/session";
import { Redirect, Stack } from "expo-router";

export default function RootLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) return null;

  return <Stack>{!session && <Redirect href="/login" />}</Stack>;
}
```

## TypeScript et Navigation

### Typage des Paramètres

```tsx
// types/navigation.ts
declare global {
  type RootParamList = {
    "/profile/[id]": { id: string };
    "/search": { query?: string };
  };
}
```

### Utilisation des Types

```tsx
import { useLocalSearchParams } from "expo-router";

export default function Screen() {
  const params = useLocalSearchParams<RootParamList["/profile/[id]"]>();
  return <Text>ID: {params.id}</Text>;
}
```

## Optimisation

### Preloading

```tsx
import { prefetch } from "expo-router";

// Préchargement d'une route
prefetch("/profile/123");
```

### Deep Linking

```tsx
// app.json
{
  "expo": {
    "scheme": "myapp",
    "ios": {
      "associatedDomains": ["applinks:myapp.com"]
    }
  }
}
```

## Points Clés

- Structure basée sur les fichiers
- Navigation typée
- Support deep linking natif
- Performances optimisées
- SEO friendly (web)
- Gestion d'états de navigation
- Routing universel
