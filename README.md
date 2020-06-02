# Le problème

Le problème consiste à rendre les événements sur un calendrier, en évitant que les événements ne se chevauchent visuellement. Votre mise en œuvre doit répondre aux deux contraintes suivantes :

- Chaque événement qui se chevauche doit avoir la même largeur que chaque événement qu'il chevauche

- Chaque événement doit utiliser la largeur maximale disponible

Une illustration visuelle du problème est donnée ci-dessous.

Rendre les événements sur un calendrier signifie ici : la position relative des événements en haut de l'écran et leur hauteur est fonction de la hauteur de l'écran, de l'heure de début/fin du calendrier, et de l'heure de début/durée des événements. Par exemple : si le calendrier va de 00:00 à 24:00 et que l'écran a une hauteur de 2400px, un événement commençant à 12:00 et durant 1h sera positionné à 1200px du haut de l'écran et aura une hauteur de 100px.
