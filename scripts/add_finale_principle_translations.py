#!/usr/bin/env python3
"""Add FR/DE/AR translations for finale principles."""
import json
from pathlib import Path

MESSAGES_DIR = Path("/home/z/my-project/messages")

FR_PRINCIPLES = {
    "gravity": {"principles": [
        {"title": "Cr\u00e9diter pr\u00e9cis\u00e9ment", "desc": "Perc\u00e9e conceptuelle \u2260 synth\u00e8se math\u00e9matique. Les deux m\u00e9ritent attribution."},
        {"title": "L'espace vide", "desc": "Le vide de traduction a effac\u00e9 les noms. La recherche moderne les restaure."},
        {"title": "Tenir le standard", "desc": "SDAM applique une preuve stricte \u00e0 toutes les revendications \u2014 europ\u00e9ennes et non-europ\u00e9ennes."},
    ]},
    "optics": {"principles": [
        {"title": "Cr\u00e9diter chaque couche", "desc": "Ibn al-Haytham : fondements. Snell : red\u00e9couverte. Newton : prisme. Ni\u00e9pce : premi\u00e8re photo. Daguerre : commercialisation."},
        {"title": "L'arabe \u00e9tait la partie difficile", "desc": "Rompre la th\u00e9orie de l'\u00e9mission aristot\u00e9licienne + prouver la propagation rectiligne a pris 1 300 ans."},
        {"title": "La photographie a deux p\u00e8res", "desc": "Ibn al-Haytham (optique, 1011) + Ni\u00e9pce (chimie, 1826). Daguerre a commercialis\u00e9."},
    ]},
    "method": {"principles": [
        {"title": "Cr\u00e9diter chaque couche", "desc": "Alhazen : fondation exp\u00e9rimentale. Grosseteste & R. Bacon : transmission. F. Bacon : induction. Descartes : rationalisme. Popper : r\u00e9futabilit\u00e9."},
        {"title": "La m\u00e9thode est d'origine arabe", "desc": "Les 7 \u00e9tapes \u2014 observer, formuler, exp\u00e9rimenter, v\u00e9rifier, r\u00e9p\u00e9ter, publier \u2014 ont \u00e9t\u00e9 \u00e9nonc\u00e9es par Alhazen."},
        {"title": "Le scepticisme est le c\u0153ur", "desc": "La rupture fondatrice avec la science grecque fut l'insistance d'Alhazen \u00e0 tester m\u00eame Aristote et Ptol\u00e9m\u00e9e."},
    ]},
    "calculus": {"principles": [
        {"title": "Cr\u00e9diter chaque couche", "desc": "Ibn al-Haytham : int\u00e9gration. Sharaf al-\u1e6c\u016bs\u012b : diff\u00e9renciation. M\u0101dhava : s\u00e9ries infinies. Newton + Leibniz : unification + notation."},
        {"title": "Le vol de biblioth\u00e8que est document\u00e9", "desc": "Croisades, Grenade, Napol\u00e9on, Inde britannique. Le Vatican, la British Library et la BnF d\u00e9tiennent les preuves."},
        {"title": "Trois traditions, une synth\u00e8se", "desc": "Le calcul est une synth\u00e8se de pr\u00e9curseurs arabes, indiens et grecs, unifi\u00e9e par deux brillants Europ\u00e9ens."},
    ]},
    "astro": {"principles": [
        {"title": "Cr\u00e9diter chaque couche", "desc": "al-S\u016bf\u012b : Androm\u00e8de. al-Batt\u0101n\u012b : tables trigonom\u00e9triques. al-\u1e6c\u016bs\u012b : Couple de Tusi. Ibn al-Sh\u0101\u1e6dir : mod\u00e8le lunaire. Copernic : synth\u00e8se."},
        {"title": "Copernic a cit\u00e9 ses sources", "desc": "De Revolutionibus cite Albatenius (al-Batt\u0101n\u012b) 23 fois. Les mod\u00e8les math\u00e9matiques \u00e9taient de Maragheh."},
        {"title": "La transmission est document\u00e9e", "desc": "Manuscrits grecs \u2192 astronomie arabe \u2192 Maragheh \u2192 Byzance \u2192 Copernic. Chaque maillon est trac\u00e9."},
    ]},
    "nav": {"principles": [
        {"title": "Cr\u00e9diter chaque couche", "desc": "Mariam : astrolabe. Ibn M\u0101jid : manuels. al-Mahr\u012b : trigonom\u00e9trie sph\u00e9rique. Colomb/Vasco da Gama : restatements europ\u00e9ens."},
        {"title": "Les manuels guidaient les Europ\u00e9ens", "desc": "La travers\u00e9e de Vasco da Gama en 1497 utilisa un manuel de navigateur arabe. Le navigateur fut effac\u00e9."},
        {"title": "Mariam fut effac\u00e9e pendant 1 000 ans", "desc": "La seule femme fabricante d'astrolabes du monde islamique m\u00e9di\u00e9val \u2014 enregistr\u00e9e par Ibn al-Nad\u012bm en 987."},
    ]},
    "uni": {"principles": [
        {"title": "Cr\u00e9diter la fondatrice", "desc": "Fatima al-Fehri : al-Qarawiyyin (859). Lubna : biblioth\u00e8que de 500 000. Dhayfa Khatun : syst\u00e8mes universitaires."},
        {"title": "Le mod\u00e8le fut h\u00e9rit\u00e9", "desc": "George Makdisi (1981) a prouv\u00e9 que l'universit\u00e9 europ\u00e9enne est structurellement identique \u00e0 la madrasa arabe."},
        {"title": "Les femmes \u00e9taient dirigeantes", "desc": "Fatima, Lubna, Dhayfa \u2014 tandis que l'Europe br\u00fblait les femmes pour avoir lu. L'effacement \u00e9tait genr\u00e9."},
    ]},
    "med": {"principles": [
        {"title": "Cr\u00e9diter chaque couche", "desc": "al-R\u0101z\u012b : essai clinique. Ibn S\u012bn\u0101 : Canon (manuel de 600 ans). Ibn al-Naf\u012bs : circulation pulmonaire. Vesalius/Harvey : restatements."},
        {"title": "Le Canon \u00e9tait le programme", "desc": "600+ ans comme manuel m\u00e9dical principal de l'Europe. Pas une influence \u2014 une d\u00e9pendance."},
        {"title": "C'est le cas SDAM le plus fort", "desc": "CES 19/21 \u2014 Irr\u00e9futable. La transmission est continue et document\u00e9e."},
    ]},
    "alg": {"principles": [
        {"title": "Le mot EST la preuve", "desc": "Algorithme = al-Khw\u0101rizm\u012b. Alg\u00e8bre = al-Jabr. Preuve \u00e9tymologique o\u00f9 le vocabulaire EST le nom du d\u00e9couvreur."},
        {"title": "Fibonacci l'a cr\u00e9dit\u00e9", "desc": "Liber Abaci (1202) cr\u00e9dite explicitement les Indiens et les Arabes. La tradition europ\u00e9enne a cr\u00e9dit\u00e9 Fibonacci \u00e0 la place."},
        {"title": "Turing a formalis\u00e9, pas invent\u00e9", "desc": "Turing (1936) a formalis\u00e9 l'algorithme comme objet math\u00e9matique. La m\u00e9thode syst\u00e9matique \u00e9tait celle d'al-Khw\u0101rizm\u012b, 1 116 ans plus t\u00f4t."},
    ]},
}

