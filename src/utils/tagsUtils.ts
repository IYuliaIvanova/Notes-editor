import { ITag, ITagNotes } from "../interfaces/interfaces";

export const splitTags = (value: string): string[] => {
  const tags: string[] = [];

  value.split(' ').forEach((word) => {
    if(word.includes('#') && word.length > 1) {
      tags.push(word)
    }
  })

  return tags.map((item, id) => {
    return item.split('#').slice(1)
  }).flat();
}

export const addNewTags = (tags: ITag[], tagsInput: string[]): ITag[] => {
  const newTags: ITag[] = []

  if(tags.length !== 0){
    tags.forEach((item, id) => {
      tagsInput = tagsInput.filter((value) => value !== item.text)
    })
  }
  
  tagsInput.forEach((value, id) => {
    newTags.push({ id: (new Date()).getTime() + id, text: value })
  })

  return newTags
}

export const getTagNotes = (tags: ITag[], tagsInput: string[]): ITagNotes[] => {
  const newTagsNotes: ITagNotes[] = []
  
  tags.forEach((item) => {
    for (let i = 0; i < tagsInput.length; i++) {
      if( item.text === tagsInput[i]){
        newTagsNotes.push({
            id: (new Date()).getTime() + i, 
            tag: {
              id: item.id,
              text: tagsInput[i]
            }
        })
      }
    }
  })

  return newTagsNotes
}