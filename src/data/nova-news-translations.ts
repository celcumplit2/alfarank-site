import { generatedNovaNewsTranslations } from "@/data/nova-news-generated-translations";
import type { NewsLocale, NovaArticle, NovaArticleSummary } from "@/lib/nova";

type LocalizedText = Partial<Record<Exclude<NewsLocale, "en">, string>>;
type TranslationDictionary = Record<string, LocalizedText>;

const exactText: TranslationDictionary = {
  "News Analysis": {
    ro: "Analiza stirilor",
    ru: "Новостная аналитика"
  },
  "AlfaRank News Analysis": {
    ro: "Analiza stirilor AlfaRank",
    ru: "Новостная аналитика AlfaRank"
  },
  "Source-backed AlfaRank news analysis on automation, AI workflows, data systems, web platforms, and digital operations.": {
    ro: "Analiza AlfaRank bazata pe surse despre automatizare, workflow-uri AI, sisteme de date, platforme web si operatiuni digitale.",
    ru: "Новостная аналитика AlfaRank с опорой на источники: автоматизация, AI-процессы, системы данных, веб-платформы и цифровые операции."
  },
  "News trust pages": {
    ro: "Pagini de incredere pentru stiri",
    ru: "Служебные страницы новостей"
  },
  "AlfaRank intelligence for digital operators.": {
    ro: "Analiza AlfaRank pentru operatori digitali.",
    ru: "Аналитика AlfaRank для операторов цифровых систем."
  },
  "Analytical coverage from the NOVA monitoring engine: source-backed market signals, operational consequences, data points, and decision context for teams building automation and digital systems.": {
    ro: "Materiale analitice din motorul de monitorizare NOVA: semnale de piata sustinute de surse, consecinte operationale, date si context decizional pentru echipe care construiesc automatizare si sisteme digitale.",
    ru: "Аналитические материалы от мониторингового движка NOVA: рыночные сигналы с источниками, операционные последствия, данные и контекст решений для команд, которые строят автоматизацию и цифровые системы."
  },
  "About AlfaRank News": {
    ro: "Despre AlfaRank News",
    ru: "О новостях AlfaRank"
  },
  "Editorial Policy": {
    ro: "Politica editoriala",
    ru: "Редакционная политика"
  },
  Author: {
    ro: "Autor",
    ru: "Автор"
  },
  "Article summary": {
    ro: "Rezumatul articolului",
    ru: "Краткое содержание статьи"
  },
  "Operational meaning": {
    ro: "Semnificatie operationala",
    ru: "Операционный смысл"
  },
  "Market data": {
    ro: "Date de piata",
    ru: "Рыночные данные"
  },
  "Market numbers used in this analysis": {
    ro: "Cifre de piata folosite in analiza",
    ru: "Рыночные цифры, использованные в анализе"
  },
  Timeline: {
    ro: "Cronologie",
    ru: "Хронология"
  },
  "Decision matrix": {
    ro: "Matrice de decizie",
    ru: "Матрица решений"
  },
  "Possible outcomes": {
    ro: "Scenarii posibile",
    ru: "Возможные сценарии"
  },
  "What operators should monitor next": {
    ro: "Ce trebuie sa urmareasca operatorii",
    ru: "За чем операторам следить дальше"
  },
  "source-reported values": {
    ro: "valori raportate de surse",
    ru: "значения из источников"
  },
  "AI automation": {
    ro: "automatizare AI",
    ru: "AI-автоматизация"
  },
  "workflow automation": {
    ro: "automatizarea fluxurilor",
    ru: "автоматизация процессов"
  },
  "digital operations": {
    ro: "operatiuni digitale",
    ru: "цифровые операции"
  },
  "enterprise workflows": {
    ro: "fluxuri enterprise",
    ru: "корпоративные процессы"
  },
  "data governance": {
    ro: "guvernanta datelor",
    ru: "управление данными"
  },
  "platform risk": {
    ro: "risc de platforma",
    ru: "платформенный риск"
  },
  "AI Turns SaaS from Passive Tool to Workflow Actor: Productivity and Governance Risks": {
    ro: "AI transforma SaaS din instrument pasiv in actor de workflow: productivitate si riscuri de guvernanta",
    ru: "AI превращает SaaS из пассивного инструмента в участника процесса: продуктивность и риски управления"
  },
  "AI is reshaping SaaS from passive platforms to workflow actors. Explore productivity boosts, control risks, and market data for operators evaluating digital automation.": {
    ro: "AI transforma SaaS din platforme pasive in actori ai fluxurilor de lucru. Analiza despre productivitate, riscuri de control si date de piata pentru operatorii care evalueaza automatizarea digitala.",
    ru: "AI меняет SaaS: пассивные платформы становятся участниками процессов. Разбор роста продуктивности, рисков контроля и рыночных данных для операторов цифровой автоматизации."
  },
  "AI Pushes Enterprise Software from Tool to Actor: Workflow Gains Meet Control Risks": {
    ro: "AI muta software-ul enterprise de la instrument la actor: castiguri de workflow si riscuri de control",
    ru: "AI переводит корпоративный софт из инструмента в участника процесса: рост эффективности и риски контроля"
  },
  "Databricks Genie One: Real AI Automation or New Integration Risks?": {
    ro: "Databricks Genie One: automatizare AI reala sau noi riscuri de integrare?",
    ru: "Databricks Genie One: реальная AI-автоматизация или новые интеграционные риски?"
  },
  "Databricks' Genie One brings deeper AI automation by grounding actions in business context, but legacy integration and compliance create new challenges for operators.": {
    ro: "Genie One de la Databricks aduce o automatizare AI mai profunda prin legarea actiunilor de contextul de business, dar integrarea legacy si conformitatea creeaza provocari noi pentru operatori.",
    ru: "Genie One от Databricks углубляет AI-автоматизацию, привязывая действия к бизнес-контексту, но legacy-интеграции и комплаенс создают новые задачи для операторов."
  },
  "Databricks Genie One: AI-Powered Workflow Automation Offers Context, But Integration Gaps Remain": {
    ro: "Databricks Genie One: automatizarea workflow cu AI primeste context, dar lacunele de integrare raman",
    ru: "Databricks Genie One: AI-автоматизация процессов получает контекст, но интеграционные разрывы остаются"
  },
  "Pega AI Platform Update: Cost Savings and Governance Promise, But Integration Risks Loom": {
    ro: "Actualizarea platformei AI Pega: economii si promisiuni de guvernanta, dar riscurile de integrare cresc",
    ru: "Обновление AI-платформы Pega: экономия и обещание управления, но интеграционные риски растут"
  },
  "Pega's new AI pricing and orchestration model offers lower costs for enterprise automation, but workflow predictability hinges on adoption and integration. What operators need to know.": {
    ro: "Noul model Pega de preturi si orchestrare AI reduce costurile automatizarii enterprise, dar predictibilitatea fluxurilor depinde de adoptare si integrare. Ce trebuie sa stie operatorii.",
    ru: "Новая модель AI-цен и оркестрации Pega снижает затраты корпоративной автоматизации, но предсказуемость процессов зависит от внедрения и интеграции. Что нужно знать операторам."
  },
  "Pega’s AI Platform Overhaul: Predictable Automation or New Integration Risks?": {
    ro: "Refacerea platformei AI Pega: automatizare predictibila sau noi riscuri de integrare?",
    ru: "Перезапуск AI-платформы Pega: предсказуемая автоматизация или новые интеграционные риски?"
  },
  "AI-Driven Development Reshapes Enterprise Operations and Workflow Management": {
    ro: "Dezvoltarea asistata de AI remodeleaza operatiunile enterprise si managementul workflow",
    ru: "AI-разработка перестраивает корпоративные операции и управление процессами"
  },
  "AI coding and workflow automation accelerate delivery but shift bottlenecks to platform operations and application judgment. See industry benchmarks and decision risks.": {
    ro: "Codarea cu AI si automatizarea workflow accelereaza livrarea, dar muta blocajele spre operarea platformelor si deciziile de produs. Repere de industrie si riscuri decizionale.",
    ru: "AI-кодинг и автоматизация процессов ускоряют delivery, но переносят узкие места в платформенные операции и прикладные решения. Смотрите отраслевые бенчмарки и риски решений."
  },
  "AI-Driven Coding Disrupts Build-vs-Buy Logic: Workflow, Operations, and Judgment Now Key Bottlenecks": {
    ro: "Codarea cu AI schimba logica build-vs-buy: workflow, operatiuni si judecata devin blocajele cheie",
    ru: "AI-разработка меняет логику build-vs-buy: главные узкие места теперь процессы, операции и продуктовые решения"
  },
  "ServiceNow's AI Workflow Alliances: Urgent Steps for Digital Operations Teams": {
    ro: "Alianta AI workflow ServiceNow: pasi urgenti pentru echipele de operatiuni digitale",
    ru: "AI-альянсы ServiceNow для workflow: срочные шаги для команд цифровых операций"
  },
  "ServiceNow's expansion with Wipro, Digimarc, and HPE targets agentic AI, workflow provenance, and cryptographic verification. Here’s what digital workflow teams should do next.": {
    ro: "Extinderea ServiceNow cu Wipro, Digimarc si HPE vizeaza AI agentic, provenienta workflow si verificare criptografica. Ce trebuie sa faca mai departe echipele digitale.",
    ru: "Расширение ServiceNow с Wipro, Digimarc и HPE нацелено на агентный AI, provenance процессов и криптографическую проверку. Что digital workflow-командам делать дальше."
  },
  "ServiceNow's New AI Partnerships: What Workflow Teams Should Change Now": {
    ro: "Noile parteneriate AI ServiceNow: ce trebuie sa schimbe acum echipele de workflow",
    ru: "Новые AI-партнерства ServiceNow: что workflow-командам нужно изменить уже сейчас"
  },
  "RPA Market Surge: What Digital Ops Teams Lose—and Gain—in the Race to AI Automation": {
    ro: "Cresterea pietei RPA: ce pierd si ce castiga echipele digital ops in cursa spre automatizare AI",
    ru: "Рост рынка RPA: что digital ops-команды теряют и получают в гонке AI-автоматизации"
  },
  "RPA's 23.5% CAGR lifts scalability—yet exposes digital ops teams to process, vendor, and governance risks. Concrete impact and decision analysis for enterprise automation adoption.": {
    ro: "CAGR-ul RPA de 23,5% creste scalabilitatea, dar expune echipele digitale la riscuri de proces, furnizor si guvernanta. Impact concret si analiza deciziei pentru adoptarea automatizarii enterprise.",
    ru: "CAGR RPA 23,5% повышает масштабируемость, но открывает digital ops-командам процессные, вендорские и управленческие риски. Конкретный эффект и анализ решений для корпоративной автоматизации."
  },
  "Robotic Process Automation: Growth vs. Governance Risk for Digital Ops Leaders": {
    ro: "Robotic Process Automation: crestere versus risc de guvernanta pentru liderii digital ops",
    ru: "Robotic Process Automation: рост против рисков управления для лидеров digital ops"
  },
  "Cloudflare Acquires VoidZero: Should Operators Rethink Toolchains and Workflow Commitments?": {
    ro: "Cloudflare cumpara VoidZero: trebuie operatorii sa regandeasca toolchain-urile si angajamentele de workflow?",
    ru: "Cloudflare покупает VoidZero: нужно ли операторам пересмотреть toolchain и workflow-обязательства?"
  },
  "Cloudflare’s purchase of VoidZero (Vite) demands a reassessment of workflow configurations, automation investments, and platform risk for modern web and AI-powered product teams.": {
    ro: "Achizitia VoidZero (Vite) de catre Cloudflare cere reevaluarea configuratiilor workflow, investitiilor in automatizare si riscului de platforma pentru echipe web moderne si produse AI.",
    ru: "Покупка VoidZero (Vite) компанией Cloudflare требует переоценки конфигураций workflow, инвестиций в автоматизацию и платформенных рисков для современных web- и AI-powered продуктовых команд."
  },
  "Operators Must Evaluate Stack Risk and Workflow Alignment After Cloudflare Acquires VoidZero (Vite)": {
    ro: "Operatorii trebuie sa evalueze riscul stack-ului si alinierea workflow dupa achizitia VoidZero (Vite) de catre Cloudflare",
    ru: "После покупки VoidZero (Vite) Cloudflare операторы должны оценить риски стека и соответствие workflow"
  },
  "Automation Brings Fast AI to Gas Pipelines—But at What Data Control Cost?": {
    ro: "Automatizarea aduce AI rapid in conductele de gaz, dar cu ce cost pentru controlul datelor?",
    ru: "Автоматизация приносит быстрый AI в газовые pipeline, но какой ценой для контроля данных?"
  },
  "Automated NatGasHub.com and Databricks integration accelerates AI on pipeline data, while raising new risks in data governance for North American energy operators.": {
    ro: "Integrarea automatizata NatGasHub.com si Databricks accelereaza AI pe datele de conducte, dar ridica noi riscuri de guvernanta a datelor pentru operatorii energetici nord-americani.",
    ru: "Автоматизированная интеграция NatGasHub.com и Databricks ускоряет AI на pipeline-данных, но повышает новые риски управления данными для энергетических операторов Северной Америки."
  },
  "NatGasHub.com–Databricks Integration: Accelerated Pipeline Data for AI, with New Governance Risks": {
    ro: "Integrarea NatGasHub.com-Databricks: date de pipeline accelerate pentru AI si noi riscuri de guvernanta",
    ru: "Интеграция NatGasHub.com и Databricks: ускоренные pipeline-данные для AI и новые риски управления"
  },
  "Enterprise Agentic AI Adoption Timeline: From Chatbots to Data-Driven Automation": {
    ro: "Cronologia adoptarii AI agentic in companii: de la chatbots la automatizare bazata pe date",
    ru: "Хронология внедрения агентного AI в компаниях: от чатботов к data-driven автоматизации"
  },
  "See how enterprises are shifting from chatbots to agentic AI—why robust data foundations are now a priority, and what operators should monitor next.": {
    ro: "Cum trec companiile de la chatbots la AI agentic, de ce fundatiile solide de date devin prioritare si ce trebuie sa urmareasca operatorii.",
    ru: "Как компании переходят от чатботов к агентному AI, почему надежная база данных стала приоритетом и за чем операторам следить дальше."
  },
  "Timeline: Why Enterprises Are Moving Beyond Chatbots Toward Agentic AI—And What Happens Next": {
    ro: "Cronologie: de ce companiile trec dincolo de chatbots spre AI agentic si ce urmeaza",
    ru: "Хронология: почему компании уходят от чатботов к агентному AI и что будет дальше"
  },
  "Timeline: ZoomInfo and Konnectify Launch Full-Bidirectional Integration—Impact for B2B Automation": {
    ro: "Cronologie: ZoomInfo si Konnectify lanseaza integrarea complet bidirectionala - impact pentru automatizarea B2B",
    ru: "Хронология: ZoomInfo и Konnectify запускают полную двустороннюю интеграцию - эффект для B2B-автоматизации"
  },
  "Operators: Assess the new ZoomInfo–Konnectify two-way integration and what it changes about data orchestration, governance, and automation risk. Timeline and next steps inside.": {
    ro: "Operatori: evaluati noua integrare bidirectionala ZoomInfo-Konnectify si efectul asupra orchestrarii datelor, guvernantei si riscului de automatizare. Cronologie si pasi urmatori.",
    ru: "Операторам: оцените новую двустороннюю интеграцию ZoomInfo-Konnectify и ее влияние на оркестрацию данных, управление и риски автоматизации. Внутри - хронология и дальнейшие шаги."
  },
  "B2B Workflow Integration Timeline: Two-Way ZoomInfo–Konnectify Move Shifts Data Orchestration Norms": {
    ro: "Cronologia integrarii B2B workflow: miscarea bidirectionala ZoomInfo-Konnectify schimba normele de orchestrare a datelor",
    ru: "Хронология B2B workflow-интеграции: двусторонний шаг ZoomInfo-Konnectify меняет нормы оркестрации данных"
  },
  "AlphaSense AI Raise: Workflow Acceleration vs. Platform Dependency—Risks & Rewards Analyzed": {
    ro: "Runda AI AlphaSense: accelerarea workflow versus dependenta de platforma - riscuri si beneficii",
    ru: "Раунд AlphaSense для AI: ускорение workflow против зависимости от платформы - риски и выгоды"
  },
  "How Mitesco’s Exclusive Coaching Deal Changes the AI Workflow Playbook for Real Estate": {
    ro: "Cum schimba acordul exclusiv de coaching Mitesco playbook-ul AI workflow pentru real estate",
    ru: "Как эксклюзивная сделка Mitesco по coaching меняет AI workflow playbook для недвижимости"
  },
  "Analysis: What operators should do as Mitesco partners with Brian Moses to add exclusive coaching and workflow automation to RoboAgent. Key signals, risks, and next steps.": {
    ro: "Analiza: ce trebuie sa faca operatorii dupa parteneriatul Mitesco cu Brian Moses pentru coaching exclusiv si automatizare workflow in RoboAgent. Semnale, riscuri si pasi urmatori.",
    ru: "Анализ: что делать операторам после партнерства Mitesco с Brian Moses для добавления эксклюзивного coaching и workflow-автоматизации в RoboAgent. Ключевые сигналы, риски и следующие шаги."
  },
  "Operator Playbook: Mitesco’s RoboAgent Adds Exclusive Coaching for Real Estate AI Workflows": {
    ro: "Playbook pentru operatori: RoboAgent de la Mitesco adauga coaching exclusiv pentru workflow-uri AI in real estate",
    ru: "Playbook для операторов: RoboAgent от Mitesco добавляет эксклюзивный coaching для AI workflow в недвижимости"
  },
  "Teams running digital agent workflows should audit current coaching integrations and monitor the impact of Mitesco’s new AI-powered, content-driven RoboAgent partnership. Assess the implications for productivity, lead conversion, and automation—then track subsequent agent adoption signals.": {
    ro: "Echipele care opereaza workflow-uri digitale pentru agenti trebuie sa auditeze integrarile de coaching existente si sa monitorizeze impactul noului parteneriat RoboAgent al Mitesco, bazat pe AI si continut. Evaluati efectul asupra productivitatii, conversiei lead-urilor si automatizarii, apoi urmariti semnalele de adoptare.",
    ru: "Командам, которые ведут цифровые agent workflows, нужно проверить текущие coaching-интеграции и отслеживать эффект нового AI-powered, content-driven партнерства RoboAgent от Mitesco. Оцените влияние на продуктивность, конверсию лидов и автоматизацию, затем отслеживайте сигналы внедрения."
  },
  "Mitesco's partnership to integrate exclusive, expert coaching workflows into their RoboAgent AI platform is a significant step for teams managing distributed agent networks, driving measurable value if adopted effectively, but real execution risks remain for operators to monitor.": {
    ro: "Parteneriatul Mitesco pentru integrarea workflow-urilor exclusive de coaching expert in platforma RoboAgent AI este un pas important pentru echipele care gestioneaza retele distribuite de agenti si poate crea valoare masurabila daca este adoptat eficient, dar riscurile de executie raman reale.",
    ru: "Партнерство Mitesco по интеграции эксклюзивных экспертных coaching workflows в AI-платформу RoboAgent - важный шаг для команд, управляющих распределенными сетями агентов. Оно может дать измеримую ценность при правильном внедрении, но операторам нужно отслеживать реальные риски исполнения."
  },
  "KnowledgeLake CEO Appointment Timeline: What Billy Biggs’ Arrival Means for Workflow Automation": {
    ro: "Cronologia numirii CEO KnowledgeLake: ce inseamna venirea lui Billy Biggs pentru automatizarea workflow",
    ru: "Хронология назначения CEO KnowledgeLake: что приход Billy Biggs значит для workflow-автоматизации"
  },
  "See how KnowledgeLake’s new CEO fits into its recent growth, platform advances, and market strategy. Timeline, analysis, and next signals.": {
    ro: "Cum se incadreaza noul CEO KnowledgeLake in cresterea recenta, evolutia platformei si strategia de piata. Cronologie, analiza si semnale urmatoare.",
    ru: "Как новый CEO KnowledgeLake вписывается в недавний рост, развитие платформы и рыночную стратегию. Хронология, анализ и следующие сигналы."
  },
  "KnowledgeLake’s CEO Succession: Charting the Next Phase in Enterprise Workflow Automation": {
    ro: "Succesiunea CEO la KnowledgeLake: urmatoarea faza in automatizarea workflow enterprise",
    ru: "Смена CEO KnowledgeLake: следующая фаза корпоративной workflow-автоматизации"
  },
  "The appointment of Billy Biggs as CEO caps a pivotal chapter in KnowledgeLake’s evolution, marking a transition from operational maturity under Kevin Herr to accelerated platform and market growth. This step reflects a sequence of leadership and platform milestones—and sets a fresh tempo for digital systems companies, customers, and partners tracking the largest shifts in intelligent workflow automation.": {
    ro: "Numirea lui Billy Biggs ca CEO inchide un capitol important in evolutia KnowledgeLake, marcand trecerea de la maturitate operationala sub Kevin Herr la crestere accelerata de platforma si piata. Pasul reflecta o serie de repere de leadership si platforma si stabileste un ritm nou pentru companiile de sisteme digitale, clienti si parteneri.",
    ru: "Назначение Billy Biggs на пост CEO завершает важный этап эволюции KnowledgeLake, отмечая переход от операционной зрелости при Kevin Herr к ускоренному росту платформы и рынка. Этот шаг отражает последовательность лидерских и платформенных milestones и задает новый темп для компаний цифровых систем, клиентов и партнеров."
  },
  "The leadership transition to Billy Biggs as KnowledgeLake's CEO continues the company's drive to scale its AI-powered automation platform, signaling heightened ambitions and triggering new focal points for customers and competitors.": {
    ro: "Tranzitia de leadership catre Billy Biggs ca CEO KnowledgeLake continua efortul companiei de a scala platforma de automatizare AI, semnaland ambitii mai ridicate si noi puncte de atentie pentru clienti si competitori.",
    ru: "Переход лидерства к Billy Biggs в роли CEO KnowledgeLake продолжает стремление компании масштабировать AI-powered платформу автоматизации, сигнализируя более высокие амбиции и новые фокусы для клиентов и конкурентов."
  },
  "How Intezer's SOC Operating Layer Changes AI Agent Adoption for Enterprise Security Teams": {
    ro: "Cum schimba stratul operational SOC de la Intezer adoptarea agentilor AI pentru echipele enterprise security",
    ru: "Как операционный слой SOC от Intezer меняет внедрение AI-агентов для корпоративных security-команд"
  },
  "Practical guidance for enterprise operators on AI agent deployment in SOCs: coverage, accuracy, and forensic automation with Intezer's Model Context Protocol.": {
    ro: "Ghid practic pentru operatorii enterprise privind implementarea agentilor AI in SOC: acoperire, acuratete si automatizare forensic cu Model Context Protocol de la Intezer.",
    ru: "Практическое руководство для enterprise-операторов по внедрению AI-агентов в SOC: покрытие, точность и forensic automation с Model Context Protocol от Intezer."
  },
  "Operator Playbook: Deploying AI Agents in Enterprise SOCs with Intezer's New Operating Layer": {
    ro: "Playbook pentru operatori: implementarea agentilor AI in SOC enterprise cu noul strat operational Intezer",
    ru: "Playbook для операторов: внедрение AI-агентов в enterprise SOC с новым операционным слоем Intezer"
  },
  "SOC teams evaluating AI agents should re-examine their architecture: direct tool integrations miss scalable benefits, while a forensic operating layer like Intezer’s unlocks compounding knowledge, higher alert coverage, and readiness for real-world automation.": {
    ro: "Echipele SOC care evalueaza agenti AI trebuie sa-si reexamineze arhitectura: integrarile directe cu instrumente rateaza beneficiile scalabile, in timp ce un strat operational forensic precum Intezer deblocheaza acumularea de cunostinte, acoperire mai mare a alertelor si pregatire pentru automatizare reala.",
    ru: "SOC-командам, которые оценивают AI-агентов, нужно заново посмотреть на архитектуру: прямые tool-интеграции упускают масштабируемые выгоды, тогда как forensic operating layer вроде Intezer открывает накопление знаний, большее покрытие alerts и готовность к реальной автоматизации."
  },
  "Intezer’s SOC Operating Layer redefines how enterprises integrate and operationalize frontier AI agents like Claude and Codex by providing a forensic, scalable foundation for 24/7 alert triage and supervisor–AI collaboration, unlocking both efficiency and true knowledge compounding.": {
    ro: "SOC Operating Layer de la Intezer redefineste modul in care companiile integreaza si operationalizeaza agenti AI de frontiera precum Claude si Codex, oferind o baza forensic scalabila pentru trierea alertelor 24/7 si colaborarea supervisor-AI.",
    ru: "SOC Operating Layer от Intezer переопределяет, как компании интегрируют и операционализируют frontier AI-агентов вроде Claude и Codex, предоставляя масштабируемую forensic-основу для 24/7 alert triage и collaboration supervisor-AI."
  },
  "Should You Pilot Digicode’s Multi-Agent AI for Procurement?": {
    ro: "Merita pilotat AI-ul multi-agent Digicode pentru procurement?",
    ru: "Стоит ли пилотировать multi-agent AI Digicode для закупок?"
  },
  "Digicode’s ERP-agnostic AI agents cut procurement cycles by over 60%. Operators must decide if radically faster S2C and new risk controls justify product evaluation now.": {
    ro: "Agentii AI ERP-agnostic de la Digicode reduc ciclurile de procurement cu peste 60%. Operatorii trebuie sa decida daca S2C mult mai rapid si noile controale de risc justifica evaluarea produsului acum.",
    ru: "ERP-agnostic AI-агенты Digicode сокращают procurement cycles более чем на 60%. Операторы должны решить, оправдывают ли радикально ускоренный S2C и новые risk controls оценку продукта уже сейчас."
  },
  "Operators Must Rethink Procurement Timelines and Risk as Digicode Launches AI-Driven, ERP-Agnostic Agents": {
    ro: "Operatorii trebuie sa regandeasca termenele si riscul in procurement dupa lansarea agentilor AI ERP-agnostic de la Digicode",
    ru: "Операторам нужно пересмотреть сроки и риски закупок после запуска AI-driven, ERP-agnostic агентов Digicode"
  },
  "Digital operations teams face a practical choice: advance procurement automation now, or wait for established workflows to catch up. Digicode's release of an ERP-agnostic, multi-agent AI system for source-to-contract cycles compresses procurement timeframes and shifts the automation debate from product replacement to infrastructure integration. Decision-makers must evaluate if these agents warrant immediate pilot investment, change management, and process redesign.": {
    ro: "Echipele de operatiuni digitale au o alegere practica: sa avanseze automatizarea procurement acum sau sa astepte ca workflow-urile existente sa recupereze. Sistemul AI multi-agent ERP-agnostic lansat de Digicode pentru cicluri source-to-contract comprima termenele si muta discutia de la inlocuirea produsului la integrarea infrastructurii.",
    ru: "Команды цифровых операций стоят перед практическим выбором: продвигать автоматизацию закупок сейчас или ждать, пока устоявшиеся workflow догонят. ERP-agnostic multi-agent AI-система Digicode для source-to-contract cycles сжимает сроки закупок и переводит спор об автоматизации от замены продукта к интеграции инфраструктуры."
  },
  "Digicode's new ERP-agnostic, multi-agent AI procurement automation system enables procurement leaders to shrink cycle times, cut manual effort, and integrate AI within existing infrastructure—but requires IT buy-in, a shift in process control, and a new approach to pilot evaluation.": {
    ro: "Noul sistem Digicode de automatizare procurement cu AI multi-agent, ERP-agnostic, permite liderilor procurement sa reduca ciclurile, sa taie efortul manual si sa integreze AI in infrastructura existenta, dar cere sustinere IT, schimbarea controlului de proces si o noua abordare pentru evaluarea pilotului.",
    ru: "Новая ERP-agnostic multi-agent AI-система Digicode для автоматизации закупок позволяет procurement-лидерам сокращать циклы, уменьшать ручной труд и интегрировать AI в существующую инфраструктуру, но требует поддержки IT, сдвига в контроле процессов и нового подхода к pilot evaluation."
  },
  "AlphaSense’s $350M funding powers new AI workflow automation for enterprises—yet centralizing intelligence brings growth and risk to digital ops. Data, consequences, and signals inside.": {
    ro: "Finantarea AlphaSense de $350M sustine automatizarea AI a workflow-urilor enterprise, dar centralizarea inteligentei aduce crestere si risc pentru digital ops. Date, consecinte si semnale.",
    ru: "Финансирование AlphaSense на $350 млн усиливает новую AI-автоматизацию корпоративных процессов, но централизация intelligence приносит рост и риски для digital ops. Данные, последствия и сигналы внутри."
  },
  "AlphaSense's $350M Raise: AI Workflow Opportunity—and the Risks of Centralizing Enterprise Intelligence": {
    ro: "Runda AlphaSense de $350M: oportunitatea AI workflow si riscurile centralizarii inteligentei enterprise",
    ru: "Раунд AlphaSense на $350 млн: возможности AI workflow и риски централизации корпоративной аналитики"
  },
  "AlphaSense’s latest funding and AI advances promise unmatched decision velocity for enterprise research workflows, but intensifying reliance on a single intelligence infrastructure poses systemic risk for digital operations leaders.": {
    ro: "Cea mai recenta finantare AlphaSense si avansurile AI promit o viteza decizionala foarte mare pentru workflow-urile de cercetare enterprise, dar dependenta tot mai mare de o singura infrastructura de inteligenta creeaza risc sistemic pentru liderii operatiunilor digitale.",
    ru: "Новое финансирование AlphaSense и AI-развитие обещают беспрецедентную скорость решений для корпоративных research workflows, но растущая зависимость от единой intelligence-инфраструктуры создает системный риск для лидеров цифровых операций."
  },
  "AlphaSense’s rapid AI-powered workflow expansion demonstrates enormous opportunity for enterprises to operationalize AI-driven research and decision-making—yet the company’s scale and dominance also present risks around platform dependency, access equity, and future integration constraints.": {
    ro: "Extinderea rapida a workflow-urilor AI AlphaSense arata oportunitatea majora pentru companii de a operationaliza cercetarea si deciziile asistate de AI, dar scara si dominanta companiei aduc riscuri legate de dependenta de platforma, acces echitabil si constrangeri viitoare de integrare.",
    ru: "Быстрое расширение AI-powered workflow у AlphaSense показывает огромную возможность для компаний операционализировать AI-driven research и принятие решений, но масштаб и доминирование компании также создают риски зависимости от платформы, равного доступа и будущих интеграционных ограничений."
  },
  "AI is rapidly transforming enterprise workflows from user-driven tools into autonomous systems, promising productivity boosts but demanding a rethink of interface design, permission management, and governance. Digital systems operators must weigh streamlined orchestration against new risks of automation drift and accountability in AI-augmented stacks.": {
    ro: "AI transforma rapid workflow-urile enterprise din instrumente controlate de utilizator in sisteme autonome, promitand crestere de productivitate, dar cerand regandirea interfetelor, permisiunilor si guvernantei. Operatorii digitali trebuie sa compare orchestrarea mai fluida cu noile riscuri de drift al automatizarii si responsabilitate in stack-uri AI.",
    ru: "AI быстро превращает корпоративные процессы из инструментов, которыми управляет пользователь, в автономные системы. Это обещает рост продуктивности, но требует заново продумать интерфейсы, права доступа и управление. Операторы цифровых систем должны сопоставить выгоды оркестрации с новыми рисками дрейфа автоматизации и ответственности в AI-стеке."
  },
  "AI-driven automation is shifting enterprise software from tool to actor—boosting productivity, but introducing new control, governance, and integration risks for operators making architectural decisions on platforms and workflows.": {
    ro: "Automatizarea bazata pe AI muta software-ul enterprise de la instrument la actor: productivitatea creste, dar apar riscuri noi de control, guvernanta si integrare pentru operatorii care iau decizii arhitecturale despre platforme si workflow-uri.",
    ru: "AI-автоматизация переводит корпоративный софт из роли инструмента в роль участника процесса: продуктивность растет, но появляются новые риски контроля, управления и интеграции для операторов, принимающих архитектурные решения о платформах и workflow."
  },
  "Databricks Genie One promises to automate business workflows far beyond analytics by leveraging an AI context layer, but organizations will face challenges around data access, legacy integration, and regulatory compliance before converting promise into productivity.": {
    ro: "Databricks Genie One promite sa automatizeze workflow-uri de business mult dincolo de analiza, folosind un strat de context AI, dar organizatiile vor intampina provocari legate de acces la date, integrare legacy si conformitate inainte ca promisiunea sa devina productivitate.",
    ru: "Databricks Genie One обещает автоматизировать бизнес-процессы далеко за пределами аналитики за счет AI-слоя контекста, но прежде чем обещание станет продуктивностью, компаниям нужно решить доступ к данным, legacy-интеграции и регуляторный комплаенс."
  },
  "Databricks’ Genie One raises the bar for AI-powered workflow automation by embedding real business context, but its success depends on data connectivity, governance, and support for highly regulated or fragmented environments.": {
    ro: "Genie One de la Databricks ridica standardul pentru automatizarea workflow cu AI prin incorporarea contextului real de business, dar succesul depinde de conectivitatea datelor, guvernanta si suport pentru medii reglementate sau fragmentate.",
    ru: "Genie One от Databricks поднимает планку AI-автоматизации процессов, встраивая реальный бизнес-контекст, но успех зависит от связанности данных, управления и поддержки строго регулируемых или фрагментированных сред."
  },
  "Pega’s expanded AI platform promises lower costs and better control for complex business workflows, shifting to per-case pricing and agent orchestration. But success depends on how well customers adopt its predictable-AI model and manage integration complexity.": {
    ro: "Platforma AI extinsa Pega promite costuri mai mici si control mai bun pentru workflow-uri complexe, trecand la pret pe caz si orchestrare de agenti. Dar succesul depinde de adoptarea modelului predictable AI si de gestionarea complexitatii integrarii.",
    ru: "Расширенная AI-платформа Pega обещает меньшие затраты и лучший контроль сложных бизнес-процессов, переходя к цене за кейс и агентной оркестрации. Но успех зависит от того, насколько клиенты примут модель predictable AI и справятся со сложностью интеграций."
  },
  "Pega's expanded AI orchestration, revamped development suite, and per-case pricing reduce risk and cost for enterprise automation, but real scalability and predictability remain dependent on customer adoption of design-time controls and platform-centric workflows.": {
    ro: "Orchestrarea AI extinsa Pega, suita de dezvoltare refacuta si pretul pe caz reduc riscul si costul automatizarii enterprise, dar scalabilitatea si predictibilitatea reale depind de adoptarea controalelor design-time si a workflow-urilor centrate pe platforma.",
    ru: "Расширенная AI-оркестрация Pega, обновленный набор разработки и цена за кейс снижают риск и стоимость корпоративной автоматизации, но реальная масштабируемость и предсказуемость зависят от принятия design-time контролей и платформоцентричных workflow."
  },
  "Teams building, integrating, or extending digital content workflows must critically reassess not just which AI development tools to adopt, but how to structure operations, governance, and product judgment around them. Technical leaders should monitor operational overload risk and reallocate resources to platform management and application portfolio control.": {
    ro: "Echipele care construiesc, integreaza sau extind workflow-uri digitale de continut trebuie sa reevalueze nu doar ce instrumente AI de dezvoltare adopta, ci si cum structureaza operatiunile, guvernanta si judecata de produs in jurul lor. Liderii tehnici trebuie sa monitorizeze riscul de supraincarcare operationala si sa mute resurse spre managementul platformei si controlul portofoliului de aplicatii.",
    ru: "Команды, которые строят, интегрируют или расширяют цифровые контент-процессы, должны переоценить не только выбор AI-инструментов разработки, но и структуру операций, управления и продуктовых решений вокруг них. Техническим лидерам нужно отслеживать риск операционной перегрузки и переносить ресурсы в управление платформами и контроль портфеля приложений."
  },
  "Enterprise adoption of AI-assisted software development and workflow automation tools is redefining not just the speed of delivery but how organizations must structure teams, processes, and risk controls. Teams must update their technology and operational models to realize the promise of faster, more scalable software delivery.": {
    ro: "Adoptarea enterprise a dezvoltarii software asistate de AI si a instrumentelor de automatizare workflow redefinește nu doar viteza livrarii, ci si modul in care organizatiile trebuie sa structureze echipele, procesele si controalele de risc. Echipele trebuie sa actualizeze modelele tehnologice si operationale pentru a obtine livrare software mai rapida si scalabila.",
    ru: "Корпоративное внедрение AI-assisted разработки и инструментов автоматизации процессов меняет не только скорость delivery, но и то, как организации должны строить команды, процессы и контроли рисков. Командам нужно обновить технологические и операционные модели, чтобы получить более быструю и масштабируемую поставку софта."
  },
  "Digital operations and content infrastructure teams should inventory their workflow platforms for ServiceNow integrations supporting agentic AI, provenance, and cryptographic verification. With new alliances announced with Wipro, Digimarc, and HPE—each targeting a foundational element of scalable, auditable automation—teams need to audit readiness for interconnected AI workflows and standardized outputs before broader rollout.": {
    ro: "Echipele de operatiuni digitale si infrastructura de continut trebuie sa inventarieze platformele workflow pentru integrari ServiceNow care sustin AI agentic, provenienta si verificare criptografica. Noile aliante cu Wipro, Digimarc si HPE vizeaza elemente de baza ale automatizarii scalabile si auditabile, deci echipele trebuie sa verifice pregatirea pentru workflow-uri AI interconectate inainte de extindere.",
    ru: "Командам цифровых операций и контентной инфраструктуры нужно инвентаризировать workflow-платформы на предмет интеграций ServiceNow, поддерживающих агентный AI, provenance и криптографическую проверку. Новые альянсы с Wipro, Digimarc и HPE нацелены на базовые элементы масштабируемой и аудируемой автоматизации, поэтому командам нужно заранее проверить готовность к связанным AI workflow и стандартизированным outputs."
  },
  "ServiceNow's expanded agentic AI partnerships with Wipro, Digimarc, and HPE directly shift the enterprise automation stack toward greater provenance tracking, cryptographic verification, and unified operations—raising both implementation standards and interoperability expectations for digital workflow teams.": {
    ro: "Parteneriatele agentic AI extinse ale ServiceNow cu Wipro, Digimarc si HPE muta direct stack-ul de automatizare enterprise spre urmarirea provenientei, verificare criptografica si operatiuni unificate, ridicand standardele de implementare si asteptarile de interoperabilitate pentru echipele workflow digitale.",
    ru: "Расширенные агентные AI-партнерства ServiceNow с Wipro, Digimarc и HPE напрямую сдвигают стек корпоративной автоматизации к provenance tracking, криптографической проверке и unified operations, повышая стандарты внедрения и ожидания interoperability для digital workflow-команд."
  },
  "RPA is set for explosive growth—projected to reach $25.4B by 2033—supercharging enterprise efficiency but raising stakes for integration risk, workforce impact, and oversight for digital systems teams.": {
    ro: "RPA se pregateste pentru crestere exploziva, cu proiectie de $25,4B pana in 2033, accelerand eficienta enterprise, dar ridicand miza riscurilor de integrare, impactului asupra fortei de munca si supravegherii pentru echipele de sisteme digitale.",
    ru: "RPA идет к взрывному росту: прогноз до $25,4 млрд к 2033 году. Это усиливает корпоративную эффективность, но повышает ставки интеграционных рисков, влияния на персонал и надзора для команд цифровых систем."
  },
  "The surge in the Robotic Process Automation (RPA) market offers significant scalability and efficiency gains but creates new dependency, integration, and governance risks for operators deploying automation at scale.": {
    ro: "Saltul pietei Robotic Process Automation (RPA) ofera castiguri importante de scalabilitate si eficienta, dar creeaza riscuri noi de dependenta, integrare si guvernanta pentru operatorii care implementeaza automatizare la scara.",
    ru: "Скачок рынка Robotic Process Automation (RPA) дает значительный рост масштабируемости и эффективности, но создает новые риски зависимости, интеграции и управления для операторов, внедряющих автоматизацию в масштабе."
  },
  "Cloudflare’s acquisition of VoidZero (Vite) presents a clear decision: operators and product leads must reassess planned budgets, workflow architecture, and vendor exposure, as core JavaScript tooling and deployment paradigms centralize inside one cloud-edge provider.": {
    ro: "Achizitia VoidZero (Vite) de catre Cloudflare creeaza o decizie clara: operatorii si liderii de produs trebuie sa reevalueze bugetele planificate, arhitectura workflow si expunerea la furnizor, pe masura ce tooling-ul JavaScript de baza si deployment-ul se centralizeaza intr-un singur provider cloud-edge.",
    ru: "Покупка VoidZero (Vite) компанией Cloudflare ставит ясный вопрос: операторы и product leads должны пересмотреть бюджеты, workflow-архитектуру и vendor exposure, потому что базовый JavaScript tooling и deployment-парадигмы централизуются внутри одного cloud-edge провайдера."
  },
  "Cloudflare’s acquisition of VoidZero and the Vite toolchain signals a major integration move: operators must assess whether this alters stack selection, workflow automation, vendor risk, and budgets for web and AI-native deployments.": {
    ro: "Achizitia VoidZero si a toolchain-ului Vite de catre Cloudflare semnaleaza o miscare majora de integrare: operatorii trebuie sa evalueze daca aceasta schimba selectia stack-ului, automatizarea workflow, riscul de furnizor si bugetele pentru deployment-uri web si AI-native.",
    ru: "Покупка VoidZero и toolchain Vite компанией Cloudflare сигнализирует крупный интеграционный шаг: операторам нужно оценить, меняет ли это выбор стека, workflow-автоматизацию, vendor risk и бюджеты для web и AI-native deployments."
  },
  "The Databricks–NatGasHub.com integration promises streamlined, automated access to standardized pipeline data from more than 300 North American gas networks, unlocking opportunity for rapid enterprise AI and analytics deployment. But this centralized data flow introduces architectural dependencies, potential governance blind spots, and new risks for operators accustomed to manual source control.": {
    ro: "Integrarea Databricks-NatGasHub.com promite acces automatizat si fluid la date standardizate de pipeline din peste 300 de retele de gaz nord-americane, deschizand oportunitati pentru AI si analytics enterprise rapide. Dar acest flux centralizat introduce dependente arhitecturale, zone oarbe de guvernanta si riscuri noi pentru operatorii obisnuiti cu control manual al surselor.",
    ru: "Интеграция Databricks и NatGasHub.com обещает автоматизированный доступ к стандартизированным pipeline-данным из более чем 300 североамериканских газовых сетей, открывая возможность быстрого внедрения enterprise AI и аналитики. Но этот централизованный поток данных вводит архитектурные зависимости, возможные слепые зоны управления и новые риски для операторов, привыкших к ручному контролю источников."
  },
  "NatGasHub.com's and Databricks' integration offers significant workflow efficiencies and analytics upside for North American natural gas operators but raises concerns on data validation, dependency risk, and change management for organizations unaccustomed to automated, large-scale standardized intake.": {
    ro: "Integrarea NatGasHub.com si Databricks ofera eficienta workflow si beneficii analitice pentru operatorii nord-americani de gaze naturale, dar ridica intrebari despre validarea datelor, riscul de dependenta si managementul schimbarii in organizatii neobisnuite cu intake standardizat automat la scara mare.",
    ru: "Интеграция NatGasHub.com и Databricks дает заметную workflow-эффективность и аналитический upside для операторов природного газа Северной Америки, но поднимает вопросы валидации данных, риска зависимости и change management для организаций, не привыкших к автоматизированному масштабному standardized intake."
  },
  "The pivot from simple chatbot overlays to comprehensive agentic AI stacks marks a new phase in enterprise automation. This shift—driven by mounting pressure to embed intelligence inside workflows—follows several years of surface-level automation and now forces organizations to rethink data integrity, interoperability, and control planes. Understanding the sequence of major market actions clarifies where today’s leading operators are doubling down and what future signals to track as agentic architectures mature.": {
    ro: "Trecerea de la simple suprapuneri de chatbot la stack-uri agentic AI complete marcheaza o noua faza in automatizarea enterprise. Schimbarea, impinsa de presiunea de a incorpora inteligenta in workflow-uri, urmeaza mai multor ani de automatizare superficiala si forteaza organizatiile sa regandeasca integritatea datelor, interoperabilitatea si control planes.",
    ru: "Переход от простых chatbot-оберток к полноценным agentic AI-стекам отмечает новую фазу корпоративной автоматизации. Этот сдвиг, вызванный давлением встроить intelligence внутрь workflow, следует за несколькими годами поверхностной автоматизации и заставляет организации заново продумать целостность данных, interoperability и control planes."
  },
  "Enterprises are increasingly moving beyond basic chatbot integrations to invest in foundational data integrity needed for agentic AI—signaling a tipping point for automation architecture and governance.": {
    ro: "Companiile trec tot mai mult dincolo de integrarile simple de chatbot si investesc in integritatea fundamentala a datelor necesara pentru agentic AI, semnaland un punct de inflexiune pentru arhitectura automatizarii si guvernanta.",
    ru: "Компании все чаще выходят за пределы базовых chatbot-интеграций и инвестируют в фундаментальную целостность данных, нужную для agentic AI, что сигнализирует переломный момент для архитектуры автоматизации и управления."
  },
  "The direct, two-way integration between ZoomInfo’s GTM.AI and Konnectify is more than a vendor partnership—it marks a new operational phase in automated B2B data flows: native, governable, bidirectional enrichment at workflow scale. This update follows a series of advances in data pipeline complexity and integration depth. Operators now face a tangible change: orchestration decisions shift from one-way connectors to platform-governed, context-driven data exchange, requiring new strategies for AI enrichment, governance, and system risk.": {
    ro: "Integrarea directa, bidirectionala dintre GTM.AI de la ZoomInfo si Konnectify este mai mult decat un parteneriat de furnizori: marcheaza o noua faza operationala in fluxurile automate de date B2B, cu enrichment nativ, guvernabil si bidirectional la scara workflow. Operatorii trebuie sa treaca de la conectori unidirectionali la schimb de date guvernat de platforma si bazat pe context.",
    ru: "Прямая двусторонняя интеграция между GTM.AI от ZoomInfo и Konnectify - больше чем партнерство вендоров: это новая операционная фаза автоматизированных B2B data flows, с native, governable, bidirectional enrichment в масштабе workflow. Операторам теперь нужно переходить от односторонних connector-решений к управляемому платформой и контекстному обмену данными."
  },
  "The ZoomInfo–Konnectify integration signals an intensifying shift in B2B automation: from ad-hoc data flows to always-on, governed, bidirectional intelligence. Operators should assess what this changes for system architecture, governance, and risk.": {
    ro: "Integrarea ZoomInfo-Konnectify semnaleaza accelerarea schimbarii in automatizarea B2B: de la fluxuri ad-hoc la inteligenta permanenta, guvernata si bidirectionala. Operatorii trebuie sa evalueze ce schimba aceasta pentru arhitectura sistemelor, guvernanta si risc.",
    ru: "Интеграция ZoomInfo-Konnectify сигнализирует усиление сдвига в B2B-автоматизации: от ad-hoc потоков данных к always-on, управляемой, двусторонней intelligence. Операторам нужно оценить, что это меняет для архитектуры систем, governance и риска."
  }
};

