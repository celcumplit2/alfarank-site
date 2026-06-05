import type { Locale } from "@/data/i18n";

type MoldovagazLayer = {
  title: string;
  text: string;
  icon: string;
  items: string[];
};

type MoldovagazPresentation = {
  valueTitle: string;
  valueText: string;
  flowTitle: string;
  flowText: string;
  proofTitle: string;
  proofText: string;
};

export type MoldovagazGroup = {
  slug: string;
  title: string;
  icon: string;
  summary: string;
  framing: string;
  outcomes: string[];
  projects: string[];
};

export type MoldovagazPriorityQuadrant = {
  slug: string;
  title: string;
  label: string;
  summary: string;
  criteria: string[];
  projects: string[];
};

export type MoldovagazModule = {
  slug: string;
  groupSlug: string;
  title: string;
  icon: string;
  summary: string;
  positioning: string;
  outputs: string[];
  layers: MoldovagazLayer[];
  presentation: MoldovagazPresentation;
  sources: {
    internal: string[];
    external: string[];
  };
  pilot: {
    title: string;
    goal: string;
    steps: string[];
    metrics: string[];
  };
  guardrails: string[];
  executive: string;
  effects: string[];
};

export type MoldovagazProject = {
  slug: string;
  title: string;
  eyebrow: string;
  client: string;
  summary: string;
  description: string;
  icon: string;
  status: string;
  outputs: string[];
  thesis: {
    title: string;
    text: string;
    items: string[];
  };
  navigation: {
    title: string;
    text: string;
    core: string;
  };
  presentationCards: {
    eyebrow: string;
    title: string;
    text: string;
    items: string[];
  }[];
  implementation: {
    title: string;
    text: string;
    steps: string[];
  };
  guardrail: {
    title: string;
    text: string;
    items: string[];
  };
  groups: MoldovagazGroup[];
  priorityMatrix: MoldovagazPriorityQuadrant[];
  modules: MoldovagazModule[];
};

export const moldovagazUi: Record<
  Locale,
  {
    backToProject: string;
    openModule: string;
    modules: string;
    outputs: string;
    projectOverview: string;
    projectMap: string;
    moduleBlueprint: string;
    presentationFlow: string;
    valuePromise: string;
    pilotStory: string;
    proofPoints: string;
    guardrails: string;
    dataSources: string;
    internalSources: string;
    externalSources: string;
    implementationPlan: string;
    pilotMetrics: string;
    executiveFraming: string;
    strategicEffect: string;
    relatedModules: string;
    relatedText: string;
    priorityMatrix: string;
    directionProjects: string;
    navigationLabel: string;
    directionLabel: string;
    hierarchyTitle: string;
    hierarchyText: string;
    mapNavigationAria: string;
    heroFlow: string;
    metricDirections: string;
    auditStartPoint: string;
    deckIntroEyebrow: string;
    deckIntroTitle: string;
    deckIntroText: string;
    priorityTitle: string;
    priorityText: string;
    presentationTitle: string;
    directionFallback: string;
    directionSubprojects: string;
    moduleHierarchyAria: string;
    subprojectNavigationText: string;
    backToDirection: string;
    moduleMapPrefix: string;
    moduleLayers: string;
  }
> = {
  en: {
    backToProject: "Back to project",
    openModule: "Open subproject",
    modules: "Subprojects",
    outputs: "Materials",
    projectOverview: "Starting frame",
    projectMap: "Transformation map",
    moduleBlueprint: "Subproject page",
    presentationFlow: "Presentation logic",
    valuePromise: "Management effect",
    pilotStory: "Audit questions",
    proofPoints: "Audit confirms",
    guardrails: "Decision frame",
    dataSources: "Audit inputs",
    internalSources: "Inside Moldovagaz",
    externalSources: "External context",
    implementationPlan: "Selection logic",
    pilotMetrics: "Evaluation criteria",
    executiveFraming: "Management contour",
    strategicEffect: "Strategic effect",
    relatedModules: "Related subprojects",
    relatedText: "Related pages help compare adjacent initiatives and choose which topics should be examined more deeply during the audit.",
    priorityMatrix: "Priority matrix",
    directionProjects: "Subprojects",
    navigationLabel: "Navigation",
    directionLabel: "Direction",
    hierarchyTitle: "Digital development map hierarchy",
    hierarchyText:
      "The map starts with 5 main directions, then opens the subprojects inside each direction and, when needed, leads to a dedicated subproject page.",
    mapNavigationAria: "Navigation through the Moldovagaz digital development map",
    heroFlow: "Audit -> map -> priorities",
    metricDirections: "directions",
    auditStartPoint: "starting point",
    deckIntroEyebrow: "Transformation map",
    deckIntroTitle: "5 directions of digital development",
    deckIntroText:
      "Five management directions show the space of digital development for the company: operations, infrastructure, finance, internal processes, data and AI.",
    priorityTitle: "How to compare initiatives after the audit",
    priorityText:
      "The matrix shows which directions create a fast management effect, which ones require mature data, and which should be developed as strategic programs.",
    presentationTitle: "How the map opens",
    directionFallback: "Direction",
    directionSubprojects: "Direction subprojects",
    moduleHierarchyAria: "Subproject hierarchy",
    subprojectNavigationText:
      "This navigation shows where the current subproject sits in the overall map and helps compare adjacent opportunities before choosing what should be designed after the audit.",
    backToDirection: "Back to direction",
    moduleMapPrefix: "This page brings together the key elements of the subproject:",
    moduleLayers: "subproject layers"
  },
  ro: {
    backToProject: "Înapoi la proiect",
    openModule: "Deschide subproiectul",
    modules: "Subproiecte",
    outputs: "Materiale",
    projectOverview: "Cadru de pornire",
    projectMap: "Harta transformării",
    moduleBlueprint: "Pagina subproiectului",
    presentationFlow: "Logica de prezentare",
    valuePromise: "Efect managerial",
    pilotStory: "Întrebări pentru audit",
    proofPoints: "Ce confirmă auditul",
    guardrails: "Cadru de decizie",
    dataSources: "Date pentru audit",
    internalSources: "În Moldovagaz",
    externalSources: "Context extern",
    implementationPlan: "Logica selecției",
    pilotMetrics: "Criterii de evaluare",
    executiveFraming: "Contur managerial",
    strategicEffect: "Efect strategic",
    relatedModules: "Subproiecte conexe",
    relatedText: "Paginile conexe ajută la compararea inițiativelor apropiate și la alegerea temelor care merită analizate mai profund în audit.",
    priorityMatrix: "Matricea prioritatilor",
    directionProjects: "Subproiecte",
    navigationLabel: "Navigație",
    directionLabel: "Direcția",
    hierarchyTitle: "Ierarhia hărții de dezvoltare digitală",
    hierarchyText:
      "Harta pornește de la 5 direcții principale, apoi deschide subproiectele din fiecare direcție și, când este nevoie, duce către pagina dedicată a subproiectului.",
    mapNavigationAria: "Navigație prin harta de dezvoltare digitală Moldovagaz",
    heroFlow: "Audit -> hartă -> priorități",
    metricDirections: "direcții",
    auditStartPoint: "punct de pornire",
    deckIntroEyebrow: "Harta transformării",
    deckIntroTitle: "5 direcții de dezvoltare digitală",
    deckIntroText:
      "Cele cinci direcții manageriale arată spațiul de dezvoltare digitală al companiei: operațiuni, infrastructură, finanțe, procese interne, date și AI.",
    priorityTitle: "Cum se compară inițiativele după audit",
    priorityText:
      "Matricea arată ce direcții pot crea rapid efect managerial, ce inițiative cer date mai mature și ce teme trebuie dezvoltate ca programe strategice.",
    presentationTitle: "Cum se deschide harta",
    directionFallback: "Direcție",
    directionSubprojects: "Subproiectele direcției",
    moduleHierarchyAria: "Ierarhia subproiectului",
    subprojectNavigationText:
      "Această navigație arată locul subproiectului în harta generală și ajută la compararea oportunităților apropiate înainte de alegerea temelor care vor fi proiectate după audit.",
    backToDirection: "Înapoi la direcție",
    moduleMapPrefix: "Pagina reunește elementele principale ale subproiectului:",
    moduleLayers: "straturi ale subproiectului"
  },
  ru: {
    backToProject: "Назад к карте",
    openModule: "Открыть подпроект",
    modules: "Подпроекты",
    outputs: "Материалы",
    projectOverview: "Стартовая рамка",
    projectMap: "Карта трансформации",
    moduleBlueprint: "Страница подпроекта",
    presentationFlow: "Логика раскрытия",
    valuePromise: "Управленческий эффект",
    pilotStory: "Что уточнить на аудите",
    proofPoints: "Что подтверждает аудит",
    guardrails: "Принцип выбора",
    dataSources: "Данные для аудита",
    internalSources: "Внутри Moldovagaz",
    externalSources: "Внешний контекст",
    implementationPlan: "Логика выбора",
    pilotMetrics: "Критерии оценки",
    executiveFraming: "Управленческий контур",
    strategicEffect: "Стратегический эффект",
    relatedModules: "Связанные подпроекты",
    relatedText: "Связанные страницы помогают сравнить соседние инициативы и выбрать темы, которые стоит разобрать глубже на аудите.",
    priorityMatrix: "Матрица приоритетов",
    directionProjects: "Подпроекты",
    navigationLabel: "Навигация",
    directionLabel: "Направление",
    hierarchyTitle: "Иерархия карты цифрового развития",
    hierarchyText:
      "Карта начинается с 5 основных направлений, затем раскрывает подпроекты внутри каждого направления и при необходимости ведет на отдельную страницу подпроекта.",
    mapNavigationAria: "Навигация по карте цифрового развития Moldovagaz",
    heroFlow: "Аудит -> карта -> приоритеты",
    metricDirections: "направлений",
    auditStartPoint: "точка старта",
    deckIntroEyebrow: "Карта трансформации",
    deckIntroTitle: "5 направлений цифрового развития",
    deckIntroText:
      "Пять управленческих направлений показывают пространство цифрового развития компании: операции, инфраструктура, финансы, внутренние процессы, данные и AI.",
    priorityTitle: "Как сравнивать инициативы после аудита",
    priorityText:
      "Матрица показывает, какие направления дают быстрый управленческий эффект, какие требуют зрелых данных, а какие стоит развивать как стратегические программы.",
    presentationTitle: "Как раскрывается карта",
    directionFallback: "Направление",
    directionSubprojects: "Подпроекты направления",
    moduleHierarchyAria: "Иерархия подпроекта",
    subprojectNavigationText:
      "Эта навигация показывает место текущего подпроекта в общей карте и помогает сравнить соседние возможности перед управленческим выбором после аудита.",
    backToDirection: "Вернуться к направлению",
    moduleMapPrefix: "На странице собраны ключевые элементы подпроекта:",
    moduleLayers: "слоя подпроекта"
  }
};

const sharedGuardrails = [
  "Финальный состав направления подтверждается аудитом процессов, данных и ролей.",
  "Решение проектируется вокруг ответственности Moldovagaz, а не вокруг готового абстрактного продукта.",
  "Глубина интеграций выбирается после проверки доступности данных и действующих регламентов."
];

const sourceSets = {
  operations: {
    internal: ["журналы диспетчеров", "технические заявки", "поручения регионов", "акты работ", "SLA и регламенты", "история аварийных событий", "таблицы и отчеты подразделений"],
    external: ["обращения потребителей", "сигналы от Energocom", "требования регулятора", "публичные операционные сообщения"]
  },
  infrastructure: {
    internal: ["реестр объектов сети", "паспорта оборудования", "ремонтная история", "фото и документы объектов", "планы ремонтов", "складские данные", "проектная документация"],
    external: ["кадастровые и картографические слои", "нормативы безопасности", "подрядные документы", "данные внешних поставщиков"]
  },
  finance: {
    internal: ["договоры", "обязательства", "реестр задолженностей", "платежные истории", "переписка с организациями", "регуляторная отчетность", "документы переходного периода"],
    external: ["решения ANRE", "запросы Energocom", "государственные требования", "рыночные и правовые изменения"]
  },
  internal: {
    internal: ["регламенты", "маршруты согласований", "организационная структура", "кадровые данные", "сертификаты сотрудников", "журналы инцидентов", "внутренние документы"],
    external: ["трудовые требования", "нормы безопасности", "аудиторские требования", "практики отрасли"]
  },
  data: {
    internal: ["операционные отчеты", "данные регионов", "показатели SLA", "реестры активов", "документы и инструкции", "история обращений", "управленческие отчеты"],
    external: ["регуляторный контекст", "отраслевые показатели", "публичные данные рынка", "внешние справочники"]
  }
};

type ModuleSeed = {
  slug: string;
  groupSlug: string;
  title: string;
  icon: string;
  summary: string;
  positioning: string;
  outputs: string[];
  layers: MoldovagazLayer[];
  executive: string;
  effects: string[];
  sourceKey: keyof typeof sourceSets;
  presentation?: Partial<MoldovagazPresentation>;
  launchSteps?: string[];
  metrics?: string[];
  guardrails?: string[];
};

const makeModule = (seed: ModuleSeed): MoldovagazModule => ({
  slug: seed.slug,
  groupSlug: seed.groupSlug,
  title: seed.title,
  icon: seed.icon,
  summary: seed.summary,
  positioning: seed.positioning,
  outputs: seed.outputs,
  layers: seed.layers,
  presentation: {
    valueTitle: seed.presentation?.valueTitle ?? "Управленческий эффект",
    valueText:
      seed.presentation?.valueText ??
      `${seed.title} превращает разрозненные действия в понятную управленческую область: видны статус, владелец, проблемные зоны и следующий шаг.`,
    flowTitle: seed.presentation?.flowTitle ?? "Как работает направление",
    flowText:
      seed.presentation?.flowText ??
      "Направление связывает процесс, данные, роли и контроль результата. После аудита Moldovagaz сможет понять, какой уровень автоматизации действительно нужен.",
    proofTitle: seed.presentation?.proofTitle ?? "Что подтверждает аудит",
    proofText:
      seed.presentation?.proofText ??
      "Аудит показывает реальные источники данных, владельцев процесса, регламенты, риски и управленческий эффект, который можно получить."
  },
  sources: sourceSets[seed.sourceKey],
  pilot: {
    title: "Рамка обсуждения на аудите",
    goal: `Понять, какую управленческую ценность ${seed.title.toLowerCase()} может дать Moldovagaz и какие условия должны быть проверены до любых решений о внедрении.`,
    steps: seed.launchSteps ?? [
      "Зафиксировать текущий процесс, роли, документы и точки ручного управления.",
      "Проверить источники данных, их качество, владельцев и ограничения доступа.",
      "Определить, какие управленческие решения должен поддерживать подпроект.",
      "Показать возможную целевую модель работы.",
      "Выбрать подпроекты, которые стоит проектировать глубже."
    ],
    metrics: seed.metrics ?? ["управленческий эффект", "готовность данных", "сложность изменений", "поддержка владельцев", "потенциал развития"]
  },
  guardrails: seed.guardrails ?? sharedGuardrails,
  executive: seed.executive,
  effects: seed.effects
});

