export interface IFilterBtn {
    text: string;
    id: string;
}

export interface ITag {
    id: number;
    text: string;
}

export interface ITagNotes {
    id: number;
    tag: ITag;
}

export interface INotes {
    id: number;
    text: string;
    isCompleted: boolean;
    tags: ITagNotes[];
}
