// Fichier généré par scripts/generate-barometer-assets.mjs. Ne pas modifier manuellement.
export const barometer = {
  "metadata": {
    "schemaVersion": "1.0",
    "datasetVersion": "2027.1",
    "sourceDataSha256": "988167e6b351b42e0f83711a4eac9ba1da4b60277b8377f474ba8991abfbea38",
    "title": "Baromètre français des cafés fonctionnels 2027",
    "publicationDate": "2026-11-06",
    "cutoffDate": "2026-11-06",
    "site": "https://cafeadaptogene.com",
    "canonicalUrl": "https://cafeadaptogene.com/barometre-cafes-fonctionnels-2027/",
    "license": "Consultation, analyse et citation autorisées avec attribution et lien vers la page canonique.",
    "attribution": "Café Adaptogène, Baromètre français des cafés fonctionnels 2027, données arrêtées au 6 novembre 2026."
  },
  "methodology": {
    "panelCriteria": [
      "Disponibilité en France commençant par « oui ».",
      "Statut commercial commençant par « actif ».",
      "Niveau de vérification A ou B.",
      "Source officielle HTTP(S) valide."
    ],
    "priceRule": "Montants en euros directement calculables. Les fourchettes conservent leurs bornes et utilisent leur point central pour la médiane. Dollars, seuils et valeurs non calculables sont exclus des agrégats.",
    "caffeineRule": "Valeurs numériques publiques en milligrammes. Les fourchettes conservent leurs bornes et utilisent leur point central pour la médiane. Zéro milligramme reste une donnée valide.",
    "ingredientsRule": "Familles détectées depuis les champs structurés. Elles peuvent se chevaucher et leurs pourcentages ne totalisent donc pas nécessairement 100 %.",
    "transparencyRule": "Niveau de publication des dosages et informations comparables ; il ne mesure ni l’efficacité, ni le goût, ni la qualité du produit.",
    "sourceRule": "Les informations proviennent des pages officielles citées et datées. Les allégations de marque ne sont pas traitées comme des mesures indépendantes."
  },
  "stats": {
    "universeProducts": 143,
    "universeBrands": 132,
    "panelProducts": 35,
    "panelBrands": 32,
    "priceSample": 18,
    "caffeineSample": 30,
    "priceMedianEur": 1.08,
    "priceMinEur": 0.23,
    "priceMaxEur": 2.2,
    "caffeineMedianMg": 57,
    "transparencySample": 35
  },
  "findings": [
    "Le prix médian observé est de 1,08 € par portion parmi les prix en euros comparables (n=18).",
    "La caféine médiane publiée est de 57 mg par portion parmi les références chiffrées (n=30).",
    "Champignons est la famille la plus fréquente du panel avec 16 références ; les familles peuvent se chevaucher (n=35).",
    "17 références présentent une transparence de dosage élevée, soit 48,6 % du panel (n=35)."
  ],
  "series": {
    "prices": {
      "sampleSize": 18,
      "items": [
        {
          "id": "lupi-coffee-cafe-de-lupin-bio",
          "brand": "Lupi Coffee",
          "product": "Café de lupin bio",
          "raw": "environ 0,23 € / portion annoncé",
          "min": 0.23,
          "max": 0.23,
          "midpoint": 0.23,
          "currency": "EUR"
        },
        {
          "id": "arsene-arsene-classique",
          "brand": "Arsène",
          "product": "Arsène Classique",
          "raw": "environ 0,32 € / portion annoncé",
          "min": 0.32,
          "max": 0.32,
          "midpoint": 0.32,
          "currency": "EUR"
        },
        {
          "id": "sunday-natural-noble-strong-mushroom-coffee",
          "brand": "Sunday Natural",
          "product": "Noble Strong Mushroom Coffee",
          "raw": "environ 0,68 € / portion",
          "min": 0.68,
          "max": 0.68,
          "midpoint": 0.68,
          "currency": "EUR"
        },
        {
          "id": "corial-cafe-collagene-vitamine-c-cacao",
          "brand": "Corial",
          "product": "Café Collagène + Vitamine C - Cacao",
          "raw": "environ 0,73 € / portion",
          "min": 0.73,
          "max": 0.73,
          "midpoint": 0.73,
          "currency": "EUR"
        },
        {
          "id": "sunday-natural-cafe-proteine-cannelle",
          "brand": "Sunday Natural",
          "product": "Café Protéiné Cannelle",
          "raw": "environ 0,87 € / portion",
          "min": 0.87,
          "max": 0.87,
          "midpoint": 0.87,
          "currency": "EUR"
        },
        {
          "id": "sunday-natural-proteine-coffee-signature-roast",
          "brand": "Sunday Natural",
          "product": "Protéine Coffee Signature Roast",
          "raw": "0,88 € / portion annoncé",
          "min": 0.88,
          "max": 0.88,
          "midpoint": 0.88,
          "currency": "EUR"
        },
        {
          "id": "magic-lab-magic-coffee",
          "brand": "Magic Lab",
          "product": "Magic Coffee",
          "raw": "1 € / portion",
          "min": 1,
          "max": 1,
          "midpoint": 1,
          "currency": "EUR"
        },
        {
          "id": "wake-wake-original",
          "brand": "Wake",
          "product": "Wake Original",
          "raw": "environ 1 € / portion",
          "min": 1,
          "max": 1,
          "midpoint": 1,
          "currency": "EUR"
        },
        {
          "id": "mousse-mousse-cafe-adaptogene",
          "brand": "Mousse",
          "product": "Mousse Café Adaptogène",
          "raw": "environ 0,90–1,20 € / portion",
          "min": 0.9,
          "max": 1.2,
          "midpoint": 1.05,
          "currency": "EUR"
        },
        {
          "id": "brainstoorm-mush-n-go-brainstoorm-coffee",
          "brand": "Brainstoorm / Mush n Go",
          "product": "Brainstoorm Coffee",
          "raw": "0,78–1,42 € / portion selon quantité et achat",
          "min": 0.78,
          "max": 1.42,
          "midpoint": 1.1,
          "currency": "EUR"
        },
        {
          "id": "bonjour-super-cafe",
          "brand": "Bonjour",
          "product": "Super Café",
          "raw": "0,76–1,49 € / portion",
          "min": 0.76,
          "max": 1.49,
          "midpoint": 1.125,
          "currency": "EUR"
        },
        {
          "id": "french-mush-boost-cafe",
          "brand": "French Mush",
          "product": "BOOST Café",
          "raw": "0.88–1.50 € / portion",
          "min": 0.88,
          "max": 1.5,
          "midpoint": 1.19,
          "currency": "EUR"
        },
        {
          "id": "myco-zen-boisson-adaptogene-saveur-cafe",
          "brand": "Myco Zen",
          "product": "Boisson Adaptogène Saveur Café",
          "raw": "1,30 € / portion",
          "min": 1.3,
          "max": 1.3,
          "midpoint": 1.3,
          "currency": "EUR"
        },
        {
          "id": "cafit-cafe-proteine",
          "brand": "Cafit",
          "product": "Café Protéiné",
          "raw": "1.33 € / portion",
          "min": 1.33,
          "max": 1.33,
          "midpoint": 1.33,
          "currency": "EUR"
        },
        {
          "id": "strate-cafe-adaptogene",
          "brand": "Strate",
          "product": "Café adaptogène",
          "raw": "1.10–1.63 € / portion",
          "min": 1.1,
          "max": 1.63,
          "midpoint": 1.365,
          "currency": "EUR"
        },
        {
          "id": "smart-coffee-eu-functional-coffee",
          "brand": "Smart Coffee EU",
          "product": "Functional Coffee",
          "raw": "1,50–1,52 € / portion",
          "min": 1.5,
          "max": 1.52,
          "midpoint": 1.51,
          "currency": "EUR"
        },
        {
          "id": "myprotein-protein-iced-coffee",
          "brand": "Myprotein",
          "product": "Protein Iced Coffee",
          "raw": "environ 1,65 € promotionnel; 2,20 € prix de référence",
          "min": 1.65,
          "max": 2.2,
          "midpoint": 1.925,
          "currency": "EUR"
        },
        {
          "id": "try-kinoko-cafe-proteine",
          "brand": "Try Kinoko",
          "product": "Café Protéiné",
          "raw": "environ 2,00 € à l’achat unitaire",
          "min": 2,
          "max": 2,
          "midpoint": 2,
          "currency": "EUR"
        }
      ]
    },
    "caffeine": {
      "sampleSize": 30,
      "items": [
        {
          "label": "Sans caféine",
          "count": 6,
          "percentage": 20
        },
        {
          "label": "Faible (≤ 50 mg)",
          "count": 8,
          "percentage": 26.7
        },
        {
          "label": "Modérée (51–100 mg)",
          "count": 13,
          "percentage": 43.3
        },
        {
          "label": "Élevée (> 100 mg)",
          "count": 3,
          "percentage": 10
        }
      ]
    },
    "ingredients": {
      "sampleSize": 35,
      "overlapping": true,
      "items": [
        {
          "label": "Champignons",
          "count": 16,
          "percentage": 45.7
        },
        {
          "label": "Plantes / nootropiques",
          "count": 9,
          "percentage": 25.7
        },
        {
          "label": "Protéines",
          "count": 10,
          "percentage": 28.6
        },
        {
          "label": "Collagène",
          "count": 5,
          "percentage": 14.3
        },
        {
          "label": "MCT",
          "count": 3,
          "percentage": 8.6
        },
        {
          "label": "Alternative torréfiée / sans café",
          "count": 8,
          "percentage": 22.9
        }
      ]
    },
    "transparency": {
      "sampleSize": 35,
      "items": [
        {
          "label": "Élevée",
          "count": 17,
          "percentage": 48.6
        },
        {
          "label": "Partielle",
          "count": 18,
          "percentage": 51.4
        }
      ]
    }
  },
  "panel": [
    {
      "id": "bonjour-super-cafe",
      "brand": "Bonjour",
      "product": "Super Café",
      "category": "Alternative multi-actifs",
      "rawPricePerServing": "0,76–1,49 € / portion",
      "price": {
        "min": 0.76,
        "max": 1.49,
        "midpoint": 1.125,
        "currency": "EUR"
      },
      "rawCaffeine": "35 mg",
      "caffeine": {
        "min": 35,
        "max": 35,
        "midpoint": 35,
        "unit": "mg"
      },
      "caffeineBand": "Faible (≤ 50 mg)",
      "publicCaveat": "",
      "transparency": "Partielle",
      "ingredientFamilies": [
        "Champignons",
        "Plantes / nootropiques",
        "Alternative torréfiée / sans café"
      ],
      "laboratoryEvidence": "Non publiée",
      "source": "https://bonjourdrink.co/",
      "lastVerified": "2026-08-01"
    },
    {
      "id": "wake-wake-original",
      "brand": "Wake",
      "product": "Wake Original",
      "category": "Café collagène et champignons",
      "rawPricePerServing": "environ 1 € / portion",
      "price": {
        "min": 1,
        "max": 1,
        "midpoint": 1,
        "currency": "EUR"
      },
      "rawCaffeine": "5 mg",
      "caffeine": {
        "min": 5,
        "max": 5,
        "midpoint": 5,
        "unit": "mg"
      },
      "caffeineBand": "Faible (≤ 50 mg)",
      "publicCaveat": "",
      "transparency": "Élevée",
      "ingredientFamilies": [
        "Champignons",
        "Collagène"
      ],
      "laboratoryEvidence": "Non publiée",
      "source": "https://getyourwake.com/pages/page-produit-2",
      "lastVerified": "2026-09-08"
    },
    {
      "id": "brainstoorm-mush-n-go-brainstoorm-coffee",
      "brand": "Brainstoorm / Mush n Go",
      "product": "Brainstoorm Coffee",
      "category": "Café aux champignons et plantes",
      "rawPricePerServing": "0,78–1,42 € / portion selon quantité et achat",
      "price": {
        "min": 0.78,
        "max": 1.42,
        "midpoint": 1.1,
        "currency": "EUR"
      },
      "rawCaffeine": "20 mg",
      "caffeine": {
        "min": 20,
        "max": 20,
        "midpoint": 20,
        "unit": "mg"
      },
      "caffeineBand": "Faible (≤ 50 mg)",
      "publicCaveat": "",
      "transparency": "Élevée",
      "ingredientFamilies": [
        "Champignons",
        "Plantes / nootropiques"
      ],
      "laboratoryEvidence": "Non publiée",
      "source": "https://mushngo.com/products/brainstoorm-coffee",
      "lastVerified": "2026-09-08"
    },
    {
      "id": "french-mush-boost-cafe",
      "brand": "French Mush",
      "product": "BOOST Café",
      "category": "Café aux champignons",
      "rawPricePerServing": "0.88–1.50 € / portion",
      "price": {
        "min": 0.88,
        "max": 1.5,
        "midpoint": 1.19,
        "currency": "EUR"
      },
      "rawCaffeine": "49 mg",
      "caffeine": {
        "min": 49,
        "max": 49,
        "midpoint": 49,
        "unit": "mg"
      },
      "caffeineBand": "Faible (≤ 50 mg)",
      "publicCaveat": "",
      "transparency": "Partielle",
      "ingredientFamilies": [
        "Champignons"
      ],
      "laboratoryEvidence": "Non publiée",
      "source": "https://frenchmush.com/",
      "lastVerified": "2026-08-01"
    },
    {
      "id": "strate-cafe-adaptogene",
      "brand": "Strate",
      "product": "Café adaptogène",
      "category": "Café aux champignons",
      "rawPricePerServing": "1.10–1.63 € / portion",
      "price": {
        "min": 1.1,
        "max": 1.63,
        "midpoint": 1.365,
        "currency": "EUR"
      },
      "rawCaffeine": "48 mg",
      "caffeine": {
        "min": 48,
        "max": 48,
        "midpoint": 48,
        "unit": "mg"
      },
      "caffeineBand": "Faible (≤ 50 mg)",
      "publicCaveat": "",
      "transparency": "Partielle",
      "ingredientFamilies": [
        "Champignons"
      ],
      "laboratoryEvidence": "Non publiée",
      "source": "https://stratecafe.com/products/cafe-champignons",
      "lastVerified": "2026-08-01"
    },
    {
      "id": "cafit-cafe-proteine",
      "brand": "Cafit",
      "product": "Café Protéiné",
      "category": "Café protéiné",
      "rawPricePerServing": "1.33 € / portion",
      "price": {
        "min": 1.33,
        "max": 1.33,
        "midpoint": 1.33,
        "currency": "EUR"
      },
      "rawCaffeine": "80 mg pour 18 g",
      "caffeine": {
        "min": 80,
        "max": 80,
        "midpoint": 80,
        "unit": "mg"
      },
      "caffeineBand": "Modérée (51–100 mg)",
      "publicCaveat": "",
      "transparency": "Élevée",
      "ingredientFamilies": [
        "Protéines"
      ],
      "laboratoryEvidence": "Non publiée",
      "source": "https://cafitdrink.com/",
      "lastVerified": "2026-08-01"
    },
    {
      "id": "magic-lab-magic-coffee",
      "brand": "Magic Lab",
      "product": "Magic Coffee",
      "category": "Alternative aux champignons sans caféine",
      "rawPricePerServing": "1 € / portion",
      "price": {
        "min": 1,
        "max": 1,
        "midpoint": 1,
        "currency": "EUR"
      },
      "rawCaffeine": "0 mg",
      "caffeine": {
        "min": 0,
        "max": 0,
        "midpoint": 0,
        "unit": "mg"
      },
      "caffeineBand": "Sans caféine",
      "publicCaveat": "",
      "transparency": "Élevée",
      "ingredientFamilies": [
        "Champignons",
        "Alternative torréfiée / sans café"
      ],
      "laboratoryEvidence": "Non publiée",
      "source": "https://www.drinkmagiclab.com/products/magic-coffee-cafe-complement-aux-champignons-adaptognes",
      "lastVerified": "2026-08-01"
    },
    {
      "id": "mousse-mousse-cafe-adaptogene",
      "brand": "Mousse",
      "product": "Mousse Café Adaptogène",
      "category": "Café aux plantes et nootropiques",
      "rawPricePerServing": "environ 0,90–1,20 € / portion",
      "price": {
        "min": 0.9,
        "max": 1.2,
        "midpoint": 1.05,
        "currency": "EUR"
      },
      "rawCaffeine": "35 à 48 mg selon les pages officielles",
      "caffeine": {
        "min": 35,
        "max": 48,
        "midpoint": 41.5,
        "unit": "mg"
      },
      "caffeineBand": "Faible (≤ 50 mg)",
      "publicCaveat": "",
      "transparency": "Élevée",
      "ingredientFamilies": [
        "Plantes / nootropiques"
      ],
      "laboratoryEvidence": "Non publiée",
      "source": "https://moussecafe.fr/",
      "lastVerified": "2026-09-08"
    },
    {
      "id": "proffee-cafe-instantane-proteine",
      "brand": "Proffee",
      "product": "Café instantané protéiné",
      "category": "Café protéiné",
      "rawPricePerServing": "non calculable avec les données publiques",
      "price": null,
      "rawCaffeine": "90,5 mg",
      "caffeine": {
        "min": 90.5,
        "max": 90.5,
        "midpoint": 90.5,
        "unit": "mg"
      },
      "caffeineBand": "Modérée (51–100 mg)",
      "publicCaveat": "",
      "transparency": "Partielle",
      "ingredientFamilies": [
        "Protéines"
      ],
      "laboratoryEvidence": "Non publiée",
      "source": "https://www.proffee.fr/products/cafe-instantane-proteine-gene",
      "lastVerified": "2026-08-01"
    },
    {
      "id": "naturecan-protein-coffee",
      "brand": "Naturecan",
      "product": "Protein Coffee",
      "category": "Café protéiné",
      "rawPricePerServing": "non calculable avec les données publiques",
      "price": null,
      "rawCaffeine": "80 mg",
      "caffeine": {
        "min": 80,
        "max": 80,
        "midpoint": 80,
        "unit": "mg"
      },
      "caffeineBand": "Modérée (51–100 mg)",
      "publicCaveat": "",
      "transparency": "Partielle",
      "ingredientFamilies": [
        "Protéines"
      ],
      "laboratoryEvidence": "Non publiée",
      "source": "https://www.naturecan.fr/products/cafe-proteine",
      "lastVerified": "2026-08-01"
    },
    {
      "id": "corial-collagen-coffee-original",
      "brand": "Corial",
      "product": "Collagen Coffee Original",
      "category": "Café collagène",
      "rawPricePerServing": "1,00 $ / portion",
      "price": null,
      "rawCaffeine": "68 mg",
      "caffeine": {
        "min": 68,
        "max": 68,
        "midpoint": 68,
        "unit": "mg"
      },
      "caffeineBand": "Modérée (51–100 mg)",
      "publicCaveat": "",
      "transparency": "Élevée",
      "ingredientFamilies": [
        "Collagène"
      ],
      "laboratoryEvidence": "Non publiée",
      "source": "https://corialfoods.com/en-us/products/collagen-coffee-original",
      "lastVerified": "2026-08-01"
    },
    {
      "id": "clearly-mushroom-coffee",
      "brand": "Clearly",
      "product": "Mushroom Coffee",
      "category": "Café aux champignons et plantes",
      "rawPricePerServing": "non calculable avec les données publiques",
      "price": null,
      "rawCaffeine": "environ 45 mg; version décaféinée aussi",
      "caffeine": {
        "min": 45,
        "max": 45,
        "midpoint": 45,
        "unit": "mg"
      },
      "caffeineBand": "Faible (≤ 50 mg)",
      "publicCaveat": "",
      "transparency": "Partielle",
      "ingredientFamilies": [
        "Champignons",
        "Plantes / nootropiques"
      ],
      "laboratoryEvidence": "Non publiée",
      "source": "https://clearly.nl/en/products/mushroom-coffee",
      "lastVerified": "2026-08-01"
    },
    {
      "id": "earthshake-functional-coffee",
      "brand": "Earthshake",
      "product": "Functional Coffee",
      "category": "Café aux champignons et plantes",
      "rawPricePerServing": "non calculable avec les données publiques",
      "price": null,
      "rawCaffeine": "59 mg grande; 29,5 mg petite",
      "caffeine": {
        "min": 29.5,
        "max": 59,
        "midpoint": 44.25,
        "unit": "mg"
      },
      "caffeineBand": "Modérée (51–100 mg)",
      "publicCaveat": "La page affirme aussi 'sans caféine' à certains endroits malgré les valeurs 29,5/59 mg: incohérence éditoriale.",
      "transparency": "Élevée",
      "ingredientFamilies": [
        "Champignons",
        "Plantes / nootropiques"
      ],
      "laboratoryEvidence": "Non publiée",
      "source": "https://www.earthshake.co/products/readybrew",
      "lastVerified": "2026-08-01"
    },
    {
      "id": "adapcoffee-happy-detox-tea-clarity-cup",
      "brand": "AdapCoffee / Happy Detox Tea",
      "product": "Clarity Cup",
      "category": "Hybride café-chicorée aux champignons",
      "rawPricePerServing": "non calculable avec les données publiques",
      "price": null,
      "rawCaffeine": "non publié",
      "caffeine": null,
      "caffeineBand": null,
      "publicCaveat": "",
      "transparency": "Partielle",
      "ingredientFamilies": [
        "Champignons",
        "Alternative torréfiée / sans café"
      ],
      "laboratoryEvidence": "Non publiée",
      "source": "https://happydetoxtea.de/products/clarity-cup-mushroom-coffee-blend",
      "lastVerified": "2026-08-01"
    },
    {
      "id": "four-sigmatic-focus-organic-coffee-latte-think-coffee",
      "brand": "Four Sigmatic",
      "product": "Focus Organic Coffee Latte / Think Coffee",
      "category": "Café aux champignons",
      "rawPricePerServing": "non calculable avec les données publiques",
      "price": null,
      "rawCaffeine": "50 mg instant; 105–125 mg cold brew moulu",
      "caffeine": {
        "min": 50,
        "max": 125,
        "midpoint": 87.5,
        "unit": "mg"
      },
      "caffeineBand": "Élevée (> 100 mg)",
      "publicCaveat": "",
      "transparency": "Partielle",
      "ingredientFamilies": [
        "Champignons"
      ],
      "laboratoryEvidence": "Non publiée",
      "source": "https://us.foursigmatic.com/products/focus-organic-coffee-latte-original",
      "lastVerified": "2026-08-01"
    },
    {
      "id": "alchemy-dose-mycosynergy-mushroom-coffee",
      "brand": "Alchemy Dose",
      "product": "MycoSynergy Mushroom Coffee",
      "category": "Café aux champignons et L-théanine",
      "rawPricePerServing": "non calculable avec les données publiques",
      "price": null,
      "rawCaffeine": "environ 50–60 mg dans la FAQ; autre texte 60–80 mg",
      "caffeine": {
        "min": 50,
        "max": 80,
        "midpoint": 65,
        "unit": "mg"
      },
      "caffeineBand": "Modérée (51–100 mg)",
      "publicCaveat": "Corps fructifères 8:1 double extraction; excellente transparence mais incohérence interne sur la caféine.",
      "transparency": "Élevée",
      "ingredientFamilies": [
        "Champignons",
        "Plantes / nootropiques"
      ],
      "laboratoryEvidence": "Non publiée",
      "source": "https://alchemydose.com/products/super-shroom-coffee",
      "lastVerified": "2026-08-01"
    },
    {
      "id": "fungu-fungu-chocolate-flavor",
      "brand": "Fungu",
      "product": "Fungu Chocolate Flavor",
      "category": "Café aux champignons, plantes et cacao",
      "rawPricePerServing": "non calculable avec les données publiques",
      "price": null,
      "rawCaffeine": "45 mg",
      "caffeine": {
        "min": 45,
        "max": 45,
        "midpoint": 45,
        "unit": "mg"
      },
      "caffeineBand": "Faible (≤ 50 mg)",
      "publicCaveat": "",
      "transparency": "Élevée",
      "ingredientFamilies": [
        "Champignons",
        "Plantes / nootropiques"
      ],
      "laboratoryEvidence": "Non publiée",
      "source": "https://fungu.es/producto/fungu/",
      "lastVerified": "2026-08-01"
    },
    {
      "id": "nu3-focus-mushroom-coffee",
      "brand": "nu3",
      "product": "Focus Mushroom Coffee",
      "category": "Café aux champignons, maca et micronutriments",
      "rawPricePerServing": "non calculable avec les données publiques",
      "price": null,
      "rawCaffeine": "162 mg",
      "caffeine": {
        "min": 162,
        "max": 162,
        "midpoint": 162,
        "unit": "mg"
      },
      "caffeineBand": "Élevée (> 100 mg)",
      "publicCaveat": "",
      "transparency": "Élevée",
      "ingredientFamilies": [
        "Champignons",
        "Plantes / nootropiques"
      ],
      "laboratoryEvidence": "Non publiée",
      "source": "https://www.nu3.fr/products/nu3-focus-mushroom-coffee",
      "lastVerified": "2026-09-08"
    },
    {
      "id": "rahygge-reishi-mushroom-coffee",
      "brand": "RåHygge",
      "product": "Reishi Mushroom Coffee",
      "category": "Café aux champignons infusé",
      "rawPricePerServing": "non calculable avec les données publiques",
      "price": null,
      "rawCaffeine": "non publiée",
      "caffeine": null,
      "caffeineBand": null,
      "publicCaveat": "",
      "transparency": "Partielle",
      "ingredientFamilies": [
        "Champignons"
      ],
      "laboratoryEvidence": "Non publiée",
      "source": "https://www.rahygge.nl/",
      "lastVerified": "2026-08-01"
    },
    {
      "id": "herbalife-high-protein-iced-coffee",
      "brand": "Herbalife",
      "product": "High Protein Iced Coffee",
      "category": "Café protéiné",
      "rawPricePerServing": "non calculable avec les données publiques",
      "price": null,
      "rawCaffeine": "80 mg",
      "caffeine": {
        "min": 80,
        "max": 80,
        "midpoint": 80,
        "unit": "mg"
      },
      "caffeineBand": "Modérée (51–100 mg)",
      "publicCaveat": "",
      "transparency": "Élevée",
      "ingredientFamilies": [
        "Protéines"
      ],
      "laboratoryEvidence": "Document consultable",
      "source": "https://www.herbalife.com/assets/regional-reusable-assets/workflow/fusion/pdp/product-label-pdf/en-gb/pl-pdf-gb-012k.pdf",
      "lastVerified": "2026-08-01"
    },
    {
      "id": "smart-coffee-eu-functional-coffee",
      "brand": "Smart Coffee EU",
      "product": "Functional Coffee",
      "category": "Café collagène tout-en-un",
      "rawPricePerServing": "1,50–1,52 € / portion",
      "price": {
        "min": 1.5,
        "max": 1.52,
        "midpoint": 1.51,
        "currency": "EUR"
      },
      "rawCaffeine": "environ 80 mg",
      "caffeine": {
        "min": 80,
        "max": 80,
        "midpoint": 80,
        "unit": "mg"
      },
      "caffeineBand": "Modérée (51–100 mg)",
      "publicCaveat": "",
      "transparency": "Partielle",
      "ingredientFamilies": [
        "Plantes / nootropiques",
        "Collagène",
        "MCT"
      ],
      "laboratoryEvidence": "Analyse annoncée, document non archivé",
      "source": "https://smartcoffeeeu.com/",
      "lastVerified": "2026-08-01"
    },
    {
      "id": "bulk-whey-protein-coffee",
      "brand": "Bulk",
      "product": "Whey Protein Coffee",
      "category": "Café protéiné",
      "rawPricePerServing": "non calculable avec les données publiques",
      "price": null,
      "rawCaffeine": "non publiée",
      "caffeine": null,
      "caffeineBand": null,
      "publicCaveat": "",
      "transparency": "Partielle",
      "ingredientFamilies": [
        "Protéines"
      ],
      "laboratoryEvidence": "Non publiée",
      "source": "https://www.bulk.com/fr/products/cafe-proteine-whey/bpb-pico",
      "lastVerified": "2026-08-01"
    },
    {
      "id": "physalis-collagen-coffee",
      "brand": "Physalis",
      "product": "Collagen Coffee",
      "category": "Café collagène et MCT",
      "rawPricePerServing": "non calculable avec les données publiques",
      "price": null,
      "rawCaffeine": "non publiée",
      "caffeine": null,
      "caffeineBand": null,
      "publicCaveat": "",
      "transparency": "Partielle",
      "ingredientFamilies": [
        "Collagène",
        "MCT"
      ],
      "laboratoryEvidence": "Non publiée",
      "source": "https://www.physalishealth.com/fr/complements-alimentaires/cheveux-peau-ongles-yeux/collagen-coffee/",
      "lastVerified": "2026-08-01"
    },
    {
      "id": "sunday-natural-cafe-proteine-cannelle",
      "brand": "Sunday Natural",
      "product": "Café Protéiné Cannelle",
      "category": "Café protéiné végétal",
      "rawPricePerServing": "environ 0,87 € / portion",
      "price": {
        "min": 0.87,
        "max": 0.87,
        "midpoint": 0.87,
        "currency": "EUR"
      },
      "rawCaffeine": "87 mg",
      "caffeine": {
        "min": 87,
        "max": 87,
        "midpoint": 87,
        "unit": "mg"
      },
      "caffeineBand": "Modérée (51–100 mg)",
      "publicCaveat": "",
      "transparency": "Élevée",
      "ingredientFamilies": [
        "Protéines"
      ],
      "laboratoryEvidence": "Analyse annoncée, document non archivé",
      "source": "https://www.sunday.fr/protein-coffee-cannelle.html",
      "lastVerified": "2026-09-08"
    },
    {
      "id": "sunday-natural-noble-strong-mushroom-coffee",
      "brand": "Sunday Natural",
      "product": "Noble Strong Mushroom Coffee",
      "category": "Café vert aux champignons",
      "rawPricePerServing": "environ 0,68 € / portion",
      "price": {
        "min": 0.68,
        "max": 0.68,
        "midpoint": 0.68,
        "currency": "EUR"
      },
      "rawCaffeine": "120 mg",
      "caffeine": {
        "min": 120,
        "max": 120,
        "midpoint": 120,
        "unit": "mg"
      },
      "caffeineBand": "Élevée (> 100 mg)",
      "publicCaveat": "Dosage de chaque champignon publié. Caféine élevée. La page contient une mention contradictoire 'sans caféine' malgré 120 mg affichés; la valeur quantitative est retenue.",
      "transparency": "Élevée",
      "ingredientFamilies": [
        "Champignons"
      ],
      "laboratoryEvidence": "Document consultable",
      "source": "https://www.sunday.fr/mushroom-coffee-noble-strong.html",
      "lastVerified": "2026-09-08"
    },
    {
      "id": "myco-zen-boisson-adaptogene-saveur-cafe",
      "brand": "Myco Zen",
      "product": "Boisson Adaptogène Saveur Café",
      "category": "Café aux champignons",
      "rawPricePerServing": "1,30 € / portion",
      "price": {
        "min": 1.3,
        "max": 1.3,
        "midpoint": 1.3,
        "currency": "EUR"
      },
      "rawCaffeine": "annoncée environ 50 % inférieure à un café classique; valeur non publiée",
      "caffeine": null,
      "caffeineBand": null,
      "publicCaveat": "",
      "transparency": "Partielle",
      "ingredientFamilies": [
        "Champignons"
      ],
      "laboratoryEvidence": "Analyse annoncée, document non archivé",
      "source": "https://www.cafe-champignon-adaptogene.fr/produit/boisson-adaptogene-saveur-cafe/",
      "lastVerified": "2026-09-08"
    },
    {
      "id": "arsene-arsene-classique",
      "brand": "Arsène",
      "product": "Arsène Classique",
      "category": "Alternative torréfiée au café",
      "rawPricePerServing": "environ 0,32 € / portion annoncé",
      "price": {
        "min": 0.32,
        "max": 0.32,
        "midpoint": 0.32,
        "currency": "EUR"
      },
      "rawCaffeine": "0 mg annoncé",
      "caffeine": {
        "min": 0,
        "max": 0,
        "midpoint": 0,
        "unit": "mg"
      },
      "caffeineBand": "Sans caféine",
      "publicCaveat": "",
      "transparency": "Partielle",
      "ingredientFamilies": [
        "Alternative torréfiée / sans café"
      ],
      "laboratoryEvidence": "Non publiée",
      "source": "https://arseneboissons.fr/",
      "lastVerified": "2026-09-08"
    },
    {
      "id": "lupi-coffee-cafe-de-lupin-bio",
      "brand": "Lupi Coffee",
      "product": "Café de lupin bio",
      "category": "Alternative torréfiée au café",
      "rawPricePerServing": "environ 0,23 € / portion annoncé",
      "price": {
        "min": 0.23,
        "max": 0.23,
        "midpoint": 0.23,
        "currency": "EUR"
      },
      "rawCaffeine": "0 mg annoncé",
      "caffeine": {
        "min": 0,
        "max": 0,
        "midpoint": 0,
        "unit": "mg"
      },
      "caffeineBand": "Sans caféine",
      "publicCaveat": "",
      "transparency": "Élevée",
      "ingredientFamilies": [
        "Alternative torréfiée / sans café"
      ],
      "laboratoryEvidence": "Non publiée",
      "source": "https://www.lupicoffee.com/",
      "lastVerified": "2026-09-08"
    },
    {
      "id": "maison-datus-datus-moulu",
      "brand": "Maison DATUS",
      "product": "DATUS moulu",
      "category": "Alternative torréfiée au café",
      "rawPricePerServing": "non calculable avec les données publiques",
      "price": null,
      "rawCaffeine": "0 mg annoncé",
      "caffeine": {
        "min": 0,
        "max": 0,
        "midpoint": 0,
        "unit": "mg"
      },
      "caffeineBand": "Sans caféine",
      "publicCaveat": "",
      "transparency": "Partielle",
      "ingredientFamilies": [
        "Alternative torréfiée / sans café"
      ],
      "laboratoryEvidence": "Analyse annoncée, document non archivé",
      "source": "https://maisondatus.com/products/alternative-cafe-moulu-sans-cafeine-datus",
      "lastVerified": "2026-09-08"
    },
    {
      "id": "graine-de-breton-orge",
      "brand": "Graine de Breton",
      "product": "Orgé",
      "category": "Alternative torréfiée au café",
      "rawPricePerServing": "non calculable avec les données publiques",
      "price": null,
      "rawCaffeine": "0 mg annoncé",
      "caffeine": {
        "min": 0,
        "max": 0,
        "midpoint": 0,
        "unit": "mg"
      },
      "caffeineBand": "Sans caféine",
      "publicCaveat": "",
      "transparency": "Partielle",
      "ingredientFamilies": [
        "Alternative torréfiée / sans café"
      ],
      "laboratoryEvidence": "Non publiée",
      "source": "https://grainedebreton.bzh/categorie-produit/orge/",
      "lastVerified": "2026-09-08"
    },
    {
      "id": "la-tribu-des-kawas-lupin-torrefie-bio",
      "brand": "La Tribu des Kawas",
      "product": "Lupin torréfié bio",
      "category": "Alternative torréfiée au café",
      "rawPricePerServing": "non calculable avec les données publiques",
      "price": null,
      "rawCaffeine": "0 mg annoncé",
      "caffeine": {
        "min": 0,
        "max": 0,
        "midpoint": 0,
        "unit": "mg"
      },
      "caffeineBand": "Sans caféine",
      "publicCaveat": "",
      "transparency": "Partielle",
      "ingredientFamilies": [
        "Alternative torréfiée / sans café"
      ],
      "laboratoryEvidence": "Non publiée",
      "source": "https://www.latribudeskawas.fr/",
      "lastVerified": "2026-09-08"
    },
    {
      "id": "myprotein-protein-iced-coffee",
      "brand": "Myprotein",
      "product": "Protein Iced Coffee",
      "category": "Café protéiné glacé",
      "rawPricePerServing": "environ 1,65 € promotionnel; 2,20 € prix de référence",
      "price": {
        "min": 1.65,
        "max": 2.2,
        "midpoint": 1.925,
        "currency": "EUR"
      },
      "rawCaffeine": "74,2 mg pour la variante Iced Matcha; autres parfums variables",
      "caffeine": {
        "min": 74.2,
        "max": 74.2,
        "midpoint": 74.2,
        "unit": "mg"
      },
      "caffeineBand": "Modérée (51–100 mg)",
      "publicCaveat": "",
      "transparency": "Élevée",
      "ingredientFamilies": [
        "Protéines"
      ],
      "laboratoryEvidence": "Non publiée",
      "source": "https://fr.myprotein.com/p/nutrition-sportive/protein-iced-coffee/17631051/",
      "lastVerified": "2026-09-29"
    },
    {
      "id": "try-kinoko-cafe-proteine",
      "brand": "Try Kinoko",
      "product": "Café Protéiné",
      "category": "Café protéiné et MCT",
      "rawPricePerServing": "environ 2,00 € à l’achat unitaire",
      "price": {
        "min": 2,
        "max": 2,
        "midpoint": 2,
        "currency": "EUR"
      },
      "rawCaffeine": "80 mg par cuillère doseuse annoncés",
      "caffeine": {
        "min": 80,
        "max": 80,
        "midpoint": 80,
        "unit": "mg"
      },
      "caffeineBand": "Modérée (51–100 mg)",
      "publicCaveat": "",
      "transparency": "Partielle",
      "ingredientFamilies": [
        "Protéines",
        "MCT"
      ],
      "laboratoryEvidence": "Non publiée",
      "source": "https://fr.trykinoko.co/products/protein-coffee",
      "lastVerified": "2026-09-29"
    },
    {
      "id": "sunday-natural-proteine-coffee-signature-roast",
      "brand": "Sunday Natural",
      "product": "Protéine Coffee Signature Roast",
      "category": "Café protéiné végétal",
      "rawPricePerServing": "0,88 € / portion annoncé",
      "price": {
        "min": 0.88,
        "max": 0.88,
        "midpoint": 0.88,
        "currency": "EUR"
      },
      "rawCaffeine": "87 mg",
      "caffeine": {
        "min": 87,
        "max": 87,
        "midpoint": 87,
        "unit": "mg"
      },
      "caffeineBand": "Modérée (51–100 mg)",
      "publicCaveat": "",
      "transparency": "Élevée",
      "ingredientFamilies": [
        "Protéines"
      ],
      "laboratoryEvidence": "Non publiée",
      "source": "https://www.sunday.fr/protein-coffee-signature-roast.html",
      "lastVerified": "2026-09-29"
    },
    {
      "id": "corial-cafe-collagene-vitamine-c-cacao",
      "brand": "Corial",
      "product": "Café Collagène + Vitamine C - Cacao",
      "category": "Café au collagène et cacao",
      "rawPricePerServing": "environ 0,73 € / portion",
      "price": {
        "min": 0.73,
        "max": 0.73,
        "midpoint": 0.73,
        "currency": "EUR"
      },
      "rawCaffeine": "68 mg",
      "caffeine": {
        "min": 68,
        "max": 68,
        "midpoint": 68,
        "unit": "mg"
      },
      "caffeineBand": "Modérée (51–100 mg)",
      "publicCaveat": "",
      "transparency": "Élevée",
      "ingredientFamilies": [
        "Protéines",
        "Collagène"
      ],
      "laboratoryEvidence": "Non publiée",
      "source": "https://corialfoods.com/fr-fr/products/collagen-coffee-cacau",
      "lastVerified": "2026-09-29"
    }
  ]
} as const;