const modules: MoldovagazModule[] = [
  makeModule({
    slug: "operations-control-center",
    groupSlug: "operational-management",
    title: "Operations Control Center",
    icon: "monitor",
    summary: "Единый центр управления операциями компании: заявки, поручения, аварийные события, регионы, SLA и ответственные лица.",
    positioning: "Это базовый управленческий слой для ежедневной операционной картины Moldovagaz. Он не заменяет все системы, а собирает критические статусы в один экран принятия решений.",
    outputs: ["единый реестр задач", "статусы и владельцы", "SLA и эскалации", "управленческая панель", "картина по регионам"],
    layers: [
      { title: "Единый реестр", text: "Все операционные задачи фиксируются в одном месте с типом, источником, приоритетом, регионом и ответственным.", icon: "data", items: ["тип задачи", "источник", "ответственный"] },
      { title: "Диспетчеризация", text: "Задачи распределяются между подразделениями, бригадами и ответственными ролями с понятными статусами исполнения.", icon: "flow", items: ["назначение", "статус", "эскалация"] },
      { title: "Контроль SLA", text: "Видны просрочки, причины задержек и зоны, где процесс требует вмешательства.", icon: "ranking", items: ["SLA", "просрочки", "причины"] },
      { title: "Управленческий экран", text: "Ежедневная картина по открытым задачам, регионам, аварийным событиям и критическим отклонениям.", icon: "monitor", items: ["регионы", "риски", "отчетность"] }
    ],
    executive: "Без единого экрана по операционным задачам сложно управлять ответственностью, приоритетами и нагрузкой регионов.",
    effects: ["прозрачность задач", "единая ответственность", "меньше потерянных поручений", "контроль регионов", "раннее выявление просрочек", "основа для дальнейших модулей"],
    sourceKey: "operations"
  }),
  makeModule({
    slug: "technical-request-management",
    groupSlug: "operational-management",
    title: "Technical Request Management",
    icon: "content",
    summary: "Управление техническими заявками и задачами от регистрации до закрытия результата.",
    positioning: "Направление наводит порядок в потоке технических запросов, где сейчас могут смешиваться обращения, поручения, аварийные сигналы и плановые работы.",
    outputs: ["карточка заявки", "классификация запросов", "маршрутизация", "история решений", "контроль закрытия"],
    layers: [
      { title: "Регистрация", text: "Заявка получает единый формат: источник, адрес, объект, описание, документы и приоритет.", icon: "content", items: ["источник", "адрес", "приоритет"] },
      { title: "Классификация", text: "Запросы разделяются по типам работ, рискам, региону и необходимому уровню реакции.", icon: "ranking", items: ["тип", "риск", "регион"] },
      { title: "Маршрутизация", text: "Система подсказывает, кто должен принять заявку в работу и какие данные нужны для решения.", icon: "flow", items: ["роль", "маршрут", "данные"] },
      { title: "Закрытие", text: "Итог фиксируется с результатом, комментариями, приложениями и основанием для дальнейшей отчетности.", icon: "tools", items: ["результат", "акт", "история"] }
    ],
    executive: "Техническая заявка должна быть не сообщением в потоке, а управляемым объектом с владельцем, статусом и результатом.",
    effects: ["меньше ручного контроля", "единый формат заявок", "быстрее передача в работу", "понятная история решений", "основа для аналитики по причинам"],
    sourceKey: "operations"
  }),
  makeModule({
    slug: "field-service-management",
    groupSlug: "operational-management",
    title: "Field Service Management",
    icon: "local",
    summary: "Управление выездными бригадами: назначение, маршрут, выполнение, фиксация результата и обратная связь.",
    positioning: "Для инфраструктурного оператора важно видеть не только факт выезда, но и что произошло на объекте, какие материалы использованы и почему работа не закрыта.",
    outputs: ["задание бригаде", "маршрут и прибытие", "фотофиксация", "цифровой акт", "причины незавершения"],
    layers: [
      { title: "Назначение", text: "Бригада получает задачу с адресом, объектом, приоритетом, ожидаемым действием и необходимыми материалами.", icon: "flow", items: ["адрес", "объект", "материалы"] },
      { title: "Работа на объекте", text: "Фиксируются прибытие, комментарии, фото, использованные материалы и фактический статус работ.", icon: "local", items: ["прибытие", "фото", "статус"] },
      { title: "Закрытие результата", text: "Работа закрывается актом, повторным визитом или причиной, по которой выполнение невозможно.", icon: "tools", items: ["акт", "повтор", "причина"] },
      { title: "Контроль нагрузки", text: "Руководство видит загрузку бригад, повторные выезды, простои и причины отклонений по регионам.", icon: "monitor", items: ["нагрузка", "повторы", "регионы"] }
    ],
    executive: "Бригады становятся частью управляемого процесса, а не отдельной полевой зоной, которая видна только после ручного отчета.",
    effects: ["контроль выездов", "меньше потерь времени", "качественная фиксация работ", "понятные причины незавершения", "аналитика по регионам"],
    sourceKey: "operations"
  }),
  makeModule({
    slug: "emergency-dispatch-layer",
    groupSlug: "operational-management",
    title: "Emergency Dispatch Layer",
    icon: "shield",
    summary: "Управление аварийными событиями: прием сигнала, оценка срочности, координация реакции и разбор результата.",
    positioning: "Аварийные события требуют отдельной логики: быстрая реакция, точная ответственность, история действий и управленческий контроль после закрытия.",
    outputs: ["карточка события", "приоритет реакции", "координация участников", "журнал действий", "разбор результата"],
    layers: [
      { title: "Сигнал", text: "Аварийное событие фиксируется с источником, местом, объектом, риском и первичным описанием.", icon: "data", items: ["источник", "объект", "риск"] },
      { title: "Приоритет", text: "Событие получает уровень критичности и правила реакции для диспетчера, региона и руководителя.", icon: "ranking", items: ["критичность", "правила", "роль"] },
      { title: "Координация", text: "Фиксируются назначения, выезды, действия на объекте, коммуникации и текущий статус.", icon: "flow", items: ["назначения", "выезды", "статус"] },
      { title: "Разбор", text: "После закрытия остается история действий, причина, последствия и предложения по предотвращению повторов.", icon: "lens", items: ["причина", "последствия", "уроки"] }
    ],
    executive: "Аварийная реакция должна быть видна как управляемый процесс, где важно не только закрыть событие, но и снизить повторяемость проблем.",
    effects: ["быстрее управленческая реакция", "единый журнал аварий", "ясная ответственность", "контроль критических событий", "материал для профилактики"],
    sourceKey: "operations"
  }),
  makeModule({
    slug: "work-order-management",
    groupSlug: "operational-management",
    title: "Work Order Management",
    icon: "tools",
    summary: "Назначение, выполнение и контроль работ: от поручения до результата и подтверждающих документов.",
    positioning: "Задание на работу связывает заявку, объект, исполнителя, материалы, документы и управленческий контроль исполнения.",
    outputs: ["рабочее задание", "исполнитель и ресурсы", "контроль выполнения", "акт результата", "история работ"],
    layers: [
      { title: "План работ", text: "Формируется рабочее задание с целью, объектом, исполнителем, приоритетом и ожидаемым результатом.", icon: "content", items: ["цель", "объект", "исполнитель"] },
      { title: "Ресурсы", text: "Учитываются бригады, материалы, техника, документы и зависимости от соседних процессов.", icon: "tools", items: ["бригада", "материалы", "документы"] },
      { title: "Исполнение", text: "Фиксируется ход выполнения, отклонения, комментарии, переносы и причины задержек.", icon: "flow", items: ["ход работ", "отклонения", "переносы"] },
      { title: "Приемка", text: "Результат подтверждается актом, приложениями, статусом закрытия и данными для отчетности.", icon: "shield", items: ["акт", "подтверждение", "отчетность"] }
    ],
    executive: "Работы становятся измеримыми: видно, что назначено, что выполнено, где блокировка и какой результат подтвержден.",
    effects: ["прозрачное исполнение", "контроль зависимостей", "меньше ручных уточнений", "единая история работ", "основа для планирования ресурсов"],
    sourceKey: "operations"
  }),
  makeModule({
    slug: "asset-management",
    groupSlug: "infrastructure-assets",
    title: "Asset Management",
    icon: "product",
    summary: "Цифровой паспорт объектов газовой сети: состав, состояние, документы, история работ и связь с операциями.",
    positioning: "Активы сети должны быть не только перечнем объектов, а живым паспортом инфраструктуры, связанным с заявками, ремонтами и рисками.",
    outputs: ["реестр объектов", "паспорт актива", "история обслуживания", "связь с работами", "контроль состояния"],
    layers: [
      { title: "Реестр объектов", text: "Формируется единый перечень сетевых объектов с типом, местоположением, принадлежностью и статусом.", icon: "data", items: ["тип", "локация", "статус"] },
      { title: "Паспорт", text: "В карточке объекта собираются характеристики, документы, фото, связанные узлы и технические ограничения.", icon: "content", items: ["характеристики", "документы", "фото"] },
      { title: "История", text: "Работы, аварии, осмотры и ремонты привязываются к объекту для анализа состояния.", icon: "tools", items: ["осмотры", "ремонты", "аварии"] },
      { title: "Управление рисками", text: "Руководство видит критичные активы, проблемные зоны и инфраструктурные зависимости.", icon: "shield", items: ["критичность", "риски", "зависимости"] }
    ],
    executive: "Без цифрового паспорта инфраструктуры сложно планировать ремонты, анализировать аварийность и связывать операции с конкретными объектами сети.",
    effects: ["полный контроль активов", "связь работ с объектами", "лучше планирование ремонтов", "меньше информационных разрывов", "база для GIS и аналитики"],
    sourceKey: "infrastructure"
  }),
  makeModule({
    slug: "gis-platform",
    groupSlug: "infrastructure-assets",
    title: "GIS Platform",
    icon: "map",
    summary: "Карта газовой инфраструктуры, где объекты сети связаны с заявками, работами, авариями и планированием.",
    positioning: "GIS нужен не как отдельная карта, а как пространственный слой операционного управления и паспортизации инфраструктуры.",
    outputs: ["карта сети", "слои объектов", "привязка заявок", "зоны риска", "операционные наложения"],
    layers: [
      { title: "Базовая карта", text: "Сетевые объекты размещаются в пространстве с адресами, координатами и территориальной привязкой.", icon: "map", items: ["адрес", "координаты", "регион"] },
      { title: "Слои инфраструктуры", text: "Трубопроводы, узлы, участки, счетчики и сервисные зоны представляются как управляемые слои.", icon: "space", items: ["участки", "узлы", "зоны"] },
      { title: "Связь с операциями", text: "Заявки, аварии, выезды и работы привязываются к объектам и отображаются на карте.", icon: "flow", items: ["заявки", "работы", "аварии"] },
      { title: "Аналитические зоны", text: "Руководство видит концентрацию проблем, повторяемость событий и территориальные зависимости.", icon: "ranking", items: ["повторы", "плотность", "зависимости"] }
    ],
    executive: "Карта становится управленческим инструментом, когда к ней привязаны процессы, а не только геометрия сети.",
    effects: ["визуализация инфраструктуры", "быстрее поиск объектов", "пространственный анализ аварий", "лучше планирование работ", "база для прогнозирования"],
    sourceKey: "infrastructure"
  }),
  makeModule({
    slug: "predictive-maintenance",
    groupSlug: "infrastructure-assets",
    title: "Predictive Maintenance",
    icon: "ranking",
    summary: "Прогнозирование аварий и ремонтов на основе истории, состояния активов, повторяемости событий и операционных данных.",
    positioning: "Это направление имеет смысл после наведения порядка в активах, работах и данных. Оно переводит ремонты из реактивной логики в предупредительную.",
    outputs: ["модель риска", "список критичных объектов", "профилактические действия", "управленческие сигналы", "история факторов"],
    layers: [
      { title: "История событий", text: "Аварии, ремонты, заявки, выезды и технические осмотры собираются в сопоставимую историю.", icon: "data", items: ["аварии", "ремонты", "осмотры"] },
      { title: "Факторы риска", text: "Учитываются возраст, тип объекта, частота событий, регион, материалы и эксплуатационные признаки.", icon: "lens", items: ["возраст", "частота", "регион"] },
      { title: "Профилактика", text: "Система предлагает список объектов и действий, где профилактика может снизить риск инцидентов.", icon: "tools", items: ["объекты", "действия", "приоритет"] },
      { title: "Контроль эффекта", text: "Руководство видит, какие меры снизили повторяемость проблем и где риск остается высоким.", icon: "monitor", items: ["эффект", "повторы", "риск"] }
    ],
    executive: "Прогнозирование не должно начинаться с AI. Оно начинается с качественной истории активов, работ и аварий.",
    effects: ["снижение аварийности", "лучше планирование ремонтов", "раннее выявление рисков", "обоснование профилактики", "долгосрочная экономия ресурсов"],
    sourceKey: "infrastructure"
  }),
  makeModule({
    slug: "capital-projects-management",
    groupSlug: "infrastructure-assets",
    title: "Capital Projects Management",
    icon: "scale",
    summary: "Управление инвестиционными, ремонтными и инфраструктурными проектами: портфель, этапы, документы, риски и результат.",
    positioning: "Инфраструктурные проекты требуют единой картины: что запланировано, кто отвечает, что задерживает движение и какой результат подтвержден.",
    outputs: ["портфель проектов", "этапы и контрольные точки", "ответственные", "риски и зависимости", "документы результата"],
    layers: [
      { title: "Портфель", text: "Все инфраструктурные инициативы фиксируются в едином перечне с целями, владельцами и статусами.", icon: "data", items: ["цель", "владелец", "статус"] },
      { title: "Этапы", text: "Проект раскладывается на контрольные точки, согласования, работы, документы и решения.", icon: "flow", items: ["этап", "решение", "документ"] },
      { title: "Зависимости", text: "Видны подрядчики, материалы, доступы, согласования и другие условия движения проекта.", icon: "puzzle", items: ["подрядчики", "материалы", "доступы"] },
      { title: "Результат", text: "Финальный результат связывается с активами сети, актами, документами и дальнейшей эксплуатацией.", icon: "shield", items: ["актив", "акт", "эксплуатация"] }
    ],
    executive: "Руководству нужна картина портфеля, где видны не только планы, но и реальные блокировки, ответственность и готовность результата.",
    effects: ["прозрачность портфеля", "контроль зависимостей", "меньше ручных статусов", "лучше управленческие решения", "связь проектов с активами"],
    sourceKey: "infrastructure"
  }),
  makeModule({
    slug: "procurement-warehouse",
    groupSlug: "infrastructure-assets",
    title: "Procurement & Warehouse",
    icon: "commerce",
    summary: "Материалы, склады и снабжение: потребность, наличие, резервирование, выдача и связь с работами.",
    positioning: "Операционные работы зависят от материалов. Контур снабжения должен быть связан с заявками, рабочими заданиями и планированием ремонтов.",
    outputs: ["заявка на материалы", "складские остатки", "резервирование", "выдача под работу", "контроль дефицита"],
    layers: [
      { title: "Потребность", text: "Материалы связываются с заявкой, рабочим заданием, объектом и типом работ.", icon: "content", items: ["заявка", "объект", "работа"] },
      { title: "Наличие", text: "Видны остатки, места хранения, доступность материалов и ограничения выдачи.", icon: "commerce", items: ["остатки", "склад", "доступность"] },
      { title: "Резервирование", text: "Материалы резервируются под конкретные работы, чтобы снизить простои бригад.", icon: "lock", items: ["резерв", "бригада", "приоритет"] },
      { title: "Контроль дефицита", text: "Руководство видит, какие работы блокируются материалами и где нужна управленческая реакция.", icon: "monitor", items: ["дефицит", "блокировка", "реакция"] }
    ],
    executive: "Снабжение становится управляемым, когда материалы видны не отдельно от работ, а как условие выполнения операционных задач.",
    effects: ["меньше простоев", "контроль материалов", "лучше планирование работ", "связь склада с операциями", "меньше ручных уточнений"],
    sourceKey: "infrastructure"
  }),
  makeModule({
    slug: "energocom-workflow",
    groupSlug: "finance-market",
    title: "Moldovagaz - Energocom Workflow",
    icon: "api",
    summary: "Цифровое взаимодействие между организациями: запросы, статусы, документы, ответственность и обратная связь.",
    positioning: "После разделения функций особенно важно убрать организационный разрыв между техническими задачами, документами и статусами между сторонами.",
    outputs: ["единый порядок запросов", "обмен статусами", "реестр документов", "история взаимодействия", "ответственные роли"],
    layers: [
      { title: "Запрос", text: "Обращение от одной стороны фиксируется с типом, основанием, документами и ожидаемым результатом.", icon: "content", items: ["тип", "основание", "результат"] },
      { title: "Маршрут", text: "Запрос получает владельца в Moldovagaz, статус обработки и правила передачи между ролями.", icon: "flow", items: ["владелец", "статус", "маршрут"] },
      { title: "Документы", text: "Все приложения, решения, акты и подтверждения хранятся в связанной истории взаимодействия.", icon: "data", items: ["акты", "решения", "история"] },
      { title: "Контроль", text: "Руководство видит открытые вопросы, зависшие статусы и зоны, где требуется согласование.", icon: "monitor", items: ["открыто", "зависло", "согласование"] }
    ],
    executive: "Взаимодействие с Energocom должно быть прозрачным процессом, где каждая задача имеет владельца, статус и подтвержденный результат.",
    effects: ["меньше организационных разрывов", "единая история запросов", "понятные статусы", "быстрее согласования", "контроль ответственности"],
    sourceKey: "finance"
  }),
  makeModule({
    slug: "debt-legacy-obligations",
    groupSlug: "finance-market",
    title: "Debt & Legacy Obligations",
    icon: "ranking",
    summary: "Управление историческими задолженностями, переходными обязательствами, документами и статусами урегулирования.",
    positioning: "Старые долги и переходные обязательства требуют отдельной управленческой логики: классификации, документов, владельцев и прозрачного движения статусов.",
    outputs: ["реестр обязательств", "классификация долгов", "документы и основания", "статусы урегулирования", "управленческая отчетность"],
    layers: [
      { title: "Реестр", text: "Каждое обязательство фиксируется с контрагентом, основанием, учетными данными, документами и статусом.", icon: "data", items: ["контрагент", "основание", "статус"] },
      { title: "Классификация", text: "Обязательства разделяются по типу, риску, юридическому статусу и необходимому действию.", icon: "ranking", items: ["тип", "риск", "действие"] },
      { title: "Дело", text: "В карточке хранятся документы, переписка, решения, ответственные и история изменений.", icon: "content", items: ["документы", "переписка", "решения"] },
      { title: "Контроль", text: "Руководство видит проблемные группы, динамику урегулирования и зоны, требующие решения.", icon: "monitor", items: ["динамика", "проблемы", "решения"] }
    ],
    executive: "Финансовые и переходные обязательства становятся управляемыми, когда они собраны в понятный реестр с документами, статусами и ответственными.",
    effects: ["прозрачность обязательств", "снижение хаоса в документах", "лучше юридический контроль", "управленческая отчетность", "меньше зависших вопросов"],
    sourceKey: "finance"
  }),
  makeModule({
    slug: "contract-management",
    groupSlug: "finance-market",
    title: "Contract Management",
    icon: "content",
    summary: "Договоры, обязательства и контроль исполнения: действие документов, ответственные, риски и события.",
    positioning: "Договор должен быть не файлом в архиве, а управляемым объектом с обязательствами, владельцами, событиями и контрольными точками.",
    outputs: ["реестр договоров", "карточка обязательств", "календарь событий", "контроль исполнения", "история изменений"],
    layers: [
      { title: "Реестр", text: "Договоры собираются в единую базу с контрагентом, предметом, статусом, владельцем и документами.", icon: "data", items: ["контрагент", "предмет", "владелец"] },
      { title: "Обязательства", text: "Ключевые условия переводятся в контрольные точки, действия, события и ответственные роли.", icon: "content", items: ["условия", "действия", "ответственные"] },
      { title: "Календарь", text: "Видны продления, истечения, согласования, пересмотры и другие важные договорные события.", icon: "flow", items: ["продление", "истечение", "пересмотр"] },
      { title: "Риски", text: "Руководство видит просрочки, спорные зоны, неисполненные условия и документы, требующие внимания.", icon: "shield", items: ["просрочки", "споры", "контроль"] }
    ],
    executive: "Система договоров снижает риск потери обязательств и делает юридически значимые события видимыми заранее.",
    effects: ["меньше просрочек", "лучше контроль обязательств", "единый архив документов", "ясная ответственность", "снижение юридических рисков"],
    sourceKey: "finance"
  }),
  makeModule({
    slug: "regulatory-reporting",
    groupSlug: "finance-market",
    title: "Regulatory Reporting",
    icon: "shield",
    summary: "Отчетность для ANRE и государственных органов: календарь, сбор данных, проверка качества и архив подтверждений.",
    positioning: "Регуляторная отчетность должна быть управляемым процессом с источниками данных, ответственными, проверками и историей отправки.",
    outputs: ["календарь отчетности", "источники данных", "проверки качества", "маршрут согласования", "архив отчетов"],
    layers: [
      { title: "Календарь", text: "Формируется перечень обязательных отчетов, событий внутри регламента и ответственных ролей.", icon: "content", items: ["отчет", "событие", "роль"] },
      { title: "Сбор данных", text: "Показатели подтягиваются из подразделений, систем, таблиц и подтверждающих документов.", icon: "data", items: ["показатели", "системы", "документы"] },
      { title: "Проверка", text: "Перед отправкой данные проходят контроль полноты, расхождений, версий и согласований.", icon: "shield", items: ["полнота", "версии", "согласование"] },
      { title: "Архив", text: "Сохраняется история отчетов, подтверждений, замечаний и ответов на запросы регулятора.", icon: "lock", items: ["отчеты", "замечания", "ответы"] }
    ],
    executive: "Автоматизация отчетности снижает ручную нагрузку и повышает качество управленческих и регуляторных данных.",
    effects: ["меньше ручного сбора", "выше качество отчетов", "прозрачная ответственность", "архив подтверждений", "контроль замечаний"],
    sourceKey: "finance"
  }),
  makeModule({
    slug: "internal-document-workflow",
    groupSlug: "internal-processes",
    title: "Internal Document Workflow",
    icon: "flow",
    summary: "Документооборот и согласования: маршруты, поручения, версии документов, исполнение и контроль решений.",
    positioning: "Внутренние документы должны проходить прозрачный маршрут, где видно, кто согласует, что задерживает процесс и какое решение принято.",
    outputs: ["маршруты согласований", "поручения", "версии документов", "статусы решений", "контроль исполнения"],
    layers: [
      { title: "Документ", text: "Документ получает карточку с типом, владельцем, приложениями, версией и основанием для согласования.", icon: "content", items: ["тип", "владелец", "версия"] },
      { title: "Маршрут", text: "Согласование проходит по ролям, подразделениям и правилам, которые можно контролировать.", icon: "flow", items: ["роль", "подразделение", "правило"] },
      { title: "Поручение", text: "Решения превращаются в задачи с ответственными, статусами и подтверждением исполнения.", icon: "tools", items: ["решение", "задача", "исполнение"] },
      { title: "Контроль", text: "Руководство видит зависшие документы, задержки, повторные согласования и нагрузку по подразделениям.", icon: "monitor", items: ["задержки", "повторы", "нагрузка"] }
    ],
    executive: "Документооборот становится частью управляемой операционной модели, а не отдельным бумажным или почтовым процессом.",
    effects: ["ускорение согласований", "меньше потерянных документов", "прозрачные поручения", "контроль исполнения", "единая история решений"],
    sourceKey: "internal"
  }),
  makeModule({
    slug: "workforce-intelligence",
    groupSlug: "internal-processes",
    title: "Workforce Intelligence",
    icon: "lead",
    summary: "Аналитика по персоналу, компетенциям, допускам, обучению и готовности сотрудников к операционным задачам.",
    positioning: "Для инфраструктурного оператора важно понимать не только численность персонала, но и компетенции, допуски, обучение и готовность команд.",
    outputs: ["профили сотрудников", "компетенции", "сертификаты и допуски", "обучение", "планирование ресурсов"],
    layers: [
      { title: "Профиль", text: "Сотрудник имеет карточку с ролью, подразделением, компетенциями, допусками и историей обучения.", icon: "lead", items: ["роль", "допуск", "обучение"] },
      { title: "Компетенции", text: "Критические навыки и квалификации связываются с типами работ и требованиями безопасности.", icon: "shield", items: ["навыки", "работы", "требования"] },
      { title: "Планирование", text: "Доступность сотрудников, смены, обучение и нагрузка учитываются при планировании работ.", icon: "flow", items: ["смены", "нагрузка", "доступность"] },
      { title: "Развитие", text: "Руководство видит дефицит компетенций, потребность в обучении и риски по кадровой устойчивости.", icon: "ranking", items: ["дефицит", "обучение", "риски"] }
    ],
    executive: "Workforce Intelligence помогает связать операционные задачи с реальной готовностью людей, компетенций и допусков.",
    effects: ["контроль компетенций", "лучше планирование персонала", "управление обучением", "снижение операционных рисков", "видимость кадровых дефицитов"],
    sourceKey: "internal"
  }),
  makeModule({
    slug: "compliance-risk-management",
    groupSlug: "internal-processes",
    title: "Compliance & Risk Management",
    icon: "shield",
    summary: "Контроль регламентов, рисков, проверок, отклонений и обязательных действий по снижению рисков.",
    positioning: "Compliance должен быть связан с реальными процессами: кто отвечает за контроль, где риск, какое действие требуется и как фиксируется результат.",
    outputs: ["реестр рисков", "контрольные процедуры", "проверки", "отклонения", "корректирующие действия"],
    layers: [
      { title: "Реестр", text: "Риски и требования фиксируются с владельцами, процессами, объектами и критичностью.", icon: "data", items: ["риск", "владелец", "критичность"] },
      { title: "Контроль", text: "Контрольные процедуры связываются с регламентами, периодичностью, ролями и подтверждениями.", icon: "shield", items: ["процедура", "роль", "подтверждение"] },
      { title: "Отклонение", text: "Нарушения и замечания превращаются в задачи с ответственными и статусами устранения.", icon: "flow", items: ["замечание", "задача", "статус"] },
      { title: "Карта рисков", text: "Руководство видит концентрацию рисков, незакрытые действия и повторяемые нарушения.", icon: "ranking", items: ["концентрация", "повторы", "действия"] }
    ],
    executive: "Управление рисками помогает не только фиксировать требования, но и контролировать действия, которые снижают вероятность проблем.",
    effects: ["контроль регламентов", "меньше незакрытых рисков", "ясная ответственность", "управление проверками", "подготовленность к аудитам"],
    sourceKey: "internal"
  }),
  makeModule({
    slug: "incident-investigation-system",
    groupSlug: "internal-processes",
    title: "Incident Investigation System",
    icon: "lens",
    summary: "Разбор аварий и инцидентов: факты, причины, корректирующие действия и сохранение lessons learned.",
    positioning: "Инцидент должен завершаться не только закрытием работ, но и управленческим выводом: почему произошло, что менять и кто отвечает за предотвращение повторов.",
    outputs: ["карточка расследования", "факты и документы", "корневые причины", "корректирующие действия", "база уроков"],
    layers: [
      { title: "Карточка", text: "Инцидент получает структуру расследования: событие, объект, участники, документы и временная линия.", icon: "content", items: ["событие", "объект", "таймлайн"] },
      { title: "Факты", text: "Собираются фото, акты, показания, данные работ, история объекта и внешние условия.", icon: "data", items: ["фото", "акты", "история"] },
      { title: "Причины", text: "Команда фиксирует корневые причины, факторы повторяемости и связи с процессами.", icon: "lens", items: ["причина", "фактор", "процесс"] },
      { title: "Действия", text: "Корректирующие меры превращаются в задачи с владельцами и контролем результата.", icon: "tools", items: ["мера", "владелец", "контроль"] }
    ],
    executive: "Расследование инцидентов превращает аварии в управленческое знание и снижает вероятность повторения схожих проблем.",
    effects: ["меньше повторяемости", "понятные причины", "контроль корректирующих действий", "сохранение опыта", "связь с рисками и обучением"],
    sourceKey: "internal"
  }),
  makeModule({
    slug: "executive-dashboard",
    groupSlug: "data-analytics-ai",
    title: "Executive Dashboard",
    icon: "monitor",
    summary: "Единый управленческий центр: операции, регионы, активы, риски, обязательства и ключевые отклонения.",
    positioning: "Dashboard должен быть не красивым набором графиков, а экраном управленческих решений, который собирает только подтвержденные и полезные показатели.",
    outputs: ["картина компании", "показатели регионов", "критические отклонения", "SLA и риски", "управленческие решения"],
    layers: [
      { title: "Показатели", text: "Определяются метрики, которые действительно отражают состояние операций, активов, финансовых процессов и рисков.", icon: "ranking", items: ["операции", "активы", "риски"] },
      { title: "Регионы", text: "Картина раскладывается по регионам, подразделениям, типам задач и зонам ответственности.", icon: "map", items: ["регион", "подразделение", "ответственность"] },
      { title: "Исключения", text: "Dashboard выделяет не все данные, а отклонения, требующие управленческого внимания.", icon: "lens", items: ["отклонение", "сигнал", "действие"] },
      { title: "Решение", text: "Показатель связывается с владельцем, причиной, действием и статусом реакции.", icon: "flow", items: ["владелец", "причина", "реакция"] }
    ],
    executive: "Панель нужна не для отчетности ради отчетности, а для ежедневного понимания, где компания требует решения.",
    effects: ["единая картина компании", "контроль регионов", "быстрее управленческие реакции", "видимость SLA и рисков", "связь данных с решениями"],
    sourceKey: "data"
  }),
  makeModule({
    slug: "knowledge-base",
    groupSlug: "data-analytics-ai",
    title: "Knowledge Base",
    icon: "data",
    summary: "Корпоративная база знаний для регламентов, инструкций, истории решений, уроков инцидентов и поддержки сотрудников.",
    positioning: "База знаний сохраняет экспертизу компании и делает регламенты доступными в управляемой структуре, прежде чем поверх нее появляются более сложные AI-сценарии.",
    outputs: ["база знаний", "структура регламентов", "поиск по документам", "история решений", "контроль актуальности"],
    layers: [
      { title: "База знаний", text: "Документы, регламенты, инструкции, частые сценарии и уроки инцидентов собираются в управляемую структуру.", icon: "data", items: ["документы", "инструкции", "уроки"] },
      { title: "Поиск", text: "Сотрудник быстро находит нужный регламент, форму, решение или связанный материал.", icon: "lens", items: ["регламент", "форма", "решение"] },
      { title: "Владельцы", text: "У каждого блока знаний есть ответственный за актуальность, доступы, версии и подтверждение материалов.", icon: "shield", items: ["владелец", "версия", "доступ"] },
      { title: "Обновление", text: "Руководство видит, какие материалы устарели, где есть пробелы и какие знания критичны для операций.", icon: "monitor", items: ["актуальность", "пробелы", "приоритет"] }
    ],
    executive: "Корпоративная база знаний помогает сохранить экспертизу Moldovagaz и снизить зависимость от неформальной передачи опыта.",
    effects: ["сохранение экспертизы", "быстрее поиск регламентов", "поддержка обучения", "единая версия знаний", "фундамент для AI-помощника"],
    sourceKey: "data"
  }),
  makeModule({
    slug: "ai-assistant",
    groupSlug: "data-analytics-ai",
    title: "AI Assistant",
    icon: "ai",
    summary: "AI-помощник для сотрудников, который отвечает на вопросы по подтвержденным документам, регламентам и истории решений.",
    positioning: "AI Assistant не должен выглядеть как модная надстройка. Его ценность появляется только при ясных источниках знаний, правах доступа, правилах ответственности и контроле качества ответов.",
    outputs: ["вопросы сотрудников", "ответы по источникам", "ссылки на документы", "контроль качества", "аналитика запросов"],
    layers: [
      { title: "Вопрос", text: "Сотрудник задает вопрос в рабочем контексте: регламент, процедура, документ, объект или тип операционной ситуации.", icon: "content", items: ["контекст", "роль", "запрос"] },
      { title: "Источники", text: "Ответ строится только на подтвержденных материалах базы знаний, документах и разрешенных внутренних источниках.", icon: "data", items: ["документы", "регламенты", "доступ"] },
      { title: "Ответ", text: "Помощник показывает краткий ответ, основание, связанные документы и ограничения применения.", icon: "ai", items: ["ответ", "основание", "ограничение"] },
      { title: "Контроль", text: "Качество ответов, частые вопросы, пробелы в знаниях и рисковые темы контролируются владельцами процесса.", icon: "shield", items: ["качество", "пробелы", "владелец"] }
    ],
    executive: "AI-помощник должен ускорять сотрудников, но не подменять регламенты, владельцев процессов и ответственность за решения.",
    effects: ["ускорение поиска", "меньше нагрузки на экспертов", "поддержка новых сотрудников", "выявление пробелов в знаниях", "контролируемое использование AI"],
    sourceKey: "data",
    guardrails: [
      "AI-помощник запускается только на подтвержденной базе знаний и с понятными правами доступа.",
      "Ответы должны показывать источники и не подменять ответственных владельцев процесса.",
      "Сценарии AI выбираются после аудита документов, данных и требований безопасности."
    ]
  })
];