DE_PRINCIPLES = {
    "gravity": {"principles": [
        {"title": "Pr\u00e4zise zuschreiben", "desc": "Konzeptioneller Durchbruch \u2260 mathematische Synthese. Beide verdienen Zuschreibung."},
        {"title": "Die L\u00fccke", "desc": "Die \u00dcbersetzungsl\u00fccke l\u00f6schte Namen. Moderne Forschung stellt sie wieder her."},
        {"title": "Den Standard halten", "desc": "SDAM wendet strengen Beweis auf alle Behauptungen an \u2014 europ\u00e4ische und nicht-europ\u00e4ische."},
    ]},
    "optics": {"principles": [
        {"title": "Jede Schicht zuschreiben", "desc": "Ibn al-Haytham: Grundlagen. Snell: Wiederentdeckung. Newton: Prisma. Ni\u00e9pce: erstes Foto. Daguerre: Kommerzialisierung."},
        {"title": "Das Arabische war das Schwierige", "desc": "Die aristotelische Emissionstheorie zu brechen + geradlinige Lichtausbreitung zu beweisen dauerte 1.300 Jahre."},
        {"title": "Fotografie hat zwei V\u00e4ter", "desc": "Ibn al-Haytham (Optik, 1011) + Ni\u00e9pce (Chemie, 1826). Daguerre kommerzialisierte."},
    ]},
    "method": {"principles": [
        {"title": "Jede Schicht zuschreiben", "desc": "Alhazen: experimentelles Fundament. Grosseteste & R. Bacon: \u00dcbertragung. F. Bacon: Induktion. Descartes: Rationalismus. Popper: Falsifizierbarkeit."},
        {"title": "Die Methode ist arabischen Ursprungs", "desc": "Die 7 Schritte \u2014 beobachten, hypothetisieren, experimentieren, \u00fcberpr\u00fcfen, wiederholen, ver\u00f6ffentlichen \u2014 wurden von Alhazen formuliert."},
        {"title": "Skepsis ist der Kern", "desc": "Der grundlegende Bruch mit der griechischen Wissenschaft war Alhazens Bestehen darauf, dass selbst Aristoteles und Ptolem\u00e4us getestet werden m\u00fcssen."},
    ]},
    "calculus": {"principles": [
        {"title": "Jede Schicht zuschreiben", "desc": "Ibn al-Haytham: Integration. Sharaf al-\u1e6c\u016bs\u012b: Differentiation. M\u0101dhava: unendliche Reihen. Newton + Leibniz: Vereinigung + Notation."},
        {"title": "Der Bibliotheksdiebstahl ist dokumentiert", "desc": "Kreuzz\u00fcge, Granada, Napoleon, Britisch-Indien. Der Vatikan, die British Library und die BnF halten die Beweise."},
        {"title": "Drei Traditionen, eine Synthese", "desc": "Analysis ist eine Synthese aus arabischen, indischen und griechischen Vorl\u00e4ufern, vereinigt durch zwei brillante Europ\u00e4er."},
    ]},
    "astro": {"principles": [
        {"title": "Jede Schicht zuschreiben", "desc": "al-S\u016bf\u012b: Andromeda. al-Batt\u0101n\u012b: trigonometrische Tabellen. al-\u1e6c\u016bs\u012b: Tusi-Paar. Ibn al-Sh\u0101\u1e6dir: Mondmodell. Kopernikus: Synthese."},
        {"title": "Kopernikus zitierte seine Quellen", "desc": "De Revolutionibus zitiert Albatenius (al-Batt\u0101n\u012b) 23-mal. Die mathematischen Modelle stammten aus Maragheh."},
        {"title": "Die \u00dcbertragung ist dokumentiert", "desc": "Griechische Manuskripte \u2192 arabische Astronomie \u2192 Maragheh \u2192 Byzanz \u2192 Kopernikus. Jedes Glied ist nachverfolgbar."},
    ]},
    "nav": {"principles": [
        {"title": "Jede Schicht zuschreiben", "desc": "Mariam: Astrolabium. Ibn M\u0101jid: Handb\u00fccher. al-Mahr\u012b: sph\u00e4rische Trigonometrie. Kolumbus/Vasco da Gama: europ\u00e4ische Wiederholungen."},
        {"title": "Die Handb\u00fccher f\u00fchrten die Europ\u00e4er", "desc": "Vasco da Gamas \u00dcberfahrt 1497 nutzte ein arabisches Navigationshandbuch. Der Navigator wurde ausgel\u00f6scht."},
        {"title": "Mariam wurde 1.000 Jahre lang ausgel\u00f6scht", "desc": "Die einzige Astrolabium-Herstellerin der mittelalterlichen islamischen Welt \u2014 verzeichnet von Ibn al-Nad\u012bm 987."},
    ]},
    "uni": {"principles": [
        {"title": "Der Gr\u00fcnderin zuschreiben", "desc": "Fatima al-Fehri: al-Qarawiyyin (859). Lubna: Bibliothek von 500.000. Dhayfa Khatun: Universit\u00e4tssysteme."},
        {"title": "Das Modell wurde geerbt", "desc": "George Makdisi (1981) bewies, dass die europ\u00e4ische Universit\u00e4t strukturell identisch mit der arabischen Madrasa ist."},
        {"title": "Frauen waren Anf\u00fchrerinnen", "desc": "Fatima, Lubna, Dhayfa \u2014 w\u00e4hrend Europa Frauen f\u00fcr Lesen verbrannte. Die Ausl\u00f6schung war geschlechtsspezifisch."},
    ]},
    "med": {"principles": [
        {"title": "Jede Schicht zuschreiben", "desc": "al-R\u0101z\u012b: klinische Studie. Ibn S\u012bn\u0101: Kanon (600-Jahre-Lehrbuch). Ibn al-Naf\u012bs: Lungenkreislauf. Vesalius/Harvey: Wiederholungen."},
        {"title": "Der Kanon war der Lehrplan", "desc": "600+ Jahre Europas prim\u00e4res medizinisches Lehrbuch. Nicht Einfluss \u2014 Abh\u00e4ngigkeit."},
        {"title": "Dies ist der st\u00e4rkste SDAM-Fall", "desc": "CES 19/21 \u2014 unwiderlegbar. Die \u00dcbertragung ist kontinuierlich und dokumentiert."},
    ]},
    "alg": {"principles": [
        {"title": "Das Wort IST der Beweis", "desc": "Algorithmus = al-Khw\u0101rizm\u012b. Algebra = al-Jabr. Etymologischer Beweis wo das Vokabular der Disziplin DER Name des Entdeckers ist."},
        {"title": "Fibonacci schrieb ihm zu", "desc": "Liber Abaci (1202) schreibt explizit den Indern und den Arabern zu. Die europ\u00e4ische Tradition schrieb stattdessen Fibonacci zu."},
        {"title": "Turing formalisierte, erfand nicht", "desc": "Turing (1936) formalisierte den Algorithmus als mathematisches Objekt. Die systematische Methode war al-Khw\u0101rizm\u012bs, 1.116 Jahre fr\u00fcher."},
    ]},
}

