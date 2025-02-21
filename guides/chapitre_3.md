# Layout et Design React Native

## Différences avec le Web

- Pas de HTML/CSS classique
- Flexbox par défaut
- Styles non globaux
- Unités sans dimension
- Pas de cascade CSS

## Flexbox dans React Native

### Direction par défaut

- `flexDirection: 'column'` (vs 'row' sur le web)
- Tout est Flex container par défaut

### Propriétés principales

```tsx
// Centrage complet
{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
}

// Liste horizontale
{
  flexDirection: 'row',
  alignItems: 'center'
}

// Distribution
{
  justifyContent: 'space-between'
}
```

## StyleSheet

### Création de styles

```tsx
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 16,
    color: "#000",
  },
});
```

### Avantages

- Validation à la compilation
- Autocomplétion
- Meilleure performance
- Types intégrés

## Dimensions et Responsive

### Unités

- Nombres sans unités (pas de px, rem, etc.)
- Pourcentages acceptés
- Dimensions relatives au parent

### Hooks et APIs

```tsx
// Window dimensions
import { useWindowDimensions } from "react-native";
const { width, height } = useWindowDimensions();

// Platform specific
import { Platform } from "react-native";
if (Platform.OS === "ios") {
  // code iOS
}
```

## Safe Areas et Notch

### Configuration

```tsx
import { SafeAreaView } from "react-native-safe-area-context";

function Screen() {
  return <SafeAreaView edges={["top", "bottom"]}>{/* contenu */}</SafeAreaView>;
}
```

## Shadows et Elevation

### Multi-platform

```tsx
// iOS
shadowColor: '#000',
shadowOffset: {
  width: 0,
  height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

// Android
elevation: 5,
```

## Patterns Communs

### Card Component

```tsx
interface CardProps {
  title: string;
  children: React.ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    margin: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
```

## Bonnes Pratiques

### Organisation des Styles

```tsx
const styles = StyleSheet.create({
  // Base
  container: {
    /* ... */
  },

  // États
  active: {
    /* ... */
  },
  disabled: {
    /* ... */
  },

  // Variants
  primary: {
    /* ... */
  },
  secondary: {
    /* ... */
  },
});
```

### Thème Global

```tsx
export const theme = {
  colors: {
    primary: "#007AFF",
    background: "#FFFFFF",
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
  typography: {
    header: {
      fontSize: 24,
      fontWeight: "bold",
    },
    body: {
      fontSize: 16,
    },
  },
};
```

## Points Clés à Retenir

- Tout est Flexbox
- Pas de styles globaux
- Performance critique sur mobile
- Adaptation multi-plateforme importante
- Gestion des safe areas
- Responsive design différent du web