const groups: MoldovagazGroup[] = [
  {
    slug: "operational-management",
    title: "Операционное управление",
    icon: "monitor",
    summary: "Единая зона ежедневных операций: заявки, аварии, работы, бригады, SLA и ответственность по регионам.",
    framing: "Сначала Moldovagaz получает видимость того, что происходит в операциях, где есть задержки и какие управленческие решения нужны.",
    outcomes: ["контроль задач", "ответственность", "SLA", "диспетчеризация", "реакция на аварии"],
    projects: ["operations-control-center", "technical-request-management", "field-service-management", "emergency-dispatch-layer", "work-order-management"]
  },
  {
    slug: "infrastructure-assets",
    title: "Инфраструктура и активы",
    icon: "map",
    summary: "Цифровой паспорт сети, карта объектов, ремонты, материалы и инфраструктурные проекты.",
    framing: "Этот блок связывает операции с реальными объектами сети и создает основу для планирования, профилактики и долгосрочного управления активами.",
    outcomes: ["паспорт сети", "GIS", "история ремонтов", "материалы", "профилактика"],
    projects: ["asset-management", "gis-platform", "predictive-maintenance", "capital-projects-management", "procurement-warehouse"]
  },
  {
    slug: "finance-market",
    title: "Финансы и взаимодействие с рынком",
    icon: "api",
    summary: "Взаимодействие с Energocom, исторические обязательства, договоры и регуляторная отчетность.",
    framing: "Блок помогает управлять переходным периодом, обязательствами и внешними процессами без потери статусов, документов и ответственности.",
    outcomes: ["Energocom workflow", "обязательства", "договоры", "ANRE отчетность", "контроль статусов"],
    projects: ["energocom-workflow", "debt-legacy-obligations", "contract-management", "regulatory-reporting"]
  },
  {
    slug: "internal-processes",
    title: "Внутренние процессы",
    icon: "flow",
    summary: "Документооборот, персонал, compliance, риски и разбор инцидентов внутри компании.",
    framing: "Внутренние процессы создают управляемость: решения проходят понятный маршрут, риски закрываются действиями, а опыт сохраняется в системе.",
    outcomes: ["согласования", "компетенции", "риски", "расследования", "контроль исполнения"],
    projects: ["internal-document-workflow", "workforce-intelligence", "compliance-risk-management", "incident-investigation-system"]
  },
  {
    slug: "data-analytics-ai",
    title: "Данные, аналитика и AI",
    icon: "ai",
    summary: "Управленческие панели, база знаний и AI-помощник поверх подтвержденных процессов и данных.",
    framing: "Данные и AI становятся ценными после того, как компания понимает источники, владельцев, качество данных и управленческие сценарии.",
    outcomes: ["управленческая панель", "аналитика отклонений", "база знаний", "AI-помощник", "контроль качества"],
    projects: ["executive-dashboard", "knowledge-base", "ai-assistant"]
  }
];

const priorityMatrix: MoldovagazPriorityQuadrant[] = [
  {
    slug: "quick-wins",
    title: "Быстрые управленческие эффекты",
    label: "Высокий эффект / низкая сложность",
    summary: "Кандидаты, которые могут первыми дать прозрачность, контроль и основу для дальнейших решений.",
    criteria: ["видимый эффект", "понятные данные", "минимум организационного риска"],
    projects: ["operations-control-center", "executive-dashboard", "internal-document-workflow", "debt-legacy-obligations"]
  },
  {
    slug: "operational-efficiency",
    title: "Операционная эффективность",
    label: "Высокий эффект / средняя сложность",
    summary: "Направления, которые усиливают ежедневное исполнение работ, связь полевых процессов, материалов и договорных обязательств.",
    criteria: ["связь с операциями", "несколько владельцев", "важна готовность подразделений"],
    projects: ["field-service-management", "work-order-management", "procurement-warehouse", "contract-management"]
  },
  {
    slug: "strategic-transformation",
    title: "Стратегическая трансформация",
    label: "Очень высокий эффект / высокая сложность",
    summary: "Крупные направления, которые меняют модель управления инфраструктурой, внешним взаимодействием и регуляторной отчетностью.",
    criteria: ["высокая ценность", "зависимость от данных", "нужна управленческая поддержка"],
    projects: ["asset-management", "gis-platform", "energocom-workflow", "regulatory-reporting", "capital-projects-management"]
  },
  {
    slug: "long-term-innovation",
    title: "Долгосрочные возможности",
    label: "Высокий потенциал / после наведения порядка",
    summary: "Инициативы, которые раскрываются после структурирования процессов, накопления качественных данных и появления владельцев знаний.",
    criteria: ["требует зрелых данных", "масштабный эффект", "зависит от качества базы"],
    projects: ["predictive-maintenance", "knowledge-base", "ai-assistant", "incident-investigation-system", "workforce-intelligence", "compliance-risk-management"]
  }
];

