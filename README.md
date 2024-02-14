# DuckAngels

## Intro
Als team gaan we een app maken met data die van onze persoonlijke apps komen. We gingen als team bespreken wat elk team lid wil maken voor zijn persoonlijke app.

- Max: Muziek
- Karenza: Muziek
- Hidde: Film
- Xiao Nan: Eten

Als team hebben wij besloten om een app te maken over muziek. Het eerste idee is om een one pager te maken, elke section van elk teamlid met een intro van het favoriete genre van elk team lid en kleur en emoji.

## Trello
We hebben een trello bord aangemaakt waarbij we kunnen zien wat de planning is voor ons en wie wat doet.

Link: [Onze Trello](https://trello.com/b/X0KmrT8Y/duck-angles)

## Data op papier
We hebben op een blad opgeschreven welke data we nodig kunnen hebben. 

![Data op papier](./docs/read-me-img/data-papier.png)

## Schets
We begonnen met het maken van een schets van onze eerste idee. Het idee is om te beginnen met cards van ons zelf als intro en daarna cards van nummers die vanuit de dataset komen. Die cards kan je filteren en sorteren. 

![Schets](./docs/read-me-img/schets.png)

Van de schetsen is er een wireframe gemaakt van de mobiele versie en home versie.

![Schets](./docs/read-me-img/wireframes.jpg)

## HTML CSS
Hidde en Karenza begonnen met het maken van de HTML en CSS. Hidde doet de muziek sectie en Karenza de Team sectie.

## UI stack

We zijn natuurlijk allemaal bezig geweest met de ideal state, maar we moeten natuurlijk ook rekening houden met de gebruiker. 
Als de data nog niet helemaal geladen is dan we een loading state.

![Loading state](./docs/read-me-img/loading-state.png)

## JSON

De dataset ziet er als volgt uit waarbij de teamleden in een array zitten met al de info van die persoon. 

![Data 1](./docs/read-me-img/data-1.png)

Bij de tracks wordt de data van de Spotify Rapid API gebruikt. Hiervoor wordt elk liedje opgehaald met Get Tracks. Elk teamlid kiest 5 liedjes uit voor de dataset. Dan op Rapid API moet je de ID van het nummer via Spotify gebruiken om de nummers te krijgen. Dan kopiëren we de data die we krijgen van dat ene nummer en maken we handmatig een array van de 5 nummers bij elk teamlid.  

![Data 2](./docs/read-me-img/data-2.png)

![Data 2](./docs/read-me-img/rapid-api-spotify.png)

## Versie 1
**Members**
![Members](./docs/read-me-img/v-1-members.png)

**Muziek**
![Songs](./docs/read-me-img/v-1-songs.png)

Deze aanpassingen zijn gedaan op aparte branches. We gingen eerst de branche van team mergen met main. Daarna die van songs. Er waren conflicts met main maar die konden we makkelijk aanpassen. Wanneer de 2 branches waren gemerged was er een conflict met de styling. Articles waren los gezet zoals: article {} maar het moest zijn: .personeelInfo article {}. Dat was snel te zien waardoor het mergen en aanpassen niet lang duurde.

## Versie 2
Met wat styling aanpassingen en gefetchte data ziet de site er tot nu toe zo er uit:

![Versie 2](./docs/read-me-img/v-2.png)

## Versie 3
Het is mogelijk om de nummers te sorteren en te filteren. Ook is in deze versie gemaakt dat de bachground de img heeft van de cover van het liedje. 

**Sorteren**
- A-z
- Year
- Streams

**Filteren**
- Hp-hop
- K-pop
- Latin
- Pop
- Techno

![Filter en sort](./docs/read-me-img/Filter.png)

## Versie 4

De officiele versie ziet er als volgt uit waarbij de members wordt getoond. De namen worden uit ieder zijn persoonlijke app getoond. De nummers kan je filteren en sorteren. Als je klikt op een nummer, wordt het liedje afgespeeld en wordt de cd gedraaid.

![Versie 4](./docs/read-me-img/v-3.png)

## Error

Xiao Nan haar info.json kan niet worden opgehaald omdat zij deployt op Render. De error is ook als volgt dat de url niet kan worden opgehaald. 

![Error](./docs/read-me-img/error.png)

Dus nu hebben wij in de code het volgende om alleen haar naam voor nu te faken.

```js
    // De namen van de members kunnen worden opgehaald. Maar niet die van Xiao Nan vanwege deployen op render.
    // Nu wordt er gedaan: als info niet wordt defined door niet kunnen ophalen van Xiao haar /info.json, maak dan voor nu een neppe data aan.
    let info;
    try {
      const res = await fetch(item.personalPage)
      info = await res.json()
      
    } catch (error) {
      console.error(error);
      info = {
        "firstName": "Xiao Nan",
      }
    }
```




