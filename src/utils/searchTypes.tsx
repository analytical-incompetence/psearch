export interface QueryResult {
    query: Query
    mixed: Mixed
    type: string
    web: Web
}

export interface Query {
    original: string
    show_strict_warning: boolean
    is_navigational: boolean
    local_decision: string
    local_locations_idx: number
    is_news_breaking: boolean
    spellcheck_off: boolean
    country: string
    bad_results: boolean
    should_fallback: boolean
    postal_code: string
    city: string
    header_country: string
    more_results_available: boolean
    state: string
}

export interface Mixed {
    type: string
    main: Main[]
    top: never[]
    side: never[]
}

export interface Main {
    type: string
    index: number
    all: boolean
}

export interface Web {
    type: string
    results: Result[]
    family_friendly: boolean
}

export interface Result {
    title: string
    url: string
    is_source_local: boolean
    is_source_both: boolean
    description: string
    page_age?: string
    profile: Profile
    language: string
    family_friendly: boolean
    type: string
    subtype: string
    meta_url: MetaUrl
    age?: string
}

export interface Profile {
    name: string
    url: string
    long_name: string
    img: string
}

export interface MetaUrl {
    scheme: string
    netloc: string
    hostname: string
    favicon: string
    path: string
}

export interface History {
    query: string
    createdAt: Date,
    userId: string,
    id: string
}

export interface ResponseObject {
    originalQuery: string,
    oppositeQuery: string
}

export function parseQueryResult(input: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json: QueryResult = JSON.parse(input);
    return json
}