const project: MoldovagazProject = {
  slug: "moldovagaz",
  title: "Moldovagaz: карта цифрового развития",
  eyebrow: "Презентация возможностей цифровой трансформации",
  client: "Moldovagaz",
  summary: "Презентационная карта из 5 стратегических направлений и 20+ цифровых подпроектов, которые после аудита можно приоритизировать по ценности, сложности и готовности данных.",
  description: "Эта страница показывает возможную архитектуру цифрового развития Moldovagaz: 5 направлений, подпроекты внутри каждого направления и логику выбора тем для аудита.",
  icon: "product",
  status: "Концепция для обсуждения",
  outputs: ["карта 5 стратегических направлений", "20+ цифровых подпроектов", "логика аудита процессов и данных", "матрица приоритетов", "рамка управленческого выбора"],
  thesis: {
    title: "От карты возможностей к точному решению",
    text: "Страница показывает возможные направления цифрового развития. Конкретный состав решений, глубина интеграций и порядок внедрения определяются после проверки процессов, данных и зон ответственности.",
    items: [
      "Аудит описывает процессы, системы, данные, роли, документы и проблемные зоны.",
      "Каждая инициатива оценивается по управленческой ценности, сложности изменений, доступности данных и готовности владельцев.",
      "Руководство видит не список IT-идей, а карту зон, где цифровизация усиливает контроль компании."
    ]
  },
  navigation: {
    title: "5 направлений цифровой трансформации",
    text: "Карта разделена на 5 управленческих направлений: операции, инфраструктура, финансы и рынок, внутренние процессы, данные и AI. Внутри каждого направления есть подпроекты, которые раскрывают конкретные зоны цифрового развития.",
    core: "Смысл карты простой: Moldovagaz видит не одну систему, а пространство управляемости компании: операции, инфраструктуру, финансы, внутренние процессы и данные."
  },
  presentationCards: [
    {
      eyebrow: "Слой 1",
      title: "Показать управленческую картину",
      text: "Начинаем с общей схемы: какие части компании можно сделать прозрачнее, быстрее и управляемее цифровыми инструментами.",
      items: ["операции", "инфраструктура", "финансы", "процессы"]
    },
    {
      eyebrow: "Слой 2",
      title: "Разложить по направлениям",
      text: "Каждое направление раскрывается через подпроекты, чтобы было видно не абстрактную цифровизацию, а конкретные зоны управления.",
      items: ["заявки", "активы", "договоры", "данные"]
    },
    {
      eyebrow: "Слой 3",
      title: "Выделить точки развития",
      text: "После просмотра карты становятся видны темы, которые стоит разобрать глубже, и данные, которые нужно проверить на аудите.",
      items: ["интерес", "ценность", "данные", "ответственные"]
    }
  ],
  implementation: {
    title: "Следующий шаг",
    text: "Выбранные направления переходят в аудит: проверяются процессы, данные, документы, ответственные и текущие инструменты. Это превращает карту развития в основу для дальнейшего проектирования.",
    steps: [
      "Выбрать направления, которые наиболее важны сейчас.",
      "Проверить реальные процессы, документы, системы и источники данных.",
      "Понять, где теряется скорость, контроль, ответственность или качество информации.",
      "Сравнить подпроекты по управленческой ценности и сложности изменений.",
      "Определить, какие решения стоит проектировать в первую очередь.",
      "Подготовить понятную архитектуру выбранного направления."
    ]
  },
  guardrail: {
    title: "Единая логика цифрового развития",
    text: "Цифровое развитие Moldovagaz можно вести не хаотично, а через понятные направления, связанные с реальными процессами, данными и зонами ответственности компании.",
    items: [
      "Какие зоны управления можно сделать прозрачнее и быстрее.",
      "Какие подпроекты входят в каждое из 5 направлений.",
      "Какие темы стоит проверить на аудите перед проектированием решения."
    ]
  },
  groups,
  priorityMatrix,
  modules
};

type MoldovagazModuleCopy = {
  title?: string;
  summary: string;
  positioning: string;
  outputs: string[];
  layers: MoldovagazLayer[];
  executive: string;
  effects: string[];
  guardrails?: string[];
};

type MoldovagazProjectCopy = Omit<MoldovagazProject, "slug" | "client" | "icon" | "groups" | "priorityMatrix" | "modules"> & {
  groups: Record<string, Pick<MoldovagazGroup, "title" | "summary" | "framing" | "outcomes">>;
  priorityMatrix: Record<string, Pick<MoldovagazPriorityQuadrant, "title" | "label" | "summary" | "criteria">>;
  modules: Record<string, MoldovagazModuleCopy>;
};

type LocalizedSourceSets = Record<keyof typeof sourceSets, { internal: string[]; external: string[] }>;

const sourceKeyByGroup: Record<string, keyof typeof sourceSets> = {
  "operational-management": "operations",
  "infrastructure-assets": "infrastructure",
  "finance-market": "finance",
  "internal-processes": "internal",
  "data-analytics-ai": "data"
};

const localizedSharedGuardrails: Record<Exclude<Locale, "ru">, string[]> = {
  en: [
    "The final scope of the direction is confirmed by the audit of processes, data and roles.",
    "The solution is designed around Moldovagaz responsibility areas, not around an abstract ready-made product.",
    "The depth of integration is chosen only after data availability and current regulations are checked."
  ],
  ro: [
    "Componența finală a direcției se confirmă prin auditul proceselor, datelor și rolurilor.",
    "Soluția este proiectată în jurul zonelor de responsabilitate Moldovagaz, nu în jurul unui produs abstract gata făcut.",
    "Profunzimea integrărilor se alege doar după verificarea disponibilității datelor și a regulamentelor existente."
  ]
};

const localizedSourceSets: Record<Exclude<Locale, "ru">, LocalizedSourceSets> = {
  en: {
    operations: {
      internal: ["dispatcher logs", "technical requests", "regional assignments", "work completion acts", "SLA and regulations", "emergency event history", "department reports and spreadsheets"],
      external: ["consumer requests", "signals from Energocom", "regulatory requirements", "public operational notices"]
    },
    infrastructure: {
      internal: ["network asset register", "equipment passports", "maintenance history", "asset photos and documents", "repair plans", "warehouse data", "project documentation"],
      external: ["cadastral and mapping layers", "safety regulations", "contractor documents", "external supplier data"]
    },
    finance: {
      internal: ["contracts", "obligations", "debt register", "payment history", "inter-organization correspondence", "regulatory reporting", "transition-period documents"],
      external: ["ANRE decisions", "Energocom requests", "state requirements", "market and legal changes"]
    },
    internal: {
      internal: ["internal regulations", "approval routes", "organizational structure", "HR data", "employee certificates", "incident logs", "internal documents"],
      external: ["labor requirements", "safety norms", "audit requirements", "industry practices"]
    },
    data: {
      internal: ["operational reports", "regional data", "SLA indicators", "asset registers", "documents and instructions", "request history", "management reports"],
      external: ["regulatory context", "industry indicators", "public market data", "external reference data"]
    }
  },
  ro: {
    operations: {
      internal: ["jurnale de dispecerat", "cereri tehnice", "sarcini ale regiunilor", "acte de lucrări", "SLA și regulamente", "istoric de evenimente de avarie", "rapoarte și tabele ale departamentelor"],
      external: ["solicitări ale consumatorilor", "semnale de la Energocom", "cerințe ale regulatorului", "comunicări operaționale publice"]
    },
    infrastructure: {
      internal: ["registrul activelor de rețea", "pașapoarte de echipamente", "istoric de mentenanță", "fotografii și documente ale activelor", "planuri de reparații", "date de depozit", "documentație de proiect"],
      external: ["straturi cadastrale și cartografice", "norme de siguranță", "documente ale contractorilor", "date de la furnizori externi"]
    },
    finance: {
      internal: ["contracte", "obligații", "registrul datoriilor", "istoric de plăți", "corespondență între organizații", "raportare regulatorie", "documente ale perioadei de tranziție"],
      external: ["decizii ANRE", "solicitări Energocom", "cerințe de stat", "schimbări de piață și juridice"]
    },
    internal: {
      internal: ["regulamente interne", "rute de aprobare", "structură organizațională", "date HR", "certificate ale angajaților", "jurnale de incidente", "documente interne"],
      external: ["cerințe de muncă", "norme de siguranță", "cerințe de audit", "practici din industrie"]
    },
    data: {
      internal: ["rapoarte operaționale", "date regionale", "indicatori SLA", "registre de active", "documente și instrucțiuni", "istoric de solicitări", "rapoarte manageriale"],
      external: ["context regulatoriu", "indicatori de industrie", "date publice de piață", "date de referință externe"]
    }
  }
};

const localizedDefaults = {
  en: {
    valueTitle: "Management effect",
    flowTitle: "How the direction works",
    proofTitle: "What the audit confirms",
    pilotTitle: "Audit discussion frame",
    pilotSteps: [
      "Map the current process, roles, documents and manual control points.",
      "Check data sources, quality, owners and access limits.",
      "Define which management decisions the subproject should support.",
      "Show a possible target operating model.",
      "Choose the subprojects that should be designed in more detail."
    ],
    pilotMetrics: ["management effect", "data readiness", "change complexity", "owner support", "development potential"]
  },
  ro: {
    valueTitle: "Efect managerial",
    flowTitle: "Cum funcționează direcția",
    proofTitle: "Ce confirmă auditul",
    pilotTitle: "Cadru de discuție pentru audit",
    pilotSteps: [
      "Cartografierea procesului curent, a rolurilor, documentelor și punctelor de control manual.",
      "Verificarea surselor de date, a calității, proprietarilor și limitelor de acces.",
      "Definirea deciziilor manageriale pe care subproiectul trebuie să le susțină.",
      "Prezentarea unui model țintă posibil de lucru.",
      "Alegerea subproiectelor care merită proiectate mai detaliat."
    ],
    pilotMetrics: ["efect managerial", "pregătirea datelor", "complexitatea schimbării", "susținerea proprietarilor", "potențial de dezvoltare"]
  }
} satisfies Record<Exclude<Locale, "ru">, {
  valueTitle: string;
  flowTitle: string;
  proofTitle: string;
  pilotTitle: string;
  pilotSteps: string[];
  pilotMetrics: string[];
}>;

