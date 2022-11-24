import React from "react";
import { ITag } from "../../../interfaces/interfaces";
import { TagsItem } from "../TagsItem/TagsItem";

interface ITagsItemsList {
    tags: ITag[];
    removeTag: (id: number) => void;
    filterChange: (filter: string) => void;
}

export const TagsItemsList = ({ tags, removeTag, filterChange }: ITagsItemsList) => {
    return (
        <div className="tags-list">
            {tags.map(({ id, textTags }) => (
               <TagsItem 
                    key={id} 
                    idTag={id} 
                    textTag={textTags} 
                    removeTag={removeTag} 
                    filterChange={filterChange}
                />
            ))}
        </div>
    )
}