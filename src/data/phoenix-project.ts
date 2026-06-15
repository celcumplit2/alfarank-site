import type { Locale } from "@/data/i18n";
import type { PrivateProject } from "@/data/private-project-types";

const enPhoenixModules: PrivateProject["modules"] = [
  {
    slug: "battery-passport",
    title: "Battery Passport",
    icon: "data",
    summary:
      "A digital battery passport that records identity, usage, service history, degradation, remaining life, ownership, and market value.",
    positioning:
      "Battery Passport turns a physical battery into a traceable digital asset. The market can see what the battery is, how it was used, what condition it is in, and where it should go next.",
    outputs: ["Unique battery ID", "Usage and repair history", "Degradation profile", "Residual life forecast", "Market value"],
    layers: [
      {
        title: "Identity layer",
        text: "Assign one stable record to every battery pack, module, or certified unit entering the network.",
        icon: "shield",
        items: ["Serial identity", "Chemistry and form factor", "Manufacturer data"]
      },
      {
        title: "Lifecycle history",
        text: "Collect ownership, vehicle use, diagnostics, repairs, warranty events, and second-life transfers.",
        icon: "flow",
        items: ["Owners", "Repairs", "Transfers"]
      },
      {
        title: "Health profile",
        text: "Translate diagnostic results into a usable degradation profile and remaining-resource estimate.",
        icon: "ai",
        items: ["Capacity", "Cycles", "Thermal stress"]
      },
      {
        title: "Asset value",
        text: "Connect condition, risk, demand, and recovery value into a practical market price range.",
        icon: "scale",
        items: ["Second-life value", "Recovery floor", "Risk discount"]
      }
    ],
    sections: [
      {
        title: "What it is",
        text:
          "Battery Passport is the canonical record for a battery across mobility, stationary energy, and recovery. It gives the asset a verified identity and makes condition visible before the battery is sold, reused, insured, stored, or recycled."
      },
      {
        title: "Why it matters",
        items: [
          "A battery can leave a vehicle at 70-80% capacity and still have years of usable energy value.",
          "Without trusted condition data, buyers price the battery as risk or send it directly to recycling.",
          "The passport makes residual value measurable, transferable, and auditable."
        ]
      },
      {
        title: "Passport fields",
        groups: [
          {
            title: "Identity",
            items: ["unique ID", "chemistry", "capacity class", "pack/module structure", "manufacturer and model"]
          },
          {
            title: "History",
            items: ["vehicle history", "owner history", "repair records", "diagnostic records", "incident notes"]
          },
          {
            title: "Condition",
            items: ["state of health", "cycle count", "thermal exposure", "imbalance risk", "remaining useful life"]
          }
        ]
      }
    ],
    sources: {
      internal: ["diagnostic scan", "BMS export", "capacity test", "cycle count", "temperature history", "repair log", "ownership transfer", "service center notes"],
      external: ["dealer records", "insurance claims", "vehicle registries", "second-life demand", "storage system prices", "recycler price benchmarks", "commodity price signals"]
    },
    pilot: {
      title: "Passport pilot",
      steps: [
        "Select one battery category and one diagnostic partner.",
        "Define the minimum passport schema for identity, health, history, and value.",
        "Create passport records for the first batch of batteries.",
        "Attach diagnostic evidence and ownership events to each record.",
        "Use the records to compare reuse value against recycling value."
      ],
      goal: "Prove that a trusted battery record changes the commercial decision from disposal to reuse.",
      metrics: ["passports created", "diagnostic completeness", "reuse candidates identified", "valuation accuracy", "buyer confidence"]
    },
    guardrails: [
      "Every passport keeps source evidence for critical fields.",
      "Health and valuation are shown as ranges when data is incomplete.",
      "Ownership and access rules are explicit before a battery is transferred."
    ],
    executive:
      "Battery Passport is the foundation of Project Phoenix. Without a trusted record, the market cannot separate dead batteries from batteries that are simply finished with their first use.",
    effects: ["higher residual value", "less premature recycling", "clearer ownership", "faster buyer review", "better insurance and warranty logic", "auditable lifecycle history"]
  },
  {
    slug: "battery-exchange",
    title: "Battery Exchange",
    icon: "commerce",
    summary:
      "A marketplace and routing layer that matches batteries with the best next use across dealers, service centers, energy operators, insurers, and recyclers.",
    positioning:
      "Battery Exchange turns verified battery condition into a commercial route. It compares reuse, resale, storage, repair, and recovery options before the asset loses value.",
    outputs: ["Battery listings", "Use-case matching", "Partner routing", "Second-life offers", "Recovery fallback"],
    layers: [
      {
        title: "Supply intake",
        text: "Receive battery supply from vehicles, dealers, service centers, fleets, insurers, and repair networks.",
        icon: "api",
        items: ["Dealers", "Fleets", "Service centers"]
      },
      {
        title: "Demand matching",
        text: "Match verified batteries with buyers that can use their remaining capacity and risk profile.",
        icon: "target",
        items: ["Home storage", "Business backup", "Solar energy"]
      },
      {
        title: "Routing logic",
        text: "Compare mobility reuse, stationary storage, repair, resale, and recycling routes by expected value.",
        icon: "flow",
        items: ["Reuse", "Repair", "Recovery"]
      },
      {
        title: "Transaction trust",
        text: "Package condition, evidence, pricing, and logistics into a transaction that partners can approve.",
        icon: "shield",
        items: ["Evidence pack", "Price range", "Transfer record"]
      }
    ],
    sections: [
      {
        title: "What it is",
        text:
          "Battery Exchange is a regional and eventually global marketplace for batteries with remaining usable life. It does not simply list batteries; it uses passport data and AI scoring to recommend the best next commercial scenario."
      },
      {
        title: "Participants",
        items: [
          "car dealers and fleet operators with batteries leaving mobility use",
          "service centers that diagnose, repair, and certify batteries",
          "solar, backup-power, and energy-storage buyers looking for affordable storage capacity",
          "recyclers that receive only batteries that no longer have a viable second-life route"
        ]
      },
      {
        title: "Routing outcomes",
        groups: [
          {
            title: "Energy",
            items: ["home storage", "business storage", "backup power", "solar integration"]
          },
          {
            title: "Mobility and repair",
            items: ["module replacement", "fleet reuse", "remanufacturing", "parts harvesting"]
          },
          {
            title: "Recovery",
            items: ["certified recycling", "material recovery", "hazard control", "final lifecycle record"]
          }
        ]
      }
    ],
    sources: {
      internal: ["battery passports", "diagnostic scores", "partner inventory", "listing history", "offer history", "transaction records", "logistics events"],
      external: ["market demand", "energy storage prices", "dealer supply", "fleet replacement cycles", "recycler quotes", "solar project demand", "regulatory requirements"]
    },
    pilot: {
      title: "Regional exchange pilot",
      steps: [
        "Recruit a small set of supply partners and second-life demand partners.",
        "Publish battery listings only after passport and diagnostic checks.",
        "Route each battery to reuse, repair, storage, or recovery scenarios.",
        "Track offer quality, closing time, and recovery fallback value.",
        "Use confirmed transactions to tune pricing and routing rules."
      ],
      goal: "Show that verified battery data creates a higher-value route than direct disposal.",
      metrics: ["listed batteries", "matched demand", "accepted offers", "average value uplift", "time to route", "recycling deferral"]
    },
    guardrails: [
      "Listings are tied to verified passport records.",
      "The exchange shows recovery as a fallback, not as the default.",
      "Every route keeps a final outcome record for future model training."
    ],
    executive:
      "Battery Exchange is the commercial surface of Project Phoenix. It turns battery intelligence into a market where the next best use is visible before the asset is written off.",
    effects: ["new battery supply liquidity", "lower storage-system cost", "higher dealer recovery value", "stronger partner network", "less waste", "better reuse economics"]
  },
  {
    slug: "battery-ai",
    title: "Battery AI",
    icon: "ai",
    summary:
      "An intelligence model that estimates residual life, failure probability, best-use routing, and market value from diagnostic and lifecycle data.",
    positioning:
      "Battery AI is the decision engine behind the network. It learns from charging cycles, temperature, load, diagnostics, repair history, and market outcomes to recommend the next use of each battery.",
    outputs: ["Residual life estimate", "Failure probability", "Best-use recommendation", "Market value forecast", "Risk explanation"],
    layers: [
      {
        title: "Signal intake",
        text: "Collect operational and diagnostic signals that describe how the battery aged in real use.",
        icon: "data",
        items: ["Cycles", "Temperature", "Load"]
      },
      {
        title: "Degradation model",
        text: "Convert raw signals into state-of-health, stress, imbalance, and expected degradation patterns.",
        icon: "chip",
        items: ["SOH", "Stress score", "Anomaly flags"]
      },
      {
        title: "Route scoring",
        text: "Score each battery for mobility reuse, energy storage, repair, resale, or recovery.",
        icon: "ranking",
        items: ["Mobility", "Energy", "Recovery"]
      },
      {
        title: "Feedback learning",
        text: "Use real market outcomes and field performance to improve future forecasts.",
        icon: "flow",
        items: ["Accepted route", "Field result", "Price outcome"]
      }
    ],
    sections: [
      {
        title: "What it is",
        text:
          "Battery AI is the analytical model that turns lifecycle data into decisions. It does not rely on a single diagnostic reading; it combines usage history, environmental stress, service evidence, and market outcomes."
      },
      {
        title: "What it calculates",
        items: [
          "remaining useful life for second-life scenarios",
          "probability of failure or unacceptable degradation",
          "recommended route: mobility, energy, repair, resale, or recovery",
          "market value range based on condition, demand, and risk"
        ]
      },
      {
        title: "Model inputs",
        groups: [
          {
            title: "Operational",
            items: ["charging cycles", "depth of discharge", "temperature", "load profile", "storage time"]
          },
          {
            title: "Diagnostic",
            items: ["capacity test", "internal resistance", "cell imbalance", "BMS events", "fault history"]
          },
          {
            title: "Market",
            items: ["accepted offers", "storage demand", "repair cost", "recycling value", "partner feedback"]
          }
        ]
      }
    ],
    sources: {
      internal: ["battery passports", "BMS data", "diagnostic tests", "repair records", "exchange outcomes", "field performance notes", "warranty events"],
      external: ["battery chemistry research", "market pricing", "energy storage demand", "recycling value", "EV replacement trends", "partner performance feedback"]
    },
    pilot: {
      title: "AI scoring pilot",
      steps: [
        "Collect a labeled diagnostic set from the first passported batteries.",
        "Define scoring outputs for remaining life, risk, use case, and value.",
        "Compare AI recommendations with expert technician review.",
        "Track actual marketplace outcomes for each scored battery.",
        "Tune the model using accepted, rejected, and failed route decisions."
      ],
      goal: "Build the first regional degradation dataset that improves every new battery decision.",
      metrics: ["scored batteries", "expert agreement", "routing accuracy", "failure prediction quality", "valuation error", "dataset growth"]
    },
    guardrails: [
      "AI recommendations show the evidence and uncertainty behind the score.",
      "High-risk batteries require expert review before listing.",
      "The model improves from outcomes, not from theoretical assumptions alone."
    ],
    executive:
      "Battery AI gives Project Phoenix compounding advantage. Every passport, diagnostic event, listing, and field outcome becomes data for a stronger regional battery intelligence layer.",
    effects: ["better residual-life forecasts", "safer second-life routing", "more accurate valuation", "lower buyer risk", "regional degradation database", "stronger long-term defensibility"]
  }
];