const localizedProjectCopies: Record<Exclude<Locale, "ru">, MoldovagazProjectCopy> = {
  en: {
    title: "Moldovagaz: Digital Development Map",
    eyebrow: "Digital transformation opportunity presentation",
    summary:
      "A presentation map of 5 strategic directions and 20+ digital subprojects that can be prioritized after the audit by value, complexity and data readiness.",
    description:
      "This page presents a possible digital development architecture for Moldovagaz: 5 directions, subprojects inside each direction and the logic for choosing audit topics.",
    status: "Concept for discussion",
    outputs: ["map of 5 strategic directions", "20+ digital subprojects", "process and data audit logic", "priority matrix", "management decision frame"],
    thesis: {
      title: "From opportunity map to an exact decision",
      text:
        "This page shows possible directions for digital development. The final solution scope, integration depth and implementation order are defined after the audit of processes, data and responsibility areas.",
      items: [
        "The audit describes processes, systems, data, roles, documents and problem zones.",
        "Each initiative is evaluated by management value, change complexity, data availability and owner readiness.",
        "The map shows not a list of IT ideas, but the areas where digitalization can strengthen company control."
      ]
    },
    navigation: {
      title: "5 directions of digital transformation",
      text:
        "The map is divided into 5 management directions: operations, infrastructure, finance and market interaction, internal processes, data and AI. Each direction contains subprojects that reveal specific zones of digital development.",
      core:
        "The logic of the map is simple: Moldovagaz sees not one system, but the full space of company manageability: operations, infrastructure, finance, internal processes and data."
    },
    presentationCards: [
      {
        eyebrow: "Layer 1",
        title: "Show the management picture",
        text: "We start with the overall scheme: which parts of the company can become more transparent, faster and easier to manage through digital tools.",
        items: ["operations", "infrastructure", "finance", "processes"]
      },
      {
        eyebrow: "Layer 2",
        title: "Break it down by direction",
        text: "Each direction opens through subprojects, so the discussion is about concrete management zones rather than abstract digitalization.",
        items: ["requests", "assets", "contracts", "data"]
      },
      {
        eyebrow: "Layer 3",
        title: "Identify development points",
        text: "After the map is reviewed, the topics worth deeper analysis and the data that must be checked during the audit become visible.",
        items: ["interest", "value", "data", "owners"]
      }
    ],
    implementation: {
      title: "Next step",
      text:
        "The selected directions move into the audit: processes, data, documents, responsible roles and current tools are checked. This turns the development map into a base for further solution design.",
      steps: [
        "Choose the directions that matter most now.",
        "Check real processes, documents, systems and data sources.",
        "Understand where speed, control, responsibility or information quality is lost.",
        "Compare subprojects by management value and change complexity.",
        "Define which solutions should be designed first.",
        "Prepare a clear architecture for the selected direction."
      ]
    },
    guardrail: {
      title: "One logic for digital development",
      text:
        "Moldovagaz digital development can move through clear directions connected to real processes, data and responsibility areas instead of being managed as disconnected initiatives.",
      items: [
        "Which management zones can become more transparent and faster.",
        "Which subprojects belong to each of the 5 directions.",
        "Which topics should be checked during the audit before solution design."
      ]
    },
    groups: {
      "operational-management": {
        title: "Operational management",
        summary: "The daily operations zone: requests, incidents, works, field teams, SLA and regional accountability.",
        framing: "Moldovagaz first gains visibility into what is happening in operations, where delays appear and which management decisions are needed.",
        outcomes: ["task control", "accountability", "SLA", "dispatching", "emergency response"]
      },
      "infrastructure-assets": {
        title: "Infrastructure and assets",
        summary: "Digital network passport, asset map, repairs, materials and infrastructure projects.",
        framing: "This block connects operations with real network objects and creates the base for planning, prevention and long-term asset management.",
        outcomes: ["network passport", "GIS", "repair history", "materials", "prevention"]
      },
      "finance-market": {
        title: "Finance and market interaction",
        summary: "Interaction with Energocom, legacy obligations, contracts and regulatory reporting.",
        framing: "The block helps manage the transition period, obligations and external processes without losing statuses, documents and accountability.",
        outcomes: ["Energocom workflow", "obligations", "contracts", "ANRE reporting", "status control"]
      },
      "internal-processes": {
        title: "Internal processes",
        summary: "Document workflow, workforce, compliance, risks and incident investigation inside the company.",
        framing: "Internal processes create manageability: decisions follow a clear route, risks are closed by actions, and experience is preserved in the system.",
        outcomes: ["approvals", "competencies", "risks", "investigations", "execution control"]
      },
      "data-analytics-ai": {
        title: "Data, analytics and AI",
        summary: "Management dashboards, knowledge base and AI assistant built on confirmed processes and data.",
        framing: "Data and AI become valuable after the company understands sources, owners, data quality and management scenarios.",
        outcomes: ["management dashboard", "deviation analytics", "knowledge base", "AI assistant", "quality control"]
      }
    },
    priorityMatrix: {
      "quick-wins": {
        title: "Fast management effects",
        label: "High effect / low complexity",
        summary: "Candidates that can first create transparency, control and a foundation for further decisions.",
        criteria: ["visible effect", "clear data", "minimal organizational risk"]
      },
      "operational-efficiency": {
        title: "Operational efficiency",
        label: "High effect / medium complexity",
        summary: "Directions that strengthen daily execution, field processes, materials and contractual obligations.",
        criteria: ["linked to operations", "several owners", "department readiness matters"]
      },
      "strategic-transformation": {
        title: "Strategic transformation",
        label: "Very high effect / high complexity",
        summary: "Major directions that change how infrastructure, external interaction and regulatory reporting are managed.",
        criteria: ["high value", "data dependency", "management support required"]
      },
      "long-term-innovation": {
        title: "Long-term opportunities",
        label: "High potential / after operational order",
        summary: "Initiatives that open up after processes are structured, quality data is accumulated and knowledge owners are defined.",
        criteria: ["requires mature data", "large-scale effect", "depends on the knowledge base"]
      }
    },
    modules: {
      "operations-control-center": {
        summary: "A single operating control center for company tasks: requests, assignments, emergency events, regions, SLA and accountable owners.",
        positioning:
          "This is the base management layer for the daily operating picture of Moldovagaz. It does not replace every system; it brings critical statuses into one decision screen.",
        outputs: ["single task register", "statuses and owners", "SLA and escalations", "management dashboard", "regional picture"],
        layers: [
          { title: "Single register", text: "All operational tasks are recorded in one place with type, source, priority, region and accountable owner.", icon: "data", items: ["task type", "source", "owner"] },
          { title: "Dispatching", text: "Tasks are routed between departments, field teams and responsible roles with clear execution statuses.", icon: "flow", items: ["assignment", "status", "escalation"] },
          { title: "SLA control", text: "Delays, causes and areas where the process needs intervention become visible.", icon: "ranking", items: ["SLA", "delays", "causes"] },
          { title: "Management screen", text: "A daily picture of open tasks, regions, emergency events and critical deviations.", icon: "monitor", items: ["regions", "risks", "reporting"] }
        ],
        executive: "Without one screen for operational tasks, it is difficult to manage accountability, priorities and regional workload.",
        effects: ["task transparency", "single accountability", "fewer lost assignments", "regional control", "early delay detection", "base for further modules"]
      },
      "technical-request-management": {
        summary: "Management of technical requests and tasks from registration to confirmed closure.",
        positioning:
          "The direction brings order to the stream of technical requests where customer issues, assignments, emergency signals and planned works may currently be mixed together.",
        outputs: ["request card", "request classification", "routing", "decision history", "closure control"],
        layers: [
          { title: "Registration", text: "A request gets a single format: source, address, object, description, documents and priority.", icon: "content", items: ["source", "address", "priority"] },
          { title: "Classification", text: "Requests are separated by work type, risk, region and required response level.", icon: "ranking", items: ["type", "risk", "region"] },
          { title: "Routing", text: "The system shows who should take the request into work and which data is needed for resolution.", icon: "flow", items: ["role", "route", "data"] },
          { title: "Closure", text: "The result is recorded with outcome, comments, attachments and the basis for further reporting.", icon: "tools", items: ["result", "act", "history"] }
        ],
        executive: "A technical request should not be just a message in a stream. It should be a managed object with owner, status and result.",
        effects: ["less manual control", "single request format", "faster handoff to execution", "clear decision history", "base for cause analytics"]
      },
      "field-service-management": {
        summary: "Management of field crews: assignment, route, execution, result capture and feedback.",
        positioning:
          "For an infrastructure operator, it is important to see not only that a crew visited the site, but what happened there, which materials were used and why the work was not closed.",
        outputs: ["crew assignment", "route and arrival", "photo evidence", "digital act", "reasons for non-completion"],
        layers: [
          { title: "Assignment", text: "The crew receives a task with address, object, priority, expected action and required materials.", icon: "flow", items: ["address", "object", "materials"] },
          { title: "Work on site", text: "Arrival, comments, photos, materials used and actual work status are recorded.", icon: "local", items: ["arrival", "photos", "status"] },
          { title: "Result closure", text: "Work is closed with an act, a repeat visit or the reason why execution is impossible.", icon: "tools", items: ["act", "repeat", "reason"] },
          { title: "Workload control", text: "Crew workload, repeat visits, downtime and deviation causes by region become visible.", icon: "monitor", items: ["workload", "repeats", "regions"] }
        ],
        executive: "Field crews become part of a managed process rather than a separate field zone visible only after manual reporting.",
        effects: ["field visit control", "less lost time", "better work evidence", "clear reasons for non-completion", "regional analytics"]
      },
      "emergency-dispatch-layer": {
        summary: "Management of emergency events: signal intake, urgency assessment, response coordination and result review.",
        positioning:
          "Emergency events need a separate logic: fast response, precise responsibility, action history and management control after closure.",
        outputs: ["event card", "response priority", "participant coordination", "action log", "result review"],
        layers: [
          { title: "Signal", text: "An emergency event is recorded with source, location, object, risk and initial description.", icon: "data", items: ["source", "object", "risk"] },
          { title: "Priority", text: "The event receives a criticality level and response rules for dispatcher, region and manager.", icon: "ranking", items: ["criticality", "rules", "role"] },
          { title: "Coordination", text: "Assignments, field visits, site actions, communications and current status are recorded.", icon: "flow", items: ["assignments", "visits", "status"] },
          { title: "Review", text: "After closure, the history of actions, cause, consequences and prevention proposals remain available.", icon: "lens", items: ["cause", "impact", "lessons"] }
        ],
        executive: "Emergency response should be visible as a managed process where the goal is not only to close the event but to reduce recurrence.",
        effects: ["faster management response", "single emergency log", "clear accountability", "critical event control", "material for prevention"]
      },
      "work-order-management": {
        summary: "Assignment, execution and control of works: from instruction to result and confirming documents.",
        positioning:
          "A work order connects the request, object, executor, materials, documents and management control of execution.",
        outputs: ["work order", "executor and resources", "execution control", "result act", "work history"],
        layers: [
          { title: "Work plan", text: "A work order is created with goal, object, executor, priority and expected result.", icon: "content", items: ["goal", "object", "executor"] },
          { title: "Resources", text: "Crews, materials, equipment, documents and dependencies on adjacent processes are considered.", icon: "tools", items: ["crew", "materials", "documents"] },
          { title: "Execution", text: "Progress, deviations, comments, rescheduling and delay reasons are recorded.", icon: "flow", items: ["progress", "deviations", "rescheduling"] },
          { title: "Acceptance", text: "The result is confirmed by act, attachments, closure status and data for reporting.", icon: "shield", items: ["act", "confirmation", "reporting"] }
        ],
        executive: "Works become measurable: what was assigned, what was completed, where the blockage is and which result was confirmed.",
        effects: ["transparent execution", "dependency control", "fewer manual clarifications", "single work history", "base for resource planning"]
      },
      "asset-management": {
        summary: "Digital passport for gas network objects: composition, condition, documents, work history and connection to operations.",
        positioning:
          "Network assets should be more than a list of objects. They should become a live infrastructure passport linked to requests, repairs and risks.",
        outputs: ["object register", "asset passport", "maintenance history", "link to works", "condition control"],
        layers: [
          { title: "Object register", text: "A single list of network objects is formed with type, location, ownership and status.", icon: "data", items: ["type", "location", "status"] },
          { title: "Passport", text: "The object card contains characteristics, documents, photos, connected nodes and technical limits.", icon: "content", items: ["characteristics", "documents", "photos"] },
          { title: "History", text: "Works, emergencies, inspections and repairs are linked to the object for condition analysis.", icon: "tools", items: ["inspections", "repairs", "incidents"] },
          { title: "Risk management", text: "Critical assets, problem zones and infrastructure dependencies become visible.", icon: "shield", items: ["criticality", "risks", "dependencies"] }
        ],
        executive: "Without a digital infrastructure passport, it is difficult to plan repairs, analyze incidents and connect operations to real network objects.",
        effects: ["full asset control", "work linked to objects", "better repair planning", "fewer information gaps", "base for GIS and analytics"]
      },
      "gis-platform": {
        summary: "A gas infrastructure map where network objects are linked with requests, works, incidents and planning.",
        positioning:
          "GIS should not be a standalone map. It should become a spatial layer for operational management and infrastructure passporting.",
        outputs: ["network map", "object layers", "request binding", "risk zones", "operational overlays"],
        layers: [
          { title: "Base map", text: "Network objects are placed in space with addresses, coordinates and territorial binding.", icon: "map", items: ["address", "coordinates", "region"] },
          { title: "Infrastructure layers", text: "Pipelines, nodes, sections, meters and service zones are represented as managed layers.", icon: "space", items: ["sections", "nodes", "zones"] },
          { title: "Operational link", text: "Requests, incidents, field visits and works are linked to objects and displayed on the map.", icon: "flow", items: ["requests", "works", "incidents"] },
          { title: "Analytical zones", text: "Problem concentration, event recurrence and territorial dependencies become visible.", icon: "ranking", items: ["recurrence", "density", "dependencies"] }
        ],
        executive: "The map becomes a management tool when it is connected to processes, not only to network geometry.",
        effects: ["infrastructure visualization", "faster object search", "spatial incident analysis", "better work planning", "base for forecasting"]
      },
      "predictive-maintenance": {
        summary: "Forecasting incidents and repairs using history, asset condition, event recurrence and operational data.",
        positioning:
          "This direction makes sense after order is established in assets, works and data. It moves repairs from a reactive model to a preventive one.",
        outputs: ["risk model", "critical object list", "preventive actions", "management signals", "factor history"],
        layers: [
          { title: "Event history", text: "Incidents, repairs, requests, field visits and technical inspections are collected into a comparable history.", icon: "data", items: ["incidents", "repairs", "inspections"] },
          { title: "Risk factors", text: "Age, object type, event frequency, region, materials and operational signs are considered.", icon: "lens", items: ["age", "frequency", "region"] },
          { title: "Prevention", text: "The system proposes objects and actions where prevention can reduce incident risk.", icon: "tools", items: ["objects", "actions", "priority"] },
          { title: "Effect control", text: "It becomes clear which measures reduced recurrence and where risk remains high.", icon: "monitor", items: ["effect", "recurrence", "risk"] }
        ],
        executive: "Predictive maintenance should not start with AI. It starts with a reliable history of assets, works and incidents.",
        effects: ["lower incident rate", "better repair planning", "early risk detection", "justified prevention", "long-term resource savings"]
      },
      "capital-projects-management": {
        summary: "Management of investment, repair and infrastructure projects: portfolio, stages, documents, risks and result.",
        positioning:
          "Infrastructure projects need one picture: what is planned, who is responsible, what blocks progress and which result is confirmed.",
        outputs: ["project portfolio", "stages and milestones", "responsible roles", "risks and dependencies", "result documents"],
        layers: [
          { title: "Portfolio", text: "All infrastructure initiatives are captured in one list with goals, owners and statuses.", icon: "data", items: ["goal", "owner", "status"] },
          { title: "Stages", text: "The project is broken into milestones, approvals, works, documents and decisions.", icon: "flow", items: ["stage", "decision", "document"] },
          { title: "Dependencies", text: "Contractors, materials, access, approvals and other movement conditions become visible.", icon: "puzzle", items: ["contractors", "materials", "access"] },
          { title: "Result", text: "The final result is linked to network assets, acts, documents and further operation.", icon: "shield", items: ["asset", "act", "operation"] }
        ],
        executive: "A portfolio view is needed to see not only plans but real blockers, accountability and result readiness.",
        effects: ["portfolio transparency", "dependency control", "fewer manual statuses", "better management decisions", "projects linked to assets"]
      },
      "procurement-warehouse": {
        summary: "Materials, warehouses and procurement: need, availability, reservation, issue and link to works.",
        positioning:
          "Operational works depend on materials. The supply contour should be connected with requests, work orders and repair planning.",
        outputs: ["material request", "warehouse stock", "reservation", "issue for work", "shortage control"],
        layers: [
          { title: "Need", text: "Materials are linked to the request, work order, object and type of work.", icon: "content", items: ["request", "object", "work"] },
          { title: "Availability", text: "Stock levels, storage locations, material availability and issue limits are visible.", icon: "commerce", items: ["stock", "warehouse", "availability"] },
          { title: "Reservation", text: "Materials are reserved for specific works to reduce crew downtime.", icon: "lock", items: ["reserve", "crew", "priority"] },
          { title: "Shortage control", text: "Works blocked by materials and cases that need management response become visible.", icon: "monitor", items: ["shortage", "blockage", "response"] }
        ],
        executive: "Supply becomes manageable when materials are seen not separately from works, but as a condition for executing operational tasks.",
        effects: ["less downtime", "material control", "better work planning", "warehouse linked to operations", "fewer manual clarifications"]
      },
      "energocom-workflow": {
        summary: "Digital interaction between organizations: requests, statuses, documents, accountability and feedback.",
        positioning:
          "After the separation of functions, it is especially important to remove organizational gaps between technical tasks, documents and statuses across the parties.",
        outputs: ["single request order", "status exchange", "document register", "interaction history", "responsible roles"],
        layers: [
          { title: "Request", text: "A request from one party is recorded with type, basis, documents and expected result.", icon: "content", items: ["type", "basis", "result"] },
          { title: "Route", text: "The request receives an owner in Moldovagaz, processing status and transfer rules between roles.", icon: "flow", items: ["owner", "status", "route"] },
          { title: "Documents", text: "Attachments, decisions, acts and confirmations are stored in one connected interaction history.", icon: "data", items: ["acts", "decisions", "history"] },
          { title: "Control", text: "Open questions, stuck statuses and areas requiring approval become visible.", icon: "monitor", items: ["open", "stuck", "approval"] }
        ],
        executive: "Interaction with Energocom should be a transparent process where every task has an owner, status and confirmed result.",
        effects: ["fewer organizational gaps", "single request history", "clear statuses", "faster approvals", "accountability control"]
      },
      "debt-legacy-obligations": {
        summary: "Management of historical debts, transition obligations, documents and settlement statuses.",
        positioning:
          "Old debts and transition obligations require a separate management logic: classification, documents, owners and transparent status movement.",
        outputs: ["obligation register", "debt classification", "documents and basis", "settlement statuses", "management reporting"],
        layers: [
          { title: "Register", text: "Each obligation is recorded with counterparty, basis, accounting data, documents and status.", icon: "data", items: ["counterparty", "basis", "status"] },
          { title: "Classification", text: "Obligations are separated by type, risk, legal status and required action.", icon: "ranking", items: ["type", "risk", "action"] },
          { title: "Case", text: "The card stores documents, correspondence, decisions, owners and change history.", icon: "content", items: ["documents", "correspondence", "decisions"] },
          { title: "Control", text: "Problem groups, settlement dynamics and areas that require decisions become visible.", icon: "monitor", items: ["dynamics", "problems", "decisions"] }
        ],
        executive: "Financial and transition obligations become manageable when they are collected in a clear register with documents, statuses and owners.",
        effects: ["obligation transparency", "less document chaos", "better legal control", "management reporting", "fewer stuck questions"]
      },
      "contract-management": {
        summary: "Contracts, obligations and execution control: document validity, owners, risks and events.",
        positioning:
          "A contract should not be a file in an archive. It should be a managed object with obligations, owners, events and control points.",
        outputs: ["contract register", "obligation card", "event calendar", "execution control", "change history"],
        layers: [
          { title: "Register", text: "Contracts are collected in one base with counterparty, subject, status, owner and documents.", icon: "data", items: ["counterparty", "subject", "owner"] },
          { title: "Obligations", text: "Key terms are turned into control points, actions, events and responsible roles.", icon: "content", items: ["terms", "actions", "owners"] },
          { title: "Calendar", text: "Extensions, expirations, approvals, reviews and other important contract events are visible.", icon: "flow", items: ["extension", "expiration", "review"] },
          { title: "Risks", text: "Delays, disputed areas, unfulfilled terms and documents requiring attention become visible.", icon: "shield", items: ["delays", "disputes", "control"] }
        ],
        executive: "Contract management reduces the risk of losing obligations and makes legally significant events visible in advance.",
        effects: ["fewer missed deadlines", "better obligation control", "single document archive", "clear accountability", "lower legal risk"]
      },
      "regulatory-reporting": {
        summary: "Reporting for ANRE and state bodies: calendar, data collection, quality checks and confirmation archive.",
        positioning:
          "Regulatory reporting should be a managed process with data sources, owners, checks and submission history.",
        outputs: ["reporting calendar", "data sources", "quality checks", "approval route", "report archive"],
        layers: [
          { title: "Calendar", text: "Mandatory reports, events inside the regulation and responsible roles are listed.", icon: "content", items: ["report", "event", "role"] },
          { title: "Data collection", text: "Indicators are collected from departments, systems, spreadsheets and confirming documents.", icon: "data", items: ["indicators", "systems", "documents"] },
          { title: "Check", text: "Before submission, data is checked for completeness, discrepancies, versions and approvals.", icon: "shield", items: ["completeness", "versions", "approval"] },
          { title: "Archive", text: "Reports, confirmations, remarks and responses to regulator requests are preserved.", icon: "lock", items: ["reports", "remarks", "responses"] }
        ],
        executive: "Reporting automation reduces manual workload and improves the quality of management and regulatory data.",
        effects: ["less manual collection", "higher report quality", "transparent accountability", "confirmation archive", "remark control"]
      },
      "internal-document-workflow": {
        summary: "Document workflow and approvals: routes, assignments, document versions, execution and decision control.",
        positioning:
          "Internal documents should follow a transparent route where it is clear who approves, what delays the process and which decision was made.",
        outputs: ["approval routes", "assignments", "document versions", "decision statuses", "execution control"],
        layers: [
          { title: "Document", text: "The document gets a card with type, owner, attachments, version and approval basis.", icon: "content", items: ["type", "owner", "version"] },
          { title: "Route", text: "Approval moves through roles, departments and rules that can be controlled.", icon: "flow", items: ["role", "department", "rule"] },
          { title: "Assignment", text: "Decisions become tasks with owners, statuses and proof of execution.", icon: "tools", items: ["decision", "task", "execution"] },
          { title: "Control", text: "Stuck documents, delays, repeated approvals and departmental workload become visible.", icon: "monitor", items: ["delays", "repeats", "workload"] }
        ],
        executive: "Document workflow becomes part of a managed operating model rather than a separate paper or email process.",
        effects: ["faster approvals", "fewer lost documents", "transparent assignments", "execution control", "single decision history"]
      },
      "workforce-intelligence": {
        summary: "Analytics on personnel, competencies, permits, training and employee readiness for operational tasks.",
        positioning:
          "For an infrastructure operator, it is important to understand not only headcount but competencies, permits, training and team readiness.",
        outputs: ["employee profiles", "competencies", "certificates and permits", "training", "resource planning"],
        layers: [
          { title: "Profile", text: "An employee has a card with role, department, competencies, permits and training history.", icon: "lead", items: ["role", "permit", "training"] },
          { title: "Competencies", text: "Critical skills and qualifications are linked to work types and safety requirements.", icon: "shield", items: ["skills", "works", "requirements"] },
          { title: "Planning", text: "Employee availability, shifts, training and workload are considered when planning works.", icon: "flow", items: ["shifts", "workload", "availability"] },
          { title: "Development", text: "Competency gaps, training needs and workforce resilience risks become visible.", icon: "ranking", items: ["gaps", "training", "risks"] }
        ],
        executive: "Workforce Intelligence links operational tasks with the real readiness of people, competencies and permits.",
        effects: ["competency control", "better workforce planning", "training management", "lower operational risk", "visibility of workforce gaps"]
      },
      "compliance-risk-management": {
        summary: "Control of regulations, risks, checks, deviations and required risk-reduction actions.",
        positioning:
          "Compliance should be connected to real processes: who controls, where the risk is, which action is required and how the result is recorded.",
        outputs: ["risk register", "control procedures", "checks", "deviations", "corrective actions"],
        layers: [
          { title: "Register", text: "Risks and requirements are recorded with owners, processes, objects and criticality.", icon: "data", items: ["risk", "owner", "criticality"] },
          { title: "Control", text: "Control procedures are linked to regulations, frequency, roles and confirmations.", icon: "shield", items: ["procedure", "role", "confirmation"] },
          { title: "Deviation", text: "Violations and remarks become tasks with owners and resolution statuses.", icon: "flow", items: ["remark", "task", "status"] },
          { title: "Risk map", text: "Risk concentration, open actions and repeated violations become visible.", icon: "ranking", items: ["concentration", "repeats", "actions"] }
        ],
        executive: "Risk management helps not only record requirements, but also control the actions that reduce the probability of problems.",
        effects: ["regulation control", "fewer open risks", "clear accountability", "check management", "audit readiness"]
      },
      "incident-investigation-system": {
        summary: "Investigation of incidents and emergencies: facts, causes, corrective actions and lessons learned.",
        positioning:
          "An incident should end not only with closed work, but with a management conclusion: why it happened, what should change and who prevents recurrence.",
        outputs: ["investigation card", "facts and documents", "root causes", "corrective actions", "lessons base"],
        layers: [
          { title: "Card", text: "The incident receives an investigation structure: event, object, participants, documents and timeline.", icon: "content", items: ["event", "object", "timeline"] },
          { title: "Facts", text: "Photos, acts, statements, work data, object history and external conditions are collected.", icon: "data", items: ["photos", "acts", "history"] },
          { title: "Causes", text: "The team records root causes, recurrence factors and links to processes.", icon: "lens", items: ["cause", "factor", "process"] },
          { title: "Actions", text: "Corrective measures become tasks with owners and result control.", icon: "tools", items: ["measure", "owner", "control"] }
        ],
        executive: "Incident investigation turns emergencies into management knowledge and reduces the probability of similar problems recurring.",
        effects: ["less recurrence", "clear causes", "corrective action control", "experience preservation", "link to risks and training"]
      },
      "executive-dashboard": {
        summary: "A single management center: operations, regions, assets, risks, obligations and key deviations.",
        positioning:
          "A dashboard should not be a beautiful set of charts. It should be a management decision screen that collects only confirmed and useful indicators.",
        outputs: ["company picture", "regional indicators", "critical deviations", "SLA and risks", "management decisions"],
        layers: [
          { title: "Indicators", text: "Metrics are defined to reflect the real state of operations, assets, financial processes and risks.", icon: "ranking", items: ["operations", "assets", "risks"] },
          { title: "Regions", text: "The picture is broken down by regions, departments, task types and responsibility areas.", icon: "map", items: ["region", "department", "responsibility"] },
          { title: "Exceptions", text: "The dashboard highlights not all data, but deviations that require management attention.", icon: "lens", items: ["deviation", "signal", "action"] },
          { title: "Decision", text: "Each indicator is linked to owner, cause, action and response status.", icon: "flow", items: ["owner", "cause", "response"] }
        ],
        executive: "The dashboard is needed not for reporting for its own sake, but for daily understanding of where the company needs a decision.",
        effects: ["single company picture", "regional control", "faster management responses", "SLA and risk visibility", "data linked to decisions"]
      },
      "knowledge-base": {
        summary: "Corporate knowledge base for regulations, instructions, decision history, incident lessons and employee support.",
        positioning:
          "The knowledge base preserves company expertise and makes regulations available in a managed structure before more advanced AI scenarios are placed on top.",
        outputs: ["knowledge base", "regulation structure", "document search", "decision history", "relevance control"],
        layers: [
          { title: "Knowledge base", text: "Documents, regulations, instructions, frequent scenarios and incident lessons are collected into a managed structure.", icon: "data", items: ["documents", "instructions", "lessons"] },
          { title: "Search", text: "An employee quickly finds the needed regulation, form, decision or related material.", icon: "lens", items: ["regulation", "form", "decision"] },
          { title: "Owners", text: "Each knowledge block has an owner for relevance, access, versions and material confirmation.", icon: "shield", items: ["owner", "version", "access"] },
          { title: "Update", text: "Outdated materials, gaps and knowledge critical for operations become visible.", icon: "monitor", items: ["relevance", "gaps", "priority"] }
        ],
        executive: "A corporate knowledge base helps preserve Moldovagaz expertise and reduces dependence on informal transfer of experience.",
        effects: ["expertise preservation", "faster regulation search", "training support", "single knowledge version", "foundation for AI assistant"]
      },
      "ai-assistant": {
        summary: "An AI assistant for employees that answers questions using confirmed documents, regulations and decision history.",
        positioning:
          "AI Assistant should not look like a fashionable add-on. Its value appears only with clear knowledge sources, access rights, responsibility rules and answer quality control.",
        outputs: ["employee questions", "answers by source", "document links", "quality control", "query analytics"],
        layers: [
          { title: "Question", text: "The employee asks a question in a working context: regulation, procedure, document, object or operational situation type.", icon: "content", items: ["context", "role", "request"] },
          { title: "Sources", text: "The answer is built only on confirmed knowledge base materials, documents and approved internal sources.", icon: "data", items: ["documents", "regulations", "access"] },
          { title: "Answer", text: "The assistant shows a short answer, basis, related documents and application limits.", icon: "ai", items: ["answer", "basis", "limit"] },
          { title: "Control", text: "Answer quality, frequent questions, knowledge gaps and risky topics are controlled by process owners.", icon: "shield", items: ["quality", "gaps", "owner"] }
        ],
        executive: "The AI assistant should accelerate employees, but not replace regulations, process owners or responsibility for decisions.",
        effects: ["faster search", "less load on experts", "support for new employees", "knowledge gap detection", "controlled AI use"],
        guardrails: [
          "The AI assistant launches only on a confirmed knowledge base and with clear access rights.",
          "Answers must show sources and must not replace responsible process owners.",
          "AI scenarios are chosen after the audit of documents, data and security requirements."
        ]
      }
    }
  },
  ro: {
    title: "Moldovagaz: harta dezvoltării digitale",
    eyebrow: "Prezentare a oportunităților de transformare digitală",
    summary:
      "O hartă de prezentare cu 5 direcții strategice și peste 20 de subproiecte digitale, care după audit pot fi prioritizate după valoare, complexitate și pregătirea datelor.",
    description:
      "Această pagină prezintă o arhitectură posibilă de dezvoltare digitală pentru Moldovagaz: 5 direcții, subproiecte în interiorul fiecărei direcții și logica alegerii temelor pentru audit.",
    status: "Concept pentru discuție",
    outputs: ["harta celor 5 direcții strategice", "20+ subproiecte digitale", "logica auditului de procese și date", "matricea priorităților", "cadru de alegere managerială"],
    thesis: {
      title: "De la harta oportunităților la o decizie exactă",
      text:
        "Pagina arată direcții posibile de dezvoltare digitală. Componența finală a soluțiilor, profunzimea integrărilor și ordinea implementării se stabilesc după verificarea proceselor, datelor și zonelor de responsabilitate.",
      items: [
        "Auditul descrie procesele, sistemele, datele, rolurile, documentele și zonele problematice.",
        "Fiecare inițiativă este evaluată după valoarea managerială, complexitatea schimbării, disponibilitatea datelor și pregătirea proprietarilor.",
        "Harta arată nu o listă de idei IT, ci zonele în care digitalizarea poate întări controlul companiei."
      ]
    },
    navigation: {
      title: "5 direcții de transformare digitală",
      text:
        "Harta este împărțită în 5 direcții manageriale: operațiuni, infrastructură, finanțe și piață, procese interne, date și AI. În fiecare direcție există subproiecte care deschid zone concrete de dezvoltare digitală.",
      core:
        "Logica hărții este simplă: Moldovagaz vede nu o singură sistemă, ci întregul spațiu de guvernare a companiei: operațiuni, infrastructură, finanțe, procese interne și date."
    },
    presentationCards: [
      {
        eyebrow: "Stratul 1",
        title: "Arătarea imaginii manageriale",
        text: "Pornim de la schema generală: ce părți ale companiei pot deveni mai transparente, mai rapide și mai ușor de gestionat prin instrumente digitale.",
        items: ["operațiuni", "infrastructură", "finanțe", "procese"]
      },
      {
        eyebrow: "Stratul 2",
        title: "Împărțirea pe direcții",
        text: "Fiecare direcție se deschide prin subproiecte, ca discuția să fie despre zone concrete de management, nu despre digitalizare abstractă.",
        items: ["cereri", "active", "contracte", "date"]
      },
      {
        eyebrow: "Stratul 3",
        title: "Identificarea punctelor de dezvoltare",
        text: "După parcurgerea hărții devin vizibile temele care merită analizate mai profund și datele care trebuie verificate în audit.",
        items: ["interes", "valoare", "date", "proprietari"]
      }
    ],
    implementation: {
      title: "Următorul pas",
      text:
        "Direcțiile selectate trec în audit: se verifică procesele, datele, documentele, rolurile responsabile și instrumentele curente. Astfel, harta de dezvoltare devine bază pentru proiectarea ulterioară.",
      steps: [
        "Alegerea direcțiilor care sunt cele mai importante acum.",
        "Verificarea proceselor reale, documentelor, sistemelor și surselor de date.",
        "Înțelegerea zonelor unde se pierde viteză, control, responsabilitate sau calitatea informației.",
        "Compararea subproiectelor după valoare managerială și complexitatea schimbării.",
        "Definirea soluțiilor care merită proiectate primele.",
        "Pregătirea unei arhitecturi clare pentru direcția selectată."
      ]
    },
    guardrail: {
      title: "O logică unică de dezvoltare digitală",
      text:
        "Dezvoltarea digitală Moldovagaz poate avansa prin direcții clare, legate de procese reale, date și zone de responsabilitate, nu prin inițiative separate și haotice.",
      items: [
        "Ce zone de management pot deveni mai transparente și mai rapide.",
        "Ce subproiecte intră în fiecare dintre cele 5 direcții.",
        "Ce teme trebuie verificate în audit înainte de proiectarea soluției."
      ]
    },
    groups: {
      "operational-management": {
        title: "Management operațional",
        summary: "Zona operațiunilor zilnice: cereri, avarii, lucrări, echipe, SLA și responsabilitate pe regiuni.",
        framing: "Mai întâi Moldovagaz obține vizibilitate asupra operațiunilor: ce se întâmplă, unde apar întârzieri și ce decizii manageriale sunt necesare.",
        outcomes: ["controlul sarcinilor", "responsabilitate", "SLA", "dispecerizare", "reacție la avarii"]
      },
      "infrastructure-assets": {
        title: "Infrastructură și active",
        summary: "Pașaport digital al rețelei, hartă a obiectelor, reparații, materiale și proiecte de infrastructură.",
        framing: "Acest bloc leagă operațiunile de obiectele reale ale rețelei și creează baza pentru planificare, prevenție și management pe termen lung al activelor.",
        outcomes: ["pașaportul rețelei", "GIS", "istoric de reparații", "materiale", "prevenție"]
      },
      "finance-market": {
        title: "Finanțe și interacțiune cu piața",
        summary: "Interacțiune cu Energocom, obligații istorice, contracte și raportare regulatorie.",
        framing: "Blocul ajută la gestionarea perioadei de tranziție, obligațiilor și proceselor externe fără pierderea statutelor, documentelor și responsabilității.",
        outcomes: ["workflow Energocom", "obligații", "contracte", "raportare ANRE", "controlul statutelor"]
      },
      "internal-processes": {
        title: "Procese interne",
        summary: "Flux documentar, personal, compliance, riscuri și investigarea incidentelor în interiorul companiei.",
        framing: "Procesele interne creează guvernare: deciziile urmează un traseu clar, riscurile se închid prin acțiuni, iar experiența se păstrează în sistem.",
        outcomes: ["aprobări", "competențe", "riscuri", "investigații", "controlul execuției"]
      },
      "data-analytics-ai": {
        title: "Date, analiză și AI",
        summary: "Panouri manageriale, bază de cunoștințe și AI assistant peste procese și date confirmate.",
        framing: "Datele și AI devin valoroase după ce compania înțelege sursele, proprietarii, calitatea datelor și scenariile manageriale.",
        outcomes: ["panou managerial", "analiza abaterilor", "bază de cunoștințe", "AI assistant", "controlul calității"]
      }
    },
    priorityMatrix: {
      "quick-wins": {
        title: "Efecte manageriale rapide",
        label: "Efect ridicat / complexitate redusă",
        summary: "Candidați care pot oferi primii transparență, control și bază pentru decizii ulterioare.",
        criteria: ["efect vizibil", "date clare", "risc organizațional minim"]
      },
      "operational-efficiency": {
        title: "Eficiență operațională",
        label: "Efect ridicat / complexitate medie",
        summary: "Direcții care întăresc execuția zilnică, legătura proceselor de teren, materialelor și obligațiilor contractuale.",
        criteria: ["legătură cu operațiunile", "mai mulți proprietari", "pregătirea departamentelor contează"]
      },
      "strategic-transformation": {
        title: "Transformare strategică",
        label: "Efect foarte ridicat / complexitate mare",
        summary: "Direcții mari care schimbă modelul de management al infrastructurii, interacțiunii externe și raportării regulatorii.",
        criteria: ["valoare ridicată", "dependență de date", "necesită susținere managerială"]
      },
      "long-term-innovation": {
        title: "Oportunități pe termen lung",
        label: "Potențial ridicat / după ordine operațională",
        summary: "Inițiative care se deschid după structurarea proceselor, acumularea datelor de calitate și apariția proprietarilor de cunoștințe.",
        criteria: ["cere date mature", "efect la scară", "depinde de calitatea bazei"]
      }
    },
    modules: {
      "operations-control-center": {
        summary: "Un centru unic de control operațional pentru companie: cereri, sarcini, evenimente de avarie, regiuni, SLA și persoane responsabile.",
        positioning:
          "Acesta este stratul managerial de bază pentru imaginea operațională zilnică a Moldovagaz. Nu înlocuiește toate sistemele, ci adună statuturile critice într-un singur ecran de decizie.",
        outputs: ["registru unic de sarcini", "statuturi și proprietari", "SLA și escaladări", "panou managerial", "imagine pe regiuni"],
        layers: [
          { title: "Registru unic", text: "Toate sarcinile operaționale sunt fixate într-un singur loc cu tip, sursă, prioritate, regiune și responsabil.", icon: "data", items: ["tip de sarcină", "sursă", "responsabil"] },
          { title: "Dispecerizare", text: "Sarcinile sunt repartizate între departamente, echipe de teren și roluri responsabile cu statuturi clare de execuție.", icon: "flow", items: ["alocare", "statut", "escaladare"] },
          { title: "Control SLA", text: "Întârzierile, cauzele și zonele unde procesul cere intervenție devin vizibile.", icon: "ranking", items: ["SLA", "întârzieri", "cauze"] },
          { title: "Ecran managerial", text: "Imagine zilnică asupra sarcinilor deschise, regiunilor, evenimentelor de avarie și abaterilor critice.", icon: "monitor", items: ["regiuni", "riscuri", "raportare"] }
        ],
        executive: "Fără un ecran unic pentru sarcinile operaționale este dificil de gestionat responsabilitatea, prioritățile și încărcarea regiunilor.",
        effects: ["transparența sarcinilor", "responsabilitate unică", "mai puține sarcini pierdute", "control regional", "detectarea timpurie a întârzierilor", "bază pentru module următoare"]
      },
      "technical-request-management": {
        summary: "Gestionarea cererilor tehnice și a sarcinilor, de la înregistrare până la închiderea confirmată a rezultatului.",
        positioning:
          "Direcția aduce ordine în fluxul cererilor tehnice, unde se pot amesteca solicitări, sarcini, semnale de avarie și lucrări planificate.",
        outputs: ["card de cerere", "clasificarea cererilor", "rutare", "istoric de decizii", "controlul închiderii"],
        layers: [
          { title: "Înregistrare", text: "Cererea primește un format unic: sursă, adresă, obiect, descriere, documente și prioritate.", icon: "content", items: ["sursă", "adresă", "prioritate"] },
          { title: "Clasificare", text: "Cererile sunt împărțite după tipul lucrărilor, risc, regiune și nivelul necesar de reacție.", icon: "ranking", items: ["tip", "risc", "regiune"] },
          { title: "Rutare", text: "Sistemul arată cine trebuie să preia cererea și ce date sunt necesare pentru rezolvare.", icon: "flow", items: ["rol", "rută", "date"] },
          { title: "Închidere", text: "Rezultatul este fixat cu concluzie, comentarii, atașamente și bază pentru raportarea ulterioară.", icon: "tools", items: ["rezultat", "act", "istoric"] }
        ],
        executive: "Cererea tehnică nu trebuie să fie un mesaj în flux, ci un obiect gestionat cu proprietar, statut și rezultat.",
        effects: ["mai puțin control manual", "format unic al cererilor", "transmitere mai rapidă în lucru", "istoric clar de decizii", "bază pentru analiza cauzelor"]
      },
      "field-service-management": {
        summary: "Gestionarea echipelor de teren: alocare, rută, execuție, fixarea rezultatului și feedback.",
        positioning:
          "Pentru un operator de infrastructură contează nu doar faptul vizitei, ci ce s-a întâmplat la obiect, ce materiale au fost folosite și de ce lucrarea nu a fost închisă.",
        outputs: ["sarcină pentru echipă", "rută și sosire", "dovadă foto", "act digital", "motive de nefinalizare"],
        layers: [
          { title: "Alocare", text: "Echipa primește sarcina cu adresă, obiect, prioritate, acțiune așteptată și materiale necesare.", icon: "flow", items: ["adresă", "obiect", "materiale"] },
          { title: "Lucru la obiect", text: "Se fixează sosirea, comentariile, fotografiile, materialele utilizate și statutul real al lucrării.", icon: "local", items: ["sosire", "foto", "statut"] },
          { title: "Închiderea rezultatului", text: "Lucrarea se închide prin act, vizită repetată sau motivul pentru care execuția este imposibilă.", icon: "tools", items: ["act", "repetare", "motiv"] },
          { title: "Controlul încărcării", text: "Încărcarea echipelor, vizitele repetate, staționările și cauzele abaterilor pe regiuni devin vizibile.", icon: "monitor", items: ["încărcare", "repetări", "regiuni"] }
        ],
        executive: "Echipele de teren devin parte a unui proces gestionat, nu o zonă separată vizibilă doar după raportare manuală.",
        effects: ["controlul deplasărilor", "mai puține pierderi de timp", "fixare calitativă a lucrărilor", "motive clare de nefinalizare", "analiză pe regiuni"]
      },
      "emergency-dispatch-layer": {
        summary: "Gestionarea evenimentelor de avarie: primirea semnalului, evaluarea urgenței, coordonarea reacției și analiza rezultatului.",
        positioning:
          "Evenimentele de avarie cer o logică separată: reacție rapidă, responsabilitate exactă, istoric al acțiunilor și control managerial după închidere.",
        outputs: ["card de eveniment", "prioritatea reacției", "coordonarea participanților", "jurnal de acțiuni", "analiza rezultatului"],
        layers: [
          { title: "Semnal", text: "Evenimentul de avarie este fixat cu sursă, loc, obiect, risc și descriere inițială.", icon: "data", items: ["sursă", "obiect", "risc"] },
          { title: "Prioritate", text: "Evenimentul primește nivel de criticitate și reguli de reacție pentru dispecer, regiune și manager.", icon: "ranking", items: ["criticitate", "reguli", "rol"] },
          { title: "Coordonare", text: "Se fixează alocările, deplasările, acțiunile la obiect, comunicările și statutul curent.", icon: "flow", items: ["alocări", "deplasări", "statut"] },
          { title: "Analiză", text: "După închidere rămân istoricul acțiunilor, cauza, consecințele și propunerile de prevenire.", icon: "lens", items: ["cauză", "consecințe", "lecții"] }
        ],
        executive: "Reacția la avarii trebuie să fie vizibilă ca proces gestionat, unde contează nu doar închiderea evenimentului, ci și reducerea repetării problemelor.",
        effects: ["reacție managerială mai rapidă", "jurnal unic de avarii", "responsabilitate clară", "controlul evenimentelor critice", "material pentru prevenție"]
      },
      "work-order-management": {
        summary: "Alocarea, executarea și controlul lucrărilor: de la sarcină până la rezultat și documente confirmative.",
        positioning:
          "Ordinul de lucru leagă cererea, obiectul, executorul, materialele, documentele și controlul managerial al execuției.",
        outputs: ["ordin de lucru", "executor și resurse", "controlul execuției", "act de rezultat", "istoric de lucrări"],
        layers: [
          { title: "Plan de lucrări", text: "Se formează ordinul de lucru cu scop, obiect, executor, prioritate și rezultat așteptat.", icon: "content", items: ["scop", "obiect", "executor"] },
          { title: "Resurse", text: "Se iau în calcul echipe, materiale, tehnică, documente și dependențe de procesele apropiate.", icon: "tools", items: ["echipă", "materiale", "documente"] },
          { title: "Execuție", text: "Se fixează progresul, abaterile, comentariile, amânările și motivele întârzierilor.", icon: "flow", items: ["progres", "abateri", "amânări"] },
          { title: "Recepție", text: "Rezultatul se confirmă prin act, atașamente, statut de închidere și date pentru raportare.", icon: "shield", items: ["act", "confirmare", "raportare"] }
        ],
        executive: "Lucrările devin măsurabile: ce a fost alocat, ce s-a executat, unde există blocaj și ce rezultat este confirmat.",
        effects: ["execuție transparentă", "controlul dependențelor", "mai puține clarificări manuale", "istoric unic de lucrări", "bază pentru planificarea resurselor"]
      },
      "asset-management": {
        summary: "Pașaport digital al obiectelor rețelei de gaze: componență, stare, documente, istoric de lucrări și legătură cu operațiunile.",
        positioning:
          "Activele rețelei nu trebuie să fie doar o listă de obiecte, ci un pașaport viu al infrastructurii, legat de cereri, reparații și riscuri.",
        outputs: ["registru de obiecte", "pașaport de activ", "istoric de mentenanță", "legătură cu lucrările", "controlul stării"],
        layers: [
          { title: "Registru de obiecte", text: "Se formează o listă unică a obiectelor de rețea cu tip, amplasare, apartenență și statut.", icon: "data", items: ["tip", "amplasare", "statut"] },
          { title: "Pașaport", text: "Cardul obiectului adună caracteristici, documente, fotografii, noduri conexe și limite tehnice.", icon: "content", items: ["caracteristici", "documente", "foto"] },
          { title: "Istoric", text: "Lucrările, avariile, inspecțiile și reparațiile se leagă de obiect pentru analiza stării.", icon: "tools", items: ["inspecții", "reparații", "avarii"] },
          { title: "Managementul riscurilor", text: "Activele critice, zonele problematice și dependențele de infrastructură devin vizibile.", icon: "shield", items: ["criticitate", "riscuri", "dependențe"] }
        ],
        executive: "Fără pașaport digital al infrastructurii este greu de planificat reparații, de analizat avariile și de legat operațiunile de obiecte reale ale rețelei.",
        effects: ["control complet al activelor", "legătura lucrărilor cu obiectele", "planificare mai bună a reparațiilor", "mai puține rupturi informaționale", "bază pentru GIS și analiză"]
      },
      "gis-platform": {
        summary: "Harta infrastructurii de gaze, unde obiectele rețelei sunt legate de cereri, lucrări, avarii și planificare.",
        positioning:
          "GIS nu trebuie să fie o hartă separată, ci un strat spațial pentru management operațional și pașaportizarea infrastructurii.",
        outputs: ["harta rețelei", "straturi de obiecte", "legarea cererilor", "zone de risc", "suprapuneri operaționale"],
        layers: [
          { title: "Hartă de bază", text: "Obiectele rețelei sunt plasate în spațiu cu adrese, coordonate și apartenență teritorială.", icon: "map", items: ["adresă", "coordonate", "regiune"] },
          { title: "Straturi de infrastructură", text: "Conductele, nodurile, sectoarele, contoarele și zonele de service sunt prezentate ca straturi gestionabile.", icon: "space", items: ["sectoare", "noduri", "zone"] },
          { title: "Legătură cu operațiunile", text: "Cererile, avariile, deplasările și lucrările se leagă de obiecte și se afișează pe hartă.", icon: "flow", items: ["cereri", "lucrări", "avarii"] },
          { title: "Zone analitice", text: "Concentrarea problemelor, repetarea evenimentelor și dependențele teritoriale devin vizibile.", icon: "ranking", items: ["repetări", "densitate", "dependențe"] }
        ],
        executive: "Harta devine instrument managerial atunci când este legată de procese, nu doar de geometria rețelei.",
        effects: ["vizualizarea infrastructurii", "căutare mai rapidă a obiectelor", "analiză spațială a avariilor", "planificare mai bună a lucrărilor", "bază pentru prognoză"]
      },
      "predictive-maintenance": {
        summary: "Prognozarea avariilor și reparațiilor pe baza istoricului, stării activelor, repetării evenimentelor și datelor operaționale.",
        positioning:
          "Direcția are sens după ordonarea activelor, lucrărilor și datelor. Ea mută reparațiile din logica reactivă într-una preventivă.",
        outputs: ["model de risc", "listă de obiecte critice", "acțiuni preventive", "semnale manageriale", "istoric de factori"],
        layers: [
          { title: "Istoric de evenimente", text: "Avariile, reparațiile, cererile, deplasările și inspecțiile tehnice se adună într-un istoric comparabil.", icon: "data", items: ["avarii", "reparații", "inspecții"] },
          { title: "Factori de risc", text: "Se iau în calcul vârsta, tipul obiectului, frecvența evenimentelor, regiunea, materialele și semnele de exploatare.", icon: "lens", items: ["vârstă", "frecvență", "regiune"] },
          { title: "Prevenție", text: "Sistemul propune obiecte și acțiuni unde prevenția poate reduce riscul de incidente.", icon: "tools", items: ["obiecte", "acțiuni", "prioritate"] },
          { title: "Controlul efectului", text: "Devine vizibil ce măsuri au redus repetarea problemelor și unde riscul rămâne ridicat.", icon: "monitor", items: ["efect", "repetare", "risc"] }
        ],
        executive: "Prognozarea nu trebuie să înceapă cu AI. Ea începe cu un istoric calitativ al activelor, lucrărilor și avariilor.",
        effects: ["reducerea avariilor", "planificare mai bună a reparațiilor", "identificare timpurie a riscurilor", "justificarea prevenției", "economii de resurse pe termen lung"]
      },
      "capital-projects-management": {
        summary: "Gestionarea proiectelor investiționale, de reparații și infrastructură: portofoliu, etape, documente, riscuri și rezultat.",
        positioning:
          "Proiectele de infrastructură cer o imagine unică: ce este planificat, cine răspunde, ce blochează mișcarea și ce rezultat este confirmat.",
        outputs: ["portofoliu de proiecte", "etape și puncte de control", "roluri responsabile", "riscuri și dependențe", "documente de rezultat"],
        layers: [
          { title: "Portofoliu", text: "Toate inițiativele de infrastructură sunt fixate într-o listă unică cu obiective, proprietari și statuturi.", icon: "data", items: ["obiectiv", "proprietar", "statut"] },
          { title: "Etape", text: "Proiectul este împărțit în puncte de control, aprobări, lucrări, documente și decizii.", icon: "flow", items: ["etapă", "decizie", "document"] },
          { title: "Dependențe", text: "Devind vizibili contractorii, materialele, accesul, aprobările și alte condiții de mișcare a proiectului.", icon: "puzzle", items: ["contractori", "materiale", "acces"] },
          { title: "Rezultat", text: "Rezultatul final se leagă de activele rețelei, acte, documente și exploatarea ulterioară.", icon: "shield", items: ["activ", "act", "exploatare"] }
        ],
        executive: "Este necesară o imagine de portofoliu în care se văd nu doar planurile, ci blocajele reale, responsabilitatea și pregătirea rezultatului.",
        effects: ["transparența portofoliului", "controlul dependențelor", "mai puține statuturi manuale", "decizii manageriale mai bune", "legătura proiectelor cu activele"]
      },
      "procurement-warehouse": {
        summary: "Materiale, depozite și aprovizionare: necesar, disponibilitate, rezervare, eliberare și legătură cu lucrările.",
        positioning:
          "Lucrările operaționale depind de materiale. Conturul de aprovizionare trebuie legat de cereri, ordine de lucru și planificarea reparațiilor.",
        outputs: ["cerere de materiale", "stocuri de depozit", "rezervare", "eliberare pentru lucrare", "controlul deficitului"],
        layers: [
          { title: "Necesar", text: "Materialele se leagă de cerere, ordinul de lucru, obiect și tipul lucrărilor.", icon: "content", items: ["cerere", "obiect", "lucrare"] },
          { title: "Disponibilitate", text: "Sunt vizibile stocurile, locurile de păstrare, disponibilitatea materialelor și limitele de eliberare.", icon: "commerce", items: ["stocuri", "depozit", "disponibilitate"] },
          { title: "Rezervare", text: "Materialele se rezervă pentru lucrări concrete, ca să scadă staționarea echipelor.", icon: "lock", items: ["rezervă", "echipă", "prioritate"] },
          { title: "Controlul deficitului", text: "Devine vizibil ce lucrări sunt blocate de materiale și unde este necesară reacție managerială.", icon: "monitor", items: ["deficit", "blocaj", "reacție"] }
        ],
        executive: "Aprovizionarea devine gestionabilă când materialele sunt văzute nu separat de lucrări, ci ca o condiție pentru executarea sarcinilor operaționale.",
        effects: ["mai puține staționări", "controlul materialelor", "planificare mai bună a lucrărilor", "legătura depozitului cu operațiunile", "mai puține clarificări manuale"]
      },
      "energocom-workflow": {
        summary: "Interacțiune digitală între organizații: cereri, statuturi, documente, responsabilitate și feedback.",
        positioning:
          "După separarea funcțiilor este deosebit de important să fie eliminată ruptura organizațională dintre sarcinile tehnice, documente și statuturi între părți.",
        outputs: ["ordine unică a cererilor", "schimb de statuturi", "registru de documente", "istoric de interacțiune", "roluri responsabile"],
        layers: [
          { title: "Cerere", text: "Solicitarea unei părți se fixează cu tip, bază, documente și rezultat așteptat.", icon: "content", items: ["tip", "bază", "rezultat"] },
          { title: "Rută", text: "Cererea primește proprietar în Moldovagaz, statut de procesare și reguli de transfer între roluri.", icon: "flow", items: ["proprietar", "statut", "rută"] },
          { title: "Documente", text: "Toate anexele, deciziile, actele și confirmările se păstrează într-un istoric conectat al interacțiunii.", icon: "data", items: ["acte", "decizii", "istoric"] },
          { title: "Control", text: "Întrebările deschise, statuturile blocate și zonele unde este necesară aprobare devin vizibile.", icon: "monitor", items: ["deschis", "blocat", "aprobare"] }
        ],
        executive: "Interacțiunea cu Energocom trebuie să fie un proces transparent, unde fiecare sarcină are proprietar, statut și rezultat confirmat.",
        effects: ["mai puține rupturi organizaționale", "istoric unic de cereri", "statuturi clare", "aprobări mai rapide", "controlul responsabilității"]
      },
      "debt-legacy-obligations": {
        summary: "Gestionarea datoriilor istorice, obligațiilor de tranziție, documentelor și statuturilor de reglementare.",
        positioning:
          "Datoriile vechi și obligațiile de tranziție cer o logică managerială separată: clasificare, documente, proprietari și mișcare transparentă a statuturilor.",
        outputs: ["registru de obligații", "clasificarea datoriilor", "documente și baze", "statuturi de reglementare", "raportare managerială"],
        layers: [
          { title: "Registru", text: "Fiecare obligație se fixează cu contraparte, bază, date contabile, documente și statut.", icon: "data", items: ["contraparte", "bază", "statut"] },
          { title: "Clasificare", text: "Obligațiile sunt împărțite după tip, risc, statut juridic și acțiune necesară.", icon: "ranking", items: ["tip", "risc", "acțiune"] },
          { title: "Dosar", text: "Cardul păstrează documente, corespondență, decizii, responsabili și istoric al schimbărilor.", icon: "content", items: ["documente", "corespondență", "decizii"] },
          { title: "Control", text: "Grupurile problematice, dinamica reglementării și zonele care cer decizie devin vizibile.", icon: "monitor", items: ["dinamică", "probleme", "decizii"] }
        ],
        executive: "Obligațiile financiare și de tranziție devin gestionabile când sunt adunate într-un registru clar cu documente, statuturi și responsabili.",
        effects: ["transparența obligațiilor", "mai puțin haos în documente", "control juridic mai bun", "raportare managerială", "mai puține întrebări blocate"]
      },
      "contract-management": {
        summary: "Contracte, obligații și controlul execuției: valabilitatea documentelor, responsabili, riscuri și evenimente.",
        positioning:
          "Contractul nu trebuie să fie un fișier în arhivă, ci un obiect gestionat cu obligații, proprietari, evenimente și puncte de control.",
        outputs: ["registru de contracte", "card de obligații", "calendar de evenimente", "controlul execuției", "istoric de schimbări"],
        layers: [
          { title: "Registru", text: "Contractele sunt adunate într-o bază unică cu contraparte, obiect, statut, proprietar și documente.", icon: "data", items: ["contraparte", "obiect", "proprietar"] },
          { title: "Obligații", text: "Condițiile cheie sunt transformate în puncte de control, acțiuni, evenimente și roluri responsabile.", icon: "content", items: ["condiții", "acțiuni", "responsabili"] },
          { title: "Calendar", text: "Sunt vizibile prelungirile, expirările, aprobările, revizuirile și alte evenimente contractuale importante.", icon: "flow", items: ["prelungire", "expirare", "revizuire"] },
          { title: "Riscuri", text: "Întârzierile, zonele disputate, condițiile neexecutate și documentele care cer atenție devin vizibile.", icon: "shield", items: ["întârzieri", "dispute", "control"] }
        ],
        executive: "Sistemul de contracte reduce riscul pierderii obligațiilor și face vizibile din timp evenimentele juridic importante.",
        effects: ["mai puține întârzieri", "control mai bun al obligațiilor", "arhivă unică de documente", "responsabilitate clară", "reducerea riscurilor juridice"]
      },
      "regulatory-reporting": {
        summary: "Raportare pentru ANRE și organele de stat: calendar, colectare de date, verificarea calității și arhiva confirmărilor.",
        positioning:
          "Raportarea regulatorie trebuie să fie un proces gestionat cu surse de date, responsabili, verificări și istoric de transmitere.",
        outputs: ["calendar de raportare", "surse de date", "verificări de calitate", "rută de aprobare", "arhivă de rapoarte"],
        layers: [
          { title: "Calendar", text: "Se formează lista rapoartelor obligatorii, a evenimentelor din regulament și a rolurilor responsabile.", icon: "content", items: ["raport", "eveniment", "rol"] },
          { title: "Colectare de date", text: "Indicatorii sunt colectați din departamente, sisteme, tabele și documente confirmative.", icon: "data", items: ["indicatori", "sisteme", "documente"] },
          { title: "Verificare", text: "Înainte de transmitere datele trec prin controlul completitudinii, diferențelor, versiunilor și aprobărilor.", icon: "shield", items: ["completitudine", "versiuni", "aprobare"] },
          { title: "Arhivă", text: "Se păstrează istoricul rapoartelor, confirmărilor, observațiilor și răspunsurilor la solicitările regulatorului.", icon: "lock", items: ["rapoarte", "observații", "răspunsuri"] }
        ],
        executive: "Automatizarea raportării reduce încărcarea manuală și crește calitatea datelor manageriale și regulatorii.",
        effects: ["mai puțină colectare manuală", "calitate mai bună a rapoartelor", "responsabilitate transparentă", "arhivă de confirmări", "controlul observațiilor"]
      },
      "internal-document-workflow": {
        summary: "Flux documentar și aprobări: rute, sarcini, versiuni de documente, execuție și controlul deciziilor.",
        positioning:
          "Documentele interne trebuie să urmeze o rută transparentă, unde se vede cine aprobă, ce întârzie procesul și ce decizie a fost luată.",
        outputs: ["rute de aprobare", "sarcini", "versiuni de documente", "statuturi de decizii", "controlul execuției"],
        layers: [
          { title: "Document", text: "Documentul primește card cu tip, proprietar, anexe, versiune și bază pentru aprobare.", icon: "content", items: ["tip", "proprietar", "versiune"] },
          { title: "Rută", text: "Aprobarea trece prin roluri, departamente și reguli care pot fi controlate.", icon: "flow", items: ["rol", "departament", "regulă"] },
          { title: "Sarcină", text: "Deciziile devin sarcini cu responsabili, statuturi și confirmarea execuției.", icon: "tools", items: ["decizie", "sarcină", "execuție"] },
          { title: "Control", text: "Documentele blocate, întârzierile, aprobările repetate și încărcarea pe departamente devin vizibile.", icon: "monitor", items: ["întârzieri", "repetări", "încărcare"] }
        ],
        executive: "Fluxul documentar devine parte a modelului operațional gestionat, nu un proces separat pe hârtie sau email.",
        effects: ["aprobări mai rapide", "mai puține documente pierdute", "sarcini transparente", "controlul execuției", "istoric unic al deciziilor"]
      },
      "workforce-intelligence": {
        summary: "Analiză despre personal, competențe, permise, instruire și pregătirea angajaților pentru sarcini operaționale.",
        positioning:
          "Pentru un operator de infrastructură este importantă nu doar numărul de angajați, ci competențele, permisele, instruirea și pregătirea echipelor.",
        outputs: ["profiluri de angajați", "competențe", "certificate și permise", "instruire", "planificarea resurselor"],
        layers: [
          { title: "Profil", text: "Angajatul are un card cu rol, departament, competențe, permise și istoric de instruire.", icon: "lead", items: ["rol", "permis", "instruire"] },
          { title: "Competențe", text: "Abilitățile și calificările critice se leagă de tipuri de lucrări și cerințe de siguranță.", icon: "shield", items: ["abilități", "lucrări", "cerințe"] },
          { title: "Planificare", text: "Disponibilitatea angajaților, schimburile, instruirea și încărcarea se iau în calcul la planificarea lucrărilor.", icon: "flow", items: ["schimburi", "încărcare", "disponibilitate"] },
          { title: "Dezvoltare", text: "Deficitul de competențe, nevoia de instruire și riscurile de stabilitate a personalului devin vizibile.", icon: "ranking", items: ["deficit", "instruire", "riscuri"] }
        ],
        executive: "Workforce Intelligence leagă sarcinile operaționale de pregătirea reală a oamenilor, competențelor și permiselor.",
        effects: ["controlul competențelor", "planificare mai bună a personalului", "managementul instruirii", "reducerea riscurilor operaționale", "vizibilitatea deficitului de personal"]
      },
      "compliance-risk-management": {
        summary: "Controlul regulamentelor, riscurilor, verificărilor, abaterilor și acțiunilor obligatorii de reducere a riscurilor.",
        positioning:
          "Compliance trebuie legat de procese reale: cine răspunde de control, unde este riscul, ce acțiune este necesară și cum se fixează rezultatul.",
        outputs: ["registru de riscuri", "proceduri de control", "verificări", "abateri", "acțiuni corective"],
        layers: [
          { title: "Registru", text: "Riscurile și cerințele se fixează cu proprietari, procese, obiecte și criticitate.", icon: "data", items: ["risc", "proprietar", "criticitate"] },
          { title: "Control", text: "Procedurile de control se leagă de regulamente, periodicitate, roluri și confirmări.", icon: "shield", items: ["procedură", "rol", "confirmare"] },
          { title: "Abatere", text: "Încălcările și observațiile devin sarcini cu responsabili și statuturi de remediere.", icon: "flow", items: ["observație", "sarcină", "statut"] },
          { title: "Harta riscurilor", text: "Concentrarea riscurilor, acțiunile neînchise și încălcările repetate devin vizibile.", icon: "ranking", items: ["concentrare", "repetări", "acțiuni"] }
        ],
        executive: "Managementul riscurilor ajută nu doar la fixarea cerințelor, ci și la controlul acțiunilor care reduc probabilitatea problemelor.",
        effects: ["controlul regulamentelor", "mai puține riscuri neînchise", "responsabilitate clară", "managementul verificărilor", "pregătire pentru audituri"]
      },
      "incident-investigation-system": {
        summary: "Analiza avariilor și incidentelor: fapte, cauze, acțiuni corective și păstrarea lecțiilor învățate.",
        positioning:
          "Incidentul trebuie să se încheie nu doar cu lucrarea închisă, ci cu o concluzie managerială: de ce s-a întâmplat, ce trebuie schimbat și cine previne repetarea.",
        outputs: ["card de investigație", "fapte și documente", "cauze rădăcină", "acțiuni corective", "bază de lecții"],
        layers: [
          { title: "Card", text: "Incidentul primește o structură de investigație: eveniment, obiect, participanți, documente și linie temporală.", icon: "content", items: ["eveniment", "obiect", "timeline"] },
          { title: "Fapte", text: "Se colectează fotografii, acte, declarații, date ale lucrărilor, istoricul obiectului și condiții externe.", icon: "data", items: ["foto", "acte", "istoric"] },
          { title: "Cauze", text: "Echipa fixează cauzele rădăcină, factorii de repetare și legăturile cu procesele.", icon: "lens", items: ["cauză", "factor", "proces"] },
          { title: "Acțiuni", text: "Măsurile corective devin sarcini cu proprietari și control al rezultatului.", icon: "tools", items: ["măsură", "proprietar", "control"] }
        ],
        executive: "Investigarea incidentelor transformă avariile în cunoaștere managerială și reduce probabilitatea repetării problemelor similare.",
        effects: ["mai puțină repetare", "cauze clare", "controlul acțiunilor corective", "păstrarea experienței", "legătură cu riscurile și instruirea"]
      },
      "executive-dashboard": {
        summary: "Centru managerial unic: operațiuni, regiuni, active, riscuri, obligații și abateri cheie.",
        positioning:
          "Dashboardul nu trebuie să fie un set frumos de grafice, ci un ecran de decizii manageriale care adună doar indicatori confirmați și utili.",
        outputs: ["imaginea companiei", "indicatori pe regiuni", "abateri critice", "SLA și riscuri", "decizii manageriale"],
        layers: [
          { title: "Indicatori", text: "Se definesc metrici care reflectă cu adevărat starea operațiunilor, activelor, proceselor financiare și riscurilor.", icon: "ranking", items: ["operațiuni", "active", "riscuri"] },
          { title: "Regiuni", text: "Imaginea se împarte pe regiuni, departamente, tipuri de sarcini și zone de responsabilitate.", icon: "map", items: ["regiune", "departament", "responsabilitate"] },
          { title: "Excepții", text: "Dashboardul evidențiază nu toate datele, ci abaterile care cer atenție managerială.", icon: "lens", items: ["abatere", "semnal", "acțiune"] },
          { title: "Decizie", text: "Indicatorul se leagă de proprietar, cauză, acțiune și statutul reacției.", icon: "flow", items: ["proprietar", "cauză", "reacție"] }
        ],
        executive: "Panoul este necesar nu pentru raportare de dragul raportării, ci pentru înțelegerea zilnică a zonelor unde compania are nevoie de decizie.",
        effects: ["imagine unică a companiei", "control regional", "reacții manageriale mai rapide", "vizibilitatea SLA și riscurilor", "legătura datelor cu deciziile"]
      },
      "knowledge-base": {
        summary: "Bază corporativă de cunoștințe pentru regulamente, instrucțiuni, istoric de decizii, lecții din incidente și suport pentru angajați.",
        positioning:
          "Baza de cunoștințe păstrează expertiza companiei și face regulamentele disponibile într-o structură gestionată înainte ca scenarii AI mai complexe să fie construite deasupra.",
        outputs: ["bază de cunoștințe", "structură de regulamente", "căutare în documente", "istoric de decizii", "controlul actualității"],
        layers: [
          { title: "Bază de cunoștințe", text: "Documentele, regulamentele, instrucțiunile, scenariile frecvente și lecțiile incidentelor se adună într-o structură gestionată.", icon: "data", items: ["documente", "instrucțiuni", "lecții"] },
          { title: "Căutare", text: "Angajatul găsește rapid regulamentul, forma, decizia sau materialul conex necesar.", icon: "lens", items: ["regulament", "formă", "decizie"] },
          { title: "Proprietari", text: "Fiecare bloc de cunoștințe are responsabil pentru actualitate, acces, versiuni și confirmarea materialelor.", icon: "shield", items: ["proprietar", "versiune", "acces"] },
          { title: "Actualizare", text: "Materialele depășite, golurile și cunoștințele critice pentru operațiuni devin vizibile.", icon: "monitor", items: ["actualitate", "goluri", "prioritate"] }
        ],
        executive: "Baza corporativă de cunoștințe ajută la păstrarea expertizei Moldovagaz și reduce dependența de transmiterea informală a experienței.",
        effects: ["păstrarea expertizei", "căutare mai rapidă a regulamentelor", "suport pentru instruire", "versiune unică a cunoștințelor", "fundament pentru AI assistant"]
      },
      "ai-assistant": {
        summary: "AI assistant pentru angajați, care răspunde la întrebări pe baza documentelor confirmate, regulamentelor și istoricului deciziilor.",
        positioning:
          "AI Assistant nu trebuie să pară o anexă la modă. Valoarea lui apare doar când există surse clare de cunoștințe, drepturi de acces, reguli de responsabilitate și controlul calității răspunsurilor.",
        outputs: ["întrebări ale angajaților", "răspunsuri pe surse", "linkuri la documente", "controlul calității", "analiza solicitărilor"],
        layers: [
          { title: "Întrebare", text: "Angajatul pune întrebarea în context de lucru: regulament, procedură, document, obiect sau tip de situație operațională.", icon: "content", items: ["context", "rol", "solicitare"] },
          { title: "Surse", text: "Răspunsul se construiește doar pe materiale confirmate ale bazei de cunoștințe, documente și surse interne permise.", icon: "data", items: ["documente", "regulamente", "acces"] },
          { title: "Răspuns", text: "Asistentul arată un răspuns scurt, baza lui, documente conexe și limitele de aplicare.", icon: "ai", items: ["răspuns", "bază", "limită"] },
          { title: "Control", text: "Calitatea răspunsurilor, întrebările frecvente, golurile de cunoștințe și temele riscante sunt controlate de proprietarii procesului.", icon: "shield", items: ["calitate", "goluri", "proprietar"] }
        ],
        executive: "AI assistant trebuie să accelereze angajații, dar să nu înlocuiască regulamentele, proprietarii proceselor și responsabilitatea pentru decizii.",
        effects: ["căutare mai rapidă", "mai puțină încărcare pe experți", "suport pentru angajați noi", "identificarea golurilor de cunoștințe", "utilizare controlată a AI"],
        guardrails: [
          "AI assistant se lansează doar pe o bază de cunoștințe confirmată și cu drepturi de acces clare.",
          "Răspunsurile trebuie să arate sursele și să nu înlocuiască proprietarii responsabili ai procesului.",
          "Scenariile AI se aleg după auditul documentelor, datelor și cerințelor de securitate."
        ]
      }
    }
  }
};

