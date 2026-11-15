# Électricité de Strasbourg

Die Ökostrom-Festpreisangebote von ÉS (Électricité de Strasbourg) für die Energieüberwachung von Gladys:
Base, Nebenzeit und die Week-end-Optionen, mit oder ohne die Option 100 % regional.

## Was die Integration macht

Sie fügt dem Vertragsassistenten von Gladys acht Vertragsvorlagen hinzu und liefert Gladys die
landesweiten französischen Feiertage, die die Week-end-Optionen brauchen. Gladys berechnet dann die
Kosten deines Verbrauchs selbst, aus dem Zähler, den du bereits verfolgst (Linky, TIC, Stromzange…).

Die Integration verbindet sich mit nichts: weder mit deinem ÉS-Kundenbereich noch mit dem Internet. Es
sind keine Zugangsdaten einzugeben.

## Die Verträge

| Vorlage in Gladys                                          | ÉS-Vertrag                                  | kWh-Preise          |
| ---------------------------------------------------------- | ------------------------------------------- | ------------------- |
| ÉS Ökostrom Festpreis 1 Jahr – Base                        | Offre verte à prix fixe 1 an                | Die deines Vertrags |
| ÉS Ökostrom Festpreis 1 Jahr – Nebenzeit                   | Offre verte à prix fixe 1 an                | Die deines Vertrags |
| ÉS Ökostrom Festpreis 1 Jahr – Wochenende                  | Offre verte, Option Week-end Base           | Die deines Vertrags |
| ÉS Ökostrom Festpreis 1 Jahr – Wochenende + Nebenzeit      | Offre verte, Week-end et Heures Creuses     | Die deines Vertrags |
| ÉS Ökostrom 100 % regional 1 Jahr – Base                   | Offre électricité verte 100 % régionale     | Die deines Vertrags |
| ÉS Ökostrom 100 % regional 1 Jahr – Nebenzeit              | Offre électricité verte 100 % régionale     | Die deines Vertrags |
| ÉS Ökostrom 100 % regional 1 Jahr – Wochenende             | 100 % régionale, Option Week-end Base       | Die deines Vertrags |
| ÉS Ökostrom 100 % regional 1 Jahr – Wochenende + Nebenzeit | 100 % régionale, Week-end et Heures Creuses | Die deines Vertrags |

Der Name deines Vertrags und seine Option stehen auf der Vorderseite deiner ÉS-Rechnung unter „option
tarifaire“.

**Du hast den regulierten Tarif Bleu?** Er ist nicht in dieser Integration: wähle im selben Assistenten
die Vorlagen „Électricité de Strasbourg“ aus dem Community-Katalog von Gladys. Es gibt sie für jede
Anschlussleistung, mit der Preishistorie.

Die Angebote für Gewerbekunden sind nicht abgedeckt.

## Einen Vertrag anlegen

1. Öffne **Integrationen → Energieüberwachung → Verträge** und lege einen Vertrag für deinen Zähler an.
2. Wähle die „ÉS“-Vorlage, die zu deiner Rechnung passt.
3. Prüfe die vorgeschlagenen Werte:
   - **Monatliche Grundgebühr**: vorbelegt für 6 kVA. Die
     Tabelle nach Anschlussleistung steht unter dem Feld: trage deinen Betrag ein.
   - **Nebenzeiten**: die deines Zählers, festgelegt von Strasbourg Électricité Réseaux (8 Stunden pro
     Tag, oft 22 bis 6 Uhr). Sie stehen auf deiner Rechnung.
   - **kWh-Preise**: diese Angebote haben einen ab Vertragsabschluss ein Jahr
     festen Preis. Die Felder sind mit der aktuellen Tabelle vorbelegt: ersetze sie durch die Preise
     deines Vertrags, wenn sie abweichen.
4. Wähle das Startdatum des Vertrags, sieh dir die Vorschau an, speichere.

Alle Preise sind Bruttopreise.

Bei der jährlichen Verlängerung teilt ÉS dir neue Preise mit: lege dann in Gladys ab diesem Datum einen
neuen Vertrag mit diesen Preisen an.

## Die Week-end-Optionen und die Feiertage

Mit den Week-end-Optionen gilt der günstigere Preis von Samstag 0 Uhr bis Sonntag Mitternacht und an
landesweiten Feiertagen. Karfreitag und der 26. Dezember, Feiertage nur im Elsass, rechnet ÉS wie
Werktage ab: die Integration ebenso.

Die Integration veröffentlicht diese Feiertage im Kalender `holidays-fr` von Gladys. Liefert bereits
eine andere Integration diesen Kalender, behält sie ihn und die ÉS-Vorlagen lesen ihre Werte. Prüfe
dann, dass sie die Feiertage von Elsass-Mosel nicht mitzählt.

## Quellen der Preise

- Ökostromangebote: ÉS-Tabellen vom 1. November 2026 (INF-1186 und INF-1192).

Die gültigen Tabellen stehen auf [particuliers.es.fr](https://particuliers.es.fr/electricite-gaz/electricite/choisir-la-bonne-offre-delectricite).

## Rechtliche Hinweise

Offizielle Website von ÉS: [www.es.fr](https://www.es.fr/).

Diese Integration ist ein unabhängiges Community-Projekt. Sie wird von ÉS Énergies Strasbourg,
Électricité de Strasbourg oder der ÉS-Gruppe weder herausgegeben noch geprüft noch unterstützt und
steht in keiner geschäftlichen Verbindung zu ihnen. Sie ist auch kein offizielles Produkt von Gladys
Assistant.

Die Namen „ÉS“, „Électricité de Strasbourg“ und „ÉS Énergies Strasbourg“ sowie das
ÉS-Logo sind Marken und grafische Elemente ihrer jeweiligen Inhaber. Sie werden hier nur verwendet, um
den Anbieter und seine Verträge zu benennen, ohne den Eindruck einer Partnerschaft erwecken zu wollen.
Auf erste Aufforderung ihres Inhabers werden sie entfernt.

Die Preise sind den von ÉS veröffentlichten Tabellen entnommen, nur zur Information und ohne Gewähr
für Richtigkeit oder Aktualität. Maßgeblich sind allein dein ÉS-Vertrag und deine Rechnungen: die von
Gladys angezeigten Kosten sind Schätzungen.