const roPhoenixModules: PrivateProject["modules"] = [
  {
    slug: "battery-passport",
    title: "Battery Passport",
    icon: "data",
    summary:
      "Pasaport digital al bateriei care pastreaza identitatea, istoricul de utilizare, service-ul, degradarea, resursa ramasa, proprietarii si valoarea de piata.",
    positioning:
      "Battery Passport transforma bateria fizica intr-un activ digital verificabil. Piata poate vedea ce este bateria, cum a fost folosita, in ce stare este si unde trebuie trimisa mai departe.",
    outputs: ["ID unic de baterie", "Istoric utilizare si reparatii", "Profil de degradare", "Estimare resursa ramasa", "Valoare de piata"],
    layers: [
      {
        title: "Identitate",
        text: "Atribuie o evidenta stabila pentru fiecare pack, modul sau unitate certificata care intra in retea.",
        icon: "shield",
        items: ["ID serial", "Chimie si format", "Date producator"]
      },
      {
        title: "Istoric lifecycle",
        text: "Colecteaza proprietari, utilizare in vehicul, diagnostic, reparatii, garantie si transferuri second-life.",
        icon: "flow",
        items: ["Proprietari", "Reparatii", "Transferuri"]
      },
      {
        title: "Profil de sanatate",
        text: "Transforma diagnosticul intr-un profil de degradare si estimare a resursei ramase.",
        icon: "ai",
        items: ["Capacitate", "Cicluri", "Stres termic"]
      },
      {
        title: "Valoare de activ",
        text: "Conecteaza starea, riscul, cererea si recovery value intr-un interval practic de pret.",
        icon: "scale",
        items: ["Valoare second-life", "Recovery floor", "Discount de risc"]
      }
    ],
    sections: [
      {
        title: "Ce este",
        text:
          "Battery Passport este evidenta canonica a bateriei intre mobility, energie stationara si recovery. Ofera activului o identitate verificata si face starea vizibila inainte ca bateria sa fie vanduta, reutilizata, asigurata, stocata sau reciclata."
      },
      {
        title: "De ce conteaza",
        items: [
          "O baterie poate iesi din vehicul la 70-80% capacitate si totusi sa aiba ani de valoare energetica.",
          "Fara date de stare de incredere, cumparatorii pretuesc bateria ca risc sau o trimit direct la reciclare.",
          "Pasaportul face valoarea ramasa masurabila, transferabila si auditabila."
        ]
      },
      {
        title: "Campuri de pasaport",
        groups: [
          {
            title: "Identitate",
            items: ["ID unic", "chimie", "clasa de capacitate", "structura pack/modul", "producator si model"]
          },
          {
            title: "Istoric",
            items: ["istoric vehicul", "istoric proprietari", "reparatii", "diagnostic", "incidente"]
          },
          {
            title: "Stare",
            items: ["state of health", "numar cicluri", "expunere termica", "risc de dezechilibru", "resursa ramasa"]
          }
        ]
      }
    ],
    sources: {
      internal: ["scan diagnostic", "export BMS", "test capacitate", "numar cicluri", "temperatura", "reparatii", "transfer proprietate", "note service"],
      external: ["date dealeri", "daune asigurari", "registre vehicule", "cerere second-life", "preturi storage", "preturi reciclatori", "semnale commodity"]
    },
    pilot: {
      title: "Pilot Battery Passport",
      steps: [
        "Alege o categorie de baterii si un partener de diagnostic.",
        "Defineste schema minima pentru identitate, stare, istoric si valoare.",
        "Creeaza pasapoarte pentru primul lot de baterii.",
        "Ataseaza dovezi de diagnostic si evenimente de proprietate.",
        "Compara valoarea de reutilizare cu valoarea de reciclare."
      ],
      goal: "Dovedeste ca o evidenta de incredere schimba decizia comerciala de la eliminare la reutilizare.",
      metrics: ["pasapoarte create", "completitudine diagnostic", "candidati de reutilizare", "acuratete evaluare", "incredere cumparatori"]
    },
    guardrails: [
      "Fiecare pasaport pastreaza sursa pentru campurile critice.",
      "Starea si evaluarea sunt prezentate ca intervale cand datele sunt incomplete.",
      "Regulile de proprietate si acces sunt clare inainte de transfer."
    ],
    executive:
      "Battery Passport este fundatia Project Phoenix. Fara o evidenta de incredere, piata nu poate separa bateriile moarte de bateriile care doar si-au terminat prima utilizare.",
    effects: ["valoare reziduala mai mare", "mai putina reciclare prematura", "proprietate clara", "review mai rapid", "logica mai buna pentru asigurare", "istoric lifecycle auditabil"]
  },
  {
    slug: "battery-exchange",
    title: "Battery Exchange",
    icon: "commerce",
    summary:
      "Marketplace si strat de routing care potriveste bateriile cu cea mai buna utilizare urmatoare intre dealeri, service-uri, operatori energetici, asiguratori si reciclatori.",
    positioning:
      "Battery Exchange transforma starea verificata a bateriei intr-o ruta comerciala. Compara reutilizare, revanzare, storage, reparatie si recovery inainte ca activul sa piarda valoare.",
    outputs: ["Listari baterii", "Matching pe use case", "Routing parteneri", "Oferte second-life", "Fallback recovery"],
    layers: [
      {
        title: "Supply intake",
        text: "Primeste baterii de la vehicule, dealeri, service-uri, flote, asiguratori si retele de reparatii.",
        icon: "api",
        items: ["Dealeri", "Flote", "Service-uri"]
      },
      {
        title: "Demand matching",
        text: "Potriveste bateriile verificate cu cumparatori care pot folosi capacitatea ramasa si profilul de risc.",
        icon: "target",
        items: ["Home storage", "Backup business", "Solar"]
      },
      {
        title: "Routing logic",
        text: "Compara mobility reuse, storage stationar, reparatie, revanzare si reciclare dupa valoarea asteptata.",
        icon: "flow",
        items: ["Reuse", "Repair", "Recovery"]
      },
      {
        title: "Transaction trust",
        text: "Impacheteaza starea, dovezile, pretul si logistica intr-o tranzactie pe care partenerii o pot aproba.",
        icon: "shield",
        items: ["Evidence pack", "Interval pret", "Transfer"]
      }
    ],
    sections: [
      {
        title: "Ce este",
        text:
          "Battery Exchange este un marketplace regional si apoi global pentru baterii cu resursa utila ramasa. Nu listeaza doar baterii; foloseste datele din pasaport si scorul AI ca sa recomande cel mai bun scenariu comercial."
      },
      {
        title: "Participanti",
        items: [
          "dealeri auto si operatori de flote cu baterii care ies din mobility",
          "service-uri care diagnosticheaza, repara si certifica baterii",
          "cumparatori pentru solar, backup si energy storage accesibil",
          "reciclatori care primesc doar baterii fara ruta viabila de second-life"
        ]
      },
      {
        title: "Rezultate de routing",
        groups: [
          {
            title: "Energy",
            items: ["home storage", "business storage", "backup power", "integrare solara"]
          },
          {
            title: "Mobility si reparatie",
            items: ["inlocuire module", "fleet reuse", "remanufacturing", "piese"]
          },
          {
            title: "Recovery",
            items: ["reciclare certificata", "recuperare materiale", "control risc", "evidenta finala"]
          }
        ]
      }
    ],
    sources: {
      internal: ["battery passports", "scoruri diagnostic", "inventar parteneri", "istoric listari", "istoric oferte", "tranzactii", "logistica"],
      external: ["cerere piata", "preturi energy storage", "supply dealeri", "cicluri flote", "cotatii reciclatori", "cerere proiecte solare", "cerinte reglementare"]
    },
    pilot: {
      title: "Pilot exchange regional",
      steps: [
        "Recruteaza un grup mic de parteneri de supply si cerere second-life.",
        "Publica listari doar dupa pasaport si verificare diagnostic.",
        "Routeaza fiecare baterie catre reutilizare, reparatie, storage sau recovery.",
        "Urmareste calitatea ofertelor, timpul de inchidere si recovery fallback.",
        "Foloseste tranzactiile confirmate pentru ajustarea preturilor si regulilor."
      ],
      goal: "Arata ca datele verificate despre baterii creeaza o ruta cu valoare mai mare decat eliminarea directa.",
      metrics: ["baterii listate", "cerere potrivita", "oferte acceptate", "uplift de valoare", "timp de routing", "reciclare amanata"]
    },
    guardrails: [
      "Listarile sunt legate de pasapoarte verificate.",
      "Exchange-ul arata recovery ca fallback, nu ca default.",
      "Fiecare ruta pastreaza outcome-ul pentru model training."
    ],
    executive:
      "Battery Exchange este suprafata comerciala a Project Phoenix. Transforma battery intelligence intr-o piata unde cea mai buna utilizare urmatoare este vizibila inainte ca activul sa fie casat.",
    effects: ["lichiditate pentru baterii", "cost mai mic pentru storage", "valoare mai mare pentru dealeri", "retea de parteneri", "mai putine deseuri", "economie mai buna de reutilizare"]
  },
  {
    slug: "battery-ai",
    title: "Battery AI",
    icon: "ai",
    summary:
      "Model de intelligence care estimeaza resursa ramasa, probabilitatea de defect, cea mai buna ruta de utilizare si valoarea de piata din date de diagnostic si lifecycle.",
    positioning:
      "Battery AI este motorul de decizie al retelei. Invata din cicluri de incarcare, temperatura, sarcina, diagnostic, reparatii si rezultate de piata pentru a recomanda urmatoarea utilizare a fiecarei baterii.",
    outputs: ["Estimare resursa ramasa", "Probabilitate defect", "Recomandare best-use", "Forecast valoare", "Explicatie risc"],
    layers: [
      {
        title: "Signal intake",
        text: "Colecteaza semnale operationale si de diagnostic care descriu cum a imbatranit bateria in utilizare reala.",
        icon: "data",
        items: ["Cicluri", "Temperatura", "Sarcina"]
      },
      {
        title: "Model degradare",
        text: "Transforma semnalele brute in SOH, stres, dezechilibru si patterns asteptate de degradare.",
        icon: "chip",
        items: ["SOH", "Stress score", "Anomalii"]
      },
      {
        title: "Route scoring",
        text: "Scoreaza fiecare baterie pentru mobility reuse, energy storage, repair, resale sau recovery.",
        icon: "ranking",
        items: ["Mobility", "Energy", "Recovery"]
      },
      {
        title: "Feedback learning",
        text: "Foloseste outcome-uri reale de piata si performanta in teren pentru a imbunatati forecasturile.",
        icon: "flow",
        items: ["Ruta acceptata", "Rezultat teren", "Pret final"]
      }
    ],
    sections: [
      {
        title: "Ce este",
        text:
          "Battery AI este modelul analitic care transforma datele lifecycle in decizii. Nu se bazeaza pe o singura citire de diagnostic; combina istoricul de utilizare, stresul de mediu, dovezile de service si outcome-urile de piata."
      },
      {
        title: "Ce calculeaza",
        items: [
          "resursa utila ramasa pentru scenarii second-life",
          "probabilitatea de defect sau degradare inacceptabila",
          "ruta recomandata: mobility, energy, repair, resale sau recovery",
          "intervalul de valoare pe baza starii, cererii si riscului"
        ]
      },
      {
        title: "Inputuri model",
        groups: [
          {
            title: "Operational",
            items: ["charging cycles", "depth of discharge", "temperatura", "load profile", "timp de stocare"]
          },
          {
            title: "Diagnostic",
            items: ["test capacitate", "rezistenta interna", "cell imbalance", "BMS events", "istoric erori"]
          },
          {
            title: "Market",
            items: ["oferte acceptate", "cerere storage", "cost reparatie", "valoare reciclare", "feedback parteneri"]
          }
        ]
      }
    ],
    sources: {
      internal: ["battery passports", "BMS data", "teste diagnostic", "reparatii", "exchange outcomes", "performanta teren", "garantie"],
      external: ["research baterii", "preturi piata", "cerere energy storage", "valoare reciclare", "trenduri EV", "feedback parteneri"]
    },
    pilot: {
      title: "Pilot AI scoring",
      steps: [
        "Colecteaza un set diagnostic etichetat din primele baterii cu pasaport.",
        "Defineste scoruri pentru resursa ramasa, risc, use case si valoare.",
        "Compara recomandarile AI cu review-ul tehnicienilor.",
        "Urmareste outcome-urile reale din marketplace pentru fiecare baterie.",
        "Ajusteaza modelul cu decizii acceptate, respinse si esuate."
      ],
      goal: "Construieste prima baza regionala de degradare care imbunatateste fiecare decizie noua despre baterii.",
      metrics: ["baterii scorate", "acord expert", "acuratete routing", "calitate predictie defect", "eroare evaluare", "crestere dataset"]
    },
    guardrails: [
      "Recomandarile AI arata dovezile si incertitudinea scorului.",
      "Bateriile cu risc mare cer review expert inainte de listare.",
      "Modelul invata din outcome-uri, nu doar din ipoteze teoretice."
    ],
    executive:
      "Battery AI da Project Phoenix un avantaj cumulativ. Fiecare pasaport, diagnostic, listare si rezultat de teren devine data pentru un strat regional mai puternic de battery intelligence.",
    effects: ["forecast mai bun pentru resursa", "routing second-life mai sigur", "evaluare mai precisa", "risc mai mic pentru cumparatori", "baza regionala de degradare", "defensibility pe termen lung"]
  }
];