const buildLocalizedPresentation = (locale: Exclude<Locale, "ru">, module: MoldovagazModule): MoldovagazPresentation => {
  const defaults = localizedDefaults[locale];

  return {
    valueTitle: defaults.valueTitle,
    valueText:
      locale === "ro"
        ? `${module.title} transformă acțiunile dispersate într-o zonă clară de management: statutul, proprietarul, zonele problematice și pasul următor devin vizibile.`
        : `${module.title} turns scattered actions into a clear management area: status, owner, problem zones and the next step become visible.`,
    flowTitle: defaults.flowTitle,
    flowText:
      locale === "ro"
        ? "Direcția leagă procesul, datele, rolurile și controlul rezultatului. După audit, Moldovagaz poate înțelege ce nivel de automatizare este cu adevărat necesar."
        : "The direction connects process, data, roles and result control. After the audit, Moldovagaz can understand which level of automation is actually needed.",
    proofTitle: defaults.proofTitle,
    proofText:
      locale === "ro"
        ? "Auditul arată sursele reale de date, proprietarii procesului, regulamentele, riscurile și efectul managerial care poate fi obținut."
        : "The audit shows real data sources, process owners, regulations, risks and the management effect that can be achieved."
  };
};

const buildLocalizedPilot = (locale: Exclude<Locale, "ru">, module: MoldovagazModule): MoldovagazModule["pilot"] => {
  const defaults = localizedDefaults[locale];

  return {
    title: defaults.pilotTitle,
    goal:
      locale === "ro"
        ? `Clarificarea valorii manageriale pe care ${module.title} o poate aduce pentru Moldovagaz și a condițiilor care trebuie verificate înaintea oricărei decizii de implementare.`
        : `Clarify the management value that ${module.title} can create for Moldovagaz and the conditions that must be checked before any implementation decision.`,
    steps: defaults.pilotSteps,
    metrics: defaults.pilotMetrics
  };
};

