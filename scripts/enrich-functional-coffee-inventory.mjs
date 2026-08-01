import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const CSV_PATH = path.join(ROOT, "data", "marques-cafe-fonctionnel.csv");
const TODAY = "2026-08-01";

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    const next = text[i + 1];
    if (quoted) {
      if (ch === '"' && next === '"') {
        cell += '"';
        i += 1;
      } else if (ch === '"') {
        quoted = false;
      } else {
        cell += ch;
      }
    } else if (ch === '"') {
      quoted = true;
    } else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n") {
      row.push(cell.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += ch;
    }
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  const [header, ...data] = rows;
  return data.filter((r) => r.length > 1).map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ""])));
}

function csvEscape(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function writeCsv(rows, headers) {
  const content = [headers.map(csvEscape).join(","), ...rows.map((row) => headers.map((h) => csvEscape(row[h] ?? "")).join(","))].join("\n") + "\n";
  fs.writeFileSync(CSV_PATH, content, "utf8");
}

function key(row) {
  return `${row.marque}|||${row.produit}`;
}

const newRows = [
  {
    marque: "CREOFFEE", produit: "Original", pays_marche: "Australie", format: "poudre instantanée", classement: "Café à la créatine", macro_categorie: "2 — Cafés artificiellement enrichis", base_reelle: "café instantané", actifs_principaux: "créatine monohydrate", dose_portion: "5 g de créatine par portion; taille de portion non publiée", cafeine_portion: "non publiée", prix_observe_2026_08_01: "moins de 1,40 AUD par portion annoncé", disponibilite_france: "non, marché Australie", affiliation_ou_contact: "contact direct via site", source_officielle: "https://creoffee.com/", statut_verification: "A", notes: "Formule courte: café instantané et créatine monohydrate; sans sucre, agents de charge ni additifs annoncés."
  },
  {
    marque: "CreatineCoffeee", produit: "CreatineCoffee", pays_marche: "États-Unis", format: "poudre instantanée", classement: "Café à la créatine", macro_categorie: "2 — Cafés artificiellement enrichis", base_reelle: "café colombien bio instantané medium roast", actifs_principaux: "créatine monohydrate micronisée", dose_portion: "12 g; 5 g de créatine; 30 ou 90 portions", cafeine_portion: "non publiée", prix_observe_2026_08_01: "119 $ / 90 jours; 2,61 à 2,97 $ par café selon format", disponibilite_france: "expédition internationale à confirmer", affiliation_ou_contact: "contact direct via site", source_officielle: "https://creatine-coffee.com/products/creatinecoffee-the-coffee-upgrade-for-mind-muscle-90-day-supply", statut_verification: "B", notes: "Formule détaillée mais allégations santé et longévité très fortes: forte prudence éditoriale."
  },
  {
    marque: "Day One Functional Coffees", produit: "Creatine Coffee K-Cup", pays_marche: "États-Unis", format: "capsules K-Cup", classement: "Café à la créatine", macro_categorie: "2 — Cafés artificiellement enrichis", base_reelle: "café en capsule", actifs_principaux: "créatine HCl", dose_portion: "3 g de créatine HCl par capsule", cafeine_portion: "non publiée", prix_observe_2026_08_01: "prix non publié", disponibilite_france: "non; accès anticipé États-Unis", affiliation_ou_contact: "liste d'attente", source_officielle: "https://dayonecoffees.com/", statut_verification: "C", notes: "Pré-lancement; compatibilité Keurig annoncée; formule finale et disponibilité à confirmer."
  },
  {
    marque: "Bulletproof", produit: "Coffee + Creatine", pays_marche: "États-Unis", format: "poudre instantanée", classement: "Café à la créatine", macro_categorie: "2 — Cafés artificiellement enrichis", base_reelle: "café instantané medium roast", actifs_principaux: "créatine monohydrate", dose_portion: "5 g de créatine; sachet 13,8 oz", cafeine_portion: "non publiée", prix_observe_2026_08_01: "33,99 $", disponibilite_france: "non, États-Unis; Target et boutique officielle", affiliation_ou_contact: "programme d'affiliation Bulletproof à rechercher", source_officielle: "https://shop.bulletproof.com/products/creatine-coffee", statut_verification: "A", notes: "Référence lancée en 2026 et indiquée en stock lors du relevé."
  },
  {
    marque: "Four Sigmatic", produit: "The Boys™ Creatine Coffee", pays_marche: "États-Unis", format: "café moulu", classement: "Café créatine et Lion's Mane", macro_categorie: "2 — Cafés artificiellement enrichis", base_reelle: "Arabica du Honduras", actifs_principaux: "créatine monohydrate; Lion's Mane", dose_portion: "5 g de créatine; 13 portions par paquet; 26 portions pour 2 paquets", cafeine_portion: "150 mg", prix_observe_2026_08_01: "40 $ / 26 portions; 28 $ première commande abonnement", disponibilite_france: "non, offre limitée États-Unis", affiliation_ou_contact: "programme d'affiliation Four Sigmatic à rechercher", source_officielle: "https://us.foursigmatic.com/products/prime-original-the-boys-creatine-coffee", statut_verification: "A", notes: "Lion's Mane annoncé issu du corps fructifère; édition limitée 2026."
  },
  {
    marque: "VitaCup", produit: "Creatine Coffee", pays_marche: "États-Unis", format: "poudre instantanée", classement: "Café créatine et vitamines", macro_categorie: "2 — Cafés artificiellement enrichis", base_reelle: "café instantané", actifs_principaux: "créatine monohydrate; vitamines fonctionnelles", dose_portion: "5 g de créatine par portion", cafeine_portion: "non publiée", prix_observe_2026_08_01: "prix non extrait", disponibilite_france: "non; lancement Sprouts États-Unis en avril 2026", affiliation_ou_contact: "programme d'affiliation VitaCup à rechercher", source_officielle: "https://www.vitacup.com/products/creatine-coffee-instant-pouch", statut_verification: "B", notes: "Produit officiellement annoncé en 2026; page commerciale inaccessible à l'outil lors du relevé."
  },
  {
    marque: "MARESHI", produit: "DRIVE", pays_marche: "Royaume-Uni", format: "poudre instantanée", classement: "Café créatine, collagène et champignons", macro_categorie: "2 — Cafés artificiellement enrichis", base_reelle: "café Robusta de spécialité instantané", actifs_principaux: "créatine monohydrate; collagène bovin; Lion's Mane", dose_portion: "5 g créatine; 5 g collagène; 500 mg Lion's Mane", cafeine_portion: "non publiée", prix_observe_2026_08_01: "prix non extrait", disponibilite_france: "expédition France à confirmer", affiliation_ou_contact: "contact direct via site", source_officielle: "https://www.mareshi.co.uk/", statut_verification: "A", notes: "Préparation annoncée avec 250 ml d'eau chaude; formule sportive tout-en-un."
  },
  {
    marque: "Urth&Root", produit: "Creatine Coffee", pays_marche: "International / États-Unis", format: "café moulu ou poudre selon page", classement: "Café à la créatine", macro_categorie: "2 — Cafés artificiellement enrichis", base_reelle: "Arabica vietnamien annoncé", actifs_principaux: "créatine tamponnée CreHytine / autres technologies citées", dose_portion: "3 g de créatine annoncés", cafeine_portion: "non publiée", prix_observe_2026_08_01: "prix non extrait", disponibilite_france: "France présente dans le sélecteur pays; livraison à confirmer", affiliation_ou_contact: "contact direct via site", source_officielle: "https://urthandroot.com/", statut_verification: "C", notes: "Page incohérente sur la technologie de créatine et l'identité produit; ne pas recommander sans clarification fabricant."
  },
  {
    marque: "Smart Coffee EU", produit: "Functional Coffee", pays_marche: "Union européenne", format: "poudre instantanée", classement: "Café collagène tout-en-un", macro_categorie: "2 — Cafés artificiellement enrichis", base_reelle: "café instantané", actifs_principaux: "collagène Peptan; MCT C8/C10; magnésium; vitamines B; L-théanine; L-carnitine; taurine; gingembre; chrome; adaptogènes", dose_portion: "3,5 g de collagène; 25 portions; plus de 17 ingrédients", cafeine_portion: "environ 80 mg", prix_observe_2026_08_01: "environ 1,50 à 1,52 € par portion", disponibilite_france: "oui, boutique UE", affiliation_ou_contact: "contact direct via site", source_officielle: "https://smartcoffeeeu.com/", statut_verification: "A", notes: "Sans lactose ni gluten, compatible keto et édulcoré à la stévia; tests par lots annoncés."
  },
  {
    marque: "Bulk", produit: "Whey Protein Coffee", pays_marche: "France / Europe", format: "poudre instantanée", classement: "Café protéiné", macro_categorie: "2 — Cafés artificiellement enrichis", base_reelle: "café instantané brésilien et whey", actifs_principaux: "whey concentrée; lait écrémé", dose_portion: "17 g de protéines par portion; formats 500 g et 1 kg", cafeine_portion: "non publiée", prix_observe_2026_08_01: "29,99 € prix régulier observé; prix France à actualiser", disponibilite_france: "oui, boutique France", affiliation_ou_contact: "programme d'affiliation Bulk à rechercher", source_officielle: "https://www.bulk.com/fr/products/cafe-proteine-whey/bpb-pico", statut_verification: "A", notes: "Contient lait, sucralose, lécithine de tournesol, gomme guar et xanthane."
  },
  {
    marque: "Clearly", produit: "Protein Iced Coffee", pays_marche: "Pays-Bas / Europe", format: "poudre pour café glacé", classement: "Café protéiné", macro_categorie: "2 — Cafés artificiellement enrichis", base_reelle: "Arabica colombien et whey néo-zélandaise", actifs_principaux: "whey de vaches nourries à l'herbe", dose_portion: "dose de protéines non extraite", cafeine_portion: "non publiée", prix_observe_2026_08_01: "prix non extrait", disponibilite_france: "oui, livraison 2–4 jours annoncée", affiliation_ou_contact: "programme public non identifié", source_officielle: "https://clearly.fr/products/protein-coffee", statut_verification: "B", notes: "Véritable base café; fiche nutritionnelle complète à relever avant comparaison chiffrée."
  },
  {
    marque: "ProtéAlpes", produit: "Whey Café sans sucres ajoutés", pays_marche: "France", format: "poudre protéinée goût café", classement: "Café protéiné", macro_categorie: "2 — Cafés artificiellement enrichis", base_reelle: "whey isolate et café instantané décaféiné", actifs_principaux: "whey isolate 92 %; café instantané décaféiné 6 %; farine de coco", dose_portion: "portion et protéines par portion à relever sur l'étiquette", cafeine_portion: "non publiée; café décaféiné", prix_observe_2026_08_01: "prix non extrait", disponibilite_france: "oui", affiliation_ou_contact: "contact direct via site", source_officielle: "https://protealpes.com/produit/whey-cafe-sans-sucres-ajoutes/", statut_verification: "B", notes: "Fabriqué en France; contient du lait; sans sucres ajoutés."
  },
  {
    marque: "Collagen Coffee", produit: "Original Collagen Coffee", pays_marche: "États-Unis / international", format: "poudre instantanée", classement: "Café au collagène", macro_categorie: "2 — Cafés artificiellement enrichis", base_reelle: "café instantané", actifs_principaux: "peptides de collagène hydrolysés", dose_portion: "dose non publiée; six saveurs annoncées", cafeine_portion: "non publiée", prix_observe_2026_08_01: "prix non extrait", disponibilite_france: "expédition internationale à confirmer", affiliation_ou_contact: "contact direct via site", source_officielle: "https://collagencoffee.com/", statut_verification: "B", notes: "Page officielle active mais détails nutritionnels insuffisants pour une comparaison ferme."
  },
  {
    marque: "Zenergy Mushrooms", produit: "Mushroom Coffee", pays_marche: "Europe", format: "café à préparer, format à confirmer", classement: "Café multi-champignons", macro_categorie: "2 — Cafés artificiellement enrichis", base_reelle: "café réel", actifs_principaux: "champignons fonctionnels double extraits", dose_portion: "1 g de chaque champignon par portion annoncé; liste exacte à confirmer", cafeine_portion: "non publiée", prix_observe_2026_08_01: "prix non extrait", disponibilite_france: "expédition UE à confirmer", affiliation_ou_contact: "contact direct via site", source_officielle: "https://zenergymushrooms.com/", statut_verification: "B", notes: "Corps fructifères, culture sur bois, bio UE et au moins 10 % de bêta-glucanes annoncés."
  },
  {
    marque: "Lyfe Mushrooms", produit: "Mushroom Coffee", pays_marche: "États-Unis", format: "café moulu et capsules K-Cup", classement: "Café à sept champignons", macro_categorie: "2 — Cafés artificiellement enrichis", base_reelle: "Arabica single-origin", actifs_principaux: "sept extraits de corps fructifères cultivés aux États-Unis", dose_portion: "doses non publiées", cafeine_portion: "non publiée", prix_observe_2026_08_01: "prix non extrait", disponibilite_france: "non, marché États-Unis", affiliation_ou_contact: "contact direct via site", source_officielle: "https://lyfemushrooms.com/", statut_verification: "B", notes: "Rapport de laboratoire par lot 2026.05 mentionné; liste et doses à archiver."
  },
  {
    marque: "Setacor", produit: "Café funcional con hongos medicinales", pays_marche: "Espagne", format: "café, format à confirmer", classement: "Café multi-champignons", macro_categorie: "2 — Cafés artificiellement enrichis", base_reelle: "café réel", actifs_principaux: "Shiitake; Lion's Mane; Cordyceps", dose_portion: "non publiée", cafeine_portion: "non publiée", prix_observe_2026_08_01: "prix non extrait", disponibilite_france: "expédition UE à confirmer", affiliation_ou_contact: "contact direct via site", source_officielle: "https://www.setacor.com/producto/cafe-funcional-con-hongos-medicinales/", statut_verification: "B", notes: "Produit bio espagnol; informations quantitatives à obtenir."
  },
  {
    marque: "MORLI", produit: "PERFORM+", pays_marche: "Royaume-Uni", format: "poudre instantanée", classement: "Café tout-en-un", macro_categorie: "2 — Cafés artificiellement enrichis", base_reelle: "Arabica", actifs_principaux: "Lion's Mane; Cordyceps; Reishi; moringa; collagène; L-théanine", dose_portion: "non publiée", cafeine_portion: "non publiée", prix_observe_2026_08_01: "prix non extrait", disponibilite_france: "expédition France à confirmer", affiliation_ou_contact: "contact direct via site", source_officielle: "https://morli.co/products/perform", statut_verification: "B", notes: "Formule très large; dosage et origine du collagène à documenter."
  },
  {
    marque: "Rise & Shine", produit: "Mushroom Coffee", pays_marche: "États-Unis", format: "poudre instantanée", classement: "Café collagène, champignons et nootropiques", macro_categorie: "2 — Cafés artificiellement enrichis", base_reelle: "café instantané", actifs_principaux: "Chaga; Lion's Mane; L-théanine; Rhodiola; ginseng; extrait de grain de café; collagène bovin", dose_portion: "2 639 mg de mélange champignons/nootropiques; dose collagène non publiée", cafeine_portion: "non publiée", prix_observe_2026_08_01: "prix non extrait", disponibilite_france: "non, marché États-Unis", affiliation_ou_contact: "contact direct via site", source_officielle: "https://www.drinkriseandshine.com/products/rise-and-shine-mushroom-coffee", statut_verification: "A", notes: "Champignons bio annoncés issus du corps fructifère; mélange propriétaire."
  },
  {
    marque: "Bioflow", produit: "Deep Focus Coffee", pays_marche: "Union européenne", format: "café instantané ou moulu à confirmer", classement: "Café Lion's Mane et L-théanine", macro_categorie: "2 — Cafés artificiellement enrichis", base_reelle: "Arabica bio", actifs_principaux: "Lion's Mane; L-théanine", dose_portion: "non publiée", cafeine_portion: "non publiée", prix_observe_2026_08_01: "prix non extrait", disponibilite_france: "oui, page UE", affiliation_ou_contact: "contact direct via site", source_officielle: "https://trybioflow.com/en-eu/pages/dfb1-coffee", statut_verification: "B", notes: "Formule simple mais valeurs quantitatives non extraites."
  },
  {
    marque: "ACTIVZ", produit: "Everyday Coffee", pays_marche: "États-Unis", format: "poudre instantanée", classement: "Café collagène et beauté", macro_categorie: "2 — Cafés artificiellement enrichis", base_reelle: "café instantané", actifs_principaux: "collagène; Tremella; acide hyaluronique; Chaga; vitamine C; polyphénols du café", dose_portion: "non publiée", cafeine_portion: "non publiée", prix_observe_2026_08_01: "prix non extrait", disponibilite_france: "expédition internationale à confirmer", affiliation_ou_contact: "contact direct via site", source_officielle: "https://www.activz.com/products/coffee", statut_verification: "B", notes: "Positionnement peau/beauté; origine du collagène et doses à obtenir."
  },
  {
    marque: "eGano", produit: "Ganoderma Coffee", pays_marche: "International", format: "poudre instantanée", classement: "Café au Ganoderma historique", macro_categorie: "2 — Cafés artificiellement enrichis", base_reelle: "café Robusta", actifs_principaux: "Ganoderma lucidum", dose_portion: "non publiée", cafeine_portion: "non publiée", prix_observe_2026_08_01: "prix variable via réseau", disponibilite_france: "distribution internationale à confirmer", affiliation_ou_contact: "réseau de distributeurs eGano", source_officielle: "https://www.eganoworldwide.com/", statut_verification: "B", notes: "Gamme instantanée black et aromatisée; transparence quantitative limitée."
  },
  {
    marque: "King Coffee", produit: "Cappuccino Collagen", pays_marche: "Vietnam / international", format: "sachets instantanés", classement: "Café au collagène", macro_categorie: "2 — Cafés artificiellement enrichis", base_reelle: "café instantané cappuccino", actifs_principaux: "collagène", dose_portion: "dose non extraite du portfolio", cafeine_portion: "non publiée", prix_observe_2026_08_01: "prix variable selon distributeur", disponibilite_france: "distribution internationale; France à confirmer", affiliation_ou_contact: "contact export King Coffee", source_officielle: "https://en.vietnordic.com/wp-content/uploads/2025/02/KING-COFFEE-products-portfolio_International_Oct.2024_EN.pdf", statut_verification: "B", notes: "Référence présente au portfolio international 2024/2025; étiquette locale à obtenir."
  },
  {
    marque: "Nature's Finest", produit: "Collagen Coffee", pays_marche: "Slovénie / Europe", format: "poudre instantanée", classement: "Café au collagène", macro_categorie: "2 — Cafés artificiellement enrichis", base_reelle: "mélange café instantané", actifs_principaux: "collagène", dose_portion: "conditionnement 125 g; dose par portion non extraite", cafeine_portion: "non publiée", prix_observe_2026_08_01: "prix non extrait", disponibilite_france: "expédition UE à confirmer", affiliation_ou_contact: "contact direct via site", source_officielle: "https://www.naturesfinest.si/wp-content/uploads/2024/08/5638-Collagen-Coffee-doc.pdf", statut_verification: "B", notes: "Fiche technique officielle; vérifier la page de vente et la formulation actuelle avant publication."
  },
  {
    marque: "Brain and Brawn", produit: "Synergy Collagen Coffee", pays_marche: "Australie", format: "20 sachets instantanés", classement: "Café collagène, Cordyceps et MCT", macro_categorie: "2 — Cafés artificiellement enrichis", base_reelle: "Arabica et crème fonctionnelle", actifs_principaux: "collagène bovin; Cordyceps militaris bio; MCT C8/C10; fibres prébiotiques", dose_portion: "15 g; 20 sachets; 300 g", cafeine_portion: "non publiée", prix_observe_2026_08_01: "69,95 AUD / 20 sachets", disponibilite_france: "non, marché Australie", affiliation_ou_contact: "contact direct via site", source_officielle: "https://www.brainandbrawn.com.au/products/synergy-collagen-coffee-with-organic-cordyceps-mct-c8-c10-20-x-15g-sachet", statut_verification: "A", notes: "Contient lait/beurre et collagène bovin; sans édulcorant annoncé."
  },
  {
    marque: "Brewy", produit: "Organic Mushroom Coffee", pays_marche: "Australie", format: "poudre instantanée 120 g", classement: "Café à six champignons et MCT", macro_categorie: "2 — Cafés artificiellement enrichis", base_reelle: "café instantané bio", actifs_principaux: "Reishi; Lion's Mane; Turkey Tail; Shiitake; King Trumpet; Cordyceps; MCT", dose_portion: "doses non publiées; sachet 120 g", cafeine_portion: "non publiée; annoncée légèrement inférieure au café classique", prix_observe_2026_08_01: "prix non extrait", disponibilite_france: "non, marché Australie", affiliation_ou_contact: "contact direct via site", source_officielle: "https://brewy.com.au/products/organic-mushroom-coffee", statut_verification: "B", notes: "Liste d'ingrédients publiée mais doses et nature des extraits à préciser."
  },
  {
    marque: "RYTUAL", produit: "Café à base de hongos", pays_marche: "Argentine", format: "poudre instantanée", classement: "Café aux champignons", macro_categorie: "2 — Cafés artificiellement enrichis", base_reelle: "Arabica", actifs_principaux: "champignons adaptogènes, liste exacte à confirmer", dose_portion: "non publiée", cafeine_portion: "annoncée faible; valeur non publiée", prix_observe_2026_08_01: "prix en ARS à actualiser", disponibilite_france: "non, marché Argentine", affiliation_ou_contact: "contact direct via site", source_officielle: "https://rytualcafe.shop/products/rytual%C2%AE-cafe-a-base-de-hongos", statut_verification: "C", notes: "Marque active mais documentation quantitative limitée."
  },
  {
    marque: "Physalis", produit: "Collagen Coffee", pays_marche: "Belgique / Europe", format: "12 sachets instantanés", classement: "Café collagène et MCT", macro_categorie: "2 — Cafés artificiellement enrichis", base_reelle: "café Arabica instantané", actifs_principaux: "collagène marin Naticol type I; MCT de coco", dose_portion: "1 sachet; 5 g de collagène; 12 portions", cafeine_portion: "non publiée", prix_observe_2026_08_01: "prix non extrait", disponibilite_france: "oui, page officielle France", affiliation_ou_contact: "contact KeyPharm / Physalis", source_officielle: "https://www.physalishealth.com/fr/complements-alimentaires/cheveux-peau-ongles-yeux/collagen-coffee/", statut_verification: "A", notes: "Formule: 50 % collagène marin, 27,5 % poudre MCT, 22,5 % café; sans sucres ajoutés, gluten ni lait annoncés."
  }
];

const updates = {
  "Bonjour|||Super Café": {
    dose_portion: "6 g; 2 700 mg d'extraits annoncés; 30 portions",
    prix_observe_2026_08_01: "abonnement 22,93 à 31,20 € le sachet (0,76 à 1,04 €/tasse); achat ponctuel 44,80 € le sachet (1,49 €/tasse)",
    changements_2026_08_01: "Prix et paliers d'abonnement revérifiés; 2 700 mg d'extraits et 30 portions confirmés."
  },
  "Strate|||Café adaptogène": {
    source_officielle: "https://stratecafe.com/products/cafe-champignons",
    dose_portion: "6 g; 2 200 mg de champignons par tasse",
    cafeine_portion: "48 mg",
    actifs_principaux: "Lion's Mane; Chaga; Reishi; Cordyceps; Shiitake; King Trumpet",
    notes: "Nouvelle adresse officielle vérifiée; six extraits de corps fructifères; formule conçue en France.",
    changements_2026_08_01: "Ancien domaine strate.co remplacé par stratecafe.com; formule et caféine revérifiées."
  },
  "Cosmic Blend|||Cosmic Blend Coffee": {
    statut_verification: "C",
    notes: "Le domaine affiche désormais un service générique sans produit identifiable; existence commerciale actuelle non confirmée.",
    changements_2026_08_01: "Domaine réaffecté ou contenu remplacé; produit rétrogradé au niveau C."
  },
  "Corial|||Collagen Coffee Original": {
    prix_observe_2026_08_01: "14,99 $ / environ 15 portions",
    disponibilite_france: "oui, France disponible dans le sélecteur pays",
    changements_2026_08_01: "Prix officiel et présence de la France dans le sélecteur revérifiés."
  },
  "NuSpira|||NUCORE 6 Black Coffee": {
    dose_portion: "30 portions; dose totale de champignons non publiée",
    prix_observe_2026_08_01: "45 $ achat ponctuel; 36 $ abonnement; 9,99 $ découverte 5 tasses",
    notes: "Six champignons bio; 45 mg de caféine; existe aussi en latte 24 portions.",
    changements_2026_08_01: "Prix standard et abonnement ajoutés; 30 portions confirmées."
  },
  "Everyday Dose|||Coffee+ Mild / Medium": {
    dose_portion: "Mild: 7,3 g, 30 portions, 5 g protéines; Medium: 8,7 g, 30 portions, 4 g protéines",
    cafeine_portion: "45 mg Mild; 90 mg Medium",
    actifs_principaux: "collagène bovin; L-théanine; Chaga; Lion's Mane",
    notes: "Chaga et Lion's Mane issus du corps fructifère; mélange propriétaire total 7 300 ou 8 700 mg selon version.",
    changements_2026_08_01: "Deux niveaux de caféine, portions, protéines et poids de portion revérifiés."
  },
  "Rainbo|||Fungki Mushroom Coffee": {
    dose_portion: "3 000 mg de champignons par portion",
    cafeine_portion: "44 mg",
    actifs_principaux: "Lion's Mane; Reishi; éleuthérocoque; sel rose",
    notes: "Extraits bio issus uniquement du corps fructifère; base cold brew faible acidité.",
    changements_2026_08_01: "Dose totale, caféine et partie de champignon revérifiées."
  },
  "Collafé|||Collagen Coffee Madagascan Vanilla": {
    dose_portion: "22 g; 30 portions; 7 g collagène marin; 3 g collagène bovin; 40 mg UC-II",
    prix_observe_2026_08_01: "54,99 £ / 30 portions",
    actifs_principaux: "collagène marin; collagène bovin; UC-II; MCT; crème de coco",
    notes: "Préparer avec une eau à 60–70 °C selon la marque; contient poisson et collagène bovin.",
    changements_2026_08_01: "Formule, portion, prix et conseil de préparation revérifiés."
  },
  "NUUBREW|||The Hustle Blend": {
    changements_2026_08_01: "Toujours indiqué épuisé lors de la revérification."
  },
  "Taika|||Black Coffee / Macadamia Latte": {
    changements_2026_08_01: "Page officielle indiquée SOLD OUT lors de la revérification."
  },
  "PULS|||Original Latte": {
    changements_2026_08_01: "Pré-lancement / Coming Soon toujours observé."
  },
  "Eight|||Batch 001": {
    changements_2026_08_01: "Projet bêta / pré-lancement, sans prix ni étiquette finale."
  },
  "nu3|||Focus Mushroom Coffee": {
    statut_verification: "B",
    notes: "L'ancienne fiche officielle redirige vers Redcare Italie; dose élevée de caféine; disponibilité actuelle via détaillant à confirmer.",
    changements_2026_08_01: "Source nu3 redirigée vers un détaillant; statut commercial direct à reconfirmer."
  },
  "Om Mushroom Superfood|||Mushroom Coffee Latte Blend": {
    changements_2026_08_01: "Source officielle toujours historique (2021); SKU actuel non confirmé."
  },
  "Bulletproof|||Coffee + Creatine": {
    actifs_principaux: "créatine monohydrate; 250 mg d'électrolytes",
    notes: "Référence lancée en mars 2026; café Arabica instantané annoncé testé pour les toxines; indiquée en stock lors du relevé."
  },
  "Nature's Finest|||Collagen Coffee": {
    source_officielle: "https://www.naturesfinest.fr/produit/collagene-cafe-boisson/",
    statut_verification: "A",
    base_reelle: "café Arabica instantané (20 %)",
    actifs_principaux: "collagène (50 %); acide hyaluronique; vitamine C; biotine; MSM",
    dose_portion: "5 g; 25 portions; conditionnement 125 g",
    notes: "Sans sucres ajoutés annoncé; la fiche technique détaille aussi tapioca et cellulose."
  }
};

const inaccessibleAutomation = new Set([
  "Torrégral", "Café Minceur", "Wake", "Brainstoorm / Mush n Go", "French Mush", "Mousse", "Fraté Maté", "Sam's Superfoods", "VAHDAM", "Kimera Koffee"
]);

const soldOut = new Set(["NUUBREW", "Taika"]);
const prelaunch = new Set(["PULS", "Eight", "Day One Functional Coffees"]);

const mushroomAliases = [
  ["Lion's Mane", /lion'?s mane|crinière de lion/i], ["Chaga", /chaga/i], ["Reishi", /reishi|ganoderma|lingzhi/i],
  ["Cordyceps", /cordyceps/i], ["Turkey Tail", /turkey tail/i], ["Maitake", /maitake/i], ["Shiitake", /shiitake/i],
  ["Tremella", /tremella/i], ["Agaricus", /agaricus/i], ["Oyster", /oyster/i], ["King Trumpet", /king trumpet/i]
];

function mushrooms(row) {
  const hay = `${row.actifs_principaux} ${row.notes}`;
  return mushroomAliases.filter(([, regex]) => regex.test(hay)).map(([name]) => name);
}

function parseCaffeine(value) {
  const text = String(value || "").toLowerCase();
  if (/non publi|non extrait|variable|annoncée|moins qu|selon préparation/.test(text) && !/\d+\s*mg/.test(text)) return ["à confirmer", "à confirmer"];
  const ranges = [...text.matchAll(/(\d+(?:[.,]\d+)?)\s*(?:à|–|-)\s*(\d+(?:[.,]\d+)?)\s*mg/g)]
    .flatMap((m) => [Number(m[1].replace(",", ".")), Number(m[2].replace(",", "."))]);
  const singles = [...text.matchAll(/(\d+(?:[.,]\d+)?)\s*mg/g)].map((m) => Number(m[1].replace(",", ".")));
  const matches = [...ranges, ...singles];
  if (!matches.length) return ["à confirmer", "à confirmer"];
  return [String(Math.min(...matches)), String(Math.max(...matches))];
}

function caffeineLevel(min, max) {
  if (min === "à confirmer") return "non documenté";
  const hi = Number(max);
  if (hi === 0) return "sans caféine";
  if (hi <= 50) return "faible (≤ 50 mg)";
  if (hi <= 100) return "modérée (51–100 mg)";
  return "élevée (> 100 mg)";
}

function firstNumberNear(text, term) {
  const normalized = String(text || "").replaceAll(",", ".");
  const before = normalized.match(new RegExp(`(\\d+(?:\\.\\d+)?)\\s*g[^;,.]{0,28}(?:${term})`, "i"));
  if (before) return `${before[1]} g`;
  const after = normalized.match(new RegExp(`(?:${term})[^;,.]{0,28}(\\d+(?:\\.\\d+)?)\\s*g`, "i"));
  if (after) return `${after[1]} g`;
  return "non publié";
}

function portions(row) {
  const text = `${row.dose_portion} ${row.prix_observe_2026_08_01}`;
  const vals = [...text.matchAll(/(\d+)\s*(?:portions?|tasses?|sticks?|sachets?|jours?)/gi)].map((m) => Number(m[1])).filter((n) => n > 1 && n <= 180);
  return vals.length ? [...new Set(vals)].sort((a, b) => a - b).join(" ou ") : "non publié";
}

function packWeight(row) {
  const text = `${row.dose_portion}; ${row.prix_observe_2026_08_01}`;
  const patterns = [/(?:sac|sachet|paquet|pot|poche|format|bouteille|conditionnement)[^;]{0,20}(\d+(?:[.,]\d+)?)\s*(kg|g|ml)/i, /(\d+(?:[.,]\d+)?)\s*(kg|g|ml)[^;]{0,20}(?:par pot|par sac|par sachet|par paquet)/i];
  for (const pattern of patterns) {
    const m = text.match(pattern);
    if (m) return `${m[1]} ${m[2]}`;
  }
  return "non publié";
}

function origin(row) {
  const text = row.base_reelle;
  const regions = ["Honduras", "Colombie", "colombien", "Brésil", "brésilien", "Guatemala", "Éthiopie", "Pérou", "péruvien", "Vietnam", "vietnamien", "Amérique centrale", "Nouvelle-Zélande"];
  const found = regions.find((r) => text.toLowerCase().includes(r.toLowerCase()));
  return found ? found.replace("colombien", "Colombie").replace("brésilien", "Brésil").replace("péruvien", "Pérou").replace("vietnamien", "Vietnam") : "non publiée";
}

function experience(row) {
  const format = row.format.toLowerCase();
  const base = row.base_reelle.toLowerCase();
  if (/sans café|alternative|café absent|chicorée|cacao/.test(base) || row.macro_categorie.startsWith("3")) return "alternative au café / latte";
  if (/prête à boire|boisson/.test(format)) return "prêt à boire";
  if (/capsule|k-cup/.test(format)) return "café en capsule";
  if (/grain|moulu|torréfié/.test(format)) return "café à préparer (goût café)";
  if (/latte|cappuccino/.test(format) || /crème|coco/.test(base)) return "latte instantané";
  if (/instantan/.test(format)) return "café instantané";
  return "à confirmer";
}

function preparation(row) {
  const format = row.format.toLowerCase();
  if (/prête à boire|boisson/.test(format)) return "prêt à consommer";
  if (/capsule|k-cup/.test(format)) return "machine compatible avec la capsule";
  if (/grain/.test(format)) return "moudre puis préparer comme un café classique";
  if (/moulu|torréfié/.test(format)) return "filtre, cafetière ou espresso selon mouture";
  if (/instantan|poudre/.test(format)) return "diluer dans de l'eau ou du lait; température selon fabricant";
  return "à confirmer";
}

function sweeteners(row) {
  const text = `${row.actifs_principaux} ${row.notes} ${row.base_reelle}`.toLowerCase();
  const values = [];
  if (/stévia|stevia/.test(text)) values.push("stévia");
  if (/sucralose/.test(text)) values.push("sucralose");
  if (/xylitol/.test(text)) values.push("xylitol");
  if (/sucre/.test(text)) values.push(/sans sucre|zéro sucre|zero sugar/.test(text) ? "sans sucre annoncé" : "sucre présent");
  if (/sans édulcorant|zero sweetener|no sweetener/.test(text)) values.push("sans édulcorant annoncé");
  return values.length ? [...new Set(values)].join("; ") : "non publié";
}

function dietary(row) {
  const text = `${row.actifs_principaux} ${row.notes} ${row.base_reelle}`.toLowerCase();
  const values = [];
  if (/whey|lait|lactosérum|laitière|beurre/.test(text)) values.push("contient lait");
  if (/collagène marin|marine collagen/.test(text)) values.push("contient poisson");
  if (/collagène bovin|bovine collagen|grass-fed collagen/.test(text)) values.push("non végétalien (bovin)");
  if (/vegan|végétalien/.test(text)) values.push("vegan annoncé");
  if (/sans gluten|gluten-free/.test(text)) values.push("sans gluten annoncé");
  if (/sans lactose|lactose-free/.test(text)) values.push("sans lactose annoncé");
  return values.length ? [...new Set(values)].join("; ") : "allergènes/régime non publiés";
}

function pricePerServing(row) {
  const text = row.prix_observe_2026_08_01.replaceAll(",", ".");
  const range = text.match(/(\d+(?:\.\d+)?)\s*(?:à|–|-)\s*(\d+(?:\.\d+)?)\s*(€|\$|£|AUD)\s*\/(?:tasse|portion|café)/i);
  if (range) return `${range[1]}–${range[2]} ${range[3]} / portion`;
  const direct = text.match(/(\d+(?:\.\d+)?)\s*(€|\$|£|AUD|ZAR)\s*(?:\/|par)\s*(?:tasse|portion|café)/i);
  if (direct) return `${direct[1]} ${direct[2]} / portion`;
  const total = text.match(/(\d+(?:\.\d+)?)\s*(€|\$|£|AUD)\s*\/\s*(\d+)\s*(?:portions?|tasses?|sachets?|jours?)/i);
  if (total) return `${(Number(total[1]) / Number(total[3])).toFixed(2)} ${total[2]} / portion`;
  return "non calculable avec les données publiques";
}

function dosageTransparency(row) {
  const text = row.dose_portion.toLowerCase();
  if (/non publi|non extrait|à confirmer/.test(text) && !/\d/.test(text)) return "faible";
  const numeric = [...text.matchAll(/\d+(?:[.,]\d+)?\s*(?:mg|g|ml|portions?)/g)].length;
  if (numeric >= 3 && !/mélange propriétaire|doses individuelles non publiées|dose totale.*non publiée/.test(text)) return "élevée";
  if (numeric >= 1) return "partielle";
  return "faible";
}

function labProof(row) {
  const text = `${row.notes} ${row.actifs_principaux}`.toLowerCase();
  if (/rapport.*laboratoire|tests? par lot|third.party|testé.*lot/.test(text)) return "oui, annoncé; rapport à archiver";
  if (/étiquette officielle|fiche technique officielle|document officiel/.test(text)) return "document technique officiel disponible";
  return "non publiée";
}

function promise(row) {
  const c = row.classement.toLowerCase();
  if (/protéin/.test(c)) return "nutrition / apport protéique";
  if (/collagène|beauté/.test(c)) return "beauté / collagène";
  if (/créatine/.test(c)) return "performance / créatine";
  if (/nootrop|focus|lion's mane/.test(c)) return "focus / cognition";
  if (/champignon|ganoderma/.test(c)) return "bien-être fonctionnel / champignons";
  if (/intrinsèquement/.test(c)) return "fonctionnalité issue du fruit du café";
  if (row.macro_categorie.startsWith("3")) return "alternative au café";
  return "énergie / usage quotidien";
}

function editorialPriority(row) {
  const france = /France/.test(row.pays_marche) || /oui/.test(row.disponibilite_france);
  const strategic = /créatine|protéiné|collagène|intrinsèquement|champignons/i.test(row.classement);
  if (row.statut_verification === "C" || prelaunch.has(row.marque) || soldOut.has(row.marque)) return "P3 — veille / ne pas recommander encore";
  if (france && strategic && !prelaunch.has(row.marque) && !soldOut.has(row.marque)) return "P1 — fiche prioritaire France";
  if (["Four Sigmatic", "RYZE", "Everyday Dose", "MUD\\WTR", "Bulletproof", "VitaCup", "ORGANO", "DXN"].includes(row.marque)) return "P1 — référence structurante";
  if (row.statut_verification === "A") return "P2 — comparatif secondaire";
  if (row.statut_verification === "B") return "P2 — à compléter avant fiche longue";
  return "P3 — veille / ne pas recommander encore";
}

function editorialRisk(row) {
  const text = `${row.notes} ${row.changements_2026_08_01 ?? ""}`.toLowerCase();
  if (/domaine réaffecté|allégations santé.*fortes|incohérent|ne pas recommander|pré-lancement|historique.*non confirmé|sku actuel non confirmé/.test(text)) return "élevé";
  if (row.statut_verification === "C" || /contradiction|mélange propriétaire|dose.*non publi|à confirmer/.test(text)) return "moyen à élevé";
  if (row.statut_verification === "B") return "moyen";
  return "faible à moyen";
}

function commercialStatus(row) {
  if (row.marque === "Cosmic Blend") return "non confirmé — produit introuvable sur le domaine";
  if (soldOut.has(row.marque)) return "épuisé lors du relevé";
  if (prelaunch.has(row.marque)) return "pré-lancement / accès anticipé";
  if (row.marque === "Om Mushroom Superfood") return "SKU actuel non confirmé";
  if (row.marque === "nu3") return "vente directe non confirmée; redirection détaillant";
  if (/rupture|épuisé/.test(`${row.prix_observe_2026_08_01} ${row.notes}`.toLowerCase())) return "rupture ou disponibilité incertaine";
  return row.statut_verification === "A" ? "actif — page officielle observée" : "page officielle observée; vente à reconfirmer";
}

function sourceState(row) {
  if (row.marque === "Cosmic Blend") return "domaine accessible mais produit non retrouvé";
  if (inaccessibleAutomation.has(row.marque)) return "accès automatisé limité; contrôle manuel recommandé";
  if (row.marque === "Café Intégral") return "page protégée par contrôle anti-robot";
  if (row.marque === "nu3") return "URL officielle redirigée vers un détaillant";
  if (row.source_officielle.endsWith(".pdf")) return "document officiel PDF accessible";
  return row.statut_verification === "C" ? "source officielle partielle ou produit non finalisé" : "source officielle accessible et revérifiée";
}

function mushroomPart(row, list) {
  const text = `${row.notes} ${row.dose_portion}`.toLowerCase();
  if (!list.length) return "non applicable";
  if (/corps fructifère.*mycélium|mycélium.*corps fructifère/.test(text)) return "mixte: corps fructifère et mycélium";
  if (/corps fructifère|fruiting bod/.test(text)) return "corps fructifère annoncé";
  if (/mycélium/.test(text)) return "mycélium annoncé";
  return "non publiée";
}

function extraction(row, list) {
  if (!list.length) return "non applicable";
  const text = `${row.notes} ${row.actifs_principaux}`.toLowerCase();
  if (/double extr/.test(text)) return "double extraction annoncée";
  if (/ultrason/.test(text)) return "extraction avec ultrasons annoncée";
  if (/infusion.*torréfaction|infusé.*grain/.test(text)) return "incorporation/infusion au niveau du grain";
  if (/extrait/.test(text)) return "extrait; méthode non détaillée";
  return "non publiée";
}

const extraHeaders = [
  "date_derniere_verification", "statut_commercial_actuel", "etat_source_officielle", "experience_boisson", "origine_cafe",
  "nombre_portions", "poids_conditionnement", "cafeine_mg_min", "cafeine_mg_max", "niveau_cafeine",
  "champignons_standardises", "nombre_champignons", "partie_champignon", "methode_extraction_infusion",
  "proteines_g", "collagene_g", "creatine_g", "mct_g", "sucres_edulcorants", "allergenes_regime", "preparation",
  "prix_par_portion_observe", "transparence_dosage", "preuve_laboratoire", "promesse_principale", "priorite_seo",
  "risque_editorial", "source_secondaire", "changements_2026_08_01"
];

let rows = parseCsv(fs.readFileSync(CSV_PATH, "utf8"));
const existingKeys = new Set(rows.map(key));
for (const row of newRows) {
  if (!existingKeys.has(key(row))) rows.push(row);
}

rows = rows.map((base) => {
  const row = { ...base, ...(updates[key(base)] ?? {}) };
  const list = mushrooms(row);
  const genericMushrooms = !list.length && /champignon|mushroom|ganoderma|lingzhi/i.test(`${row.classement} ${row.actifs_principaux}`);
  const [cmin, cmax] = parseCaffeine(row.cafeine_portion);
  const nutrientText = `${row.dose_portion}; ${row.notes}; ${row.actifs_principaux}`;
  const inferred = {
    date_derniere_verification: TODAY,
    statut_commercial_actuel: commercialStatus(row),
    etat_source_officielle: sourceState(row),
    experience_boisson: experience(row),
    origine_cafe: origin(row),
    nombre_portions: portions(row),
    poids_conditionnement: packWeight(row),
    cafeine_mg_min: cmin,
    cafeine_mg_max: cmax,
    niveau_cafeine: caffeineLevel(cmin, cmax),
    champignons_standardises: list.length ? list.join("; ") : (genericMushrooms ? "mélange non détaillé" : "non applicable"),
    nombre_champignons: list.length ? String(list.length) : (genericMushrooms ? "à confirmer" : "0"),
    partie_champignon: genericMushrooms ? "non publiée" : mushroomPart(row, list),
    methode_extraction_infusion: genericMushrooms ? "non publiée" : extraction(row, list),
    proteines_g: firstNumberNear(nutrientText, "protéines?|protein|whey"),
    collagene_g: firstNumberNear(nutrientText, "collagène|collagen"),
    creatine_g: firstNumberNear(nutrientText, "créatine|creatine"),
    mct_g: firstNumberNear(nutrientText, "MCT"),
    sucres_edulcorants: sweeteners(row),
    allergenes_regime: dietary(row),
    preparation: preparation(row),
    prix_par_portion_observe: pricePerServing(row),
    transparence_dosage: dosageTransparency(row),
    preuve_laboratoire: labProof(row),
    promesse_principale: promise(row),
    priorite_seo: editorialPriority(row),
    risque_editorial: editorialRisk(row),
    source_secondaire: "non publiée",
    changements_2026_08_01: row.changements_2026_08_01 || "aucun changement majeur identifié lors de la revérification"
  };
  return { ...row, ...inferred };
});

// Corrections ciblées des champs calculés lorsqu'une fiche officielle donne une valeur plus précise.
const precise = {
  "Bonjour|||Super Café": { nombre_portions: "30", poids_conditionnement: "180 g", prix_par_portion_observe: "0,76–1,49 € / portion", proteines_g: "non publié", allergenes_regime: "vegan; sans gluten; sans lactose annoncés", sucres_edulcorants: "sans sucre ni édulcorant annoncé", transparence_dosage: "partielle" },
  "Collafé|||Collagen Coffee Madagascan Vanilla": { nombre_portions: "30", collagene_g: "10 g + 40 mg UC-II", allergenes_regime: "contient poisson; non végétalien (bovin)", preparation: "diluer dans une eau à 60–70 °C", prix_par_portion_observe: "1,83 £ / portion" },
  "Corial|||Collagen Coffee Original": { nombre_portions: "15", collagene_g: "8,5 g", prix_par_portion_observe: "1,00 $ / portion" },
  "Everyday Dose|||Coffee+ Mild / Medium": { nombre_portions: "30", proteines_g: "4 à 5 g", collagene_g: "quantité incluse dans un mélange propriétaire", partie_champignon: "corps fructifère annoncé", preuve_laboratoire: "tests tiers annoncés; rapports à archiver" },
  "Rainbo|||Fungki Mushroom Coffee": { partie_champignon: "corps fructifère annoncé", methode_extraction_infusion: "extraits; méthode exacte à archiver", preuve_laboratoire: "bio et contrôle qualité annoncés; rapport à archiver" },
  "Strate|||Café adaptogène": { nombre_portions: "30", partie_champignon: "corps fructifère annoncé", methode_extraction_infusion: "extraits; méthode non détaillée" },
  "NuSpira|||NUCORE 6 Black Coffee": { nombre_portions: "30", prix_par_portion_observe: "1,20–1,50 $ / portion" },
  "Smart Coffee EU|||Functional Coffee": { nombre_portions: "25", collagene_g: "3,5 g", prix_par_portion_observe: "1,50–1,52 € / portion", allergenes_regime: "sans lactose; sans gluten; keto annoncés", preuve_laboratoire: "tests tiers par lot annoncés; rapport à archiver" },
  "MARESHI|||DRIVE": { creatine_g: "5 g", collagene_g: "5 g", preparation: "diluer dans 250 ml d'eau chaude" },
  "CREOFFEE|||Original": { creatine_g: "5 g", sucres_edulcorants: "sans sucre ni additifs annoncés", prix_par_portion_observe: "< 1,40 AUD / portion" },
  "CreatineCoffeee|||CreatineCoffee": { nombre_portions: "30 ou 90", creatine_g: "5 g", prix_par_portion_observe: "2,61–2,97 $ / portion" },
  "Day One Functional Coffees|||Creatine Coffee K-Cup": { creatine_g: "3 g", nombre_portions: "1 capsule = 1 portion" },
  "Bulletproof|||Coffee + Creatine": { creatine_g: "5 g", poids_conditionnement: "13,8 oz" },
  "Four Sigmatic|||The Boys™ Creatine Coffee": { nombre_portions: "26", creatine_g: "5 g", partie_champignon: "corps fructifère annoncé", prix_par_portion_observe: "1,53 $ / portion" },
  "VitaCup|||Creatine Coffee": { creatine_g: "5 g" },
  "Bulk|||Whey Protein Coffee": { proteines_g: "17 g", poids_conditionnement: "500 g ou 1 kg", allergenes_regime: "contient lait" },
  "Brain and Brawn|||Synergy Collagen Coffee": { nombre_portions: "20", poids_conditionnement: "300 g", collagene_g: "dose non publiée", mct_g: "dose non publiée", prix_par_portion_observe: "3,50 AUD / portion", allergenes_regime: "contient lait; non végétalien (bovin)" },
  "Rise & Shine|||Mushroom Coffee": { partie_champignon: "corps fructifère annoncé", collagene_g: "dose non publiée" },
  "Lyfe Mushrooms|||Mushroom Coffee": { nombre_champignons: "7", partie_champignon: "corps fructifère annoncé", preuve_laboratoire: "rapport de laboratoire par lot annoncé; à archiver" },
  "Zenergy Mushrooms|||Mushroom Coffee": { partie_champignon: "corps fructifère annoncé", methode_extraction_infusion: "double extraction annoncée", preuve_laboratoire: "standardisation ≥ 10 % bêta-glucanes annoncée; rapport à archiver" },
  "ProtéAlpes|||Whey Café sans sucres ajoutés": { allergenes_regime: "contient lait", sucres_edulcorants: "sans sucres ajoutés annoncé" }
  ,"Physalis|||Collagen Coffee": { nombre_portions: "12", collagene_g: "5 g", allergenes_regime: "contient poisson; sans gluten et sans lait annoncés", preparation: "diluer 1 sachet dans 150 ml d'eau chaude ou froide", sucres_edulcorants: "sans sucres ajoutés annoncé", source_secondaire: "https://www.physalishealth.com/en/blog/how-to-make-a-physalis-collagen-coffee/" }
  ,"Nature's Finest|||Collagen Coffee": { nombre_portions: "25", poids_conditionnement: "125 g", collagene_g: "2,5 g calculés à partir de 50 % de collagène dans une portion de 5 g", preparation: "diluer 5 g dans 200 ml d'eau tiède", sucres_edulcorants: "sans sucres ajoutés annoncé", source_secondaire: "https://www.naturesfinest.si/wp-content/uploads/2024/08/5638-Collagen-Coffee-doc.pdf" }
  ,"Bulletproof|||Coffee + Creatine": { creatine_g: "5 g", poids_conditionnement: "13,8 oz", source_secondaire: "https://www.prnewswire.com/news-releases/bulletproof-introduces-coffee--creatine-a-first-of-its-kind-functional-coffee-innovation-302696454.html" }
  ,"VitaCup|||Creatine Coffee": { creatine_g: "5 g", source_secondaire: "https://www.prnewswire.com/news-releases/vitacup-launches-first-of-its-kind-creatine-coffee-stick-packs-at-sprouts-farmers-market-in-stores-now-302732090.html" }
};

rows = rows.map((row) => ({ ...row, ...(precise[key(row)] ?? {}) }));

const originalHeaders = ["marque", "produit", "pays_marche", "format", "classement", "macro_categorie", "base_reelle", "actifs_principaux", "dose_portion", "cafeine_portion", "prix_observe_2026_08_01", "disponibilite_france", "affiliation_ou_contact", "source_officielle", "statut_verification", "notes"];
writeCsv(rows, [...originalHeaders, ...extraHeaders]);

console.log(JSON.stringify({ rows: rows.length, brands: new Set(rows.map((r) => r.marque)).size, headers: originalHeaders.length + extraHeaders.length, added: newRows.filter((r) => !existingKeys.has(key(r))).length }, null, 2));
