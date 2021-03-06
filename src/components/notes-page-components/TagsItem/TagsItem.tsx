import React from "react";
import { delTags } from "../../../api/fetchRequest/fetchTags";

interface ITagsItem {
    idTag: number;
    textTag: string;
    removeTag: (id: number) => void;
    filterChange: (filter: string) => void;
}

export const TagsItem = ({ idTag, textTag, removeTag, filterChange }: ITagsItem) =>{
    const handleRemoveTags = (e: React.FormEvent<HTMLElement>) => {
        removeTag(idTag);
        delTags(idTag)
    }
    
    return (
        <div className="tags-item">
            <button className="tag-text" onClick={() => filterChange(textTag)}>{textTag}</button>
            <i className="fas fa-times" onClick={handleRemoveTags} />
        </div>
    )
}