const buildLocalizedProject = (locale: Exclude<Locale, "ru">): MoldovagazProject => {
  const copy = localizedProjectCopies[locale];

  return {
    ...project,
    ...copy,
    groups: project.groups.map((group) => ({
      ...group,
      ...copy.groups[group.slug]
    })),
    priorityMatrix: project.priorityMatrix.map((quadrant) => ({
      ...quadrant,
      ...copy.priorityMatrix[quadrant.slug]
    })),
    modules: project.modules.map((module) => {
      const moduleCopy = copy.modules[module.slug];
      const localizedModule: MoldovagazModule = {
        ...module,
        ...moduleCopy,
        title: moduleCopy.title ?? module.title,
        presentation: buildLocalizedPresentation(locale, { ...module, ...moduleCopy }),
        pilot: buildLocalizedPilot(locale, { ...module, ...moduleCopy }),
        sources: localizedSourceSets[locale][sourceKeyByGroup[module.groupSlug] ?? "operations"],
        guardrails: moduleCopy.guardrails ?? localizedSharedGuardrails[locale]
      };

      return localizedModule;
    })
  };
};

const localizedProjects: Record<Locale, MoldovagazProject> = {
  en: buildLocalizedProject("en"),
  ro: buildLocalizedProject("ro"),
  ru: project
};