const ruPhoenixModules: PrivateProject["modules"] = [
  {
    slug: "battery-passport",
    title: "Battery Passport",
    icon: "data",
    summary:
      "Цифровой паспорт батареи: идентификатор, история эксплуатации, ремонты, владельцы, деградация, остаточный ресурс и рыночная стоимость.",
    positioning:
      "Battery Passport превращает физическую батарею в проверяемый цифровой актив. Рынок видит, что это за батарея, как она использовалась, в каком она состоянии и куда ее выгоднее направить дальше.",
    outputs: ["Уникальный ID батареи", "История эксплуатации и ремонтов", "Профиль деградации", "Прогноз остаточного ресурса", "Рыночная стоимость"],
    layers: [
      {
        title: "Идентичность",
        text: "Создать устойчивую запись для каждого батарейного блока, модуля или сертифицированной единицы в сети.",
        icon: "shield",
        items: ["Серийный ID", "Химия и формат", "Данные производителя"]
      },
      {
        title: "История жизненного цикла",
        text: "Собирать владельцев, эксплуатацию в транспорте, диагностику, ремонты, гарантийные события и second-life переходы.",
        icon: "flow",
        items: ["Владельцы", "Ремонты", "Передачи"]
      },
      {
        title: "Профиль состояния",
        text: "Переводить результаты диагностики в профиль деградации и оценку остаточного ресурса.",
        icon: "ai",
        items: ["Емкость", "Циклы", "Температурная нагрузка"]
      },
      {
        title: "Стоимость актива",
        text: "Связывать состояние, риск, спрос и recovery value в практический диапазон рыночной цены.",
        icon: "scale",
        items: ["Second-life value", "Recovery floor", "Дисконт риска"]
      }
    ],
    sections: [
      {
        title: "Что это",
        text:
          "Battery Passport - базовая запись батареи на всем пути: Mobility, Energy и Recovery. Паспорт дает активу проверяемую идентичность и показывает его состояние до продажи, повторного использования, страхования, хранения или переработки."
      },
      {
        title: "Почему это важно",
        items: [
          "После снижения емкости до 70-80% батарея может быть непригодна для автомобиля, но все еще иметь годы полезного энергетического ресурса.",
          "Без доверенных данных о состоянии покупатель оценивает батарею как риск или отправляет ее прямо на переработку.",
          "Паспорт делает остаточную ценность измеримой, передаваемой и проверяемой."
        ]
      },
      {
        title: "Поля паспорта",
        groups: [
          {
            title: "Идентичность",
            items: ["уникальный ID", "химия", "класс емкости", "структура pack/module", "производитель и модель"]
          },
          {
            title: "История",
            items: ["история автомобиля", "история владельцев", "ремонты", "диагностика", "инциденты"]
          },
          {
            title: "Состояние",
            items: ["state of health", "количество циклов", "температурная нагрузка", "риск дисбаланса", "остаточный ресурс"]
          }
        ]
      }
    ],
    sources: {
      internal: ["диагностический скан", "экспорт BMS", "тест емкости", "количество циклов", "температурная история", "журнал ремонтов", "передача владельца", "заметки сервиса"],
      external: ["данные дилеров", "страховые случаи", "реестры транспорта", "спрос на second-life", "цены storage-систем", "котировки переработчиков", "сырьевые индикаторы"]
    },
    pilot: {
      title: "Пилот Battery Passport",
      steps: [
        "Выбрать одну категорию батарей и одного диагностического партнера.",
        "Определить минимальную схему паспорта: идентичность, состояние, история и стоимость.",
        "Создать паспорта для первой партии батарей.",
        "Прикрепить диагностические доказательства и события владения к каждой записи.",
        "Сравнить стоимость повторного использования со стоимостью переработки."
      ],
      goal: "Доказать, что доверенная запись о батарее меняет коммерческое решение с утилизации на повторное использование.",
      metrics: ["созданные паспорта", "полнота диагностики", "кандидаты на reuse", "точность оценки", "доверие покупателей"]
    },
    guardrails: [
      "Каждый паспорт сохраняет источник критически важных полей.",
      "Состояние и оценка показываются диапазоном, если данные неполные.",
      "Правила владения и доступа фиксируются до передачи батареи."
    ],
    executive:
      "Battery Passport - фундамент Project Phoenix. Без доверенной записи рынок не может отличить умершую батарею от батареи, которая просто закончила первый этап жизни.",
    effects: ["выше остаточная стоимость", "меньше преждевременной переработки", "ясное владение", "быстрее проверка покупателем", "лучше страховая логика", "проверяемая история жизненного цикла"]
  },
  {
    slug: "battery-exchange",
    title: "Battery Exchange",
    icon: "commerce",
    summary:
      "Биржа и слой маршрутизации, который сопоставляет батареи с наиболее выгодным следующим сценарием через дилеров, сервисы, энергетиков, страховщиков и переработчиков.",
    positioning:
      "Battery Exchange превращает проверенное состояние батареи в коммерческий маршрут. Система сравнивает повторное использование, перепродажу, storage, ремонт и recovery до того, как актив потеряет ценность.",
    outputs: ["Листинги батарей", "Подбор use case", "Маршрутизация партнеров", "Second-life предложения", "Recovery fallback"],
    layers: [
      {
        title: "Прием supply",
        text: "Получать батареи от автомобилей, дилеров, сервисных центров, автопарков, страховщиков и ремонтных сетей.",
        icon: "api",
        items: ["Дилеры", "Флоты", "Сервисы"]
      },
      {
        title: "Сопоставление спроса",
        text: "Подбирать покупателей, которые могут использовать остаточную емкость и принять профиль риска батареи.",
        icon: "target",
        items: ["Домашние накопители", "Бизнес-резерв", "Солнечная энергетика"]
      },
      {
        title: "Логика маршрута",
        text: "Сравнивать mobility reuse, стационарное хранение, ремонт, перепродажу и переработку по ожидаемой ценности.",
        icon: "flow",
        items: ["Reuse", "Repair", "Recovery"]
      },
      {
        title: "Доверие сделки",
        text: "Упаковывать состояние, доказательства, цену и логистику в сделку, которую партнеры могут одобрить.",
        icon: "shield",
        items: ["Evidence pack", "Диапазон цены", "Запись передачи"]
      }
    ],
    sections: [
      {
        title: "Что это",
        text:
          "Battery Exchange - региональный, а затем глобальный маркетплейс батарей с остаточным ресурсом. Он не просто размещает батареи, а использует паспорт и AI-оценку, чтобы рекомендовать лучший коммерческий сценарий."
      },
      {
        title: "Участники",
        items: [
          "автодилеры и операторы автопарков с батареями, выходящими из Mobility",
          "сервисные центры, которые диагностируют, ремонтируют и сертифицируют батареи",
          "покупатели для солнечной энергетики, резервного питания и доступных накопителей",
          "переработчики, которые получают только батареи без жизнеспособного second-life маршрута"
        ]
      },
      {
        title: "Маршруты",
        groups: [
          {
            title: "Energy",
            items: ["домашние накопители", "бизнес-накопители", "резервное питание", "солнечная интеграция"]
          },
          {
            title: "Mobility и ремонт",
            items: ["замена модулей", "fleet reuse", "remanufacturing", "использование на запчасти"]
          },
          {
            title: "Recovery",
            items: ["сертифицированная переработка", "возврат материалов", "контроль риска", "финальная запись жизненного цикла"]
          }
        ]
      }
    ],
    sources: {
      internal: ["battery passports", "диагностические оценки", "инвентарь партнеров", "история листингов", "история офферов", "транзакции", "логистические события"],
      external: ["рыночный спрос", "цены energy storage", "supply дилеров", "циклы замены автопарков", "котировки переработчиков", "спрос солнечных проектов", "регуляторные требования"]
    },
    pilot: {
      title: "Региональный пилот Exchange",
      steps: [
        "Подключить небольшой набор supply-партнеров и second-life покупателей.",
        "Публиковать батареи только после паспорта и диагностической проверки.",
        "Маршрутизировать каждую батарею в reuse, repair, storage или recovery.",
        "Отслеживать качество предложений, время закрытия и fallback-стоимость переработки.",
        "Использовать подтвержденные сделки для настройки цен и правил маршрутизации."
      ],
      goal: "Показать, что проверенные данные о батарее создают более ценный маршрут, чем прямое списание.",
      metrics: ["батареи в листинге", "подобранный спрос", "принятые офферы", "прирост стоимости", "время маршрутизации", "отложенная переработка"]
    },
    guardrails: [
      "Каждый листинг привязан к проверенному паспорту.",
      "Exchange показывает recovery как fallback, а не как сценарий по умолчанию.",
      "Каждый маршрут сохраняет итог для последующего обучения модели."
    ],
    executive:
      "Battery Exchange - коммерческая поверхность Project Phoenix. Она превращает battery intelligence в рынок, где лучший следующий сценарий виден до того, как актив списан.",
    effects: ["ликвидность батарей", "ниже стоимость storage-систем", "выше возвратная стоимость для дилеров", "сильнее партнерская сеть", "меньше отходов", "лучше экономика reuse"]
  },
  {
    slug: "battery-ai",
    title: "Battery AI",
    icon: "ai",
    summary:
      "AI-модель, которая оценивает остаточный ресурс, вероятность отказа, оптимальный маршрут использования и рыночную стоимость на основе диагностики и жизненного цикла.",
    positioning:
      "Battery AI - решающий механизм сети. Модель анализирует циклы зарядки, температуру, нагрузку, диагностику, ремонты и рыночные результаты, чтобы рекомендовать следующий сценарий для каждой батареи.",
    outputs: ["Оценка остаточного ресурса", "Вероятность отказа", "Best-use рекомендация", "Прогноз стоимости", "Объяснение риска"],
    layers: [
      {
        title: "Сбор сигналов",
        text: "Собирать эксплуатационные и диагностические сигналы, которые показывают, как батарея старела в реальности.",
        icon: "data",
        items: ["Циклы", "Температура", "Нагрузка"]
      },
      {
        title: "Модель деградации",
        text: "Переводить сырые сигналы в SOH, stress score, дисбаланс и ожидаемые паттерны деградации.",
        icon: "chip",
        items: ["SOH", "Stress score", "Аномалии"]
      },
      {
        title: "Оценка маршрута",
        text: "Скорить батарею для mobility reuse, energy storage, repair, resale или recovery.",
        icon: "ranking",
        items: ["Mobility", "Energy", "Recovery"]
      },
      {
        title: "Обучение на исходах",
        text: "Использовать реальные сделки и полевые результаты, чтобы улучшать следующие прогнозы.",
        icon: "flow",
        items: ["Принятый маршрут", "Полевой результат", "Финальная цена"]
      }
    ],
    sections: [
      {
        title: "Что это",
        text:
          "Battery AI - аналитическая модель, которая превращает lifecycle data в решения. Она не опирается на одно диагностическое измерение, а соединяет историю эксплуатации, температурную нагрузку, сервисные доказательства и рыночные исходы."
      },
      {
        title: "Что рассчитывает",
        items: [
          "остаточный ресурс для second-life сценариев",
          "вероятность отказа или неприемлемой деградации",
          "рекомендуемый маршрут: Mobility, Energy, Repair, Resale или Recovery",
          "диапазон рыночной стоимости с учетом состояния, спроса и риска"
        ]
      },
      {
        title: "Входные данные модели",
        groups: [
          {
            title: "Эксплуатация",
            items: ["циклы зарядки", "depth of discharge", "температура", "профиль нагрузки", "время хранения"]
          },
          {
            title: "Диагностика",
            items: ["тест емкости", "внутреннее сопротивление", "дисбаланс ячеек", "BMS events", "история ошибок"]
          },
          {
            title: "Рынок",
            items: ["принятые офферы", "спрос на storage", "стоимость ремонта", "стоимость переработки", "feedback партнеров"]
          }
        ]
      }
    ],
    sources: {
      internal: ["battery passports", "BMS data", "диагностические тесты", "ремонтные записи", "exchange outcomes", "полевые результаты", "гарантийные события"],
      external: ["исследования химии батарей", "рыночные цены", "спрос energy storage", "стоимость переработки", "тренды EV-замены", "feedback партнеров"]
    },
    pilot: {
      title: "Пилот AI scoring",
      steps: [
        "Собрать размеченный диагностический набор из первых батарей с паспортом.",
        "Определить scoring outputs: остаточный ресурс, риск, use case и стоимость.",
        "Сравнить рекомендации AI с экспертной оценкой технических специалистов.",
        "Отследить реальные marketplace outcomes для каждой оцененной батареи.",
        "Настроить модель на принятых, отклоненных и неудачных маршрутах."
      ],
      goal: "Создать первую региональную базу деградации батарей, которая улучшает каждое новое решение.",
      metrics: ["оцененные батареи", "согласие с экспертом", "точность маршрута", "качество прогноза отказа", "ошибка оценки", "рост dataset"]
    },
    guardrails: [
      "AI-рекомендации показывают доказательства и неопределенность оценки.",
      "Батареи высокого риска требуют экспертной проверки до листинга.",
      "Модель улучшается на реальных исходах, а не только на теоретических допущениях."
    ],
    executive:
      "Battery AI дает Project Phoenix накопительное преимущество. Каждый паспорт, диагностическое событие, листинг и полевой результат превращается в данные для регионального слоя battery intelligence.",
    effects: ["лучше прогноз остаточного ресурса", "безопаснее second-life routing", "точнее оценка стоимости", "ниже риск покупателя", "региональная база деградации", "сильнее долгосрочная защита модели"]
  }
];