const structuralKeys = new Set([
  "id",
  "slug",
  "status",
  "articleType",
  "category",
  "url",
  "publicUrl",
  "canonicalUrl",
  "r2Key",
  "sourceRef",
  "image",
  "datePublished",
  "dateModified",
  "publishedAt",
  "updatedAt",
  "type",
  "variantId",
  "imageStrategy",
  "mode",
  "provider",
  "model",
  "size",
  "quality",
  "contentType",
  "generatedAt",
  "chartType",
  "visual",
  "sourceIds",
  "siteId",
  "clusterId",
  "sourceItemId",
  "language",
  "createdAt",
  "articleSection",
  "aiDisclosure",
  "role",
  "bio"
]);

const translateString = (value: string, locale: NewsLocale) => {
  if (locale === "en") return value;
  const exact = exactText[value]?.[locale];
  const generated = generatedNovaNewsTranslations[value]?.[locale];
  if (value.length > 120 && generated) return generated;
  return exact ?? generated ?? value;
};

const translateValue = (value: unknown, locale: NewsLocale, key = ""): unknown => {
  if (locale === "en") return value;
  if (typeof value === "string") return structuralKeys.has(key) ? value : translateString(value, locale);
  if (Array.isArray(value)) return value.map((item) => translateValue(item, locale, key));
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([entryKey, entryValue]) => [entryKey, translateValue(entryValue, locale, entryKey)])
    );
  }
  return value;
};

export const translateNewsText = translateString;

export const translateNovaArticleSummary = (article: NovaArticleSummary, locale: NewsLocale): NovaArticleSummary => {
  if (locale === "en") return article;
  return translateValue(article, locale) as NovaArticleSummary;
};

export const translateNovaArticle = (article: NovaArticle, locale: NewsLocale): NovaArticle => {
  if (locale === "en") return article;
  return translateValue(article, locale) as NovaArticle;
};
