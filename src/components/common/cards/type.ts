import { BaseArticle, OptionalArticle } from '@/apis/services/article/reader/type';

export type PlanCardArticle = BaseArticle & Partial<OptionalArticle>;
