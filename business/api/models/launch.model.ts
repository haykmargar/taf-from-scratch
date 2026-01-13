export type LaunchResource = {
    analysing: string[],
    approximateDuration: number,
    attributes: ItemAttributeResource[],
    description: string,
    endTime: number,
    hasRetries: boolean,
    id: number,
    lastModified: number,
    metadata: object,
    mode: Mode,
    name: string,
    number: number,
    owner: string,
    rerun: boolean,
    startTime: number,
    statistics: StatisticsResource,
    status: string,
    uuid: string
}

type ItemAttributeResource = {
    key: string,
    value: string
}

enum Mode {
    DEFAULT,
    DEBUG
}

type StatisticsResource = {
    executions: {
        total: number,
        failed: number,
        passed: number
    },
    defects: {
        system_issue: {
            total: number,
            si001: number
        },
        to_investigate: {
            total: number,
            ti001: number
        },
        automation_bug: {
            total: number,
            ab001: number
        }
    }
}

type Page = {
    number: number,
    size: number,
    totalElements: number,
    totalPages: number
}

export interface LaunchResponse {
    content: LaunchResource[],
    page: Page
}

export interface LaunchCreateResponse {
    id: string,
    number: number
}
