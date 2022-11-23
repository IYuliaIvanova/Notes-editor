import { ITag } from "../interfaces/interfaces";

export const getTags = (value: string): ITag[] => {
  const tags: ITag[] = [];

  value.split(' ').forEach(word => {
    if(word.includes('#') && word.length > 1) {
      word.split("#").splice(1).forEach((item) => {
        return tags.push({ id: (new Date()).getTime(), textTags:  item })
      })
    }
  })
  
  return tags
}