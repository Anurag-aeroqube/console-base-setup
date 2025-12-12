export const LOCALIZATION_KEYS = {
  NAV: {
    DASHBOARD: "nav.dashboard",
    USERS: "nav.users",
    MANAGE_USERS: "nav.manageUsers",
    SERVICE_POINTS: "nav.service_points",
    ROLES: "nav.roles",
    DETAILS: "nav.details",
  },

  BUTTONS: {
    SAVE: "buttons.save",
    CANCEL: "buttons.cancel",
    SUBMIT: "buttons.submit",
    LOGIN: "buttons.login",
    SIGNUP: "buttons.signup",
  },

  MESSAGES: {
    EMPTY_SEARCH_TITLE: "messages.emptySearchTitle",
    EMPTY_SEARCH_SUBTEXT: "messages.emptySearchSubtext",
    NO_DATA: "messages.noData",
  },

  TABS: {
    SUMMARY: "summary.tabs.summary",
    DETAILS: "summary.tabs.details",
  },

  SUMMARY_HEADERS: {
    ACTIVE_CHANNELS: "summary.headers.active_channels",
    RECENT_BILLING_REQUESTS: "summary.headers.recent_billing_requests",
    ACTIVE_DATA_SERVICES: "summary.headers.active_data_services",
    RECENT_EVENTS: "summary.headers.recent_events",
    PARAMETERS: "summary.headers.parameters",
    SERVICE_POINT_GROUPS: "summary.headers.service_point_groups",
    LINKED_ACCOUNTS: "summary.headers.linked_accounts",
    CONSUMERS: "summary.headers.consumers",
    ACCOUNT: "summary.headers.account",
    CUSTOMER: "summary.headers.customer",
    METER_STATUS: "summary.headers.meter_status",
  },

  SUMMARY_FIELDS: {
    ACCOUNT_UDCCID: "summary.fields.account_udccid",
    ACCOUNT_START: "summary.fields.account_start",
    BILLING_CYCLE: "summary.fields.billing_cycle",

    PRIMARY_CONTACT: "summary.fields.primary_contact",
    ADDRESS: "summary.fields.address",

    CTPT_MULTIPLIER: "summary.fields.ctpt_multiplier",
    POWER_CONNECTED: "summary.fields.power_connected",
    LOAD_CONNECTED: "summary.fields.load_connected",
    SERVICE_REQUESTS: "summary.fields.service_requests",
    METER: "summary.fields.meter",
    ELECTRIC: "summary.fields.electric",
    ACTIONS: "summary.fields.actions",
    SHOW_RESULT: "sumary.fields.show_result",
  },

  COMMON: {
    LOGOUT: "common.logout",
    SETTINGS: "common.settings",
    MY_ACCOUNT: "common.my_account",
    SEARCH: "common.search",
    NO_DATA: "common.noData",
    COMING_SOON: "common.comingSoon",
    SEARCH_PLACEHOLDER: "common.search_placeholder",
    NO_RESULTS: "common.no_results",
    PAGE: "common.page",
    OF: "common.of",
    ITEMS: "common.items",
    COLUMNS: "common.columns",
  },

  LANG: {
    ENGLISH: "lang.english",
    HINDI: "lang.hindi",
  },

  // Customer Info
  //Column Headers
  COLS: {
    NAME: "columns.name",
    CITY: "columns.city",
    STAGE: "columns.stage",
    SALES_PERSON: "columns.sales_person",
    PHONE: "columns.phone",
    ANURAG: "columns.anurag",
  },

  SUMMARY_COLS: {
    MEASUREMENT: "summary.columns.measurement",
    TYPE: "summary.columns.type",
    LAST_READ: "summary.columns.last_read",
    VALUE: "summary.columns.value",
    STATUS: "summary.columns.status",

    REF: "summary.columns.ref",
    FROM: "summary.columns.from",
    TO: "summary.columns.to",
    CYCLE: "summary.columns.cycle",
    ERROR: "summary.columns.error",

    NAME: "summary.columns.name",
    START: "summary.columns.start",
    END: "summary.columns.end",

    EVENT: "summary.columns.event",
    TIME: "summary.columns.time",
    SEVERITY: "summary.columns.severity",
    SOURCE: "summary.columns.source",
  },

  DETAILS_COLS: {
    PARAMETERS: {
      NAME: "details.parameters.name",
      VALUE: "details.parameters.value",
      START_DATE: "details.parameters.start_date",
      END_DATE: "details.parameters.end_date",
      STATUS: "details.parameters.status",
      UPLOADED_BY: "details.parameters.uploaded_by",
      REASON: "details.parameters.reason",
    },

    SERVICE_GROUPS: {
      UCDID: "details.service_groups.udcid",
      GROUP_NAME: "details.service_groups.group_name",
      TYPE: "details.service_groups.type",
      SUBTYPE: "details.service_groups.subtype",
      STATUS: "details.service_groups.status",
      START_DATE: "details.service_groups.start_date",
      END_DATE: "details.service_groups.end_date",
    },

    LINKED_ACCOUNTS: {
      ACCOUNT_ID: "details.linked.account_id",
      RATE_SCHEDULE: "details.linked.rate_schedule",
      BILLING_CYCLE: "details.linked.billing_cycle",
      RELATIONSHIP: "details.linked.relationship",
      EFFECTIVE_PERIOD: "details.linked.effective_period",
      STATUS: "details.linked.status",
    },

    CONSUMERS: {
      NAME: "details.consumers.name",
      ACCOUNT: "details.consumers.account",
      TYPE: "details.consumers.type",
      START_DATE: "details.consumers.start_date",
      END_DATE: "details.consumers.end_date",
      STATUS: "details.consumers.status",
    },
  },

  DETAILS_HEADERS: {
    PARAMETERS: "details.headers.parameters",
    SERVICE_POINT_GROUPS: "details.headers.service_point_groups",
    LINKED_ACCOUNTS: "details.headers.linked_accounts",
    CONSUMERS: "details.headers.consumers",
  },

  FORM_HEADERS: {
  ADD_SERVICE_POINT: "form.headers.add_service_point",
},

  FORM_FIELDS: {
    FULL_NAME: "form_fields.full_name",
    METER_READING: "form_fields.meter_reading",
    CATEGORY: "form_fields.category",
    SERVICES_REQUIRED: "form_fields.services_required",
    TAGS: "form_fields.tags",
    DESCRIPTION: "form_fields.description",
    START_DATE: "form_fields.start_date",
    IS_ACTIVE: "form_fields.is_active",
    AGREE_TERMS: "form_fields.agree_terms",
     ADD_TAG: "form_fields.add_tag",

    OPTIONS: {
      RESIDENTIAL: "form_fields.options.residential",
      COMMERCIAL: "form_fields.options.commercial",
      INDUSTRIAL: "form_fields.options.industrial",

      ELECTRICITY: "form_fields.options.electricity",
      WATER: "form_fields.options.water",
      GAS: "form_fields.options.gas",
      SOLAR: "form_fields.options.solar",
      INTERNET: "form_fields.options.internet",
      CABLE_TV: "form_fields.options.cable_tv",
      FIBER: "form_fields.options.fiber",
      SEWAGE: "form_fields.options.sewage",
      TRASH: "form_fields.options.trash",
      HEATING: "form_fields.options.heating",
      COOLING: "form_fields.options.cooling",
      LANDLINE: "form_fields.options.landline",
      GENERATOR: "form_fields.options.generator",
      RAINWATER: "form_fields.options.rainwater",
      RO_WATER: "form_fields.options.ro_water",
      IRRIGATION: "form_fields.options.irrigation",
      WIND: "form_fields.options.wind",
      BIOFUEL: "form_fields.options.biofuel",
      SMART_METER: "form_fields.options.smart_meter",
      SECURITY: "form_fields.options.security",
      FIRE_SAFETY: "form_fields.options.fire_safety",
      EV_CHARGING: "form_fields.options.ev_charging",
      STREET_LIGHT: "form_fields.options.street_light",

      URGENT: "form_fields.options.urgent",
      VIP: "form_fields.options.vip",
      NEW: "form_fields.options.new",
      FOLLOW_UP: "form_fields.options.follow_up",
    },

    PLACEHOLDERS: {
      FULL_NAME: "placeholders.full_name",
      METER_READING: "placeholders.meter_reading",
      CATEGORY: "placeholders.category",
      SERVICES: "placeholders.services",
      TAGS: "placeholders.tags",
      DESCRIPTION: "placeholders.description",
    },
  },
};