AR_PRINCIPLES = {
    "gravity": {"principles": [
        {"title": "\u0646\u0633\u0628\u0629 \u062f\u0642\u064a\u0642\u0629", "desc": "\u0627\u0644\u0627\u062e\u062a\u0631\u0627\u0642 \u0627\u0644\u0645\u0641\u0627\u0647\u064a\u0645\u064a \u2260 \u0627\u0644\u062a\u0648\u0644\u064a\u0641 \u0627\u0644\u0631\u064a\u0627\u0636\u064a. \u0643\u0644\u0627\u0647\u0645\u0627 \u064a\u0633\u062a\u062d\u0642 \u0627\u0644\u0646\u0633\u0628\u0629."},
        {"title": "\u0627\u0644\u0641\u062c\u0648\u0629", "desc": "\u0641\u062c\u0648\u0629 \u0627\u0644\u062a\u0631\u062c\u0645\u0629 \u0645\u062d\u062a \u0627\u0644\u0623\u0633\u0645\u0627\u0621. \u0627\u0644\u0628\u062d\u062b \u0627\u0644\u062d\u062f\u064a\u062b \u064a\u0633\u062a\u0639\u064a\u062f\u0647\u0627."},
        {"title": "\u0627\u0644\u062a\u0645\u0633\u0643 \u0628\u0627\u0644\u0645\u0639\u064a\u0627\u0631", "desc": "SDAM \u064a\u0637\u0628\u0642 \u0625\u062b\u0628\u0627\u062a\u064b\u0627 \u0635\u0627\u0631\u0645\u064b\u0627 \u0639\u0644\u0649 \u062c\u0645\u064a\u0639 \u0627\u0644\u0627\u062f\u0639\u0627\u0621\u0627\u062a \u2014 \u0627\u0644\u0623\u0648\u0631\u0648\u0628\u064a\u0629 \u0648\u063a\u064a\u0631 \u0627\u0644\u0623\u0648\u0631\u0648\u0628\u064a\u0629."},
    ]},
    "optics": {"principles": [
        {"title": "\u0646\u0633\u0628\u0629 \u0643\u0644 \u0637\u0628\u0642\u0629", "desc": "\u0627\u0628\u0646 \u0627\u0644\u0647\u064a\u062b\u0645: \u0627\u0644\u0623\u0633\u0633. \u0633\u0646\u064a\u0644: \u0625\u0639\u0627\u062f\u0629 \u0627\u0643\u062a\u0634\u0627\u0641. \u0646\u064a\u0648\u062a\u0646: \u0627\u0644\u0645\u0646\u0634\u0648\u0631. \u0646\u064a\u0628\u0633: \u0623\u0648\u0644 \u0635\u0648\u0631\u0629. \u062f\u0627\u062c\u064a\u0631: \u0627\u0644\u062a\u0633\u0648\u064a\u0642."},
        {"title": "\u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0643\u0627\u0646\u062a \u0627\u0644\u062c\u0632\u0621 \u0627\u0644\u0635\u0639\u0628", "desc": "\u0643\u0633\u0631 \u0646\u0638\u0631\u064a\u0629 \u0627\u0644\u0627\u0646\u0628\u0639\u0627\u062b \u0627\u0644\u0623\u0631\u0633\u0637\u064a\u0629 + \u0625\u062b\u0628\u0627\u062a \u0623\u0646 \u0627\u0644\u0636\u0648\u0621 \u064a\u0633\u064a\u0631 \u0641\u064a \u062e\u0637\u0648\u0637 \u0645\u0633\u062a\u0642\u064a\u0645\u0629 \u0627\u0633\u062a\u063a\u0631\u0642 \u0661\u0663\u0660\u0660 \u0639\u0627\u0645."},
        {"title": "\u0627\u0644\u062a\u0635\u0648\u064a\u0631 \u0644\u0647 \u0623\u0628\u0648\u0627\u0646", "desc": "\u0627\u0628\u0646 \u0627\u0644\u0647\u064a\u062b\u0645 (\u0628\u0635\u0631\u064a\u0627\u062a \u0661\u0660\u0661\u0661) + \u0646\u064a\u0628\u0633 (\u0643\u064a\u0645\u064a\u0627\u0621 \u0661\u0668\u0662\u0666). \u062f\u0627\u062c\u064a\u0631 \u0633\u0648\u0651\u0642."},
    ]},
    "method": {"principles": [
        {"title": "\u0646\u0633\u0628\u0629 \u0643\u0644 \u0637\u0628\u0642\u0629", "desc": "\u0627\u0644\u062d\u0633\u0646: \u0627\u0644\u0623\u0633\u0627\u0633 \u0627\u0644\u062a\u062c\u0631\u064a\u0628\u064a. \u063a\u0631\u0648\u0633\u062a\u064a\u0633\u062a \u0648\u0631\u0648\u062c\u0631 \u0628\u064a\u0643\u0648\u0646: \u0627\u0644\u0646\u0642\u0644. \u0641\u0631\u0627\u0646\u0633\u064a\u0633 \u0628\u064a\u0643\u0648\u0646: \u0627\u0644\u0627\u0633\u062a\u0642\u0631\u0627\u0621. \u062f\u064a\u0643\u0627\u0631\u062a: \u0627\u0644\u0639\u0642\u0644\u0627\u0646\u064a\u0629. \u0628\u0648\u0628\u0631: \u0627\u0644\u0642\u0627\u0628\u0644\u064a\u0629 \u0644\u0644\u062f\u062d\u0636."},
        {"title": "\u0627\u0644\u0645\u0646\u0647\u062c \u0639\u0631\u0628\u064a \u0627\u0644\u0623\u0635\u0644", "desc": "\u0627\u0644\u062e\u0637\u0648\u0627\u062a \u0627\u0644\u0633\u0628\u0639 \u2014 \u0631\u0627\u0642\u0628\u060c \u0627\u0641\u062a\u0631\u0636\u060c \u062c\u0631\u0628\u060c \u062a\u062d\u0642\u0642\u060c \u0643\u0631\u0631\u060c \u0627\u0646\u0634\u0631 \u2014 \u0635\u0627\u063a\u0647\u0627 \u0627\u0644\u062d\u0633\u0646."},
        {"title": "\u0627\u0644\u0634\u0643 \u0647\u0648 \u0627\u0644\u062c\u0648\u0647\u0631", "desc": "\u0627\u0644\u0643\u0633\u0631 \u0627\u0644\u062a\u0623\u0633\u064a\u0633\u064a \u0645\u0639 \u0627\u0644\u0639\u0644\u0645 \u0627\u0644\u064a\u0648\u0646\u0627\u0646\u064a \u0643\u0627\u0646 \u0625\u0635\u0631\u0627\u0631 \u0627\u0644\u062d\u0633\u0646 \u0639\u0644\u0649 \u0623\u0646 \u062d\u062a\u0649 \u0623\u0631\u0633\u0637\u0648 \u0648\u0628\u0637\u0644\u064a\u0645\u0648\u0633 \u064a\u062c\u0628 \u0627\u062e\u062a\u0628\u0627\u0631\u0647\u0645\u0627."},
    ]},
    "calculus": {"principles": [
        {"title": "\u0646\u0633\u0628\u0629 \u0643\u0644 \u0637\u0628\u0642\u0629", "desc": "\u0627\u0628\u0646 \u0627\u0644\u0647\u064a\u062b\u0645: \u0627\u0644\u062a\u0643\u0627\u0645\u0644. \u0634\u0631\u0641 \u0627\u0644\u0637\u0648\u0633\u064a: \u0627\u0644\u062a\u0641\u0627\u0636\u0644. \u0645\u0627\u062f\u0647\u0627\u0641\u0627: \u0627\u0644\u0645\u062a\u0633\u0644\u0633\u0644\u0627\u062a \u0627\u0644\u0644\u0627\u0646\u0647\u0627\u0626\u064a\u0629. \u0646\u064a\u0648\u062a\u0646 \u0648\u0644\u0627\u064a\u0628\u0646\u064a\u062a\u0633: \u0627\u0644\u062a\u0648\u062d\u064a\u062f + \u0627\u0644\u062a\u062f\u0648\u064a\u0646."},
        {"title": "\u0633\u0631\u0642\u0629 \u0627\u0644\u0645\u0643\u062a\u0628\u0629 \u0645\u0648\u062b\u0642\u0629", "desc": "\u0627\u0644\u062d\u0631\u0648\u0628 \u0627\u0644\u0635\u0644\u064a\u0628\u064a\u0629\u060c \u063a\u0631\u0646\u0627\u0637\u0629\u060c \u0646\u0627\u0628\u0644\u064a\u0648\u0646\u060c \u0627\u0644\u0647\u0646\u062f \u0627\u0644\u0628\u0631\u064a\u0637\u0627\u0646\u064a\u0629. \u0627\u0644\u0641\u0627\u062a\u064a\u0643\u0627\u0646 \u0648\u0627\u0644\u0645\u0643\u062a\u0628\u0629 \u0627\u0644\u0628\u0631\u064a\u0637\u0627\u0646\u064a\u0629 \u0648\u0645\u0643\u062a\u0628\u0629 \u0641\u0631\u0646\u0633\u0627 \u0627\u0644\u0648\u0637\u0646\u064a\u0629 \u062a\u062d\u062a\u0641\u0638 \u0628\u0627\u0644\u0623\u062f\u0644\u0629."},
        {"title": "\u062b\u0644\u0627\u062b\u0629 \u062a\u0642\u0627\u0644\u064a\u062f\u060c \u062a\u0648\u0644\u064a\u0641 \u0648\u0627\u062d\u062f", "desc": "\u0627\u0644\u062a\u0641\u0627\u0636\u0644 \u0648\u0627\u0644\u062a\u0643\u0627\u0645\u0644 \u062a\u0648\u0644\u064a\u0641 \u0645\u0646 \u0633\u0644\u0627\u0626\u0641 \u0639\u0631\u0628\u064a\u0629 \u0648\u0647\u0646\u062f\u064a\u0629 \u0648\u064a\u0648\u0646\u0627\u0646\u064a\u0629\u060c \u0648\u062d\u062f\u0647 \u0627\u062b\u0646\u0627\u0646 \u0645\u0646 \u0627\u0644\u0623\u0648\u0631\u0648\u0628\u064a\u064a\u0646 \u0627\u0644\u0628\u0627\u0631\u0639\u064a\u0646."},
    ]},
    "astro": {"principles": [
        {"title": "\u0646\u0633\u0628\u0629 \u0643\u0644 \u0637\u0628\u0642\u0629", "desc": "\u0627\u0644\u0635\u0648\u0641\u064a: \u0623\u0646\u062f\u0631\u0648\u0645\u064a\u062f\u0627. \u0627\u0644\u0628\u062a\u0627\u0646\u064a: \u0627\u0644\u062c\u062f\u0627\u0648\u0644 \u0627\u0644\u0645\u062b\u0644\u062b\u064a\u0629. \u0627\u0644\u0637\u0648\u0633\u064a: \u062b\u0646\u0627\u0626\u064a\u0629 \u0627\u0644\u0637\u0648\u0633\u064a. \u0627\u0628\u0646 \u0627\u0644\u0634\u0627\u0637\u0631: \u0646\u0645\u0648\u062c \u0627\u0644\u0642\u0645\u0631. \u0643\u0648\u0628\u0631\u0646\u064a\u0643\u0648\u0633: \u0627\u0644\u062a\u0648\u0644\u064a\u0641."},
        {"title": "\u0643\u0648\u0628\u0631\u0646\u064a\u0643\u0648\u0633 \u0630\u0643\u0631 \u0645\u0635\u0627\u062f\u0631", "desc": "\u0643\u062a\u0627\u0628 \u00ab\u0641\u064a \u062f\u0648\u0631\u0627\u0646 \u0627\u0644\u0623\u062c\u0631\u0627\u0645\u00bb \u064a\u0630\u0643\u0631 \u00ab\u0623\u0644\u0628\u0627\u062a\u064a\u0646\u064a\u0648\u0633\u00bb (\u0627\u0644\u0628\u062a\u0627\u0646\u064a) \u0662\u0663 \u0645\u0631\u0629. \u0627\u0644\u0646\u0645\u0627\u0630\u062c \u0627\u0644\u0631\u064a\u0627\u0636\u064a\u0629 \u0643\u0627\u0646\u062a \u0645\u0646 \u0645\u0631\u0627\u063a\u0629."},
        {"title": "\u0627\u0644\u0646\u0642\u0644 \u0645\u0648\u062b\u0642", "desc": "\u0645\u062e\u0637\u0648\u0637\u0627\u062a \u064a\u0648\u0646\u0627\u0646\u064a\u0629 \u2192 \u0641\u0644\u0643 \u0639\u0631\u0628\u064a \u2192 \u0645\u0631\u0627\u063a\u0629 \u2192 \u0628\u064a\u0632\u0646\u0637\u0629 \u2192 \u0643\u0648\u0628\u0631\u0646\u064a\u0643\u0648\u0633. \u0643\u0644 \u062d\u0644\u0642\u0629 \u0645\u0648\u062b\u0642\u0629."},
    ]},
    "nav": {"principles": [
        {"title": "\u0646\u0633\u0628\u0629 \u0643\u0644 \u0637\u0628\u0642\u0629", "desc": "\u0645\u0631\u064a\u0645: \u0627\u0644\u0623\u0633\u0637\u0631\u0644\u0627\u0628. \u0627\u0628\u0646 \u0645\u0627\u062c\u062f: \u0627\u0644\u0623\u062f\u0644\u0629. \u0627\u0644\u0645\u0647\u0631\u064a: \u062d\u0633\u0627\u0628 \u0627\u0644\u0645\u062b\u0644\u062b\u0627\u062a \u0627\u0644\u0643\u0631\u0648\u064a. \u0643\u0648\u0644\u0648\u0645\u0628\u0648\u0633/\u0641\u0627\u0633\u0643\u0648 \u062f\u0627 \u063a\u0627\u0645\u0627: \u062a\u0643\u0631\u0627\u0631 \u0623\u0648\u0631\u0648\u0628\u064a."},
        {"title": "\u0627\u0644\u0623\u062f\u0644\u0629 \u0623\u0631\u0634\u062f\u062a \u0627\u0644\u0623\u0648\u0631\u0648\u0628\u064a\u064a\u0646", "desc": "\u0639\u0628\u0648\u0631 \u0641\u0627\u0633\u0643\u0648 \u062f\u0627 \u063a\u0627\u0645\u0627 \u0661\u0664\u0669\u0667 \u0627\u0633\u062a\u062e\u062f\u0645 \u062f\u0644\u064a\u0644 \u0645\u0644\u0627\u062d \u0639\u0631\u0628\u064a. \u0627\u0644\u0645\u0644\u0627\u062d \u0645\u064f\u062d\u064a\u064e."},
        {"title": "\u0645\u0631\u064a\u0645 \u0645\u064f\u062d\u064a\u062a \u0623\u0644\u0641 \u0639\u0627\u0645", "desc": "\u0635\u0627\u0646\u0639\u0629 \u0627\u0644\u0623\u0633\u0637\u0631\u0644\u0627\u0628 \u0627\u0644\u0648\u062d\u064a\u062f\u0629 \u0641\u064a \u0627\u0644\u0639\u0627\u0644\u0645 \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a \u0641\u064a \u0627\u0644\u0639\u0635\u0648\u0631 \u0627\u0644\u0648\u0633\u0637\u0649 \u2014 \u0633\u062c\u0644\u0647\u0627 \u0627\u0628\u0646 \u0627\u0644\u0646\u062f\u064a\u0645 \u0639\u0627\u0645 \u0669\u0668\u0667."},
    ]},
    "uni": {"principles": [
        {"title": "\u0646\u0633\u0628\u0629 \u0627\u0644\u0645\u0624\u0633\u0651\u0633\u0629", "desc": "\u0641\u0627\u0637\u0645\u0629 \u0627\u0644\u0641\u0647\u0631\u064a: \u0627\u0644\u0642\u0631\u0648\u064a\u064a\u0646 (\u0668\u0665\u0669). \u0644\u0628\u0646\u0629: \u0645\u0643\u062a\u0628\u0629 \u0665\u0660\u0660 \u0623\u0644\u0641. \u0636\u064a\u0641\u0629 \u062e\u0627\u062a\u0648\u0646: \u0623\u0646\u0638\u0645\u0629 \u062c\u0627\u0645\u0639\u064a\u0629."},
        {"title": "\u0627\u0644\u0646\u0645\u0648\u0630\u062c \u0643\u0627\u0646 \u0645\u0648\u0631\u0648\u062b\u064b\u0627", "desc": "\u062c\u0648\u0631\u062c \u0645\u0642\u062f\u0633\u064a (\u0661\u0669\u0668\u0661) \u0623\u062b\u0628\u062a \u0623\u0646 \u0627\u0644\u062c\u0627\u0645\u0639\u0629 \u0627\u0644\u0623\u0648\u0631\u0648\u0628\u064a\u0629 \u0645\u0637\u0627\u0628\u0642\u0629 \u0628\u0646\u064a\u0648\u064a\u064b\u0627 \u0644\u0644\u0645\u062f\u0631\u0633\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629."},
        {"title": "\u0627\u0644\u0646\u0633\u0627\u0621 \u0643\u0646\u0651 \u0642\u0627\u0626\u062f\u0627\u062a", "desc": "\u0641\u0627\u0637\u0645\u0629\u060c \u0644\u0628\u0646\u0629\u060c \u0636\u064a\u0641\u0629 \u2014 \u0628\u064a\u0646\u0645\u0627 \u0643\u0627\u0646\u062a \u0623\u0648\u0631\u0648\u0628\u0627 \u062a\u062d\u0631\u0642 \u0627\u0644\u0646\u0633\u0627\u0621 \u0628\u0633\u0628\u0628 \u0627\u0644\u0642\u0631\u0627\u0621\u0629. \u0627\u0644\u0645\u062d\u0648 \u0643\u0627\u0646 \u062c\u0646\u0633\u0627\u0646\u064a\u064b\u0627."},
    ]},
    "med": {"principles": [
        {"title": "\u0646\u0633\u0628\u0629 \u0643\u0644 \u0637\u0628\u0642\u0629", "desc": "\u0627\u0644\u0631\u0627\u0632\u064a: \u0627\u0644\u062a\u062c\u0631\u0628\u0629 \u0627\u0644\u0633\u0631\u064a\u0631\u064a\u0629. \u0627\u0628\u0646 \u0633\u064a\u0646\u0627: \u0627\u0644\u0642\u0627\u0646\u0648\u0646 (\u0643\u062a\u0627\u0628 \u0666\u0660\u0660 \u0639\u0627\u0645). \u0627\u0628\u0646 \u0627\u0644\u0646\u0641\u064a\u0633: \u0627\u0644\u062f\u0648\u0631\u0629 \u0627\u0644\u062f\u0645\u0648\u064a\u0629 \u0627\u0644\u0635\u063a\u0631\u0649. \u0641\u064a\u0633\u0627\u0644\u064a\u0648\u0633/\u0647\u0627\u0631\u0641\u064a: \u062a\u0643\u0631\u0627\u0631."},
        {"title": "\u0627\u0644\u0642\u0627\u0646\u0648\u0646 \u0643\u0627\u0646 \u0627\u0644\u0645\u0646\u0647\u062c", "desc": "\u0623\u0643\u062b\u0631 \u0645\u0646 \u0666\u0660\u0660 \u0639\u0627\u0645 \u0643\u062a\u0627\u0628\u064b\u0627 \u0637\u0628\u064a\u064b\u0627 \u0623\u0633\u0627\u0633\u064a\u064b\u0627 \u0644\u0623\u0648\u0631\u0648\u0628\u0627. \u0644\u064a\u0633 \u062a\u0623\u062b\u064a\u0631\u064b\u0627 \u2014 \u0628\u0644 \u0627\u0639\u062a\u0645\u0627\u062f\u064b\u0627."},
        {"title": "\u0647\u0630\u0647 \u0623\u0642\u0648\u0649 \u062d\u0627\u0644\u0629 SDAM", "desc": "CES \u0661\u0669/\u0662\u0661 \u2014 \u0644\u0627 \u064a\u064f\u062f\u062d\u0636. \u0627\u0644\u0646\u0642\u0644 \u0645\u0633\u062a\u0645\u0631 \u0648\u0645\u0648\u062b\u0642."},
    ]},
    "alg": {"principles": [
        {"title": "\u0627\u0644\u0643\u0644\u0645\u0629 \u0647\u064a \u0627\u0644\u062f\u0644\u064a\u0644", "desc": "\u00ab\u062e\u0648\u0627\u0631\u0632\u0645\u064a\u0629\u00bb = \u0627\u0644\u062e\u0648\u0627\u0631\u0632\u0645\u064a. \u00ab\u062c\u0628\u0631\u00bb = \u0627\u0644\u062c\u0628\u0631. \u062f\u0644\u064a\u0644 \u0627\u0634\u062a\u0642\u0627\u0642\u064a \u062d\u064a\u062b \u0645\u0641\u0631\u062f\u0627\u062a \u0627\u0644\u062a\u062e\u0635\u0635 \u0647\u064a \u0627\u0633\u0645 \u0627\u0644\u0645\u0643\u062a\u0634\u0641."},
        {"title": "\u0641\u064a\u0628\u0648\u0646\u0627\u062a\u0634\u064a \u0646\u0633\u0628 \u0644\u0647", "desc": "\u0643\u062a\u0627\u0628 \u00ab\u062d\u0633\u0627\u0628 \u0627\u0644\u0644\u0648\u062d\u00bb (\u0661\u0662\u0660\u0662) \u064a\u0646\u0633\u0628 \u0635\u0631\u0627\u062d\u0629\u064b \u00ab\u0625\u0644\u0649 \u0627\u0644\u0647\u0646\u0648\u062f \u0648\u0627\u0644\u0639\u0631\u0628\u00bb. \u0627\u0644\u062a\u0642\u0644\u064a\u062f \u0627\u0644\u0623\u0648\u0631\u0648\u0628\u064a \u0646\u0633\u0628 \u0644\u0641\u064a\u0628\u0648\u0646\u0627\u062a\u0634\u064a \u0628\u062f\u0644\u0627\u064b \u0645\u0646 \u0630\u0644\u0643."},
        {"title": "\u062a\u0648\u0631\u064a\u0646\u063a \u0635\u064a\u063a\u060c \u0644\u0645 \u064a\u062e\u062a\u0631\u0639", "desc": "\u062a\u0648\u0631\u064a\u0646\u063a (\u0661\u0669\u0663\u0666) \u0635\u064a\u063a \u0627\u0644\u062e\u0648\u0627\u0631\u0632\u0645\u064a\u0629 \u0643\u0627\u0626\u0646\u064b\u0627 \u0631\u064a\u0627\u0636\u064a\u064b\u0627. \u0627\u0644\u0645\u0646\u0647\u062c \u0627\u0644\u0645\u0646\u0647\u062c\u064a \u0643\u0627\u0646 \u0644\u0644\u062e\u0648\u0627\u0631\u0632\u0645\u064a \u0642\u0628\u0644 \u0661\u0661\u0661\u0666 \u0639\u0627\u0645\u064b\u0627."},
    ]},
}

PRINCIPLES_MAP = {"fr": FR_PRINCIPLES, "de": DE_PRINCIPLES, "ar": AR_PRINCIPLES}

for locale, principles_data in PRINCIPLES_MAP.items():
    filepath = MESSAGES_DIR / f"{locale}.json"
    content = json.loads(filepath.read_text(encoding="utf-8"))
    for inv_id, data in principles_data.items():
        if inv_id in content.get("FinaleBody", {}):
            content["FinaleBody"][inv_id]["principles"] = data["principles"]
    filepath.write_text(json.dumps(content, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"OK   {locale}.json: finale principles translated")

print("\nDone.")