export const phoenixProjects: Record<Locale, PrivateProject> = {
  en: {
    slug: "phoenix",
    title: "PROJECT PHOENIX",
    eyebrow: "Battery Intelligence Network",
    client: "Battery Intelligence Network",
    summary:
      "A digital infrastructure layer for the full lithium-battery lifecycle: from mobility to energy storage, and only then to recovery.",
    description:
      "Project Phoenix turns used batteries into managed digital assets. It identifies condition, forecasts remaining life, routes every battery to the best next use, and delays recycling until the usable energy resource is exhausted.",
    icon: "chip",
    status: "Concept ready for pilot design",
    outputs: ["Battery Passport", "Battery Exchange", "Battery AI", "Lifecycle routing", "Second-life valuation"],
    modules: enPhoenixModules,
    narrative: {
      architecture:
        "The modules separate the lifecycle problem into identity, market routing, and intelligence: first know the battery, then choose the next use, then improve predictions from every diagnostic and market event.",
      core: "One route from unknown battery to managed asset: diagnose, passport, route, reuse, recover.",
      valueHeading: "What changes for the battery market",
      moduleMapTitle: "Three lifecycle modules",
      relatedIntro:
        "{module} remains part of the same lifecycle network; adjacent modules show how identity, exchange, and AI reinforce the next battery decision."
    },
    thesis: {
      title: "Every battery deserves a complete lifecycle.",
      text:
        "A battery is often treated as finished when it is no longer suitable for a vehicle. Project Phoenix treats that moment as a transition point: from Mobility to Energy, and only after full exhaustion to Recovery.",
      items: [
        "Batteries leaving vehicles at 70-80% capacity can still serve energy-storage use cases for years.",
        "Battery Passport makes the real condition visible and transferable.",
        "Battery Exchange and Battery AI route each battery to the most valuable next scenario."
      ]
    },
    implementation: {
      title: "Launch path from diagnosis to regional intelligence",
      text:
        "The start should be narrow: create the diagnostic and passport layer first, then add exchange liquidity, partner services, storage solutions, and a regional degradation database.",
      steps: [
        "Create the diagnostic workflow and minimum Battery Passport schema.",
        "Launch a regional battery marketplace for verified assets.",
        "Build a partner network of service, diagnostic, dealer, energy, and recovery participants.",
        "Start own storage solutions only after enough verified second-life supply is visible.",
        "Grow the largest regional dataset on lithium-battery degradation and second-life outcomes."
      ]
    },
    guardrail: {
      title: "Infrastructure layer, not a warehouse",
      text:
        "Project Phoenix is not designed as a factory, warehouse, or repair shop. The defensible layer is the intelligence platform that manages condition, routing, value, and lifecycle evidence.",
      items: [
        "Reuse is evaluated before recycling.",
        "Every commercial route is backed by diagnostic evidence.",
        "The platform supports partners instead of trying to own every physical operation."
      ]
    }
  },
  ro: {
    slug: "phoenix",
    title: "PROJECT PHOENIX",
    eyebrow: "Battery Intelligence Network",
    client: "Battery Intelligence Network",
    summary:
      "Strat digital de infrastructura pentru intregul lifecycle al bateriilor cu litiu: de la mobility la energy storage si doar apoi la recovery.",
    description:
      "Project Phoenix transforma bateriile uzate in active digitale gestionate. Identifica starea, estimeaza resursa ramasa, routeaza fiecare baterie catre cea mai buna utilizare urmatoare si amana reciclarea pana cand resursa energetica utila este epuizata.",
    icon: "chip",
    status: "Concept pregatit pentru design de pilot",
    outputs: ["Battery Passport", "Battery Exchange", "Battery AI", "Lifecycle routing", "Second-life valuation"],
    modules: roPhoenixModules,
    narrative: {
      architecture:
        "Modulele separa problema lifecycle in identitate, routing comercial si intelligence: mai intai stii bateria, apoi alegi urmatoarea utilizare, apoi imbunatatesti predictiile din fiecare diagnostic si outcome de piata.",
      core: "Un traseu de la baterie necunoscuta la activ gestionat: diagnostic, pasaport, routing, reutilizare, recovery.",
      valueHeading: "Ce se schimba pentru piata bateriilor",
      moduleMapTitle: "Trei module lifecycle",
      relatedIntro:
        "{module} ramane parte din aceeasi retea lifecycle; modulele vecine arata cum identitatea, exchange-ul si AI-ul intaresc urmatoarea decizie despre baterie."
    },
    thesis: {
      title: "Fiecare baterie merita un lifecycle complet.",
      text:
        "O baterie este adesea tratata ca terminata cand nu mai este potrivita pentru vehicul. Project Phoenix trateaza acel moment ca tranzitie: din Mobility in Energy si doar dupa epuizare completa in Recovery.",
      items: [
        "Bateriile care ies din vehicule la 70-80% capacitate pot servi ani intregi in scenarii de energy storage.",
        "Battery Passport face starea reala vizibila si transferabila.",
        "Battery Exchange si Battery AI routeaza fiecare baterie catre cel mai valoros scenariu urmator."
      ]
    },
    implementation: {
      title: "Lansare de la diagnostic la intelligence regional",
      text:
        "Startul trebuie sa fie concentrat: mai intai stratul de diagnostic si pasaport, apoi lichiditate in exchange, servicii partenere, solutii storage si baza regionala de degradare.",
      steps: [
        "Creeaza workflow-ul de diagnostic si schema minima Battery Passport.",
        "Lanseaza marketplace regional pentru active verificate.",
        "Construieste reteaua de parteneri: service, diagnostic, dealeri, energie si recovery.",
        "Porneste solutii proprii de storage doar dupa ce exista suficient supply second-life verificat.",
        "Creste cea mai mare baza regionala despre degradarea bateriilor cu litiu si outcome-uri second-life."
      ]
    },
    guardrail: {
      title: "Strat de infrastructura, nu depozit",
      text:
        "Project Phoenix nu este gandit ca fabrica, depozit sau service. Stratul defensibil este platforma de intelligence care gestioneaza starea, routing-ul, valoarea si dovezile lifecycle.",
      items: [
        "Reutilizarea este evaluata inaintea reciclarii.",
        "Fiecare ruta comerciala este sustinuta de dovezi de diagnostic.",
        "Platforma sustine partenerii fara sa incerce sa detina fiecare operatiune fizica."
      ]
    }
  },
  ru: {
    slug: "phoenix",
    title: "PROJECT PHOENIX",
    eyebrow: "Battery Intelligence Network",
    client: "Battery Intelligence Network",
    summary:
      "Цифровая инфраструктура полного жизненного цикла литиевых батарей: от транспорта к системам хранения энергии и только затем к переработке.",
    description:
      "Project Phoenix превращает использованные батареи в управляемые цифровые активы. Платформа определяет состояние, прогнозирует остаточный ресурс, выбирает лучший следующий сценарий и откладывает переработку до полного исчерпания полезной энергии.",
    icon: "chip",
    status: "Концепция готова к проектированию пилота",
    outputs: ["Battery Passport", "Battery Exchange", "Battery AI", "Lifecycle routing", "Second-life valuation"],
    modules: ruPhoenixModules,
    narrative: {
      architecture:
        "Три модуля разделяют задачу жизненного цикла на идентичность, коммерческую маршрутизацию и intelligence: сначала понять батарею, затем выбрать следующий сценарий, затем улучшать прогнозы на каждом диагностическом и рыночном событии.",
      core: "Один маршрут от неизвестной батареи к управляемому активу: диагностика, паспорт, маршрут, повторное использование, recovery.",
      valueHeading: "Что меняется для рынка батарей",
      moduleMapTitle: "Три модуля жизненного цикла",
      relatedIntro:
        "{module} остается частью одной lifecycle-сети; соседние модули показывают, как идентичность, exchange и AI усиливают следующее решение по батарее."
    },
    thesis: {
      title: "Каждая батарея должна пройти полный жизненный цикл.",
      text:
        "Батарея часто считается законченной, когда она больше не подходит для автомобиля. Project Phoenix рассматривает этот момент как переход: из Mobility в Energy и только после полного исчерпания ресурса в Recovery.",
      items: [
        "Батареи, выходящие из транспорта на 70-80% емкости, могут еще годами работать в системах хранения энергии.",
        "Battery Passport делает реальное состояние батареи видимым, проверяемым и передаваемым.",
        "Battery Exchange и Battery AI выбирают для каждой батареи наиболее выгодный следующий сценарий."
      ]
    },
    implementation: {
      title: "Запуск: от диагностики к региональному intelligence",
      text:
        "Старт должен быть узким: сначала диагностика и цифровой паспорт, затем ликвидность на бирже, партнерские сервисы, собственные storage-решения и региональная база деградации.",
      steps: [
        "Создать диагностический процесс и минимальную схему Battery Passport.",
        "Запустить региональный маркетплейс проверенных батарей.",
        "Построить сеть партнеров: сервисы, диагностика, дилеры, энергетика и recovery.",
        "Запускать собственные решения хранения энергии только после появления достаточного проверенного second-life supply.",
        "Сформировать крупнейшую региональную базу данных деградации литиевых батарей и second-life исходов."
      ]
    },
    guardrail: {
      title: "Инфраструктурный слой, а не склад",
      text:
        "Project Phoenix не проектируется как завод, склад или сервисный центр. Защищаемый слой - intelligence-платформа, которая управляет состоянием, маршрутом, стоимостью и доказательствами жизненного цикла.",
      items: [
        "Повторное использование проверяется до переработки.",
        "Каждый коммерческий маршрут опирается на диагностические доказательства.",
        "Платформа усиливает партнеров, не пытаясь владеть каждой физической операцией."
      ]
    }
  }
};

export const getPhoenixProject = (locale: Locale) => phoenixProjects[locale] ?? phoenixProjects.en;