export const formatMoldovagazProjectCount = (locale: Locale, count: number) => {
  if (locale === "ru") {
    const mod10 = count % 10;
    const mod100 = count % 100;
    const word = mod10 === 1 && mod100 !== 11 ? "проект" : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14) ? "проекта" : "проектов";
    return `${count} ${word}`;
  }

  if (locale === "ro") return `${count} ${count === 1 ? "subproiect" : "subproiecte"}`;

  return `${count} ${count === 1 ? "subproject" : "subprojects"}`;
};

export const getMoldovagazProject = (locale: Locale) => localizedProjects[locale] ?? localizedProjects.en;

export const getMoldovagazModule = (locale: Locale, slug: string) =>
  getMoldovagazProject(locale).modules.find((module) => module.slug === slug);

export const getMoldovagazGroup = (locale: Locale, slug: string) =>
  getMoldovagazProject(locale).groups.find((group) => group.slug === slug);

export const getMoldovagazGroupModules = (locale: Locale, groupSlug: string) => {
  const project = getMoldovagazProject(locale);
  const group = project.groups.find((entry) => entry.slug === groupSlug);
  const slugs = group?.projects ?? [];

  return slugs
    .map((slug) => project.modules.find((module) => module.slug === slug))
    .filter((module): module is MoldovagazModule => Boolean(module));
};
