import { ITag } from "../mock-data/notes";

export const getTags = (value: string): ITag[] => {
  const tags = value.split(' ').filter((item) => {
      if(item.includes('#')){
        return item;
      }
    }).map((tag) => {
      if(tag.includes('#')){
        const allTags = tag.split('#').splice(1);

        if(allTags.includes('')){
          return allTags.filter(tag => tag !== '');
        } else {
          return allTags;
        } 
      }
    }).join(',').split(',').filter(tag => tag !== '')
    .map((item): ITag => {
      return {id: (new Date()).getTime(), textTags: item}
    });

    return tags
}