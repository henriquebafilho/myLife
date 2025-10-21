let shows = [
    {
        evento: "The Police",
        bandas: [
            "The Police",
            "Paralamas Do Sucesso"
        ],
        data: "08/12/2007",
        local: "Maracanã",
    },
    {
        evento: "Viradão Cultural",
        bandas: [
            "Sepultura",
            "Korzus"
        ],
        data: "05/05/2012",
        local: "Quinta da Boa Vista"
    },
    {
        evento: "Turnê Lavô Tá Novo",
        bandas: ["Raimundos"],
        data: "20/10/2012",
        local: "Circo Voador"
    },
    {
        evento: "Stevie Wonder",
        bandas: ["Stevie Wonder"],
        data: "25/12/2012",
        local: "Praia de Copacabana"
    },
    {
        evento: "Plebe Rude",
        bandas: ["Plebe Rude"],
        data: "25/05/2013",
        local: "Circo Voador"
    },
    {
        evento: "Dia do Rock",
        bandas: [
            "Plebe Rude",
            "Biquini Cavadão",
            "Paralamas Do Sucesso"
        ],
        data: "13/07/2013",
        local: "Fundição Progresso"
    },
    {
        evento: "Rock in Rio",
        bandas: [
            "Metallica",
            "Alice In Chains",
            "Ghost B.C.",
            "Rob Zombie",
            "Sepultura"
        ],
        data: "19/09/2013",
        local: "Cidade do Rock"
    },
    {
        evento: "Black Sabbath 13 Tour",
        bandas: [
            "Black Sabbath",
            "Megadeth"
        ],
        data: "13/10/2013",
        local: "Praça da Apoteose"
    },
    {
        evento: "Violeta de Outono",
        bandas: ["Violeta de Outono"],
        data: "25/01/2014",
        local: "Centro Cultural Banco do Brasil"
    },
    {
        evento: "Devil's Rain Tour",
        bandas: ["Misfits"],
        data: "20/04/2014",
        local: "Circo Voador"
    },
    {
        evento: "Nação Zumbi",
        bandas: ["Nação Zumbi"],
        data: "10/05/2014",
        local: "Circo Voador"
    },
    {
        evento: "Metal Jam",
        bandas: ["Metal Jam"],
        data: "06/07/2014",
        local: "Circo Voador"
    },
    {
        evento: "Cavalera Conspiracy",
        bandas: [
            "Cavalera Conspiracy",
            "Test",
            "Krisiun"
        ],
        data: "11/09/2014",
        local: "Circo Voador"
    },
    {
        evento: "Arnaldo Antunes",
        bandas: ["Arnaldo Antunes"],
        data: "27/09/2014",
        local: "Circo Voador"
    },
    {
        evento: "Exodus",
        bandas: [
            "Exodus",
            "Hatefulmurder"
        ],
        data: "05/10/2014",
        local: "Circo Voador"
    },
    {
        evento: "Foo Fighters",
        bandas: [
            "Foo Fighters",
            "Kaiser Chiefs",
            "Raimundos"
        ],
        data: "25/01/2015",
        local: "Maracanã"
    },
    {
        evento: "Nando Reis",
        bandas: ["Nando Reis"],
        data: "31/01/2015",
        local: "Fundição Progresso"
    },
    {
        evento: "Monsters of Rock",
        bandas: [
            "Ozzy Osbourne",
            "Judas Priest"
        ],
        data: "25/04/2015",
        local: "Arena Anhembi"
    },
    {
        evento: "Metal Jam",
        bandas: ["Metal Jam"],
        data: "05/07/2015",
        local: "Circo Voador"
    },
    {
        evento: "Turnê Pior Cenário Possível",
        bandas: [
            "Matanza",
            "Zumbis do Espaço"
        ],
        data: "18/07/2015",
        local: "Circo Voador"
    },
    {
        evento: "Rock in Rio",
        bandas: [
            "Metallica",
            "Motley Crue",
            "Korn",
            "Ministry"
        ],
        data: "19/09/2015",
        local: "Cidade do Rock"
    },
    {
        evento: "Rock in Rio",
        bandas: [
            "System Of A Down",
            "Queens Of The Stone Age",
            "Hollywood Vampires"
        ],
        data: "24/09/2015",
        local: "Cidade do Rcok"
    },
    {
        evento: "Rock in Rio",
        bandas: [
            "Slipknot",
            "Faith No More",
            "Mastodon",
            "De La Tierra",
            "Nightwish"
        ],
        data: "25/09/2015",
        local: "Rock In Rio"
    },
    {
        evento: "Turnê Pior Cenário Possível",
        bandas: ["Matanza"],
        data: "31/10/2015",
        local: "Imperator"
    },
    {
        evento: "Ratos de Porão",
        bandas: [
            "Ratos de Porão",
            "Krisiun"
        ],
        data: "13/11/2015",
        local: "Circo Voador"
    },
    {
        evento: "Pearl Jam",
        bandas: ["Pearl Jam"],
        data: "22/11/2015",
        local: "Maracanã"
    },
    {
        evento: "Turnê Pior Cenário Possível",
        bandas: [
            "Matanza",
            "Diabo Verde"
        ],
        data: "20/12/2015",
        local: "Clube Recreativo Caxiense"
    },
    {
        evento: "Blood In Blood Out Tour",
        bandas: [
            "Exodus",
            "Sinaya"
        ],
        data: "24/01/2016",
        local: "Carioca Club"
    },
    {
        evento: "Blood In Blood Out Tour",
        bandas: [
            "Exodus",
            "Test"
        ],
        data: "28/01/2016",
        local: "Circo Voador"
    },
    {
        evento: "Olé Tour",
        bandas: ["The Rolling Stones"],
        data: "20/02/2016",
        local: "Maracanã"
    },
    {
        evento: "The Book of Souls/For All Kings Tour",
        bandas: [
            "Iron Maiden",
            "Anthrax"
        ],
        data: "17/03/2016",
        local: "HSBC Arena"
    },
    {
        evento: "Soulfly Archangel Tour",
        bandas: [
            "Soulfly",
            "Claustrofobia"
        ],
        data: "07/04/2016",
        local: "Circo Voador"
    },
    {
        evento: "Titãs",
        bandas: ["Titãs"],
        data: "09/07/2016",
        local: "Circo Voador"
    },
    {
        evento: "Matanza Fest",
        bandas: [
            "Matanza",
            "Cólera",
            "Hatefulmurder"
        ],
        data: "23/07/2016",
        local: "Circo Voador"
    },
    {
        evento: "Que Seja Feita a Nossa Vontade",
        bandas: ["Project46"],
        data: "06/08/2016",
        local: "Casa de Cultura Chico Science"
    },
    {
        evento: "Megadeth Dystopia Tour",
        bandas: ["Megadeth"],
        data: "07/08/2016",
        local: "Espaço das Américas"
    },
    {
        evento: "Camisa de Vênus e Plebe Rude",
        bandas: [
            "Plebe Rude",
            "Camisa de Vênus"
        ],
        data: "09/09/2016",
        local: "Circo Voador"
    },
    {
        evento: "Raimundos Rock Fest",
        bandas: [
            "Raimundos",
            "H2O"
        ],
        data: "16/09/2016",
        local: "Circo Voador"
    },
    {
        evento: "Violator",
        bandas: [
            "Violator",
            "Farscape"
        ],
        data: "24/09/2016",
        local: "Teatro Odisseia"
    },
    {
        evento: "Turnê Anarkofobia",
        bandas: [
            "Ratos de Porão",
            "McRad",
            "Enterro"
        ],
        data: "30/09/2016",
        local: "Circo Voador"
    },
    {
        evento: "Matanza",
        bandas: ["Matanza"],
        data: "29/10/2016",
        local: "Imperator"
    },
    {
        evento: "The Last Stand Tour",
        bandas: [
            "Sabaton",
            "Armahda"
        ],
        data: "30/10/2016",
        local: "Circo Voador"
    },
    {
        evento: "Hell in Rio",
        bandas: [
            "Sepultura",
            "Dead Fish",
            "Claustrofobia"
        ],
        data: "05/11/2016",
        local: "Terreirão do Samba"
    },
    {
        evento: "Hell in Rio",
        bandas: [
            "Matanza",
            "Korzus"
        ],
        data: "06/11/2016",
        local: "Terreirão do Samba"
    },
    {
        evento: "Metal Jam",
        bandas: ["Metal Jam"],
        data: "20/11/2016",
        local: "Circo Voador"
    },
    {
        evento: "The End Tour",
        bandas: [
            "Black Sabbath",
            "Rival Sons"
        ],
        data: "02/12/2016",
        local: "Praça da Apoteose"
    },
    {
        evento: "Return to Roots",
        bandas: ["Cavalera Conspiracy"],
        data: "14/12/2016",
        local: "Imperator"
    },
    {
        evento: "World Gone Mad Tour",
        bandas: [
            "Suicidal Tendencies",
            "La Raza"
        ],
        data: "27/04/2017",
        local: "Imperator"
    },
    {
        evento: "Maximus Festival",
        bandas: [
            "Linkin Park",
            "Prophets of Rage",
            "Slayer",
            "Five Finger Death Punch",
            "Rob Zombie",
            "Bohse Onketz",
            "Ghost B.C.",
            "Redfang",
            "Hatebreed",
            "Oitão"
        ],
        data: "13/05/2017",
        local: "Autódromo de Interlagos",
    },
    {
        evento: "Lamb of God",
        bandas: [
            "Lamb of God",
            "Carcass",
            "Heaven Shall Burn"
        ],
        data: "24/06/2017",
        "Ano": "2017",
        local: "Circo Voador",

    },
    {
        evento: "Matanza Fest",
        bandas: [
            "Matanza",
            "Inocentes",
            "DFC"
        ],
        data: "15/07/2017",
        local: "Circo Voador"
    },
    {
        evento: "Rock in Rio",
        bandas: [
            "Guns N' Roses",
            "The Who",
            "Titãs"
        ],
        data: "23/09/2017",
        local: "Parque Olímpico"
    },
    {
        evento: "Rock in Rio",
        bandas: [
            "Red Hot Chili Peppers",
            "The Offspring",
            "Sepultura"
        ],
        data: "24/09/2017",
        local: "Parque Olímpico"
    },
    {
        evento: "Pumpkins United",
        bandas: ["Helloween"],
        data: "28/10/2017",
        local: "Espaço das Américas"
    },
    {
        evento: "Revolution Radio Tour",
        bandas: ["Green Day"],
        data: "01/11/2017",
        local: "Jeunesse Arena"
    },
    {
        evento: "Concrete and Gold Tour",
        bandas: [
            "Foo Fighters",
            "Queens Of The Stone Age",
            "Ego Kill Talent"
        ],
        data: "25/02/2018",
        local: "Maracanã"
    },
    {
        evento: "No More Tours 2",
        bandas: ["Ozzy Osbourne"],
        data: "20/05/2018",
        local: "Jeunesse Arena"
    },
    {
        evento: "O Derradeiro Matanza Fest",
        bandas: [
            "Matanza",
            "Olho Seco",
            "Carro Bomba",
            "Justabeli"
        ],
        data: "28/07/2018",
        local: "Circo Voador"
    },
    {
        evento: "DFC",
        bandas: [
            "DFC",
            "Revolta Civil",
            "Ataque Periférico",
            "Cervical"
        ],
        data: "18/08/2018",
        local: "Heavy Duty"
    },
    {
        evento: "The Butchers Are Back",
        bandas: ["Destruction"],
        data: "18/09/2018",
        local: "Teatro Odisseia"
    },
    {
        evento: "H2O: Nothing To Prove 10th Anniversary",
        bandas: [
            "H2O",
            "Cervical",
            "New Day Rising"
        ],
        data: "27/09/2018",
        local: "Teatro Odisseia"
    },
    {
        evento: "Último Show do Matanza no Circo Voador",
        bandas: [
            "Matanza",
            "Diabo Verde",
            "Circus Rock"
        ],
        data: "27/10/2018",
        local: "Circo Voador"
    },
    {
        evento: "Return Beneath Arise Tour",
        bandas: ["Cavalera Conspiracy"],
        data: "01/11/2018",
        local: "Circo Voador"
    },
    {
        evento: "Firepower/Rainier Fog Tour",
        bandas: [
            "Judas Priest",
            "Alice In Chains",
            "Black Star Riders"
        ],
        data: "11/11/2018",
        local: "Km de Vantagens Hall"
    },
    {
        evento: "Gods of Violence Tour",
        bandas: [
            "Arch Enemy",
            "Kreator",
            "Excel"
        ],
        data: "16/11/2018",
        local: "Circo Voador"
    },
    {
        evento: "Finis Africae 30 Anos",
        bandas: ["Finis Africae"],
        data: "07/12/2018",
        local: "Teatro Odisseia"
    },
    {
        evento: "Noite do Descarrego",
        bandas: [
            "Gangrena Gasosa",
            "Surra"
        ],
        data: "27/12/2018",
        local: "Teatro Odisseia"
    },
    {
        evento: "The Revolución Tour",
        bandas: [
            "Bush",
            "Stone Temple Pilots"
        ],
        data: "15/02/2019",
        local: "Km de Vantagens Hall"
    },
    {
        evento: "Saxon",
        bandas: ["Saxon"],
        data: "15/03/2019",
        local: "Vivo Rio"
    },
    {
        evento: "25 anos do CD Raimundos",
        bandas: [
            "Raimundos",
            "Ratos de Porão",
            "Dona Cislene"
        ],
        data: "13/04/2019",
        "Ano": "2019",
        local: "Circo Voador",

    },
    {
        evento: "Vivid 30th Anniversary",
        bandas: ["Living Colour"],
        data: "13/06/2019",
        local: "Circo Voador"
    },
    {
        evento: "Rock in Rio",
        bandas: [
            "Iron Maiden",
            "Slayer",
            "Helloween",
            "Anthrax",
            "Sepultura",
            "Chuck Billy",
            "Torture Squad",
            "Claustrofobia"
        ],
        data: "04/10/2019",
        local: "Rock in Rio"
    },
    {
        evento: "Raimundos 25 Anos",
        bandas: [
            "Raimundos",
            "Jimmy & Rats"
        ],
        data: "27/12/2019",
        local: "Circo Voador"
    },
    {
        evento: "Rock Brasil 40 Anos",
        bandas: [
            "Camisa de Vênus",
            "Plebe Rude"
        ],
        data: "23/10/2021",
        "Ano": "2021",
        local: "Praça da Pira",

    },
    {
        evento: "Quadra Tour",
        bandas: [
            "Sepultura",
            "Dorsal Atlântica"
        ],
        data: "12/02/2022",
        local: "Circo Voador"
    },
    {
        evento: "Festival Tomarock",
        bandas: [
            "Ratos de Porão",
            "Krisiun"
        ],
        data: "11/03/2022",
        local: "Circo Voador"
    },
    {
        evento: "Rock Brasil 40 Anos",
        bandas: [
            "Camisa de Vênus",
            "Ira!",
            "Titãs",
            "Plebe Rude"
        ],
        data: "21/04/2022",
        local: "Marina da Glória"
    },
    {
        evento: "Sad Club Fest",
        bandas: [
            "Detonautas Roque Clube",
            "CPM 22",
            "Dibob",
            "Darvin",
            "Canto Cego"
        ],
        data: "22/04/2022",
        local: "Sacadura 154"
    },
    {
        evento: "Return to Roots",
        bandas: [
            "Cavalera Conspiracy",
            "Troops of Doom"
        ],
        data: "05/08/2022",
        local: "Sacadura 154"
    },
    {
        evento: "Rock in Rio",
        bandas: [
            "Dream Theater",
            "Iron Maiden",
            "Bullet For My Valentine",
            "Ratos de Porão",
            "Matanza Ritual",
            "Sepultura"
        ],
        data: "02/09/2022",
        local: "Rock in Rio"
    },
    {
        evento: "Rock in Rio",
        bandas: [
            "The Offspring",
            "CPM 22"
        ],
        data: "08/09/2022",
        local: "Rock in Rio"
    },
    {
        evento: "Rock in Rio",
        bandas: [
            "Green Day",
            "Fall Out Boy",
            "Avril Lavigne",
            "Capital Inicial"
        ],
        data: "09/09/2022",
        "Ano": "2022",
        local: "Rock in Rio",

    },
    {
        evento: "The End So Far Tour",
        bandas: [
            "Slipknot",
            "Bring Me The Horizon"
        ],
        data: "15/12/2022",
        local: "Jeunesse Arena"
    },
    {
        evento: "A Grande Roubada",
        bandas: [
            "Ratos de Porão",
            "Black Pantera",
            "Punhal"
        ],
        data: "22/01/2023",
        local: "Circo Voador"
    },
    {
        evento: "Attitude Metal Festival",
        bandas: [
            "Krisiun",
            "Gangrena Gasosa",
            "Sangue de Bode"
        ],
        data: "24/02/2023",
        local: "Circo Voador"
    },
    {
        evento: "Stone Temple Pilots",
        bandas: ["Stone Temple Pilots"],
        data: "27/04/2023",
        local: "Vivo Rio"
    },
    {
        evento: "Dead Fish",
        bandas: [
            "Dead Fish",
            "Mukeka Di Rato"
        ],
        data: "19/05/2023",
        local: "Circo Voador"
    },
    {
        evento: "Rock no Morro",
        bandas: [
            "CPM 22",
            "Dibob"
        ],
        data: "05/08/2023",
        local: "Morro da Urca"
    },
    {
        evento: "Kool Metal Fest",
        bandas: [
            "Brujeria",
            "Ratos de Porão",
            "Gangrena Gasosa"
        ],
        data: "25/08/2023",
        local: "Circo Voador"
    },
    {
        evento: "Somos Rock",
        bandas: [
            "Paralamas do Sucesso",
            "Humberto Gessinger",
            "CPM 22",
            "Nando Reis",
            "Nenhum de Nós",
            "Fresno",
            "Biquini Cavadão"
        ],
        data: "23/09/2023",
        local: "Arena Anhembi"
    },
    {
        evento: "Tomarock 20 Anos",
        bandas: ["Matanza Ritual"],
        data: "21/10/2023",
        local: "Circo Voador"
    },
    {
        evento: "This Is Not a Drill Tour",
        bandas: ["Roger Waters"],
        data: "28/10/2023",
        local: "Estádio Nilton Santos"
    },
    {
        evento: "A Grande Roubada",
        bandas: [
            "Crypta",
            "Surra",
            "Dark Tower"
        ],
        data: "03/11/2023",
        local: "Circo Voador"
    },
    {
        evento: "Psicoacústica 35 Anos",
        bandas: ["Ira!"],
        data: "24/11/2023",
        local: "Circo Voador"
    },
    {
        evento: "Robson",
        bandas: [
            "Diogo Defante",
            "Circus Rock"
        ],
        data: "08/12/2023",
        local: "Imperator"
    },
    {
        evento: "Punk in Rio",
        bandas: [
            "Ratos de Porão",
            "The Varukers",
            "Asfixia Social"
        ],
        data: "04/02/2024",
        local: "Circo Voador",
    },
    {
        evento: "I Wanna Be Tour",
        bandas: [
            "Simple Plan",
            "A Day to Remember",
            "NX Zero",
            "The All-American Rejects",
            "All Time Low",
            "The Used",
            "Pitty",
            "Mayday Parade"
        ],
        data: "09/03/2024",
        local: "Rio Centro"
    },
    {
        evento: "Lollapalooza",
        bandas: [
            "Blink-182",
            "The Offspring"
        ],
        data: "22/03/2024",
        local: "Autódromo de Interlagos"
    },
    {
        evento: "Lollapalooza",
        bandas: [
            "Kings of Leon",
            "Limp Bizkit",
            "Kevin O Cris",
            "Hozier",
            "Pierce the Veil"
        ],
        data: "23/03/2024",
        local: "Autódromo de Interlagos"
    },
    {
        evento: "Biohazard",
        bandas: [
            "Biohazard",
            "Raimundos"
        ],
        data: "23/04/2024",
        local: "Circo Voador"
    },
    {
        evento: "Turnê Labirinto da Memória",
        bandas: [
            "Dead Fish",
            "Pense",
            "Texuga"
        ],
        data: "04/05/2024",
        local: "Circo Voador"
    },
    {
        evento: "Mortem Solis Tour",
        bandas: [
            "Krisiun",
            "LAC",
            "Desalmado"
        ],
        data: "10/05/2024",
        local: "Circo Voador"
    },
    {
        evento: "Mata e Amassa Tour",
        bandas: [
            "Massacration",
            "Matanza Ritual"
        ],
        data: "15/06/2024",
        local: "Sacadura 154"
    },
    {
        evento: "Nós Somos Família Tour",
        bandas: [
            "Suicidal Tendencies",
            "DFC",
            "Eskrota"
        ],
        data: "12/07/2024",
        local: "Sacadura 154"
    },
    {
        evento: "90's Festival",
        bandas: [
            "Raimundos",
            "Marcelo Falcão",
            "CPM 22"
        ],
        data: "20/07/2024",
        local: "Marina da Glória"
    },
    {
        evento: "Forfun Nós",
        bandas: ["Forfun"],
        data: "24/08/2024",
        local: "Marina da Glória"
    },
    {
        evento: "Celebrating Life Through Death",
        bandas: ["Sepultura"],
        data: "31/08/2024",
        local: "Farmasi Arena"
    },
    {
        evento: "Rock in Rio",
        bandas: [
            "Avenged Sevenfold",
            "Deep Purple",
            "Evanescense",
            "Dead Fish",
            "Crypta",
            "Planet Hemp",
            "Paralamas do Sucesso",
            "Black Pantera"
        ],
        data: "15/09/2024",
        local: "Parque Olímpico"
    },
    {
        evento: "Matanza Ritual Fest",
        bandas: [
            "Matanza Ritual",
            "Gangrena Gasosa"
        ],
        data: "09/11/2024",
        local: "Circo Voador"
    },
    {
        evento: "The Future Past Tour",
        bandas: [
            "Iron Maiden",
            "Volbeat"
        ],
        data: "06/12/2024",
        local: "Allianz Parque"
    },
    {
        evento: "Nervosa/Black Pantera",
        bandas: [
            "Nervosa",
            "Black Pantera"
        ],
        data: "31/01/2025",
        local: "Circo Voador",
    },
    {
        evento: "Supercharged World Tour",
        bandas: [
            "The Offspring",
            "Sublime",
            "Rise Against"
        ],
        data: "06/03/2025",
        local: "Farmasi Arena"
    },
    {
        evento: "Wake Up! Tour",
        bandas: ["System of a Down"],
        data: "08/05/2025",
        local: "Estádio Nilton Santos"
    },
    {
        evento: "Despedida do Exploited",
        bandas: [
            "The Exploited",
            "Ratos de Porão"
        ],
        data: "10/05/2025",
        local: "Circo Voador"
    },
    {
        evento: "Dead Fish XXXIV Anos",
        bandas: ["Dead Fish"],
        data: "05/07/2025",
        local: "Agyto",
    },
    {
        evento: "Festival de Inverno Rio 2025",
        bandas: [
            "Charlie Brown Jr",
            "CPM 22",
            "Paralamas do Sucesso"
        ],
        data: "13/07/2025",
        local: "Marina da Glória"
    },
    {
        evento: "Better Days Tour",
        bandas: ["Yellowcard"],
        data: "27/08/2025",
        local: "Farmasi Arena"
    },
    {
        evento: "Doce Maravilha",
        bandas: [
            "Forfun",
            "CPM 22",
            "Dead Fish"
        ],
        data: "26/09/2025",
        local: "Jockey Club"
    },
    {
        evento: "Clássicos do Brasil",
        bandas: [
            "Plebe Rude",
            "Ira!"
        ],
        data: "18/10/2025",
        local: "Marina da Glória"
    }
];

export default shows;
