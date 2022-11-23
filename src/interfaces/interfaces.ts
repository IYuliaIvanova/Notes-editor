export interface IFilterBtn {
    text: string;
    id: string;
}

export interface ITag {
    id: number;
    textTags: string;
}

export interface INotes {
    id: number;
    text: string;
    isCompleted: boolean;
    tagsTextTask: string;
}
