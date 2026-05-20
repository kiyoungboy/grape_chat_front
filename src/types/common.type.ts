export interface Pageable {
    page: number;
    size: number;
}

export interface BaseEntity {
    createdAt: string;
    updatedAt?: string;
}